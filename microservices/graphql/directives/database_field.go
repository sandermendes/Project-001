package directives

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
)

func DatabaseField(ctx context.Context, obj interface{}, next graphql.Resolver, fieldName *string) (res interface{}, err error) {
	return next(ctx)
}
