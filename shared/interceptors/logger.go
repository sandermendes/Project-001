package interceptors

import (
	"context"
	"fmt"
	"net"
	"strings"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/peer"
)

func Logger(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
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
