package studentRoutes

import (
	"context"
	"fmt"
	"net/http"
	"xavier_portal/models/student"
	"xavier_portal/models/studentuser"

	"github.com/gin-gonic/gin"
)

func GetStudent(c *gin.Context) {
	x, y := c.Params.Get("id")
	fmt.Println(x, y)
	t := studentuser.StudentUserStore.Get(context.TODO(), map[string]string{
		"student_id": x,
	})
	fmt.Println(x, y, t)
	c.JSON(0, t)
}

// Create
// path('attempt_student_register',
//      views.attempt_student_register, name='attempt_student_register'),

func AttemptStudentRegister(c *gin.Context) {

	// ctx := context.TODO()

	type body struct {
		StudentID    int64
		StudentEmail string
		Name         string
		Password     string
	}
	bod := new(body)

	c.Bind(bod)
	stu := student.Student{}
	stu.StudentEmail = bod.StudentEmail
	stu.Name = bod.Name
	stu.StudentId = bod.StudentID

	studentuser.StudentUserStore.Register(context.TODO(), &stu, bod.Password)
	c.String(http.StatusOK,
		"yeahbitch",
	)
}

// func getOpportunitiesByPartnerID(c *gin.Context) {

// 	ctx := context.TODO()
// 	var opp volunteeropportunity.VolunteerOpportunity = 1
// }

// path('attempt_student_register',
//      views.attempt_student_register, name='attempt_student_register'),
// path('attempt_student_signup', views.student_signup,
//      name='attempt_student_signup'),
// path('attempt_student_unsignup', views.student_unsignup,
//      name='attempt_student_unsignup'),
// path('get_available_opportunities_for_student', views.get_available_opportunities_for_student,
//      name='available_opportunities'),
// path('get_opportunities_by_student_id', views.get_opportunities_by_student_id,
//      name='get_opportunities_by_student_id'),
