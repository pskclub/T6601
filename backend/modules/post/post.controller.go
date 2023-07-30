package post

import (
	"github.com/pskclub/T6601/backend/requests"
	"github.com/pskclub/T6601/backend/services"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/utils"
	"net/http"
)

type PostController struct {
}

func (m PostController) Pagination(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	res, ierr := svc.Pagination(c.GetPageOptions())
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m PostController) Find(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	res, ierr := svc.Find(c.Param("id"))
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m PostController) Create(c core.IHTTPContext) error {
	input := &requests.PostCreate{}
	if err := c.BindWithValidate(input); err != nil {
		return c.JSON(err.GetStatus(), err.JSON())
	}

	svc := services.NewPostService(c)
	res, ierr := svc.Create(input)
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusCreated, res)
}

func (m PostController) Update(c core.IHTTPContext) error {
	input := &requests.PostUpdate{}
	if err := c.BindWithValidate(input); err != nil {
		return c.JSON(err.GetStatus(), err.JSON())
	}

	svc := services.NewPostService(c)
	res, ierr := svc.Update(c.Param("id"), input)
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m PostController) Delete(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	ierr := svc.Delete(c.Param("id"))
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.NoContent(http.StatusNoContent)
}

func (m PostController) Vote(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	post, ierr := svc.Vote(c.Param("id"))
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, post)
}

func (m PostController) VotePagination(c core.IHTTPContext) error {
	svc := services.NewPostService(c)
	res, ierr := svc.VotePagination(c.Param("id"), c.GetPageOptions())
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, res)
}

func (m PostController) Toggle(c core.IHTTPContext) error {
	input := &requests.PostToggle{}
	if err := c.BindWithValidate(input); err != nil {
		return c.JSON(err.GetStatus(), err.JSON())
	}

	svc := services.NewPostService(c)
	post, ierr := svc.CloseToggle(c.Param("id"), utils.GetBool(input.IsClosed))
	if ierr != nil {
		return c.JSON(ierr.GetStatus(), ierr.JSON())
	}

	return c.JSON(http.StatusOK, post)
}
