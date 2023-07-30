package services

import (
	"github.com/pskclub/T6601/backend/emsgs"
	"github.com/pskclub/T6601/backend/models"
	"github.com/pskclub/T6601/backend/requests"
	"github.com/pskclub/T6601/backend/views"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/errmsgs"
	"github.com/pskclub/mine-core/repository"
	"github.com/pskclub/mine-core/utils"
)

type IAuthService interface {
	Login(payload *requests.AuthLogin) (*views.UserWithToken, core.IError)
	Register(payload *requests.AuthRegister) (*models.User, core.IError)
	Logout(token string) core.IError
	FindByUsername(username string) (*models.User, core.IError)
	FindByAccessToken(token string) (*models.User, core.IError)
}
type authService struct {
	ctx core.IContext
}

func (s authService) FindByAccessToken(token string) (*models.User, core.IError) {
	tokenRes, ierr := repository.New[models.UserAccessToken](s.ctx).Preload("User").FindOne("token = ?", token)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return tokenRes.User, nil
}

func (s authService) FindByUsername(username string) (*models.User, core.IError) {
	return repository.New[models.User](s.ctx).FindOne("username = ?", username)
}

func (s authService) Login(payload *requests.AuthLogin) (*views.UserWithToken, core.IError) {
	user, ierr := s.FindByUsername(utils.GetString(payload.Username))
	if errmsgs.IsNotFoundError(ierr) {
		return nil, s.ctx.NewError(ierr, emsgs.AuthEmailOrPasswordInvalid)
	}
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	if len(utils.GetString(payload.Password)) == 0 || !utils.ComparePassword(user.Password, utils.GetString(payload.Password)) {
		return nil, s.ctx.NewError(emsgs.AuthEmailOrPasswordInvalid, emsgs.AuthEmailOrPasswordInvalid)
	}

	userToken := models.NewUserAccessToken(user.ID)
	ierr = repository.New[models.UserAccessToken](s.ctx).Create(userToken)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	ierr = repository.New[models.User](s.ctx).
		Where("id = ?", user.ID).
		Updates(user)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return views.NewUserWithToken(user, userToken.Token), nil
}

func (s authService) Register(payload *requests.AuthRegister) (*models.User, core.IError) {
	user := &models.User{
		BaseModel: models.NewBaseModel(),
		Username:  utils.GetString(payload.Username),
	}

	hashedPassword, err := utils.HashPassword(utils.GetString(payload.Password))
	if err != nil {
		return nil, s.ctx.NewError(err, errmsgs.InternalServerError)
	}

	user.Password = utils.GetString(hashedPassword)

	ierr := repository.New[models.User](s.ctx).Create(user)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	user, ierr = s.FindByUsername(utils.GetString(payload.Username))
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return user, nil
}

func (s authService) Logout(token string) core.IError {
	tokens, ierr := repository.New[models.UserAccessToken](s.ctx).FindOne("token = ?", token)
	if errmsgs.IsNotFoundError(ierr) {
		return s.ctx.NewError(ierr, emsgs.AuthTokenInvalid)
	}
	if ierr != nil {
		return s.ctx.NewError(ierr, ierr)
	}

	ierr = repository.New[models.UserAccessToken](s.ctx).Delete(tokens)
	if ierr != nil {
		return s.ctx.NewError(ierr, ierr)
	}

	return nil
}

func NewAuthService(ctx core.IContext) IAuthService {
	return &authService{ctx: ctx}
}
