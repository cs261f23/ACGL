package studentRoutes

import (
	"context"
	"net/http"
	"xavier_portal/models"
	StudentModels "xavier_portal/server/routeHandlers/requestModels/student"

	"github.com/gin-gonic/gin"
)

func GetStudent(c *gin.Context) {
	x, _ := c.Params.Get("id")
	t := models.StudentUserStore.Get(context.TODO(), map[string]string{
		"student_id": x,
	})
	c.JSON(0, t)
}

// Create
// path('attempt_student_register',
//      views.attempt_student_register, name='attempt_student_register'),

func AttemptStudentRegister(c *gin.Context) {

	// ctx := context.TODO()

	bod := new(StudentModels.AttemptStudentRegisterRequest)

	c.Bind(bod)

	models.StudentUserStore.Register(context.TODO(), bod)
	c.String(http.StatusOK,
		"yeah bitch",
	)
}

func AttemptStudentSignUp(c *gin.Context) {
	body := new(StudentModels.AttemptStudentSignUpRequest)
	c.Bind(body)
	models.StudentUserStore.SignUp(context.TODO(), body)
	c.JSON(0, body)

}

func AttemptStudentUnSignUp(c *gin.Context) {

}
func GetAvailableOpportunities(c *gin.Context) {

}
func GetOpportunitiesByStudent(c *gin.Context) {

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
