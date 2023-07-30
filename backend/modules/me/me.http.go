package me

import (
	"github.com/labstack/echo/v4"
	"github.com/pskclub/T6601/backend/middlewares"
	core "github.com/pskclub/mine-core"
)

func NewMeHTTP(e *echo.Echo) {
	c := &MeController{}

	e.GET("/me", core.WithHTTPContext(c.Me), middlewares.IsUser)
	e.GET("/me/posts", core.WithHTTPContext(c.PaginationOwner), middlewares.IsUser)

}
