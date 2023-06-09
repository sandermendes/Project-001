package interceptors

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/cache"
	contextkeys "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	userv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/user/v1"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils/validation"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	cacheService = cache.ConnectCache()
)

const METHOD_NAME = 2

// Just simple logger for RPC requests
func Cache(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	userID := contextkeys.GetUserIDFromContext(ctx)

	fullMethod := strings.Split(info.FullMethod, "/")

	// Check for black listed cache
	if validation.Contains(fullMethod[METHOD_NAME], "Register", "Login") {
		resp, err := handler(ctx, req)
		if err != nil {
			return nil, err
		}
		fmt.Println("Cache - resp", resp)

		return resp, nil
	}

	// time.Sleep(5 * time.Second)
	// fmt.Println("req", req)

	if fullMethod[METHOD_NAME] == "Me" {

		if userID == "" {
			// TODO: Improve error
			fmt.Println("Error - User not authenticated")
			return nil, status.Error(codes.Unauthenticated, "user not authenticated")
		}

		// If cache exists return from it
		val, _ := cacheService.Get(ctx, "UserId:"+userID).Result()
		if val != "" {
			var userResponse *userv1.UserResponse

			fmt.Println("Interceptor - Account - Me - cache")
			err := json.Unmarshal([]byte(val), &userResponse)
			if err != nil {
				fmt.Println("Convert cache error")
			}
			// Return from cache
			return userResponse, nil
		}

		// Keep going with the flow to obtain the service response
		responseServiceUser, err := handler(ctx, req)
		if err != nil {
			return nil, err
		}

		// Convert service response to json, for save in cache storage
		convertedResponse, err := json.Marshal(responseServiceUser)
		if err != nil {
			return nil, err
		}

		// Save in cache service
		err = cacheService.Set(ctx, "UserId:"+userID, convertedResponse, 0).Err()
		if err != nil {
			return nil, err
		}
		fmt.Println("Account - Me - database")

		return responseServiceUser, nil
	}

	return nil, nil
}
