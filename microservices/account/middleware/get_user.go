package middlewareAccount

import (
	"context"

	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

const METHOD_NAME = 2

func GetUserFromMetadata(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if ok {
		if len(md.Get(contextkeys.CONTEXT_USER_ID.String())) > 0 {
			ctx = context.WithValue(ctx, contextkeys.CONTEXT_USER_ID, md.Get(contextkeys.CONTEXT_USER_ID.String())[0])
		}

		resp, err := handler(ctx, req)
		if err != nil {
			return nil, err
		}

		return resp, nil
	}

	return nil, status.Error(codes.Unauthenticated, "failed to get user metadata")
}
