package communitypartner

import (
	"gorm.io/gorm"
)

/*
CREATE TABLE `communitypartner` (
  `partner_email` varchar(254) NOT NULL,
  `partner_title` varchar(30) NOT NULL,
  `password` varchar(256) NOT NULL,
  `partner_id` int NOT NULL AUTO_INCREMENT,
  `salt` blob,
  `deleted_at` time DEFAULT NULL,
  `created_at` time DEFAULT NULL,
  `updated_at` time DEFAULT NULL,
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `unique_partner_id` (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/

type CommunityPartner struct {
	gorm.Model
	ID           int64
	PartnerTitle string
	PartnerEmail string
}
