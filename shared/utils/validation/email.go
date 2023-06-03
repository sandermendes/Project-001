package validation

import (
	"regexp"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func IsValidEmail(email string) (bool, error) {
	if email == "" {
		return false, status.Error(codes.FailedPrecondition, "email is empty")
	}

	var emailRegexp = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	if !emailRegexp.MatchString(email) {
		return false, status.Error(codes.FailedPrecondition, "email is invalid")
	}

	return true, nil
}
