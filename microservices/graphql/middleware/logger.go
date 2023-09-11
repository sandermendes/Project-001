package middlewareGraphql

import (
	"fmt"
	"net/http"
	"time"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
)

// Create a Logger for HTTP requests
func Logger() func(http.Handler) http.Handler {
	startTime := time.Now()
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			// For logging only on deployed environment
			IPAddress := r.Header.Get("X-Forwarded-For")
			if IPAddress != "" {
				requestMethod := r.Method
				urlPath := r.URL.Path
				responseStatusCode := r.Response.StatusCode
				defer func() {
					since := time.Since(startTime)
					fmt.Printf(
						interceptors.Green+"[%s] "+interceptors.Reset+"- %s - %s - %s - %d - "+interceptors.Yellow+"Time:"+interceptors.Reset+" %s\n",
						time.Now().Format(time.DateTime), IPAddress, requestMethod, urlPath, responseStatusCode, since,
					)
				}()
			}
			next.ServeHTTP(w, r)
		})
	}
}
