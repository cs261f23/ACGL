package models

import (
	"gorm.io/gorm"
)

type VolunteerOpportunity struct {
	gorm.Model
	// ID                 uint
	Description        string
	Keywords           string
	CommunityPartnerID uint
	Date               []byte

	Students []*Student `gorm:"many2many:student_volunteeropportunities;"`
}

/**
CREATE TABLE `volunteeropportunity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `community_partner_id_id` int NOT NULL,
  `date` date DEFAULT NULL,
  `deleted_at` time DEFAULT NULL,
  `created_at` time DEFAULT NULL,
  `updated_at` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `VolunteerOpportunity_community_partner_id_id_ddfe2376` (`community_partner_id_id`),
  CONSTRAINT `volunteeropportunity_ibfk_1` FOREIGN KEY (`community_partner_id_id`) REFERENCES `communitypartner` (`partner_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/
