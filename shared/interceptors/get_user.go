package interceptors

import (
	"context"
	"fmt"
	"strings"

	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

func GetUser(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	fullMethod := strings.Split(info.FullMethod, "/")
	if strings.Contains(fullMethod[2], "Login") {
		resp, err := handler(ctx, req)
		if err != nil {
			return nil, err
		}
		return resp, err
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		// TODO: Improve error
		fmt.Println("Error interceptor GetUser")
	}
	userId := md[contextkeys.CONTEXT_USER_ID.String()][0]

	ctx = context.WithValue(ctx, contextkeys.CONTEXT_USER_ID, userId)

	resp, err := handler(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, err
}
