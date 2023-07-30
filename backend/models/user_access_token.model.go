package models

import (
	"github.com/pskclub/mine-core/utils"
)

type UserAccessToken struct {
	BaseModelHardDelete
	UserID string `json:"user_id" gorm:"column:user_id"`
	Token  string `json:"token" gorm:"column:token"`

	User *User `json:"user" gorm:"foreignKey:UserID"`
}

func (UserAccessToken) TableName() string {
	return "user_access_tokens"
}

func NewUserAccessToken(userID string) *UserAccessToken {
	base := NewBaseModelHardDelete()
	return &UserAccessToken{
		BaseModelHardDelete: base,
		UserID:              userID,
		Token:               utils.NewSha256(base.ID + base.CreatedAt.String()),
	}
}
