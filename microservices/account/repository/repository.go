package repository

import (
	"context"

	"com.project001/main/internal/gql/model"
)

type Repository interface {
	Close()
	Register(ctx context.Context, input model.Register) (string, error)
}
