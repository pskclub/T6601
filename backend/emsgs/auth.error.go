package emsgs

import (
	core "github.com/pskclub/mine-core"
	"net/http"
)

var AuthEmailOrPasswordInvalid = core.Error{
	Status:  http.StatusBadRequest,
	Code:    "INVALID_CREDENTIALS",
	Message: "email or password is an invalid",
}

var AuthTokenRequired = core.Error{
	Status:  http.StatusBadRequest,
	Code:    "TOKEN_REQUIRED",
	Message: "Authorization header field is required"}

var AuthTokenInvalid = core.Error{
	Status:  http.StatusUnauthorized,
	Code:    "INVALID_TOKEN",
	Message: "Token is invalid"}
