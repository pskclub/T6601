package models

type Post struct {
	BaseModel
	UserID      string `json:"user_id" gorm:"column:user_id"`
	Name        string `json:"name" gorm:"column:name"`
	Description string `json:"description" gorm:"column:description"`
	VoteCount   int64  `json:"vote_count" gorm:"column:vote_count;->"`
	IsClosed    bool   `json:"is_closed" gorm:"column:is_closed"`
	IsVoted     bool   `json:"is_voted" gorm:"column:is_voted;->"`

	User *User `json:"user" gorm:"foreignKey:UserID"`
}

func (Post) TableName() string {
	return "posts"
}
