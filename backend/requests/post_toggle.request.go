package requests

import core "github.com/pskclub/mine-core"

type PostToggle struct {
	core.BaseValidator
	IsClosed *bool `json:"is_closed"`
}

func (r PostToggle) Valid(ctx core.IContext) core.IError {
	r.Must(r.IsRequired(r.IsClosed, "is_closed"))
	return r.Error()
}
