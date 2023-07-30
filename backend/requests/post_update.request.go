package requests

import core "github.com/pskclub/mine-core"

type PostUpdate struct {
	core.BaseValidator
	Name        *string `json:"name"`
	Description *string `json:"description"`
}

func (r PostUpdate) Valid(ctx core.IContext) core.IError {
	r.Must(r.IsStrRequired(r.Name, "name"))
	return r.Error()
}
