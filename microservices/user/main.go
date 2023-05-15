package main

import (
	"fmt"
	"log"
	"os"

	"com.project001/main/providers/encrypt"
	"com.project001/main/shared"
)

const defaultPort = "8080"

func main() {
	hash, err := encrypt.GenHash("123456", 14)
	if err != nil {
		fmt.Println("Error", err.Error())
	}
	fmt.Println("encrypt.GenHash", hash)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	err = shared.InitGraphqlServer(port)
	if err != nil {
		log.Fatal(err.Error())
	}
}
