package encrypt

import (
	"golang.org/x/crypto/bcrypt"
)

func GenHash(data string, cost int) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(data), cost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func Compare(data, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(data))

	return err == nil
}
