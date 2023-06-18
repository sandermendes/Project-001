package account

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/encrypt"
	contextkeys "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	accountv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	serviceConnection "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/service_connection"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

		user userv1.CreateUserRequest
	)

	if err = utils.Copy(&user, &input); err != nil {
		return nil, err
	}

	// Call userService function CreateUser
	userCreated, err := s.userConn.CreateUser(ctx, &user)
	if err != nil {
		return nil, status.Error(codes.Internal, utils.FmtLogError(err))
	}

	if userCreated.Email == "" {
		// TODO:
	}

	return &accountv1.AccountResponse{
		Token:    "register-0123456-0123456-01234560123",
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error) {
	// TODO: Improve logging
	var findUser userv1.UpdateUserRequest
	findUser.Email = input.GetEmail()

	userResponse, err := s.userConn.GetUser(ctx, &findUser)
	if err != nil {
		// TODO: Improve error
		fmt.Println("Error - err: ", err)
		return nil, status.Error(codes.FailedPrecondition, "email or password is invalid")
	}

	// Check if password is valid
	if !encrypt.Compare(input.GetPassword(), userResponse.GetPassword()) {
		// TODO: Improve error
		return nil, status.Error(codes.FailedPrecondition, "email or password is invalid")
	}

	token, err := utils.CreateToken(1*time.Hour, userResponse.GetId())
	if err != nil {
		// TODO: Improve error
		return nil, status.Error(codes.Internal, "internal error generating token")
	}

	return &accountv1.AccountResponse{
		Token:    token,
		Redirect: "/test/redirect",
	}, nil
}

func (s *service) Me(ctx context.Context, input *emptypb.Empty) (*userv1.UserResponse, error) {
	// Extract UserID from context
	userID := contextkeys.GetUserIDFromContext(ctx)
	if userID == "" {
		// TODO: Improve error
		fmt.Println("Error")
		return nil, status.Error(codes.Unauthenticated, "user not authenticated")
	}

	userResponse, err := s.userConn.GetUser(ctx, &userv1.UpdateUserRequest{Id: userID})
	if err != nil {
		// TODO: Improve error
		return nil, status.Error(codes.NotFound, "information about current user not found")
	}

	return &userv1.UserResponse{
		Id:        userResponse.GetId(),
		FirstName: userResponse.GetFirstName(),
		LastName:  userResponse.GetLastName(),
		Email:     userResponse.GetEmail(),
	}, nil
}
