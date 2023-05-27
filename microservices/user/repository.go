package user

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"

	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"github.com/google/uuid"
)

type Repository interface {
	// GetUsers() error

	GetUserById(inputUser *User) (*User, error)
	CreateUser(input *accountv1.RegisterRequest) (*User, error)
	UpdateUser(input *User) (*User, error)
	DeleteUser(input *User) (*User, error)
}

type repository struct {
	db *gorm.DB
}

func (r *repository) GetUserById(inputUser *User) (*User, error) {
	var user User
	user.ID = inputUser.ID

	// Search for userId
	if err := r.db.Where(&user).First(&user).Scan(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *repository) CreateUser(input *accountv1.RegisterRequest) (*User, error) {
	var user User
	if err := utils.Copy(&user, &input); err != nil {
		return nil, err
	}

	// Try to create row in database
	if err := r.db.Create(&user).First(&user).Scan(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *repository) UpdateUser(input *User) (*User, error) {
	var user User
	userID, _ := uuid.Parse(input.ID.String())
	user.ID = userID

	// Try to update row in database
	if err := r.db.Where(&user).Save(&input).Scan(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *repository) DeleteUser(input *User) (*User, error) {
	var user User
	userID, _ := uuid.Parse(input.ID.String())
	user.ID = userID

	// Try to delete row in database
	if err := r.db.Where(&user).Delete(&user).Error; err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	return &user, nil
}
