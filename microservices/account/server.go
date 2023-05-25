package account

import (
	"context"
	"fmt"
	"net"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Server struct {
	accountv1.UnimplementedAccountServiceServer
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
