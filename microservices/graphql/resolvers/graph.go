package resolvers

import (
	"fmt"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/generated"
	serviceConnection "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
)

type Server struct {
	// account accountv1.AccountServiceClient
	*Resolver
}

func NewGraphQLServer() (*Resolver, error) {
	accountConn, err := serviceConnection.GetAccountConnection()
	if err != nil {
		// TODO: Improve return  error
		fmt.Println("err", err)
	}

	return &Resolver{
		accountConn: accountConn,
	}, nil
}

func (s *Resolver) Mutation() generated.MutationResolver {
	return &Server{s}
}

func (s *Resolver) Query() generated.QueryResolver {
	return &Server{s}
}

// func (s *Server) Account() generated.AccountResolver {
// 	// return nil

// 	return &resolvers.AccountResolver{
// 		Resolver: &resolvers.Resolver{},
// 	}
// }

// func (s *Server) ToExecutableSchema() graphql.ExecutableSchema {
// 	return generated.NewExecutableSchema(generated.Config{
// 		// Resolvers: s,
// 	})
// }
