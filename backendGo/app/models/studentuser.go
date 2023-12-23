package models

import (
	"context"
	"fmt"
	"log"
	"time"
	StudentModels "xavier_portal/server/routeHandlers/requestModels/student"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type StudentUser struct {
	gorm.Model
	StudentID uint
	Password  string
	Salt      []byte
}

//this is where actual relevant operations are defined for a student user

type studentUserStore struct {
	db    gorm.DB
	users map[string]StudentUser
}

var StudentUserStore studentUserStore

func (sus *studentUserStore) NewStudentUserStore() {
	sus.Open(context.TODO())
	sus.users = make(map[string]StudentUser)

	c := new(communityPartner)
	s := new(student)
	su := new(StudentUser)
	v := new(volunteerOpportunity)

	sus.db.AutoMigrate(c)
	sus.db.AutoMigrate(s)
	sus.db.AutoMigrate(su)
	sus.db.AutoMigrate(v)

}

func (sus *studentUserStore) Open(ctx context.Context) {

	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}
	sus.db = *db
}

func (ss *studentUserStore) Get(ctx context.Context, optionalFilters map[string]string) *student {
	var student student = student{}
	r := time.Time{}
	fmt.Println(r)
	s1 := ""
	s2 := ""
	for key, value := range optionalFilters {
		if s1 == "" {
			s1 = key + " = ?"
			s2 = value
		} else {
			s1 += "," + key + " = ?"
			s2 += "," + value
		}
	}
	x := ss.db.Find(&student, optionalFilters["student_id"])
	ss.db.Find(&student)
	fmt.Println(x)
	// ss.db.Find(&student)
	return &student
}

func (ss *studentUserStore) Register(ctx context.Context, body *StudentModels.AttemptStudentRegisterRequest) {

	stu := student{}
	stu.StudentEmail = body.StudentEmail
	stu.Name = body.Name
	stu.ID = body.StudentID
	stu.StudentID = body.StudentID

	user := StudentUser{}
	user.Password = body.Password
	user.StudentID = stu.StudentID

	// stu.StudentUser = user

	err := ss.db.Create(&stu)
	err2 := ss.db.Create(&user)
	fmt.Println(err, err2)
}

func (sus *studentUserStore) SignUp(ctx context.Context, body *StudentModels.AttemptStudentSignUpRequest) {
	// o2s.VolunteerOpportunityID = body.OpportunityID
	// o2s.StudentID = body.StudentID
}

/*
create table `studentuser` (
	`id` int NOT NULL AUTO_INCREMENT,
	`password` varchar(50),
	`salt` blob,
	PRIMARY KEY (`id`),
	foreign key (`id`) references `student`(`id`) on delete no action
	)
*/
