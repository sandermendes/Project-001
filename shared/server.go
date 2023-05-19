package shared

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/internal/gql/directives"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/internal/gql/generated"
	gql "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/internal/gql/resolvers"
)

func InitGraphqlServer(port string) error {
	resolver := gql.NewResolver()

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
		return err
	}
	return nil
}
