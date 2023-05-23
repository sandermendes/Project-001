package account

import (
	"context"
	"fmt"
	"net"
	"strings"
	"time"

	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/peer"
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

func interceptorLogger(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	var ipAddr string
	if p, of := peer.FromContext(ctx); of {
		// fmt.Printf("interceptorLogger - ctx - p.Addr.(*net.TCPAddr).IP.String() %s\n", p.Addr.(*net.TCPAddr).IP.String())
		// fmt.Printf("interceptorLogger - ctx - p.Addr.(*net.TCPAddr).Network() %s\n", p.Addr.(*net.TCPAddr).Network())
		ipAddr = p.Addr.(*net.TCPAddr).IP.String()
	}
	fullMethod := strings.Split(info.FullMethod, "/")
	fmt.Printf("%s - %s - Method - %s - %s\n", time.Now().Format(time.DateTime), ipAddr, fullMethod[1], fullMethod[2])
	// fmt.Println("handler", handler)

	resp, err := handler(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, err
}

func ListenGRPC(port string) error {
	ln, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		return err
	}

	var opts []grpc.ServerOption
	opts = append(opts, grpc.UnaryInterceptor(interceptorLogger))

	serv := grpc.NewServer(opts...)
	grpcServer := NewGrpcServer()
	accountv1.RegisterAccountServiceServer(serv, grpcServer)
	reflection.Register(serv)
	return serv.Serve(ln)
}

func (s *Server) Register(ctx context.Context, input *accountv1.RegisterRequest) (*accountv1.AccountResponse, error) {
	//
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
