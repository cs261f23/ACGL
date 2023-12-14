package server

import (
	"xavier_portal/server/routeHandlers"

	"github.com/gin-gonic/gin"
)

// func Server() {
// 	http.HandleFunc("/get_students", routeHandlers.GetStudents)
// 	println("listening")
// 	http.ListenAndServe("localhost:8080", nil)
// }

func Server() {
	r := gin.Default()
	r.GET("/get_students", routeHandlers.GetStudent)
	r.POST("/create_student", routeHandlers.CreateStudent)

	r.Run("localhost:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
