package opportunitytostudent

/*


CREATE TABLE `volunteeropportunity_to_student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `opportunity_id_id` int NOT NULL,
  `student_id_id` int NOT NULL,
  `deleted_at` time DEFAULT NULL,
  `created_at` time DEFAULT NULL,
  `updated_at` time DEFAULT NULL,
  PRIMARY KEY (`id`,`opportunity_id_id`,`student_id_id`),
  UNIQUE KEY `unique_connection` (`opportunity_id_id`,`student_id_id`),
  KEY `student_id_id` (`student_id_id`),
  CONSTRAINT `volunteeropportunity_to_student_ibfk_1` FOREIGN KEY (`opportunity_id_id`) REFERENCES `volunteeropportunity` (`id`) ON DELETE CASCADE,
  CONSTRAINT `volunteeropportunity_to_student_ibfk_2` FOREIGN KEY (`student_id_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

*/
