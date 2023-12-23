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
	ID                 uint
	CommunityPartnerID uint
	Password           string
	Salt               []byte
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
	c := new(communityPartner)
	s := new(student)
	v := new(volunteerOpportunity)
	cpu := new(CommunityPartnerUser)
	cpus.db.AutoMigrate(c)
	cpus.db.AutoMigrate(cpu)
	cpus.db.AutoMigrate(s)
	cpus.db.AutoMigrate(v)

}

func (cpus *communityPartnerUserStore) Open(ctx context.Context) {

	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}
	cpus.db = *db
}

func (ss *communityPartnerUserStore) Register(ctx context.Context, body *CommunityPartnerModels.AttemptCommunityPartnerRegisterRequest) {

	comp := communityPartner{}
	comp.PartnerEmail = body.PartnerEmail
	comp.PartnerTitle = body.PartnerTitle
	comp.CommunityPartnerID = body.PartnerID

	user := CommunityPartnerUser{}
	// comp.CommunityPartnerUser = user
	user.CommunityPartnerID = comp.CommunityPartnerID
	user.Password = body.Password
	ss.db.Create(&comp)

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