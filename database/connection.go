package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func GetConnection() (*gorm.DB, error) {
	// dsn := fmt.Sprintf(
	// 	"host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
	// 	host, port, username, db, password,
	// )
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		"db", "5432", "postgres", "postgres", "postgres",
	)

	dbConn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "vn_",
			SingularTable: false,
		},
	})
	if err != nil {
		fmt.Print("GetConnection - err", err)
		return nil, err
	}
	fmt.Print("GetConnection - dbConn", dbConn)

	return dbConn, nil
}
