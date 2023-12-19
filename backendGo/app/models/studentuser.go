package models

import (
	"context"
	"log"
	StudentModels "xavier_portal/server/routeHandlers/requestModels/student"

	_ "time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type StudentUser struct {
	gorm.Model
	ID        uint
	StudentID student
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

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	// ss.db.AutoMigrate(&Student{})
	if err != nil {
		log.Fatal(err)
	}
	sus.db = *db
}

func (ss *studentUserStore) Get(ctx context.Context, optionalFilters map[string]string) *[]student {
	var student []student
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
	ss.db.Find(&student, s1, s2)
	// ss.db.Find(&student)
	return &student
}

func (ss *studentUserStore) Register(ctx context.Context, body *StudentModels.AttemptStudentRegisterRequest) {

	stu := student{}
	stu.StudentEmail = body.StudentEmail
	stu.Name = body.Name
	stu.StudentId = body.StudentID
	user := StudentUser{}
	user.ID = stu.StudentId
	user.Password = body.Password
	user.StudentID = stu
	stu.StudentUserID = user.ID

	ss.db.Create(&user)
	ss.db.Create(&stu)
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
