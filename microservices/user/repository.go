package user

import (
	"gorm.io/gorm"

	accountV1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
)

type Repository interface {
	// GetUsers() error

	// GetUser() (*User, error)
	CreateUser(input *accountV1.RegisterRequest) (*User, error)
	// UpdateUser() error
	// DeleteUser() error
}

type repository struct {
	db *gorm.DB
}

func (r *repository) CreateUser(input *accountV1.RegisterRequest) (*User, error) {
	var user User
	if err := utils.Copy(&user, &input); err != nil {
		return nil, err
	}

	if err := r.db.Create(&user).First(&user).Scan(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
