package server

import (
	"xavier_portal/models"
	"xavier_portal/server/routeHandlers/communitypartnerRoutes"
	"xavier_portal/server/routeHandlers/studentRoutes"

	"github.com/gin-gonic/gin"
)

func Server() {
	r := gin.Default()
	// r.StaticFS("/fs", gin.Dir("static", true))
	models.StudentUserStore.NewStudentUserStore()
	models.CommunityPartnerUserStore.NewCommunityPartnerUserStore()
	r.GET("student/get_student/:id", studentRoutes.GetStudent)
	r.POST("student/attempt_student_register", studentRoutes.AttemptStudentRegister)
	r.POST("partner/attempt_partner_register", communitypartnerRoutes.AttemptCommunityPartnerRegister)
	err := r.Run("localhost:8000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	if err != nil {
		println(err)
	}
}
