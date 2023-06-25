package user

import "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database/models"

type User struct {
	models.Base

	// Basic info
	FirstName string `json:"firstName" gorm:"column:first_name"`
	LastName  string `json:"lastName" gorm:"column:last_name"`
	Email     string `json:"email" gorm:"not null"`
	Password  string `json:"password" gorm:"not null"`

	// Additional info
	NickName string `json:"nickName" gorm:"column:nick_name"`
}
