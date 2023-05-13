package shared

import (
	"log"
	"net/http"

	"com.vitanexus/main/internal/gql/directives"
	"com.vitanexus/main/internal/gql/generated"
	gql "com.vitanexus/main/internal/gql/resolvers"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
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
