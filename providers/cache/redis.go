package cache

import (
	"github.com/redis/go-redis/v9"
)

func ConnectCache() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr: "redis:6379",
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
