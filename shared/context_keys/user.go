package contextkeys

import (
	"context"
)

type contextKey string

func (c contextKey) String() string {
	return string(c)
}

const (
	// User info
	CONTEXT_USER_ID = contextKey("x-user-id")
)

func GetUserIDFromContext(ctx context.Context) string {
	userID, ok := ctx.Value(CONTEXT_USER_ID).(string)
	if !ok {
		return ""
	}
	return userID
}
