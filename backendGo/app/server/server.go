package server

import (
	"xavier_portal/models/communitypartneruser"
	"xavier_portal/models/studentuser"
	"xavier_portal/server/routeHandlers/studentRoutes"

	"github.com/gin-gonic/gin"
)

func Server() {
	r := gin.Default()
	studentuser.StudentUserStore.NewStudentUserStore()
	communitypartneruser.CommunityPartnerUserStore.NewCommunityPartnerUserStore()
	r.GET("student/get_students", studentRoutes.GetStudent)
	r.POST("student/create_student", studentRoutes.CreateStudent)

	err := r.Run("localhost:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	if err != nil {
		println(err)
	}
}
