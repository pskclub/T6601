package auth

import (
	"github.com/labstack/echo/v4"
	"github.com/pskclub/T6601/backend/middlewares"
	core "github.com/pskclub/mine-core"
)

func NewAuthHTTP(e *echo.Echo) {
	c := &AuthConltroller{}

	e.POST("/auth/login", core.WithHTTPContext(c.Login))
	e.POST("/auth/register", core.WithHTTPContext(c.Register))
	e.POST("/auth/logout", core.WithHTTPContext(c.Logout), middlewares.IsUser)
}
