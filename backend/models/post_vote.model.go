package models

type PostVote struct {
	BaseModelHardDelete
	UserID string `json:"user_id" gorm:"column:user_id"`
	PostID string `json:"post_id" gorm:"column:post_id"`

	User *User `json:"user" gorm:"foreignkey:UserID"`
}

func (PostVote) TableName() string {
	return "post_votes"
}
