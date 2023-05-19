package model

import "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database/models"

type User struct {
	models.Base
	FirstName string `json:"firstName" gorm:"column:first_name"`
	LastName  string `json:"lastName" gorm:"column:last_name"`
	Email     string `json:"email" gorm:"not null"`
	Password  string `json:"password" gorm:"not null"`
}
