package server

import (
	"fmt"
	"net/http"
	"xavier_portal/server/routeHandlers"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func Server() {
	http.HandleFunc("/get_students", routeHandlers.GetStudents)
	println("listening")
	http.ListenAndServe("localhost:8080", nil)
}
