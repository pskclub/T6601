package post

import (
	"github.com/labstack/echo/v4"
	"github.com/pskclub/T6601/backend/middlewares"
	core "github.com/pskclub/mine-core"
)

func NewPostHTTP(e *echo.Echo) {
	c := &PostController{}

	e.GET("/posts", core.WithHTTPContext(c.Pagination), middlewares.IsUser)
	e.GET("/posts/:id", core.WithHTTPContext(c.Find), middlewares.IsUser)
	e.GET("/posts/:id/votes", core.WithHTTPContext(c.VotePagination), middlewares.IsUser)

	e.POST("/posts", core.WithHTTPContext(c.Create), middlewares.IsUser)
	e.PUT("/posts/:id", core.WithHTTPContext(c.Update), middlewares.IsUser)
	e.DELETE("/posts/:id", core.WithHTTPContext(c.Delete), middlewares.IsUser)
	e.POST("/posts/:id/close-toggle", core.WithHTTPContext(c.Toggle), middlewares.IsUser)
	e.POST("/posts/:id/votes", core.WithHTTPContext(c.Vote), middlewares.IsUser)
}
