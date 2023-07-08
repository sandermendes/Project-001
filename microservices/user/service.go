package user

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/google/uuid"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/encrypt"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database"
	userv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Service interface {
	// GetUsers() error
	GetUser(context.Context, *userv1.UpdateUserRequest) (*User, error)
	CreateUser(context.Context, *userv1.CreateUserRequest) (*User, error)
	UpdateUser(context.Context, *userv1.UpdateUserRequest) (*User, error)
	DeleteUser(context.Context, *userv1.UpdateUserRequest) (*User, error)
}

type userService struct {
	repository Repository
}

func NewService() Service {
	db, err := database.NewConnection()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Execute migrations
	db.AutoMigrate(&User{})
	seedUser := User{
		FirstName: "Jane",
		LastName:  "Doe",
		Email:     "janedoe@acme.corp",
		Password:  "123456",
	}

	if err := db.Create(&seedUser).Error; err != nil {
		fmt.Println(fmt.Errorf("failed to seed database: %s", err))
	}

	return &userService{
		repository: &repository{
			db: db,
		},
	}
}

func (r *userService) GetUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error) {
	// TODO: Add some log
	var findUser User

	// Get user by ID
	if input.GetId() != "" {
		userID, _ := uuid.Parse(input.GetId())
		findUser.ID = userID

		// Check if User exists
		user, err := r.repository.GetUserById(&findUser)
		if err != nil {
			return nil, status.Error(codes.NotFound, "not found")
		}

		return user, nil
	}

	// Get user by Email
	if input.GetEmail() != "" {
		findUser.Email = input.GetEmail()

		// Check if User exists
		user, err := r.repository.GetUserByEmail(&findUser)
		if err != nil {
			return nil, status.Error(codes.NotFound, "not found")
		}

		return user, nil
	}

	return nil, status.Error(codes.FailedPrecondition, "missing search parameters")
}

func (r *userService) CreateUser(ctx context.Context, input *userv1.CreateUserRequest) (*User, error) {
	input.Email = strings.ToLower(input.GetEmail())
	// TODO: Add some log
	var user User

	if err := utils.Copy(&user, &input); err != nil {
		return nil, err
	}

	// Check if User exists
	userCheck, _ := r.repository.GetUserByEmail(&user)
	if userCheck != nil {
		return nil, status.Error(codes.FailedPrecondition, "email already exists")
	}

	// Hash submitted password
	passwordHash, err := encrypt.GenHash(input.GetPassword(), 14)
	if err != nil {
		return nil, err
	}
	user.Password = passwordHash

	// Request repository to Create User
	userResponse, err := r.repository.CreateUser(&user)
	if err != nil {
		return nil, err
	}

	return userResponse, nil
}

func (r *userService) UpdateUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error) {
	// TODO: Add some log
	var findUser User

	if input.GetId() == "" {
		return nil, status.Error(codes.FailedPrecondition, "need to be included field ID")
	}
	userID, _ := uuid.Parse(input.GetId())
	findUser.ID = userID

	// Check if User exists
	user, err := r.repository.GetUserById(&findUser)
	if err != nil {
		return nil, err
	}

	// Copy data from request and past into a User variable
	if err = utils.CopyIgnoreEmpty(&user, &input); err != nil {
		return nil, err
	}

	// Hash submitted password
	if input.GetPassword() != "" {
		passwordHash, err := encrypt.GenHash(input.GetPassword(), 14)
		if err != nil {
			return nil, err
		}
		user.Password = passwordHash
	}

	// Request repository to Update User
	user, err = r.repository.UpdateUser(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userService) DeleteUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error) {
	// TODO: Add some log

	var findUser User

	if input.GetId() == "" {
		return nil, status.Error(codes.FailedPrecondition, "Missing field ID")
	}
	userID, _ := uuid.Parse(input.GetId())
	findUser.ID = userID

	// Check if User exists
	userResponse, err := r.repository.GetUserById(&findUser)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	// Request repository to Delete User
	user, err := r.repository.DeleteUser(userResponse)
	if err != nil {
		return nil, err
	}

	return user, nil
}
