package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
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
	sessionKey, ok := os.LookupEnv("SESSION_KEY")
	if !ok {
		panic(fmt.Sprintf("No session key specified for %s", sessionKey))
	}

	dbConn, err := database.NewConnection()
	if err != nil {
		panic(err)
	}
	store := gormstore.NewOptions(dbConn, gormstore.Options{
		TableName: "sessions",
	}, []byte(sessionKey))

	// Setup to clean expired sessions
	quit := make(chan struct{})
	go store.PeriodicCleanup(1*time.Hour, quit)

	router := mux.NewRouter()
	router.Use(middlewareGraphql.InjectHTTPMiddleware(store))

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

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", server)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		panic(err)
	}
}
