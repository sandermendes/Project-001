package account

import (
	"context"
	"fmt"
	"log"

	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	serviceConnection "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
)

type Service interface {
	Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error)

	Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error)
}

type service struct {
	userConn userv1.UserServiceClient
}

func NewService() Service {
	userConn, err := serviceConnection.GetUserConnection()
	if err != nil {
		log.Fatalf("failed to connect to userService: %v", err)
	}

	return &service{
		userConn: userConn,
	}
}

func (s *service) Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error) {
	// Call userService function CreateUser
	user, err := s.userConn.CreateUser(ctx, input)
	if err != nil {
		return nil, utils.FmtLogError(err)
	}

	if user.Email == "" {
		// TODO:
	}
	// fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error) {
	fmt.Println("Account - Service - Login - input", input)
	// user, err := s.userConn.Login(ctx, input)
	// if err != nil {
	// 	return nil, err
	// }

	// fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}
