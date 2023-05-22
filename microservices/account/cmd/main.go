package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/account"
)

// const defaultPort = "8080"

func main() {
	// flag.Parse()

	port, ok := os.LookupEnv("ACCOUNT_SERVICE_PORT")
	if !ok {
		panic(fmt.Sprintf("No port specified for %s", port))
	}

	fmt.Printf("Listening on port: %s", port)
	if err := account.ListenGRPC(port); err == nil {
		log.Fatal("server exited", err.Error())
	}

	// err := shared.InitGraphqlServer(port)
	// if err != nil {
	// 	log.Fatal(err.Error())
	// }
}
