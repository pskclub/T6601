package requests

import (
	"github.com/pskclub/T6601/backend/models"
	core "github.com/pskclub/mine-core"
)

type AuthRegister struct {
	core.BaseValidator
	Username *string `json:"username"`
	Password *string `json:"password"`
}

func (r AuthRegister) Valid(ctx core.IContext) core.IError {
	if r.Must(r.IsStrRequired(r.Username, "username")) {
		r.Must(r.IsStrUnique(ctx, r.Username, models.User{}.TableName(), "username", "", "username"))
	}

	r.Must(r.IsStrRequired(r.Password, "password"))
	r.Must(r.IsStrMin(r.Password, 8, "password"))
	return r.Error()
}
