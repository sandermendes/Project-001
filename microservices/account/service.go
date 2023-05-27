package account

import (
	"context"
	"fmt"
	"log"

	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	serviceConnection "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"google.golang.org/protobuf/types/known/emptypb"
)

type Service interface {
	Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error)
	Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error)
	Me(ctx context.Context, input *emptypb.Empty) (*userv1.UserResponse, error)
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
	var (
		err error

		user *userv1.CreateUserRequest
	)
	if err = utils.Copy(&user, &input); err != nil {
		return nil, err
	}

	// Call userService function CreateUser
	userCreated, err := s.userConn.CreateUser(ctx, user)
	if err != nil {
		return nil, utils.FmtLogError(err)
	}

	if userCreated.Email == "" {
		// TODO:
	}
	// fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "register-0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error) {
	fmt.Println("Account - Service - Login")
	// user, err := s.userConn.Login(ctx, input)
	// if err != nil {
	// 	return nil, err
	// }

	// fmt.Println("Service - Register - user", user)

	return &accountv1.AccountResponse{
		Token:    "login-0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Me(ctx context.Context, input *emptypb.Empty) (*userv1.UserResponse, error) {
	fmt.Println("Account - Service - Me")

	return &userv1.UserResponse{
		FirstName: "Me User test",
	}, nil
}
