package cmd

import (
	"fmt"
	"github.com/pskclub/T6601/backend/modules/auth"
	"github.com/pskclub/T6601/backend/modules/me"
	"github.com/pskclub/T6601/backend/modules/post"
	core "github.com/pskclub/mine-core"
	"net/http"
	"os"
)

func APIRun() {
	// Create a new environment configuration
	env := core.NewEnv()

	db, err := core.NewDatabase(env.Config()).Connect()
	if err != nil {
		fmt.Fprintf(os.Stderr, "MySQL: %v", err)
		os.Exit(1)
	}

	// Create a new Echo HTTP server
	e := core.NewHTTPServer(&core.HTTPContextOptions{
		ContextOptions: &core.ContextOptions{
			ENV: env,
			DB:  db,
		},
	})

	// Define a route for the root path ("/")
	e.GET("", core.WithHTTPContext(func(c core.IHTTPContext) error {
		// Return a JSON response with a "message" field
		return c.JSON(http.StatusOK, core.Map{
			"message": "Hello, World!",
		})
	}))

	auth.NewAuthHTTP(e)
	me.NewMeHTTP(e)
	post.NewPostHTTP(e)

	// Start the HTTP server
	core.StartHTTPServer(e, env)
}
