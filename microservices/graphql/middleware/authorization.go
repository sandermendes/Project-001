package middlewareGraphql

import (
	"net/http"

	"google.golang.org/grpc/metadata"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorization := r.Header.Get("Authorization")

		// Set Authorization to metadata context
		md := metadata.Pairs("authorization", authorization)
		ctx := metadata.NewOutgoingContext(r.Context(), md)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
