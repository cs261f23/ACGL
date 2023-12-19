package models

import (
	"gorm.io/gorm"
)

// student

type Student struct {
	gorm.Model
	ID                     uint
	StudentUserID          uint
	Name                   string
	StudentEmail           string
	StudentId              uint
	VolunteerOpportunities []VolunteerOpportunity `gorm:"many2many:student_volunteeropportunities;"`
}

/*
CREATE TABLE `students` (

	`id` int DEFAULT NULL,
	`name` varchar(50) NOT NULL,
	`student_email` varchar(254) NOT NULL,
	`student_id` int NOT NULL AUTO_INCREMENT,
	`password` varchar(256) DEFAULT NULL,
	`salt` blob,
	`deleted_at` time DEFAULT NULL,
	`created_at` time DEFAULT NULL,
	`updated_at` time DEFAULT NULL,
	PRIMARY KEY (`student_id`),
	UNIQUE KEY `unique_student_id` (`student_id`),
	KEY `id` (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/
