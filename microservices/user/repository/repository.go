package repository

import (
	"fmt"

	"gorm.io/gorm"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/user/model"
	accountV1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/generated/account/v1"
)

type Repository interface {
	// GetUsers() error

	CreateUser(input *accountV1.RegisterRequest) error
	// UpdateUser() error
	// DeleteUser() error
}

type repository struct {
	db *gorm.DB
}

func (r *repository) CreateUser( /* input *accountV1.RegisterRequest */ ) error {
	// r.db.Create()
	var user model.User
	// if err := utils.Copy(&user, &input); err != nil {
	// 	return nil
	// }

	if err := r.db.Create(&user).First(&user).Scan(&user).Error; err != nil {
		return err
	}
	fmt.Println("CreateUser - user", user)

	return nil
}
