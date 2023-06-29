package resolvers

import (
	"fmt"
	"os"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/graphql/generated"
	serviceConnection "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
)

type Server struct {
	// account accountv1.AccountServiceClient
	*Resolver
}

func NewGraphQLServer() (*Resolver, error) {
	accountAddress, ok := os.LookupEnv("ACCOUNT_SERVICE_ADDRESS")
	if !ok {
		fmt.Println("ACCOUNT_SERVICE_ADDRESS - ok", ok)
		panic(fmt.Sprintf("No url specified for %s", accountAddress))
	}

	accountConn, err := serviceConnection.GetAccountConnection(accountAddress)
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
