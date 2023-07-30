package middlewares

import (
	"github.com/pskclub/T6601/backend/consts"
	"github.com/pskclub/T6601/backend/emsgs"
	"github.com/pskclub/T6601/backend/services"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/errmsgs"
	"strings"

	"github.com/labstack/echo/v4"
)

func IsUser(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cc := c.(core.IHTTPContext)

		authorization := strings.TrimSpace(cc.Request().Header.Get("Authorization"))
		if authorization == "" {
			return c.JSON(emsgs.AuthTokenRequired.GetStatus(), emsgs.AuthTokenRequired.JSON())
		}

		userSvc := services.NewAuthService(cc)
		user, ierr := userSvc.FindByAccessToken(authorization)
		if errmsgs.IsNotFoundError(ierr) {
			return c.JSON(emsgs.AuthTokenInvalid.GetStatus(), emsgs.AuthTokenInvalid.JSON())
		}
		if ierr != nil {
			return c.JSON(ierr.GetStatus(), ierr.JSON())
		}

		c.Set(consts.ContextKeyUser, user)
		c.Set(consts.ContextKeyUserToken, authorization)

		cc.SetUser(&core.ContextUser{
			ID:       user.ID,
			Username: user.Username,
			Name:     user.Username,
		})

		return next(c)
	}
}
