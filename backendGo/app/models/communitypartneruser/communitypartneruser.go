package communitypartneruser

import (
	"context"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type CommunityPartnerUser struct {
	gorm.Model
	PartnerID int64
	Password  string
	Salt      []byte
}

type communityPartnerUserStore struct {
	db gorm.DB
}

var CommunityPartnerUserStore communityPartnerUserStore

func (cpus *communityPartnerUserStore) NewCommunityPartnerUserStore() {
	cpus.Open(context.TODO())
}

func (cpus *communityPartnerUserStore) Open(ctx context.Context) {

	// db, err := sql.Open("mysql",
	// "root:root@tcp(localhost:3306)/xavier_portal")
	db, err := gorm.Open(mysql.Open("root:geoffrey@tcp(localhost:3306)/xavier_portal"), &gorm.Config{})

	// ss.db.AutoMigrate(&communityPartner{})
	if err != nil {
		log.Fatal(err)
	}
	cpus.db = *db
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
