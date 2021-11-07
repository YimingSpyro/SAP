-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: tas
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exam_verifier_sys`
--

DROP TABLE IF EXISTS `exam_verifier_sys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_verifier_sys` (
  `fk_mod_code` varchar(6) NOT NULL,
  `exam_type` varchar(255) NOT NULL,
  `offered_to` varchar(64) NOT NULL,
  `fk_examiner_id` varchar(6) NOT NULL,
  `fk_moderator_id` varchar(6) NOT NULL,
  `external_mod` varchar(64) DEFAULT NULL,
  `fk_marker_id` varchar(6) NOT NULL,
  `fk_verifier_id` varchar(6) NOT NULL,
  `verifier_details` text NOT NULL,
  `marks_moderator` varchar(6) NOT NULL,
  `fk_semseter_code` varchar(64) NOT NULL,
  PRIMARY KEY (`fk_mod_code`,`fk_semseter_code`),
  KEY `fk_examiner_id_idx` (`fk_examiner_id`),
  KEY `fk_moderator_id_idx` (`fk_moderator_id`),
  KEY `fk_marker_id_idx` (`fk_marker_id`),
  KEY `fk_verfier_id_idx` (`fk_verifier_id`),
  KEY `fk_semester_code_idx` (`fk_semseter_code`),
  CONSTRAINT `fk_examiner_id` FOREIGN KEY (`fk_examiner_id`) REFERENCES `staff_information` (`staff_id`),
  CONSTRAINT `fk_marker_id` FOREIGN KEY (`fk_marker_id`) REFERENCES `staff_information` (`staff_id`),
  CONSTRAINT `fk_mod_code` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`),
  CONSTRAINT `fk_moderator_id` FOREIGN KEY (`fk_moderator_id`) REFERENCES `staff_information` (`staff_id`),
  CONSTRAINT `fk_semester_code` FOREIGN KEY (`fk_semseter_code`) REFERENCES `module` (`semester_code`),
  CONSTRAINT `fk_verifier_id` FOREIGN KEY (`fk_verifier_id`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_verifier_sys`
--

LOCK TABLES `exam_verifier_sys` WRITE;
/*!40000 ALTER TABLE `exam_verifier_sys` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam_verifier_sys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mod_assign`
--

DROP TABLE IF EXISTS `mod_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mod_assign` (
  `fk_staff_id` varchar(6) NOT NULL,
  `ma_lecture` decimal(2,1) NOT NULL,
  `ma_tutorial` decimal(2,1) NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`fk_semester_code`,`fk_staff_id`),
  UNIQUE KEY `fk_semester_code_UNIQUE` (`fk_semester_code`),
  KEY `fk_staff_id_idx` (`fk_staff_id`),
  CONSTRAINT `fk_mod_assign_semseter_id` FOREIGN KEY (`fk_semester_code`) REFERENCES `module` (`semester_code`),
  CONSTRAINT `fk_mod_assign_staff_id` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mod_assign`
--

LOCK TABLES `mod_assign` WRITE;
/*!40000 ALTER TABLE `mod_assign` DISABLE KEYS */;
/*!40000 ALTER TABLE `mod_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mod_workload`
--

DROP TABLE IF EXISTS `mod_workload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mod_workload` (
  `fk_mod_code` varchar(6) NOT NULL,
  `component_code` varchar(8) NOT NULL,
  `group_size` int(10) unsigned zerofill NOT NULL,
  `start_weeks` int(11) NOT NULL,
  `end_weeks` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`fk_mod_code`,`fk_semester_code`),
  KEY `fk_mw_semester_code_idx` (`fk_semester_code`),
  CONSTRAINT `fk_mw_mod_code` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`),
  CONSTRAINT `fk_mw_semester_code` FOREIGN KEY (`fk_semester_code`) REFERENCES `module` (`semester_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mod_workload`
--

LOCK TABLES `mod_workload` WRITE;
/*!40000 ALTER TABLE `mod_workload` DISABLE KEYS */;
/*!40000 ALTER TABLE `mod_workload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `mod_code` varchar(6) NOT NULL,
  `mod_name` varchar(255) NOT NULL,
  `mod_abbrv` varchar(64) NOT NULL,
  `mass_lect` enum('Yes','No') NOT NULL,
  `fk_mod_coord` varchar(6) NOT NULL,
  `mod_dlt` decimal(2,1) NOT NULL,
  `mod_hours` decimal(2,1) NOT NULL,
  `mod_lecture` decimal(2,1) NOT NULL,
  `mod_tutorial` decimal(2,1) NOT NULL,
  `mod_practical` decimal(2,1) NOT NULL,
  `fk_cluster_ldr` varchar(6) NOT NULL,
  `semester_code` varchar(64) NOT NULL,
  `odd_lechr` decimal(2,1) NOT NULL,
  `even_lechr` decimal(2,1) NOT NULL,
  `odd_prachr` decimal(2,1) NOT NULL,
  `even_prachr` decimal(2,1) NOT NULL,
  `odd_tuthr` decimal(2,1) NOT NULL,
  `even_tuthr` decimal(2,1) NOT NULL,
  PRIMARY KEY (`mod_code`,`semester_code`),
  UNIQUE KEY `semester_code_UNIQUE` (`semester_code`),
  KEY `fk_mod_coord_idx` (`fk_mod_coord`),
  KEY `fk_cluster_ldr_idx` (`fk_cluster_ldr`),
  KEY `semseter_code` (`semester_code`),
  CONSTRAINT `fk_cluster_ldr` FOREIGN KEY (`fk_cluster_ldr`) REFERENCES `staff_information` (`staff_id`),
  CONSTRAINT `fk_mod_coord` FOREIGN KEY (`fk_mod_coord`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('EP0107','Conversational Thai','CT','Yes','123456',1.5,1.5,1.5,1.5,1.5,'123456','SEM_CODE',1.5,1.5,1.5,1.5,1.5,1.5);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_preference`
--

DROP TABLE IF EXISTS `module_preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module_preference` (
  `fk_staff_id` varchar(6) NOT NULL,
  `fk_semseter_code` varchar(64) NOT NULL,
  `preference` text NOT NULL,
  PRIMARY KEY (`fk_staff_id`,`fk_semseter_code`),
  KEY `fk_staff_id_idx` (`fk_staff_id`),
  KEY `fk_semseter_code_idx` (`fk_semseter_code`),
  CONSTRAINT `fk__mp_semseter_code` FOREIGN KEY (`fk_semseter_code`) REFERENCES `module` (`semester_code`),
  CONSTRAINT `fk_mp_staff_id` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_preference`
--

LOCK TABLES `module_preference` WRITE;
/*!40000 ALTER TABLE `module_preference` DISABLE KEYS */;
/*!40000 ALTER TABLE `module_preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_teaching_req`
--

DROP TABLE IF EXISTS `personal_teaching_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_teaching_req` (
  `fk_staff_id` varchar(6) NOT NULL,
  `ptr_day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `ptr_time` time NOT NULL,
  `ptr_duration` double NOT NULL,
  `ptr_reason` text NOT NULL,
  `ptr_remarks` text NOT NULL,
  `semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`fk_staff_id`,`semester_code`),
  CONSTRAINT `fk_staff_id` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_teaching_req`
--

LOCK TABLES `personal_teaching_req` WRITE;
/*!40000 ALTER TABLE `personal_teaching_req` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_teaching_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_information`
--

DROP TABLE IF EXISTS `staff_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_information` (
  `staff_id` varchar(6) NOT NULL,
  `staff_name` text NOT NULL,
  `staff_abbrv` text NOT NULL,
  `staff_designation` varchar(64) NOT NULL,
  `staff_section` varchar(64) NOT NULL,
  `staff_email` varchar(64) NOT NULL,
  `staff_number` varchar(10) NOT NULL,
  `staff_mobile` varchar(10) NOT NULL,
  `staff_remarks` text NOT NULL,
  `staff_password` varchar(255) NOT NULL,
  `staff_role` varchar(64) NOT NULL,
  `work_hours` double NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_number_UNIQUE` (`staff_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_information`
--

LOCK TABLES `staff_information` WRITE;
/*!40000 ALTER TABLE `staff_information` DISABLE KEYS */;
INSERT INTO `staff_information` VALUES ('1144','Kirby Hancock','DYJ19DCV1FG','Nam','Dumfriesshire','mi.lacinia.mattis@sapienimperdiet.net','540-6810','253-4413','nulla. Donec','PK4321425283867582277528','Brazil',9),('123456','Super Idol','S-I','Lecturer','test_section','superidol@sp.edu.sg','91234567','61234567','This staff is great','hashedpassword','admin',0),('5924','Cain Christensen','OXO35IUS9EO','id','Berlin','suspendisse@liberomauris.edu','573-2776','448-9963','nisl elementum purus, accumsan interdum libero dui','IT727UJFGI11655377153237952','United States',8),('8007','Hope Schneider','LDG87HQL0YU','semper','Santa Catarina','vehicula.pellentesque@adipiscinglacusut.edu','856-3753','536-7229','orci.','BG16ONSK12965676055518','Sweden',2),('8201','Chloe Lott','VQS95GXS4IO','erat','West-Vlaanderen','ac.feugiat.non@sagittis.net','631-5629','225-6150','gravida sagittis. Duis','LU098769839521313556','Poland',5),('8405','Ralph Mccullough','OOJ33LKM1VO','orci,','Veneto','feugiat@auctorvelit.ca','647-6442','823-7224','non, sollicitudin a, malesuada','PK0711610384845368774483','Costa Rica',6);
/*!40000 ALTER TABLE `staff_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-07 23:02:18
