package contextkeys

import (
	"context"

	"google.golang.org/grpc/metadata"
)

type contextKey string

func (c contextKey) String() string {
	return string(c)
}

const (
	CONTEXT_USER_ID = contextKey("user-id")
)

func GetUserIDFromContext(ctx context.Context) (string, bool) {
	userID, ok := ctx.Value(CONTEXT_USER_ID).(string)
	return userID, ok
}

func SetUserIDToMetadataContext(ctx context.Context, userID string) context.Context {
	ctx = metadata.AppendToOutgoingContext(ctx, CONTEXT_USER_ID.String(), userID)
	return ctx
}
