package user

import (
	"context"
	"log"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/encrypt"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Service interface {
	// GetUsers() error

	GetUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error)
	CreateUser(ctx context.Context, input *userv1.CreateUserRequest) (*User, error)
	UpdateUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error)
	DeleteUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error)
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

	return &userService{
		repository: &repository{
			db: db,
		},
	}
}

func (r *userService) GetUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error) {
	var (
		// err      error
		findUser User
	)
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

	return user, nil
}

func (r *userService) CreateUser(ctx context.Context, input *userv1.CreateUserRequest) (*User, error) {
	// TODO: Add some log
	var (
		user User

	// err error
	)

	if err := utils.Copy(&user, &input); err != nil {
		return nil, err
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

	// // TODO: Implement copy function
	// return user, nil
	return userResponse, nil
}

func (r *userService) UpdateUser(ctx context.Context, input *userv1.UpdateUserRequest) (*User, error) {
	// TODO: Add some log

	var (
		findUser User

		err error
	)
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

	var (
		findUser User
	// userResponse *User

	// err error
	)
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
