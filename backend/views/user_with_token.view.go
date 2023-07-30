package views

import "github.com/pskclub/T6601/backend/models"

type UserWithToken struct {
	*models.User
	AccessToken string `json:"access_token"`
}

func NewUserWithToken(user *models.User, token string) *UserWithToken {
	return &UserWithToken{
		User:        user,
		AccessToken: token,
	}
}
