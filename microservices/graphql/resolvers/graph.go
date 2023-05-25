package resolvers

import (
	"fmt"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/generated"
	serviceConnection "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
)

type Server struct {
	// account accountv1.AccountServiceClient
	*Resolver
}

func NewGraphQLServer() (*Resolver, error) {
	account, err := serviceConnection.GetAccountConnection()
	if err != nil {
		// TODO:
		fmt.Println("err", err)
	}

	return &Resolver{
		account: account,
	}, nil
}

func (s *Resolver) Mutation() generated.MutationResolver {
	return &Server{s}
}

// func (s *Server) Account() generated.AccountResolver {
// 	// return nil

// 	return &resolvers.AccountResolver{
// 		Resolver: &resolvers.Resolver{},
// 	}
// }

// func (s *Server) Query() generated.QueryResolver {
// 	return nil
// 	// return &resolvers.AccountResolver{}
// }

// func (s *Server) ToExecutableSchema() graphql.ExecutableSchema {
// 	return generated.NewExecutableSchema(generated.Config{
// 		// Resolvers: s,
// 	})
// }
