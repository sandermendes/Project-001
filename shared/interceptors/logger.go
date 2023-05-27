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

// Colors
const (
	Reset       = "\033[0m"
	Red         = "\033[31m"
	Green       = "\033[32m"
	Yellow      = "\033[33m"
	Blue        = "\033[34m"
	Magenta     = "\033[35m"
	Cyan        = "\033[36m"
	White       = "\033[37m"
	BlueBold    = "\033[34;1m"
	MagentaBold = "\033[35;1m"
	RedBold     = "\033[31;1m"
	YellowBold  = "\033[33;1m"
)

func Logger(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	var ipAddr string
	if p, of := peer.FromContext(ctx); of {
		// fmt.Printf("interceptorLogger - ctx - p.Addr.(*net.TCPAddr).IP.String() %s\n", p.Addr.(*net.TCPAddr).IP.String())
		// fmt.Printf("interceptorLogger - ctx - p.Addr.(*net.TCPAddr).Network() %s\n", p.Addr.(*net.TCPAddr).Network())
		ipAddr = p.Addr.(*net.TCPAddr).IP.String()
	}
	fullMethod := strings.Split(info.FullMethod, "/")
	fmt.Printf(Green+"[%s] "+Reset+"- %s - Method - %s - %s\n", time.Now().Format(time.DateTime), ipAddr, fullMethod[1], fullMethod[2])
	// fmt.Println("handler", handler)

	resp, err := handler(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, err
}
