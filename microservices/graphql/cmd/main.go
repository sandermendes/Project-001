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
)

func main() {

	port, ok := os.LookupEnv("GRAPHQL_SERVICE_PORT")
	if !ok {
		panic(fmt.Sprintf("No port specified for %s", port))
	}

	// fmt.Printf("Listening on port: %s\n", port)
	// if err := account.ListenGRPC(port); err == nil {
	// 	log.Fatal("server exited", err.Error())
	// }

	// err := shared.InitGraphqlServer(port)
	// if err != nil {
	// 	log.Fatal(err.Error())
	// }

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
	http.Handle("/query", server)
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}
