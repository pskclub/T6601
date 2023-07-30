package auth

import (
	"github.com/pskclub/T6601/backend/consts"
	"github.com/pskclub/T6601/backend/requests"
	"github.com/pskclub/T6601/backend/services"
	core "github.com/pskclub/mine-core"
	"net/http"
)

type AuthConltroller struct {
}

func (m AuthConltroller) Login(c core.IHTTPContext) error {
	input := &requests.AuthLogin{}
	if err := c.BindWithValidate(input); err != nil {
		return c.JSON(err.GetStatus(), err.JSON())
	}

	svc := services.NewAuthService(c)
	res, ierr := svc.Login(input)
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m AuthConltroller) Register(c core.IHTTPContext) error {
	input := &requests.AuthRegister{}
	if err := c.BindWithValidate(input); err != nil {
		return c.JSON(err.GetStatus(), err.JSON())
	}

	svc := services.NewAuthService(c)
	res, ierr := svc.Register(input)
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m AuthConltroller) Logout(c core.IHTTPContext) error {
	svc := services.NewAuthService(c)
	ierr := svc.Logout(c.Get(consts.ContextKeyUserToken).(string))
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.NoContent(http.StatusNoContent)
}
