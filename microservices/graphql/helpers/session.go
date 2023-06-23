package helpers

import (
	"context"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/wader/gormstore/v2"
)

type HTTPKey string

type HTTP struct {
	W *http.ResponseWriter
	R *http.Request
}

func GetSession(ctx context.Context, name string) *sessions.Session {
	store := ctx.Value(HTTPKey("session")).(*gormstore.Store)
	httpContext := ctx.Value(HTTPKey("http")).(HTTP)

	session, err := store.Get(httpContext.R, name)
	if err != nil {
		return nil
	}

	return session
}

func DeleteSession(ctx context.Context, name string) *sessions.Session {
	store := ctx.Value(HTTPKey("session")).(*gormstore.Store)
	httpContext := ctx.Value(HTTPKey("http")).(HTTP)

	session, err := store.Get(httpContext.R, name)
	if err != nil {
		return nil
	}
	session.Options.MaxAge = -1
	err = session.Save(httpContext.R, *httpContext.W)
	if err != nil {
		return nil
	}

	return session
}

func SaveSession(ctx context.Context, session *sessions.Session) error {
	httpContext := ctx.Value(HTTPKey("http")).(HTTP)

	err := session.Save(httpContext.R, *httpContext.W)

	return err
}
