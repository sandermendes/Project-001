package middlewareGraphql

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/cache"
	contextkeys "github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/context_keys"
	"github.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/utils/validation"
)

var (
	cacheService = cache.ConnectCache()
)

func Cache(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
	handler := next(ctx)

	return func(ctx context.Context) *graphql.Response {
		gContext := graphql.GetOperationContext(ctx)
		operationName := gContext.OperationName

		// Exclude from Cache check
		if validation.Contains(operationName, "Login", "Register", "Logout", "IsAuthed") {
			return handler(ctx)
		}

		userID := contextkeys.GetUserIDFromContext(ctx)
		if userID == "" {
			// TODO: Improve error
			fmt.Println("User not authenticated")
			return graphql.ErrorResponse(ctx, "user not authenticated")
		}

		// TODO: Improve cache operation list
		// if gContext.OperationName == "Me" {

		// If cache exists return from it
		cacheResult, _ := cacheService.Get(ctx, "UserId:"+userID).Result()
		if cacheResult != "" {
			newCacheResponse := []byte(
				fmt.Sprintf(`{"%s":%s}`,
					strings.ToLower(operationName),
					string(cacheResult),
				),
			)

			fmt.Println("Interceptor from cache", cacheResult)

			// Return from cache
			return &graphql.Response{
				Data: []byte(newCacheResponse),
			}
		}

		// Keep going with the flow to obtain the service response
		responseHandler := handler(ctx)
		fmt.Println("string(responseHandler.Data)", string(responseHandler.Data))
		// Handle Service Data
		serviceData, err := handleServiceData(ctx, operationName, responseHandler)
		if err != nil {
			return graphql.ErrorResponse(ctx, err.Error())
		}
		fmt.Println("Cache - serviceData", string(serviceData))

		// Save in cache service
		err = cacheService.Set(ctx, "UserId:"+userID, serviceData, 0).Err()
		if err != nil {
			return graphql.ErrorResponse(ctx, "failed to save data to cache: %s", err.Error())
		}

		fmt.Println("Interceptor from service", string(serviceData))

		// Return response from service
		return &graphql.Response{
			Data: []byte(
				fmt.Sprintf(
					`{"%s":%s}`,
					strings.ToLower(operationName),
					string(serviceData),
				),
			),
		}
	}
}

func handleServiceData(ctx context.Context, operationName string, serviceData *graphql.Response) ([]byte, error) {
	if serviceData == nil {
		return nil, fmt.Errorf("failed to return data from service")
	}
	if serviceData.Errors != nil {
		return nil, fmt.Errorf(serviceData.Errors[0].Message)
	}

	// Convert to interface{} to extract only the part with Fields from OperationName
	var handlerResponse interface{}
	err := json.Unmarshal([]byte(string(serviceData.Data)), &handlerResponse)
	if err != nil {
		return nil, fmt.Errorf("failed to convert response")
	}
	mResponse := handlerResponse.(map[string]interface{})
	fieldsResponse := mResponse[strings.ToLower(operationName)]

	// Convert service response to json, for save in cache storage
	convertedResponse, err := json.Marshal(fieldsResponse)
	if err != nil {
		fmt.Println(fmt.Printf("failed to convert data fetched from service: %s", err.Error()))
		return nil, fmt.Errorf("failed conversion on cache: %s", err.Error())
	}

	return convertedResponse, nil
}
