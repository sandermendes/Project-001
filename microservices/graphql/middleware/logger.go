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

			IPAddress := r.Header.Get("X-Real-Ip")
			if IPAddress == "" {
				IPAddress = r.Header.Get("X-Forwarded-For")
			}
			if IPAddress == "" {
				IPAddress = r.RemoteAddr
			}
			defer func() {
				since := time.Since(startTime)
				fmt.Printf(
					interceptors.Green+"[%s] "+interceptors.Reset+"- %s - "+interceptors.Yellow+"Time:"+interceptors.Reset+" %s\n",
					time.Now().Format(time.DateTime), IPAddress, since,
				)
			}()
			next.ServeHTTP(w, r)
		})
	}
}
