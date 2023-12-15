package studentRoutes

import (
	"context"
	"net/http"
	"xavier_portal/models/student"
	"xavier_portal/models/studentuser"

	"github.com/gin-gonic/gin"
)

func GetStudent(c *gin.Context) {
	x := studentuser.StudentUserStore.Get(context.TODO(), map[string]string{
		"name": "example",
	})
	c.JSON(http.StatusOK,
		&x,
	)
}

// Create
func CreateStudent(c *gin.Context) {

	ctx := context.TODO()
	var stu student.Student
	var ma map[string]any
	c.JSON(0, &ma)

	studentuser.StudentUserStore.Create(ctx, &stu)
	c.String(http.StatusOK,
		"yeahbitch",
	)
}
