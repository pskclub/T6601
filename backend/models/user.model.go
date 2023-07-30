package models

type User struct {
	BaseModel
	Username string `json:"username" gorm:"column:username"`
	Password string `json:"-" gorm:"column:password"`
}

func (User) TableName() string {
	return "users"
}
