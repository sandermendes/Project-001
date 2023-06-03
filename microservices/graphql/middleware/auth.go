package middleware

import (
	"context"
	"net/http"

	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")

		if auth == "" {
			next.ServeHTTP(w, r)
			return
		}

		bearer := "Bearer "
		auth = auth[len(bearer):]

		subInfo, err := utils.ValidateToken(auth, "")
		if err != nil {
			http.Error(w, "Error", http.StatusForbidden)
			return
		}

		// Set userID to context
		ctx := context.WithValue(r.Context(), contextkeys.CONTEXT_USER_ID, subInfo)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
