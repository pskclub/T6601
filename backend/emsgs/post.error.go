package emsgs

import (
	"fmt"
	core "github.com/pskclub/mine-core"
	"net/http"
)

var PostVoteExists = func(voteCount int64) core.IError {
	return core.Error{
		Status:  http.StatusBadRequest,
		Code:    "VOTE_EXISTS",
		Message: fmt.Sprintf("Cannot edit/remove vote. It already has %d votes.", voteCount),
	}
}

var PostVoteAlreadyExists = core.Error{
	Status:  http.StatusBadRequest,
	Code:    "VOTE_ALREADY_EXISTS",
	Message: "Cannot vote. You already voted.",
}

var PostIsClosed = core.Error{
	Status:  http.StatusBadRequest,
	Code:    "POST_IS_CLOSED",
	Message: "Cannot vote. Post is closed.",
}
