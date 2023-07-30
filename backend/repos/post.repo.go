package repos

import (
	"github.com/pskclub/T6601/backend/models"
	core "github.com/pskclub/mine-core"
	"github.com/pskclub/mine-core/repository"
)

type PostOption func(repository.IRepository[models.Post], core.IContext)

var Post = func(c core.IContext, options ...PostOption) repository.IRepository[models.Post] {
	// Create a new repository instance
	r := repository.New[models.Post](c)

	// Apply optional customizations
	for _, opt := range options {
		opt(r, c)
	}

	return r
}

func PostWithVote() PostOption {
	return func(r repository.IRepository[models.Post], c core.IContext) {
		r.Select("posts.*, count(post_votes.id) as vote_count,CASE  WHEN post_votes2.id IS NULL THEN false ELSE true END AS is_voted").
			Joins("left join post_votes post_votes on post_votes.post_id = posts.id").
			Joins("left join post_votes post_votes2 on post_votes2.post_id = posts.id AND post_votes2.user_id = ?", c.GetUser().ID).
			Group("posts.id").
			Group("post_votes2.id")
	}
}

func PostWithSort(options *core.PageOptions) PostOption {
	return func(r repository.IRepository[models.Post], c core.IContext) {
		if len(options.OrderBy) == 0 {
			options.OrderBy = []string{"posts.created_at DESC"}
		}
	}
}
func PostWithSearch(options *core.PageOptions) PostOption {
	return func(r repository.IRepository[models.Post], c core.IContext) {
		if len(options.Q) > 0 {
			r.Where("posts.name LIKE ?", "%"+options.Q+"%")
		}
	}
}
