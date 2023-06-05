package contextkeys

import (
	"context"
	"fmt"

	"google.golang.org/grpc/metadata"
)

const (
	// Token info
	CONTEXT_AUTHORIZATION = contextKey("authorization")
)

func GetAuthorizationFromMetadataContext(ctx context.Context) (string, bool) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		// TODO: Improve error
		fmt.Println("Error interceptor GetUser")
		return "", false
	}
	ctxAuthorization := md.Get(CONTEXT_AUTHORIZATION.String())
	if len(ctxAuthorization) == 0 {
		// TODO: Improve error
		fmt.Println("No authorization key intercepted")
		return "", false
	}

	return ctxAuthorization[0], true
}
