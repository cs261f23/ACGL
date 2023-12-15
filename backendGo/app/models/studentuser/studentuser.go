package studentuser

import (
	"context"
	"log"
	"xavier_portal/models/student"

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
	db gorm.DB
}

var StudentUserStore studentUserStore

func (sus *studentUserStore) NewStudentUserStore() {
	sus.Open(context.TODO())
}

func (sus *studentUserStore) Open(ctx context.Context) {

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:geoffrey@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	// ss.db.AutoMigrate(&Student{})
	if err != nil {
		log.Fatal(err)
	}
	sus.db = *db
}

func (ss *studentUserStore) Get(ctx context.Context, optionalFilters map[string]string) *student.Student {
	var student student.Student
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
	return &student
}

func (ss *studentUserStore) Create(ctx context.Context, student *student.Student) {
	ss.db.Create(student)
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
