package cache

import (
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

func ConnectCache() *redis.Client {
	cacheAddress, ok := os.LookupEnv("CACHE_ADDRESS")
	if !ok {
		panic(fmt.Sprintf("No cache address specified for %s", cacheAddress))
	}

	client := redis.NewClient(&redis.Options{
		Addr: cacheAddress,
		DB:   0,
	})

	return client

	// ctx := context.Background()

	// client.Set(ctx, "foo", "bar", 0).Err()

	// val, err := client.Get(ctx, "foo").Result()
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println("foo", val)
}
