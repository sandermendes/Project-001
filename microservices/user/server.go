package user

import (
	"context"
	"fmt"
	"net"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
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

func (s *Server) CreateUser(ctx context.Context, input *accountv1.RegisterRequest) (*userv1.UserResponse, error) {
	user, err := s.service.CreateUser(ctx, input)
	if err != nil {
		return nil, err
	}

	return &userv1.UserResponse{
		Id:        user.ID.String(),
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
	}, nil
}

func (s *Server) UpdateUser(ctx context.Context, input *userv1.UpdateUserRequest) (*userv1.UserResponse, error) {
	user, err := s.service.UpdateUser(ctx, input)
	if err != nil {
		return nil, err
	}

	return &userv1.UserResponse{
		Id:        user.ID.String(),
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
	}, nil
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
