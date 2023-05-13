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
			// TablePrefix:   "vn_",
			SingularTable: false,
		},
	})
	if err != nil {
		return nil, err
	}

	// dbConn.AutoMigrate(&model.User{})
	// if result := dbConn.Create(&model.User{
	// 	FirstName: "Teste",
	// 	LastName:  "Teste",
	// 	Email:     "Teste",
	// 	Password:  "Teste",
	// }); result.Error != nil {
	// 	fmt.Println("result.Error", result.Error)
	// }

	return dbConn, nil
}
