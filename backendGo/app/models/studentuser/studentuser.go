package studentuser

import "gorm.io/gorm"

type StudentUser struct {
	gorm.Model
	ID       int64
	Password string
	Salt     []byte
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
