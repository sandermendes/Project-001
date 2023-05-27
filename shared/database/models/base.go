package models

import (
	gorm_plugin "github.com/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/shared/database/gorm/plugin"
	uuid "github.com/google/uuid"
)

type Base struct {
	ModelWithUUID
	ModelWithTimestamps
}

type ModelWithUUID struct {
	ID uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
}

type ModelWithTimestamps struct {
	CreatedAt uint64                `gorm:"autoCreateTime;not null"`
	UpdatedAt uint64                `gorm:"autoUpdateTime;not null"`
	DeletedAt gorm_plugin.DeletedAt `gorm:"index"`
}
