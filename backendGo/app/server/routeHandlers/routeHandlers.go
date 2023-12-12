package routeHandlers

import (
	"context"
	"fmt"
	"net/http"
	"xavier_portal/models"
)

func GetStudents(w http.ResponseWriter, r *http.Request) {
	x, _ := models.StudentStore.Get(context.TODO())

	personString := fmt.Sprintf("%+v", *x)
	fmt.Println(personString)

	fmt.Fprintf(w, "%s", personString)
}
