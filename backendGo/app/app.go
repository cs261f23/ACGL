package main

import (
	"xavier_portal/models/student"
	"xavier_portal/server"
)

func main() {
	student.StudentStore.NewStudentStore()
	server.Server()

}
