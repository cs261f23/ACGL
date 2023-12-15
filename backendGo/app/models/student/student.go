package student

import (
	"gorm.io/gorm"
)

// student

type Student struct {
	gorm.Model
	ID           int64
	Name         string
	StudentEmail string
	studentID    int64
}

/*  	db, err := gorm.Open(mysql.Open("test.db"), &gorm.Config{})
if err != nil {
	panic("failed to connect database")
}

// Migrate the schema
db.AutoMigrate(&Product{})

// Create
db.Create(&Product{Code: "D42", Price: 100})

// Read
var product Product
db.First(&product, 1)                 // find product with integer primary key
db.First(&product, "code = ?", "D42") // find product with code D42

// Update - update product's price to 200
db.Model(&product).Update("Price", 200)
// Update - update multiple fields
db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // non-zero fields
db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

// Delete - delete product
db.Delete(&product, 1) */
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
