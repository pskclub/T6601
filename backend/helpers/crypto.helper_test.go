package helpers

import (
	"fmt"
	"github.com/pskclub/mine-core/utils"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestGenPassword(t *testing.T) {
	password, err := utils.HashPassword("12345678")
	fmt.Println(utils.GetString(password))
	assert.NoError(t, err)
}
