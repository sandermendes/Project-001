package serviceConnection

import (
	"fmt"
	"os"

	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func GetUserConnection() (userv1.UserServiceClient, error) {
	var dialOpts []grpc.DialOption
	dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	userAddress, ok := os.LookupEnv("USER_SERVICE_ADDRESS")
	if !ok {
		fmt.Println("USER_SERVICE_ADDRESS - ok", ok)
		panic(fmt.Sprintf("No url specified for %s", userAddress))
	}

	conn, err := grpc.Dial(userAddress, dialOpts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to User %s", err.Error())
	}
	return userv1.NewUserServiceClient(conn), nil
}
