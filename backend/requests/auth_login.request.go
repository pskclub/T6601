package requests

import core "github.com/pskclub/mine-core"

type AuthLogin struct {
	core.BaseValidator
	Username *string `json:"username"`
	Password *string `json:"password"`
}

func (r AuthLogin) Valid(ctx core.IContext) core.IError {
	r.Must(r.IsStrRequired(r.Username, "username"))
	r.Must(r.IsStrRequired(r.Password, "password"))

	return r.Error()
}
