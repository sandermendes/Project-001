package serviceconnection

import (
	"fmt"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func GetUserConnection() (*grpc.ClientConn, error) {
	var dialOpts []grpc.DialOption
	dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.Dial("localhost:8010", dialOpts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to User %s", err.Error())
	}
	return conn, nil
}
