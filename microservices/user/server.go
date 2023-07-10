package user

import (
	"context"
	"fmt"
	"net"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/cache"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
	userv1 "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/status"
)

var (
	cacheService = cache.ConnectCache()
)

type Server struct {
	userv1.UnimplementedUserServiceServer
	service Service
}

func NewGrpcServer() *Server {
	service := NewService()

	return &Server{
		service: service,
	}
}

func ListenGRPC(port string) error {
	ln, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		return err
	}

	var opts []grpc.ServerOption
	opts = append(opts, grpc.UnaryInterceptor(interceptors.Logger))

	serv := grpc.NewServer(opts...)
	grpcServer := NewGrpcServer()
	userv1.RegisterUserServiceServer(serv, grpcServer)
	reflection.Register(serv)
	return serv.Serve(ln)
}

func (s *Server) GetUser(ctx context.Context, input *userv1.UpdateUserRequest) (*userv1.UserResponse, error) {
	user, err := s.service.GetUser(ctx, input)
	if err != nil {
		return nil, err
	}

	var userResponse userv1.UserResponse
	if err = utils.Copy(&userResponse, &user); err != nil {
		return nil, status.Error(codes.Internal, "fail to return user data")
	}
	userResponse.Id = user.ID.String()
	// TODO: Check for improve this conversion
	// userResponse.BirthDate = (*string)(unsafe.Pointer(&user.BirthDate))
	// userResponse.Gender = (*string)(unsafe.Pointer(&user.Gender))

	return &userResponse, nil
}

func (s *Server) CreateUser(ctx context.Context, input *userv1.CreateUserRequest) (*userv1.UserResponse, error) {
	user, err := s.service.CreateUser(ctx, input)
	if err != nil {
		return nil, err
	}

	var userResponse userv1.UserResponse
	if err = utils.Copy(&userResponse, &user); err != nil {
		return nil, status.Error(codes.Internal, "fail to return user data")
	}
	userResponse.Id = user.ID.String()

	return &userResponse, nil
}

func (s *Server) UpdateUser(ctx context.Context, input *userv1.UpdateUserRequest) (*userv1.UserResponse, error) {
	user, err := s.service.UpdateUser(ctx, input)
	if err != nil {
		return nil, err
	}

	var userResponse userv1.UserResponse
	if err = utils.Copy(&userResponse, &user); err != nil {
		return nil, status.Error(codes.Internal, "fail to return user data")
	}
	userResponse.Id = user.ID.String()
	// TODO: Need to implement clearing of user cache
	// userResponse.BirthDate = (*string)(unsafe.Pointer(&user.BirthDate))
	// userResponse.Gender = (*string)(unsafe.Pointer(&user.Gender))
	// cacheService.Del(ctx, "UserId:"+userResponse.Id)

	return &userResponse, nil
}

func (s *Server) DeleteUser(ctx context.Context, input *userv1.UpdateUserRequest) (*userv1.UserResponse, error) {
	user, err := s.service.DeleteUser(ctx, input)
	if err != nil {
		return nil, err
	}

	return &userv1.UserResponse{
		Id: user.ID.String(),
	}, nil
}
