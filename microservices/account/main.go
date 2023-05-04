package main

import (
	"fmt"
	"net/http"

	"com.vitanexus/main/database"
)

type User struct {
	// schemas.Model

	FirstName string `gorm:"not null;"`
	LastName  string `gorm:"not null;"`
	// Role      authv1.AuthRole `gorm:"not null;"`
	Email    string `gorm:"unique;not null;"`
	Password string `gorm:"not null;"`
}

func main() {
	conn, err := database.GetConnection()
	if err != nil {
		panic(err)
	}
	conn.AutoMigrate(&User{})
	fmt.Print("main - conn", conn)

	http.ListenAndServe(":3000", nil)

	fmt.Printf("Test\n")
}
