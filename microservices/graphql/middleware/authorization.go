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
		// gContext := graphql.GetOperationContext(ctx)
		// // Skip flows from validate authentication
		// if validation.Contains(gContext.OperationName, "Login", "Register") {
		// 	return handler(ctx)
		// }

		// Get authorization from Header
		// authorization := gContext.Headers.Get("Authorization")
		// if authorization == "" {
		// 	return graphql.ErrorResponse(ctx, "Invalid token provided")
		// }

		// // Check for token validation
		// subInfo, err := utils.ValidateToken(authorization, "")
		// if err != nil {
		// 	// TODO: Improve error return
		// 	fmt.Println(err)
		// 	return graphql.ErrorResponse(ctx, err.Error())
		// }

		session := helpers.GetSession(ctx, "appSession")
		if session == nil {
			return graphql.ErrorResponse(ctx, "fail to get session data")
		}
		// fmt.Println("Graphql - Authentication - session", session)

		sessionUserID := session.Values["userID"]
		// fmt.Println("Graphql - Authentication - sessionUserID", sessionUserID)

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
