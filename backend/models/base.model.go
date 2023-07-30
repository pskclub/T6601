package models

import (
	"github.com/pskclub/mine-core/utils"
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	ID        string         `json:"id" gorm:"column:id;primary_key"`
	CreatedAt *time.Time     `json:"created_at" gorm:"column:created_at"`
	UpdatedAt *time.Time     `json:"updated_at" gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"column:deleted_at"`
}

func NewBaseModel() BaseModel {
	return BaseModel{
		ID:        utils.GetUUID(),
		CreatedAt: utils.GetCurrentDateTime(),
		UpdatedAt: utils.GetCurrentDateTime(),
	}
}

type BaseModelHardDelete struct {
	ID        string     `json:"id" gorm:"column:id;primary_key"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func NewBaseModelHardDelete() BaseModelHardDelete {
	return BaseModelHardDelete{
		ID:        utils.GetUUID(),
		CreatedAt: utils.GetCurrentDateTime(),
		UpdatedAt: utils.GetCurrentDateTime(),
	}
}
