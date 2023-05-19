package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared"
)

// const defaultPort = "8080"

func main() {
	// flag.Parse()

	port, ok := os.LookupEnv("ACCOUNT_SERVICE_PORT")
	if !ok {
		fmt.Println("ACCOUNT_SERVICE_PORT - ok", ok)
		panic(fmt.Sprintf("no port specified for %s", port))
	}

	err := shared.InitGraphqlServer(port)
	if err != nil {
		log.Fatal(err.Error())
	}
}
