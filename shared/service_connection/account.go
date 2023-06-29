package serviceConnection

import (
	"fmt"

	accountv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func GetAccountConnection(address string) (accountv1.AccountServiceClient, error) {
	var dialOpts []grpc.DialOption
	dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.Dial(address, dialOpts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Account %s", err.Error())
	}
	return accountv1.NewAccountServiceClient(conn), nil
}
