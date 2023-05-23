package utils

import (
	"fmt"
	"strings"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func FmtLogError(err error) error {
	if strings.Contains(err.Error(), "connection refused") {
		message := strings.Split(err.Error(), "desc = ")[2]
		fmt.Printf("Service connection error: %s", message)
		return status.Error(codes.Unavailable, "Maintenance in progress, please try again later")
	}
	return err
}
