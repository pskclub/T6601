package me

import (
	"github.com/pskclub/T6601/backend/services"
	core "github.com/pskclub/mine-core"
	"net/http"
)

type MeController struct {
}

func (m MeController) Me(c core.IHTTPContext) error {
	return c.JSON(http.StatusOK, c.GetUser())
}

func (m MeController) PaginationOwner(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	res, ierr := svc.PaginationOwner(c.GetPageOptions())
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}
