package communitypartneruser

import "gorm.io/gorm"

type CommunityPartnerUser struct {
	gorm.Model
	PartnerID int64
	Password  string
	Salt      []byte
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
