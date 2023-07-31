package services

import (
	"github.com/pskclub/T6601/backend/emsgs"
	"github.com/pskclub/T6601/backend/helpers"
	"github.com/pskclub/T6601/backend/models"
	"github.com/pskclub/T6601/backend/repos"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"testing"
)

type PostServiceSuite struct {
	suite.Suite
	ctx core.IE2EContext
}

func TestUserServiceSuite(t *testing.T) {
	suite.Run(t, new(PostServiceSuite))
}

func (suite *PostServiceSuite) SetupTest() {
	env := core.NewENVPath(helpers.RootDir())

	ctx := core.NewE2EContext(&core.E2EContextOptions{
		ContextOptions: &core.ContextOptions{
			ENV: env,
		},
	})

	ctx.SetUser(&core.ContextUser{
		ID:       "fbe619be-1caa-4e71-a5e6-c56a7a8f80e3",
		Username: "pskclub",
		Name:     "pskclub",
	})

	suite.ctx = ctx

}

func (suite *PostServiceSuite) TestVoteIsClosed() {
	baseModel := models.NewBaseModel()
	id := baseModel.ID

	post := &models.Post{
		BaseModel:   baseModel,
		UserID:      "fbe619be-1caa-4e71-a5e6-c56a7a8f80e3",
		Name:        "Test",
		Description: "Test",
		IsClosed:    true,
	}

	postMock := repository.NewMock[models.Post]()

	postMock.On("Preload", mock.Anything).Return(postMock)
	postMock.On("Where", mock.Anything, mock.Anything).Return(postMock)
	postMock.On("FindOne").Return(post, nil)

	repos.Post = func(c core.IContext, options ...repos.PostOption) repository.IRepository[models.Post] {
		return postMock
	}

	svc := NewPostService(suite.ctx)

	postRes, ierr := svc.Vote(id)

	// Assert the result
	assert.Error(suite.T(), ierr)
	assert.Equal(suite.T(), ierr, emsgs.PostIsClosed)
	assert.Nil(suite.T(), postRes)
}
