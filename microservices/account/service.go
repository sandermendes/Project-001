package account

import (
	"context"
	"fmt"
	"log"

	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	serviceConnection "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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
	fmt.Println("NewService - err\n", err)
	if err != nil {
		log.Fatalf("failed to connect to userService: %v", err)
	}

	return &service{
		userConn: userConn,
	}
}

func (s *service) Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error) {
	user, err := s.userConn.CreateUser(ctx, input)
	if err != nil {
		fmt.Println("Account - Register - err: ", err)
		return nil, status.Error(codes.Internal, err.Error()) /* fmt.Errorf("error CreateUser connect: %s", err.Error()) */
	}

	fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error) {
	fmt.Println("Account - Service - Login - input", input)
	// user, err := s.userConn.CreateUser(ctx, input)
	// if err != nil {
	// 	return nil, err
	// }

	// fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}
