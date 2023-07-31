package services

import (
	"github.com/pskclub/T6601/backend/emsgs"
	"github.com/pskclub/T6601/backend/models"
	"github.com/pskclub/T6601/backend/repos"
	"github.com/pskclub/T6601/backend/requests"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/errmsgs"
	"github.com/pskclub/mine-core/repository"
	"github.com/pskclub/mine-core/utils"
)

type IPostService interface {
	Create(payload *requests.PostCreate) (*models.Post, core.IError)
	Update(id string, payload *requests.PostUpdate) (*models.Post, core.IError)
	Delete(id string) core.IError
	CloseToggle(id string, isClosed bool) (*models.Post, core.IError)
	Find(id string) (*models.Post, core.IError)
	FindOwner(id string) (*models.Post, core.IError)
	Pagination(options *core.PageOptions) (*repository.Pagination[models.Post], core.IError)
	PaginationOwner(options *core.PageOptions) (*repository.Pagination[models.Post], core.IError)
	Vote(id string) (*models.Post, core.IError)
	VotePagination(id string, options *core.PageOptions) (*repository.Pagination[models.User], core.IError)
}
type postService struct {
	ctx core.IContext
}

func (s postService) PaginationOwner(options *core.PageOptions) (*repository.Pagination[models.Post], core.IError) {
	return repos.Post(s.ctx, repos.PostWithSearch(options), repos.PostWithVote(), repos.PostWithSort(options)).
		Where("posts.user_id = ?", s.ctx.GetUser().ID).
		Preload("User").
		Pagination(options)
}

func (s postService) VotePagination(id string, options *core.PageOptions) (*repository.Pagination[models.User], core.IError) {
	res, ierr := repository.New[models.PostVote](s.ctx).
		Where("post_id = ?", id).
		Preload("User").
		Pagination(options)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	users := make([]models.User, len(res.Items))
	for i, item := range res.Items {
		users[i] = utils.ToNonPointer(item.User)
	}

	return &repository.Pagination[models.User]{
		Items: users,
		Total: res.Total,
		Limit: res.Limit,
		Count: res.Count,
		Page:  res.Page,
	}, nil
}

func (s postService) FindOwner(id string) (*models.Post, core.IError) {
	return repos.Post(s.ctx, repos.PostWithVote()).
		Where("posts.id = ? AND posts.user_id = ?", id, s.ctx.GetUser().ID).
		FindOne()
}

func (s postService) Create(payload *requests.PostCreate) (*models.Post, core.IError) {
	post := &models.Post{
		BaseModel:   models.NewBaseModel(),
		Name:        utils.GetString(payload.Name),
		Description: utils.GetString(payload.Description),
		UserID:      s.ctx.GetUser().ID,
	}

	ierr := repository.New[models.Post](s.ctx).Create(post)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return s.Find(post.ID)
}

func (s postService) Update(id string, payload *requests.PostUpdate) (*models.Post, core.IError) {
	vote, ierr := s.FindOwner(id)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	if vote.VoteCount > 0 {
		return nil, s.ctx.NewError(emsgs.PostVoteExists(vote.VoteCount), emsgs.PostVoteExists(vote.VoteCount))
	}

	ierr = repository.New[models.Post](s.ctx).Where("id = ?", id).Updates(payload)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return s.Find(id)
}

func (s postService) CloseToggle(id string, isClosed bool) (*models.Post, core.IError) {
	_, ierr := s.FindOwner(id)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	ierr = repository.New[models.Post](s.ctx).Where("id = ?", id).Updates(map[string]interface{}{
		"is_closed": isClosed,
	})
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return s.Find(id)
}

func (s postService) Delete(id string) core.IError {
	vote, ierr := s.FindOwner(id)
	if ierr != nil {
		return s.ctx.NewError(ierr, ierr)
	}

	if vote.VoteCount > 0 {
		return s.ctx.NewError(emsgs.PostVoteExists(vote.VoteCount), emsgs.PostVoteExists(vote.VoteCount))
	}

	return repository.New[models.Post](s.ctx).Delete("id = ?", id)
}

func (s postService) Find(id string) (*models.Post, core.IError) {
	return repos.Post(s.ctx, repos.PostWithVote()).
		Preload("User").
		Where("posts.id = ?", id).
		FindOne()
}

func (s postService) Pagination(options *core.PageOptions) (*repository.Pagination[models.Post], core.IError) {
	return repos.Post(s.ctx, repos.PostWithSearch(options), repos.PostWithVote(), repos.PostWithSort(options)).
		Preload("User").
		Pagination(options)
}

func (s postService) Vote(id string) (*models.Post, core.IError) {
	post, ierr := s.Find(id)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	if post.IsClosed {
		return nil, s.ctx.NewError(emsgs.PostIsClosed, emsgs.PostIsClosed)
	}

	voted, ierr := repos.PostVote(s.ctx).FindOne("post_id = ? AND user_id = ?", id, s.ctx.GetUser().ID)
	if ierr != nil {
		if !errmsgs.IsNotFoundError(ierr) {
			return nil, s.ctx.NewError(ierr, ierr)
		}
	}

	if voted != nil {
		return nil, s.ctx.NewError(emsgs.PostVoteAlreadyExists, emsgs.PostVoteAlreadyExists)
	}

	vote := &models.PostVote{
		BaseModelHardDelete: models.NewBaseModelHardDelete(),
		PostID:              post.ID,
		UserID:              s.ctx.GetUser().ID,
	}

	ierr = repos.PostVote(s.ctx).Create(vote)
	if ierr != nil {
		return nil, s.ctx.NewError(ierr, ierr)
	}

	return s.Find(id)
}

func NewPostService(ctx core.IContext) IPostService {
	return &postService{ctx: ctx}
}
