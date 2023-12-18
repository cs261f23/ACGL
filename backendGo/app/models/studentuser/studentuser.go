package studentuser

import (
	"context"
	"log"
	"xavier_portal/models/communitypartner"
	"xavier_portal/models/opportunitytostudent"
	"xavier_portal/models/student"
	"xavier_portal/models/volunteeropportunity"

	_ "time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type StudentUser struct {
	gorm.Model
	ID       int64
	Password string
	Salt     []byte
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

	c := new(communitypartner.CommunityPartner)
	s := new(student.Student)
	su := new(StudentUser)
	v := new(volunteeropportunity.VolunteerOpportunity)
	stv := new(opportunitytostudent.VolunteerOpportunityToStudent)

	sus.db.AutoMigrate(c)
	sus.db.AutoMigrate(s)
	sus.db.AutoMigrate(su)
	sus.db.AutoMigrate(v)
	sus.db.AutoMigrate(c)
	sus.db.AutoMigrate(s)
	sus.db.AutoMigrate(v)
	sus.db.AutoMigrate(stv)
	sus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "volunteer_opportunities")
	sus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "fk_volunteer_opportunities_community_partners")
	sus.db.Migrator().CreateConstraint(&volunteeropportunity.VolunteerOpportunity{}, "volunteer_opportunity_to_students")
	sus.db.Migrator().CreateConstraint(&volunteeropportunity.VolunteerOpportunity{}, "fk_volunteer_opportunities")
	sus.db.Migrator().CreateConstraint(&student.Student{}, "volunteer_opportunity_to_students")
	sus.db.Migrator().CreateConstraint(&student.Student{}, "fk_students")
	sus.db.Migrator().CreateConstraint(&student.Student{}, "student_users")
	sus.db.Migrator().CreateConstraint(&student.Student{}, "fk_students")
}

func (sus *studentUserStore) Open(ctx context.Context) {

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavierportal"), &gorm.Config{})

	// ss.db.AutoMigrate(&Student{})
	if err != nil {
		log.Fatal(err)
	}
	sus.db = *db
}

func (ss *studentUserStore) Get(ctx context.Context, optionalFilters map[string]string) *[]student.Student {
	var student []student.Student
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

func (ss *studentUserStore) Register(ctx context.Context, stu *student.Student, password string) {

	user := StudentUser{}
	user.ID = stu.StudentId
	user.Password = password

	ss.db.Create(stu)
	ss.db.Create(&user)
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
