package main

import (
	"log"
	"os"

	"com.vitanexus/main/shared"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	err := shared.InitGraphqlServer(port)
	if err != nil {
		log.Fatal(err.Error())
	}
}
