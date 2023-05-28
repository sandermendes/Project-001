package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/directives"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/generated"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/resolvers"
	"github.com/go-chi/chi"
)

var invalidAuthMessage = "{\"message\":\"Invalid auth\"}"

func Middleware() func(http.Handler) http.Handler {
	fmt.Println("Middleware")
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if auth == "" {
				http.Error(w, invalidAuthMessage, http.StatusForbidden)
				return
			}
			fmt.Println("Middleware - auth", auth)
			next.ServeHTTP(w, r)
		})
	}
}

func main() {

	port, ok := os.LookupEnv("GRAPHQL_PUBLIC_SERVICE_PORT")
	if !ok {
		panic(fmt.Sprintf("No port specified for %s", port))
	}

	router := chi.NewRouter()
	router.Use(Middleware())

	resolver, err := resolvers.NewGraphQLServer()
	if err != nil {
		panic(err)
	}

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

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", server)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		panic(err)
	}
}
