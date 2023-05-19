package models

import (
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
	CreatedAt uint64 `gorm:"autoCreateTime;not null"`
	UpdatedAt uint64 `gorm:"autoUpdateTime;not null"`
	DeletedAt uint64 `gorm:"index"`
}
