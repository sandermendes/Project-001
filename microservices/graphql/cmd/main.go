package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/httprate"
	"github.com/rs/cors"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/directives"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/generated"
	middlewareGraphql "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/middleware"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/resolvers"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database"
	"github.com/wader/gormstore/v2"
)

func main() {

	port, ok := os.LookupEnv("GRAPHQL_PUBLIC_SERVICE_PORT")
	if !ok {
		panic(fmt.Sprintf("No port specified for %s", port))
	}
	allowedOriginsString, ok := os.LookupEnv("GRAPHQL_PUBLIC_SERVICE_ALLOWED_ORIGINS")
	if !ok {
		panic(fmt.Sprintf("No allowed Origins specified for %v", port))
	}
	sessionKey, ok := os.LookupEnv("SESSION_KEY")
	if !ok {
		panic(fmt.Sprintf("No session key specified for %s", sessionKey))
	}

	allowedOrigins := strings.Split(strings.Trim(allowedOriginsString, `[]"`), `","`)

	dbConn, err := database.NewConnection()
	if err != nil {
		panic(err)
	}
	store := gormstore.NewOptions(dbConn, gormstore.Options{
		TableName: "sessions",
	}, []byte(sessionKey))
	store.SessionOpts.HttpOnly = true
	store.SessionOpts.SameSite = http.SameSiteStrictMode

	// Setup to clean expired sessions
	quit := make(chan struct{})
	go store.PeriodicCleanup(1*time.Hour, quit)

	router := chi.NewRouter()
	router.Use(middlewareGraphql.Logger())
	router.Use(middlewareGraphql.InjectHTTPMiddleware(store))
	router.Use(cors.New(
		cors.Options{
			//Allowed origins for app
			AllowedOrigins: allowedOrigins,

			AllowedMethods: []string{
				//http methods for your app
				http.MethodPost,
			},
			AllowCredentials: true,
			// Debug:            true,
			// 	AllowedHeaders: []string{
			// 		"*", //or you can your header key values which you are using in your application
			// 	},
		},
	).Handler)
	router.Use(httprate.Limit(
		5,
		45*time.Second,
		httprate.WithKeyFuncs(
			httprate.KeyByRealIP,
			httprate.KeyByEndpoint,
		),
		httprate.WithLimitHandler(func(w http.ResponseWriter, r *http.Request) {
			// Send custom responses for the rate limited requests in a JSON message
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusTooManyRequests)
			w.Write([]byte(`{ "errors": [{ "message": "Too many requests" }], "data": null }`))
		}),
	))

	resolver, err := resolvers.NewGraphQLServer()
	if err != nil {
		panic(err)
	}

	// Create New GraphQL Server
	server := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{
				Resolvers: resolver,
				Directives: generated.DirectiveRoot{
					DatabaseField: directives.DatabaseField,
				},
			},
		),
	)

	// Interceptor on Graphql Level, moved from Account Service
	server.AroundOperations(middlewareGraphql.Authentication)
	server.AroundOperations(middlewareGraphql.Cache)

	// router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/", graphQLPlaygroundHandler())
	router.Handle("/api", server)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		panic(err)
	}
}

func graphQLPlaygroundHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		playground_ip, ok := os.LookupEnv("GRAPHQL_PLAYGROUND_FOR_IP")

		if ok {
			IPAddress := r.Header.Get("X-Forwarded-For")
			if playground_ip == "all" || IPAddress == playground_ip {
				playground.Handler("GraphQL playground", "/api").ServeHTTP(w, r)
			}
		}
	}
}
