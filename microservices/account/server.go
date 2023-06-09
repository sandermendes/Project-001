package account

import (
	"context"
	"fmt"
	"net"

	middlewareAccount "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/microservices/account/middleware"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/cache"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"github.com/redis/go-redis/v9"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"google.golang.org/protobuf/types/known/emptypb"
)

// A wrapper for the real grpc.ServerStream
func LoggingStreamInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

	resp, err := handler(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, err
}

type Server struct {
	accountv1.UnimplementedAccountServiceServer
	service Service
	cache   *redis.Client
}

func NewGrpcServer() *Server {
	service := NewService()
	cache := cache.ConnectCache()

	return &Server{
		service: service,
		cache:   cache,
	}
}

func ListenGRPC(port string) error {
	ln, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		return err
	}

	// Set interceptors
	opts := []grpc.ServerOption{
		grpc.ChainUnaryInterceptor(
			interceptors.Logger,
			middlewareAccount.ParseTokenAndGetUserFromContext,
			interceptors.Cache,
		),
		// grpc.ChainStreamInterceptor(
		// 	LoggingStreamInterceptor,
		// ),
	}

	serv := grpc.NewServer(opts...)
	grpcServer := NewGrpcServer()
	accountv1.RegisterAccountServiceServer(serv, grpcServer)
	reflection.Register(serv)
	return serv.Serve(ln)
}

func (s *Server) Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error) {
	// Call Register from service
	register, err := s.service.Register(ctx, input)
	if err != nil {
		return nil, err
	}

	return register, nil
}

func (s *Server) Login(ctx context.Context, input *accountv1.LoginRequest) (*accountv1.AccountResponse, error) {
	//
	register, err := s.service.Login(ctx, input)
	if err != nil {
		return nil, err
	}

	return register, nil
}

func (s *Server) Me(ctx context.Context, input *emptypb.Empty) (*userv1.UserResponse, error) {
	//
	currentUser, err := s.service.Me(ctx, input)
	if err != nil {
		return nil, err
	}

	return currentUser, nil
}
