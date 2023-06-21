package middlewareGraphql

import (
	"context"
	"net/http"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/helpers"
	"github.com/wader/gormstore/v2"
)

func InjectHTTPMiddleware(gormstore *gormstore.Store) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			httpContext := helpers.HTTP{
				W: &w,
				R: r,
			}
			httpKeyContext := helpers.HTTPKey("http")

			sessionKeyContext := helpers.HTTPKey("session")

			ctx := context.WithValue(r.Context(), httpKeyContext, httpContext)
			ctx = context.WithValue(ctx, sessionKeyContext, gormstore)

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
