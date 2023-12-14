package routeHandlers

import (
	"context"
	"net/http"
	"xavier_portal/models/student"

	"github.com/gin-gonic/gin"
)

func GetStudent(c *gin.Context) {
	x := student.StudentStore.Get(context.TODO(), map[string]string{
		"name": "example",
	})
	c.JSON(http.StatusOK,
		&x,
	)
}

// Create
func CreateStudent(c *gin.Context) {

	ctx := context.TODO()
	student.StudentStore.Create(ctx)
	c.String(http.StatusOK,
		"yeahbitch",
	)
}
