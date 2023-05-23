package user

import (
	"context"
	"log"

	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/providers/encrypt"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database"
	"github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database/models"
	accountv1 "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/protobufs/_generated/account/v1"
)

type Service interface {
	// GetUsers() error

	CreateUser(ctx context.Context, input *accountv1.RegisterRequest) (*User, error)
	// UpdateUser() error
	// DeleteUser() error
}

type userService struct {
	repository Repository
}

func NewService() Service {
	db, err := database.NewConnection()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Execute migrations
	db.AutoMigrate(&User{})

	return &userService{
		repository: &repository{
			db: db,
		},
	}
}

func (r *userService) CreateUser(ctx context.Context, input *accountv1.RegisterRequest) (*User, error) {
	// TODO: Add some log

	// Hash submitted password
	passwordHash, err := encrypt.GenHash(input.Password, 14)
	if err != nil {
		return nil, err
	}
	input.Password = passwordHash

	user, err := r.repository.CreateUser(input)
	if err != nil {
		return nil, err
	}

	// TODO: Implement copy function
	return &User{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,

		Base: models.Base{
			ModelWithUUID: models.ModelWithUUID{
				ID: user.ID,
			},
			ModelWithTimestamps: models.ModelWithTimestamps{
				CreatedAt: user.CreatedAt,
				UpdatedAt: user.UpdatedAt,
				DeletedAt: user.DeletedAt,
			},
		},
	}, nil
}
