package database

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var databaseSSLMode = ""

func NewConnection() (*gorm.DB, error) {
	// dsn := fmt.Sprintf(
	// 	"host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
	// 	host, port, username, db, password,
	// )
	databaseHost, ok := os.LookupEnv("DATABASE_HOSTNAME")
	if !ok {
		panic(fmt.Sprintf("No database host specified for %s", databaseHost))
	}

	databaseName, ok := os.LookupEnv("DATABASE_NAME")
	if !ok {
		panic(fmt.Sprintf("No database name specified for %s", databaseName))
	}

	sslMode, _ := os.LookupEnv("DATABASE_SSL_MODE")
	if sslMode != "" {
		databaseSSLMode = "sslmode=" + sslMode
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s dbname=%s user=%s password=%s %s",
		databaseHost, "5432", databaseName, "postgres", "postgres", databaseSSLMode,
	)

	dbConn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			// TablePrefix:   "vn_",
			SingularTable: false,
		},
	})
	if err != nil {
		return nil, err
	}

	return dbConn, nil
}
