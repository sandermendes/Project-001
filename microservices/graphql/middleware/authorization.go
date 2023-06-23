package middlewareGraphql

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/helpers"
	contextkeys "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"google.golang.org/grpc/metadata"
)

func Authentication(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
	handler := next(ctx)

	return func(ctx context.Context) *graphql.Response {
		// GetSession
		session := helpers.GetSession(ctx, "appSession")
		if session == nil {
			return graphql.ErrorResponse(ctx, "fail to get session data")
		}

		// Extract UserID from session
		sessionUserID := session.Values["userID"]

		// Ckeck if have some value
		if sessionUserID != nil {

			// Set to metadata, UserId extracted from token
			md := metadata.Pairs("x-user-id", sessionUserID.(string))

			// Generate a new Context
			ctx = metadata.NewOutgoingContext(ctx, md)
			ctx = context.WithValue(ctx, contextkeys.CONTEXT_USER_ID, sessionUserID.(string))
		}

		return handler(ctx)
	}
}
