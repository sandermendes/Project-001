package serviceConnection

import (
	"fmt"
	"os"

	accountv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func GetAccountConnection() (accountv1.AccountServiceClient, error) {
	var dialOpts []grpc.DialOption
	dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	accountAddress, ok := os.LookupEnv("ACCOUNT_SERVICE_ADDRESS")
	if !ok {
		fmt.Println("ACCOUNT_SERVICE_ADDRESS - ok", ok)
		panic(fmt.Sprintf("No url specified for %s", accountAddress))
	}

	conn, err := grpc.Dial(accountAddress, dialOpts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Account %s", err.Error())
	}
	return accountv1.NewAccountServiceClient(conn), nil
}
