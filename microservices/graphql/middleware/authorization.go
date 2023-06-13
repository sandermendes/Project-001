package middlewareGraphql

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils/validation"
	"google.golang.org/grpc/metadata"
)

func Authentication(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
	handler := next(ctx)

	return func(ctx context.Context) *graphql.Response {
		gContext := graphql.GetOperationContext(ctx)
		// Skip flows from validate authentication
		if validation.Contains(gContext.OperationName, "Login", "Register") {
			return handler(ctx)
		}

		// Get authorization from Header
		authorization := gContext.Headers.Get("Authorization")
		if authorization == "" {
			return graphql.ErrorResponse(ctx, "Invalid token provided")
		}

		// Check for token validation
		subInfo, err := utils.ValidateToken(authorization, "")
		if err != nil {
			// TODO: Improve error return
			fmt.Println(err)
			return graphql.ErrorResponse(ctx, err.Error())
		}

		// Set to metadata, UserId extracted from token
		md := metadata.Pairs("x-user-id", subInfo.(string))

		// Generate a new Context
		ctx = metadata.NewOutgoingContext(ctx, md)
		ctx = context.WithValue(ctx, contextkeys.CONTEXT_USER_ID, subInfo.(string))

		return handler(ctx)
	}
}
