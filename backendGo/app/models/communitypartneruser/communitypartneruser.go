package communitypartneruser

import (
	"context"
	"fmt"
	"log"
	"xavier_portal/models/communitypartner"
	"xavier_portal/models/opportunitytostudent"
	"xavier_portal/models/student"
	"xavier_portal/models/volunteeropportunity"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type CommunityPartnerUser struct {
	gorm.Model
	ID       int64
	Password string
	Salt     []byte
}

type communityPartnerUserStore struct {
	db    gorm.DB
	users map[string]CommunityPartnerUser
}

var CommunityPartnerUserStore communityPartnerUserStore

func (cpus *communityPartnerUserStore) NewCommunityPartnerUserStore() {
	cpus.Open(context.TODO())
	cpus.users = make(map[string]CommunityPartnerUser)
	// ALTER TABLE `credit_cards` ADD CONSTRAINT `fk_users_community_partners` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
	c := new(communitypartner.CommunityPartner)
	s := new(student.Student)
	v := new(volunteeropportunity.VolunteerOpportunity)
	stv := new(opportunitytostudent.VolunteerOpportunityToStudent)
	cpu := new(CommunityPartnerUser)
	cpus.db.AutoMigrate(cpu)
	cpus.db.AutoMigrate(c)
	cpus.db.AutoMigrate(s)
	cpus.db.AutoMigrate(v)
	cpus.db.AutoMigrate(stv)
	cpus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "community_partner_users")
	cpus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "fk_users_community_partner_users")
	cpus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "volunteer_opportunities")
	cpus.db.Migrator().CreateConstraint(&communitypartner.CommunityPartner{}, "fk_volunteer_opportunities_community_partners")
	cpus.db.Migrator().CreateConstraint(&volunteeropportunity.VolunteerOpportunity{}, "volunteer_opportunity_to_student")
	cpus.db.Migrator().CreateConstraint(&volunteeropportunity.VolunteerOpportunity{}, "fk_volunteer_opportunities")
	cpus.db.Migrator().CreateConstraint(&student.Student{}, "volunteer_opportunity_to_students")
	cpus.db.Migrator().CreateConstraint(&student.Student{}, "fk_students")
}

func (cpus *communityPartnerUserStore) Open(ctx context.Context) {

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavierportal"), &gorm.Config{})

	// ss.db.AutoMigrate(&communityPartner{})
	if err != nil {
		log.Fatal(err)
	}
	cpus.db = *db
}

func (ss *communityPartnerUserStore) Register(ctx context.Context, stu *communitypartner.CommunityPartner, password string) {

	user := CommunityPartnerUser{}
	user.ID = stu.ID
	user.Password = password
	fmt.Println(user, stu)

	ss.db.Create(stu)
	ss.db.Create(&user)
}

/*
create table `communitypartneruser` (
	`id` int NOT NULL AUTO_INCREMENT,
	`password` varchar(50),
	`salt` blob,
	PRIMARY KEY (`id`),
	foreign key (`id`) references `communitypartner`(`partner_id`) on delete no action
	)
*/
