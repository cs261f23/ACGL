package models

import (
	"context"
	"log"

	CommunityPartnerModels "xavier_portal/server/routeHandlers/requestModels/communitypartner"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type CommunityPartnerUser struct {
	gorm.Model
	CommunityPartner CommunityPartner
	Password         string
	Salt             []byte
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
	c := new(CommunityPartner)
	s := new(Student)
	v := new(VolunteerOpportunity)
	cpu := new(CommunityPartnerUser)
	cpus.db.AutoMigrate(cpu)
	cpus.db.AutoMigrate(c)
	cpus.db.AutoMigrate(s)
	cpus.db.AutoMigrate(v)

}

func (cpus *communityPartnerUserStore) Open(ctx context.Context) {

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	// ss.db.AutoMigrate(&communityPartner{})
	if err != nil {
		log.Fatal(err)
	}
	cpus.db = *db
}

func (ss *communityPartnerUserStore) Register(ctx context.Context, body *CommunityPartnerModels.AttemptCommunityPartnerRegisterRequest) {

	comp := CommunityPartner{}
	comp.PartnerEmail = body.PartnerEmail
	comp.PartnerTitle = body.PartnerTitle
	comp.CommunityPartnerUserID = body.PartnerID

	user := CommunityPartnerUser{}
	ss.db.Create(&comp)
	user.CommunityPartner = comp
	user.Password = body.Password

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
