package utils

import (
	"fmt"
	"strings"

	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/interceptors"
)

const DESC_EXTRACT = "desc = "

func FmtLogError(err error) string {
	// Extract connection message error from Error()
	message := strings.Split(err.Error(), DESC_EXTRACT)[1]

	fmt.Printf("Service connection error: "+interceptors.Red+"%s\n"+interceptors.Reset, err)

	return message

	// if strings.Contains(err.Error(), "connection refused") {
	// 	// Return maintenance message to front
	// 	// return "Maintenance in progress, please try again later"
	// 	return message
	// }
	// if strings.Contains(err.Error(), "email or password") {
	// 	// Return maintenance message to front
	// 	// return "Email or password is invalid"
	// 	return message
	// }
	// return err.Error()
}
