package utils

import (
	"github.com/jinzhu/copier"
)

func Copy(to interface{}, from interface{}) error {
	err := copier.Copy(to, from)
	return err
}

func CopyIgnoreEmpty(to interface{}, from interface{}) error {
	err := copier.CopyWithOption(to, from, copier.Option{IgnoreEmpty: true})
	return err
}
