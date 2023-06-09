package middlewareAccount

import (
	"context"
	"fmt"
	"strings"

	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const METHOD_NAME = 2

func ParseTokenAndGetUserFromContext(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	fullMethod := strings.Split(info.FullMethod, "/")
	if strings.Contains(fullMethod[METHOD_NAME], "Login") || strings.Contains(fullMethod[METHOD_NAME], "Register") {
		resp, err := handler(ctx, req)
		if err != nil {
			return nil, err
		}
		return resp, err
	}

	authorization, ok := contextkeys.GetAuthorizationFromMetadataContext(ctx)
	if !ok {
		return nil, status.Error(codes.NotFound, "problems with authorization token")
	}

	subInfo, err := utils.ValidateToken(authorization, "")
	if err != nil {
		// TODO: Improve error return
		fmt.Println("Token validation error: ", err)
		return nil, err
	}
	ctx = context.WithValue(ctx, contextkeys.CONTEXT_USER_ID, subInfo)

	resp, err := handler(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, err
}
