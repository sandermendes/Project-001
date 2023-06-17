package cache

import (
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

func ConnectCache() *redis.Client {
	port, ok := os.LookupEnv("CACHE_PORT")
	if !ok {
		panic(fmt.Sprintf("No cache port specified for %s", port))
	}

	client := redis.NewClient(&redis.Options{
		Addr: "redis:"+port,
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
