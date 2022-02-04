CREATE DATABASE  IF NOT EXISTS `tas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tas`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: sap-united-db.chaoomqaxpcs.ap-southeast-1.rds.amazonaws.com    Database: tas
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `announcement_type` enum('Important','General','Maintenance') NOT NULL,
  `fk_announcement_roles` varchar(255) NOT NULL,
  `announcement_start` date NOT NULL,
  `announcement_end` date NOT NULL,
  `announcement_message` mediumtext NOT NULL,
  `announcement_subject` varchar(255) NOT NULL,
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (4,'General','[2,3,4]','2022-01-26','2022-01-30','No more B Movie Test','Test Test'),(16,'General','[2,4]','2022-02-10','2022-02-13','Test','test upcoming');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `status` enum('inactive','active') NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_name` (`course_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('DAAA','Diploma In Applied AI and Analytics','active'),('DCITP','Common ICT Programme','active'),('DISM','Diploma in Security Management','active'),('DIT','Diploma In Information Technology','active'),('DMIT','Diploma In Media Information Technology','inactive'),('DSIT','Diploma in Super Idol Training','active'),('SOC','Administrator Only Course','inactive');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `prefix` varchar(6) DEFAULT 'DESIG',
  `designation_id` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(255) NOT NULL,
  `fk_course_id` varchar(255) DEFAULT NULL,
  `section_name` varchar(255) NOT NULL,
  PRIMARY KEY (`designation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES ('DESIG',1,'Admin','SOC','DMIT-Directors Office'),('DESIG',2,'Part-Time Lecturer','DMIT','DMIT-Part Time Lecturer Section'),('DESIG',3,'Lecturer','DMIT','DMIT-Full Time Lecturer Section'),('DESIG',4,'Staff','DMIT','DMIT'),('DESIG',5,'Staff','DIT','DIT'),('DESIG',6,'Staff','DAAA','DAAA-Admin Support'),('DESIG',7,'Staff','DISM','DISM-Directors Office'),('DESIG',19,'Lecturer','DAAA','DCITP - Staff');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_verifier_sys`
--

DROP TABLE IF EXISTS `exam_verifier_sys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_verifier_sys` (
  `moderator` varchar(64) NOT NULL,
  `mdeo_marker` varchar(64) NOT NULL,
  `co_marker` varchar(64) DEFAULT NULL,
  `verifier` varchar(64) NOT NULL,
  `verifier_details` varchar(64) NOT NULL,
  `markers_moderator` varchar(64) NOT NULL,
  `module_mcl` varchar(64) DEFAULT NULL,
  `chief_examiner` varchar(64) NOT NULL,
  `co_examiner` varchar(64) DEFAULT NULL,
  `shared_paper` varchar(255) DEFAULT NULL,
  `shared_question` varchar(255) DEFAULT NULL,
  `type_of_module` enum('exam','ica-term-test','ica-no-test''') NOT NULL,
  `external` varchar(255) DEFAULT NULL,
  `fk_module_code` varchar(255) NOT NULL,
  `fk_semester_code` varchar(255) NOT NULL,
  PRIMARY KEY (`fk_module_code`,`fk_semester_code`),
  KEY `fk_moderator_id_idx` (`moderator`),
  KEY `fk_semester_code_idx` (`fk_semester_code`),
  KEY `fk_evs_mdeo_marker_id_idx` (`mdeo_marker`),
  KEY `fk_evs_co_marker_id_idx` (`co_marker`),
  KEY `fk_evs_verifier_idx` (`verifier`),
  KEY `fk_evs_module_mcl_id_idx` (`markers_moderator`),
  KEY `fk_evs_module_mcl_id_idx1` (`module_mcl`),
  KEY `fk_evs_chief_examiner_idx` (`chief_examiner`),
  KEY `fk_evs_co_examiner_id_idx` (`co_examiner`),
  CONSTRAINT `fk_evs_chief_examiner_id` FOREIGN KEY (`chief_examiner`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_co_examiner_id` FOREIGN KEY (`co_examiner`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_co_marker_id` FOREIGN KEY (`co_marker`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_markers_moderator_id` FOREIGN KEY (`markers_moderator`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_mdeo_marker_id` FOREIGN KEY (`mdeo_marker`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_moderator_id` FOREIGN KEY (`moderator`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_code` FOREIGN KEY (`fk_module_code`) REFERENCES `module` (`mod_code`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_mcl_id` FOREIGN KEY (`module_mcl`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_semester_code` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_verifier_id` FOREIGN KEY (`verifier`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_verifier_sys`
--

LOCK TABLES `exam_verifier_sys` WRITE;
/*!40000 ALTER TABLE `exam_verifier_sys` DISABLE KEYS */;
INSERT INTO `exam_verifier_sys` VALUES ('654321','424455','5924','1144','Test Test','8007','1144','123456',NULL,'Testing Remark','Test','exam','Test','LC0855','AY 2021/2022 SEM2'),('123456','1144','424455','424455','Test','424455','1144','1144','424455','Test','Test','ica-term-test','Test','LC0860','AY 2021/2022 SEM2');
/*!40000 ALTER TABLE `exam_verifier_sys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwt_token_storage`
--

DROP TABLE IF EXISTS `jwt_token_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwt_token_storage` (
  `jwt_id` int NOT NULL AUTO_INCREMENT,
  `fk_staff_id` varchar(64) NOT NULL,
  `jwt_token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_accessed` time DEFAULT NULL,
  PRIMARY KEY (`jwt_id`),
  KEY `fk_jwt_staff_id_idx` (`fk_staff_id`),
  CONSTRAINT `jwt_token_storage_ibfk_1` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=446 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwt_token_storage`
--

LOCK TABLES `jwt_token_storage` WRITE;
/*!40000 ALTER TABLE `jwt_token_storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwt_token_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mod_assign`
--

DROP TABLE IF EXISTS `mod_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mod_assign` (
  `prefix` varchar(6) DEFAULT 'MA',
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `fk_mod_code` varchar(6) NOT NULL,
  `fk_staff_id` varchar(64) NOT NULL,
  `ma_lecture` int NOT NULL,
  `ma_tutorial` int NOT NULL,
  `ma_practical` int NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `fk_staff_id_idx` (`fk_staff_id`),
  KEY `fk_semester_code` (`fk_semester_code`),
  KEY `fk_mod_code` (`fk_mod_code`),
  CONSTRAINT `mod_assign_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`),
  CONSTRAINT `mod_assign_ibfk_2` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`),
  CONSTRAINT `mod_assign_ibfk_3` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mod_assign`
--

LOCK TABLES `mod_assign` WRITE;
/*!40000 ALTER TABLE `mod_assign` DISABLE KEYS */;
INSERT INTO `mod_assign` VALUES ('MA',2,'EP0200','8405',1,1,1,'AY 2021/2022 SEM2'),('MA',110,'LC0860','424455',0,2,0,'AY 2021/2022 SEM2'),('MA',111,'EP0302','8405',0,4,4,'AY 2021/2022 SEM2'),('MA',112,'LC0855','8405',0,2,0,'AY 2021/2022 SEM2');
/*!40000 ALTER TABLE `mod_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mod_workload`
--

DROP TABLE IF EXISTS `mod_workload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mod_workload` (
  `prefix` varchar(6) DEFAULT 'MW',
  `fk_mod_code` varchar(6) NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  `fk_uploaded_by` varchar(64) NOT NULL,
  `mod_stage` varchar(255) NOT NULL,
  `component_code` varchar(8) NOT NULL,
  `nrc` enum('Yes','No') NOT NULL,
  `weightage` int NOT NULL,
  `group_size` int DEFAULT NULL,
  `start_weeks` int DEFAULT NULL,
  `end_weeks` int DEFAULT NULL,
  `remarks` text,
  `testwk_type` varchar(45) DEFAULT NULL,
  `type` enum('Written','Practical') CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `special_requirement` mediumtext,
  PRIMARY KEY (`fk_mod_code`,`fk_semester_code`,`mod_stage`,`component_code`),
  KEY `fk_mw_semester_code_idx` (`fk_semester_code`),
  KEY `mod_workload_ibfk_3_idx` (`mod_stage`),
  KEY `mod_workload_ibfk_3_idx1` (`fk_uploaded_by`),
  CONSTRAINT `mod_workload_ibfk_1` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`) ON UPDATE CASCADE,
  CONSTRAINT `mod_workload_ibfk_2` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `mod_workload_ibfk_3` FOREIGN KEY (`fk_uploaded_by`) REFERENCES `staff_information` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mod_workload`
--

LOCK TABLES `mod_workload` WRITE;
/*!40000 ALTER TABLE `mod_workload` DISABLE KEYS */;
INSERT INTO `mod_workload` VALUES ('MW','EP0200','AY 2021/2022 SEM2','123456','3B','CA1','Yes',10,30,30,30,'NIL',NULL,NULL,NULL,NULL),('MW','EP0200','AY 2021/2022 SEM2','123456','3B','CA9','Yes',30,3,4,18,'NIL',NULL,NULL,NULL,NULL),('MW','EP0302','AY 2021/2022 SEM2','8405','1A','CA1','Yes',30,2,2,2,'NIL',NULL,NULL,NULL,NULL),('MW','EP0302','AY 2021/2022 SEM2','8405','1A','CA9','No',30,1,1,19,'NIL',NULL,NULL,NULL,NULL),('MW','EP0302','AY 2021/2022 SEM2','8405','1A','EST','Yes',30,NULL,NULL,NULL,NULL,'Mid Semester Test','Written',120,'NIL'),('MW','LC0860','AY 2021/2022 SEM2','123456','1S1','CA9','Yes',10,1,1,15,'NIL',NULL,NULL,NULL,NULL),('MW','ST0502','AY 2021/2022 SEM2','S111111','1S1','EST','No',10,NULL,NULL,NULL,NULL,'End Semester Test','Practical',90,'NIL'),('MW','ST0505','AY 2021/2022 SEM2','123456','1A','EST','No',30,NULL,NULL,NULL,NULL,'Mid Semester Test','Written',90,'NIL'),('MW','ST0505','AY 2021/2022 SEM2','123456','1A','MST','Yes',10,NULL,NULL,NULL,NULL,'Mid Semester Test','Written',90,'NIL');
/*!40000 ALTER TABLE `mod_workload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `prefix` varchar(6) DEFAULT 'M',
  `mod_code` varchar(6) NOT NULL,
  `year_offered` int NOT NULL,
  `mod_stage` varchar(255) NOT NULL,
  `mod_name` tinytext NOT NULL,
  `mod_abbrv` varchar(64) NOT NULL,
  `mod_dlt` decimal(3,1) NOT NULL,
  `mod_lecture` decimal(3,1) NOT NULL,
  `mod_tutorial` decimal(3,1) NOT NULL,
  `mod_practical` decimal(3,1) NOT NULL,
  `credit_unit` int NOT NULL,
  `prereq` mediumtext NOT NULL,
  `module_type` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `total_hours` varchar(45) NOT NULL,
  `mass_lect` enum('Yes','No') DEFAULT NULL,
  `odd_lechr` decimal(3,1) DEFAULT NULL,
  `even_lechr` decimal(3,1) DEFAULT NULL,
  `odd_prachr` decimal(3,1) DEFAULT NULL,
  `even_prachr` decimal(3,1) DEFAULT NULL,
  `odd_tuthr` decimal(3,1) DEFAULT NULL,
  `even_tuthr` decimal(3,1) DEFAULT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  `fk_mod_coord` varchar(64) DEFAULT NULL,
  `fk_course_id` varchar(255) DEFAULT NULL,
  `remarks` varchar(45) DEFAULT NULL,
  `lecture_class` int DEFAULT NULL,
  `practical_class` int DEFAULT NULL,
  `tutorial_class` int DEFAULT NULL,
  `normal_students` int DEFAULT NULL,
  `os_students` int DEFAULT NULL,
  `total_students` int DEFAULT NULL,
  PRIMARY KEY (`mod_code`,`year_offered`,`mod_stage`,`fk_semester_code`),
  KEY `fk_mod_coord_idx` (`fk_mod_coord`),
  KEY `fk_semester_code` (`fk_semester_code`),
  KEY `module_ibfk_4` (`fk_course_id`),
  CONSTRAINT `module_ibfk_2` FOREIGN KEY (`fk_mod_coord`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_4` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_5` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('M','EP0107',0,'3A','Conversational Thai','CT',1.5,0.0,30.0,30.0,0,'NA','NA','NA','60','Yes',1.5,1.5,1.5,1.5,1.5,1.5,'AY 2021/2022 SEM1','123456','DIT','0',0,2,2,60,0,60),('M','EP0200',0,'3B','SUPER IDOL TRAINING','SIDXR',3.0,30.0,30.0,45.0,2,'NA','NA','NA','105','Yes',3.0,3.0,3.0,3.0,3.0,3.0,'AY 2021/2022 SEM2','123456','DISM','Testing Remarks',1,1,1,60,10,70),('M','EP0302',0,'1A','Python Data Structures','PDS',1.5,0.0,60.0,30.0,0,'','','','','Yes',1.5,1.5,1.5,1.5,1.5,1.5,'AY 2021/2022 SEM2','8405','DAAA',NULL,0,4,4,NULL,NULL,70),('M','LC0855',2022,'1S1','Communicating for Project (Proposal) Effectiveness','CPR',0.0,0.0,60.0,0.0,2,'Nil','C','7','30',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AY 2021/2022 SEM2','1144','DCITP','LSC',0,0,2,60,5,110),('M','LC0860',2022,'1S1','Critical and Analytical Thinking','CAT',0.0,0.0,30.0,0.0,2,'Nil','SP','7','30',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AY 2021/2022 SEM2','123456','DCITP','LSC',0,0,4,60,5,105),('M','MS0105',2022,'1S1','Mathematics','MATH',0.0,37.5,22.5,0.0,4,'Nil','C','1','60',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AY 2021/2022 SEM1','1144','DCITP','MS',0,2,2,60,0,60),('M','ST0502',2022,'1S1','Fundamentals of Programming','FOP',0.0,0.0,30.0,60.0,6,'Nil','C','7','90',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AY 2021/2022 SEM2','S111111','DCITP','DIT',0,0,2,60,0,60),('M','ST0505',0,'1A','Enterprise Systems Development','ESDE',1.5,1.5,1.5,1.5,0,'','','','','Yes',5.0,7.0,0.0,0.0,0.0,0.0,'AY 2021/2022 SEM2','123456','DMIT',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('M','ST0505',2021,'2A','Enterprise Systems Development','ESDE',0.0,0.0,45.0,45.0,6,' ST0503 (Taken) ','C','7','90',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AY 2021/2022 SEM1',NULL,'DIT','Nil',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_preference`
--

DROP TABLE IF EXISTS `module_preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module_preference` (
  `prefix` varchar(6) DEFAULT 'MP',
  `mp_id` int NOT NULL AUTO_INCREMENT,
  `fk_staff_id` varchar(64) NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  `preference` text NOT NULL,
  PRIMARY KEY (`mp_id`),
  KEY `fk_staff_id_idx` (`fk_staff_id`),
  KEY `fk_semester_code_idx` (`fk_semester_code`),
  CONSTRAINT `module_preference_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `module_preference_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_preference`
--

LOCK TABLES `module_preference` WRITE;
/*!40000 ALTER TABLE `module_preference` DISABLE KEYS */;
INSERT INTO `module_preference` VALUES ('MP',8,'8405','AY 2021/2022 SEM2','[{\"module\":\"ST0505\",\"module_coordinator\":true},{\"module\":\"EP0302\",\"module_coordinator\":true},{\"module\":\"EP0302\",\"module_coordinator\":false},{\"module\":\"EP0107\",\"module_coordinator\":true},{\"module\":\"EP0107\",\"module_coordinator\":false},{\"module\":\"ST0505\",\"module_coordinator\":false}]');
/*!40000 ALTER TABLE `module_preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nav_items`
--

DROP TABLE IF EXISTS `nav_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nav_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_title` varchar(45) NOT NULL,
  `item_icon_url` varchar(45) NOT NULL,
  `role_ids` varchar(45) NOT NULL,
  `item_html` text NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_items`
--

LOCK TABLES `nav_items` WRITE;
/*!40000 ALTER TABLE `nav_items` DISABLE KEYS */;
INSERT INTO `nav_items` VALUES (1,'Dashboard','/SVG Icons/Dashboard.svg','[1,2,3,4,5]','<li id=\"dashboard\" class=\"nav-item active\"> <a href=\"/home\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Dashboard.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Dashboard</div> </div> </div> </a> </li>'),(2,'Maintenance System','/SVG Icons/Maintenance.svg','[1]','<li id=\"maintenence-system\" class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingOne \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\"> <img src=\"../SVG Icons/Maintenance.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Maintenance System</span> </button> </h3> <div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\" data-bs-parent=\"#accordion\"> <div class=\"accordion-body\"> <a href=\"/maintenance/\" class=\"nav-link align-middle px-0\"> Module information </a> <a href=\"/maintenance/staff-info\" class=\"nav-link align-middle px-0\"> Staff information </a> <a href=\"course\" class=\"nav-link align-middle px-0\"> Course information </a> <a href=\"staff-hours\" class=\"nav-link align-middle px-0\"> Manage staff hours </a> <a href=\"designation\" class=\"nav-link align-middle px-0\"> Manage designation </a> <a href=\"semester\" class=\"nav-link align-middle px-0\"> Manage semester </a> </div> </div> </div> </div> </li>'),(3,'Teaching Assignment System','/SVG Icons/Teaching Allocation System.svg','[1]','<li id=\"teaching-assignment-system\" class=\"nav-item\"> <a href=\"/teaching-assignment\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Teaching Assignment</div> </div> </div> </a> </li>'),(4,'Exam Matters','/SVG Icons/Exam Matters.svg','[1,4]','<li id=\"exam-matters\" class=\"nav-item\"> <a href=\"exam-verifier\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Exam Matters.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Exam Matters</div> </div> </div> </a> </li>'),(5,'Announcements','/SVG Icons/Announcements.svg','[1,2,3,4,5]','<li id=\"announcements\" class=\"nav-item\"> <a href=\"announcements\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Announcements.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Announcements</div> </div> </div> </a> </li>'),(6,'Update Teaching Requirement','/SVG Icons/update teaching requirement.svg','[2]','<li id=\"update-teaching-assignment\" class=\"nav-item\"> <a href=\"/teaching-requirement\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/update teaching requirement.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Teaching Requirement</div> </div> </div> </a> </li>'),(7,'Update Personal Information','/SVG Icons/Update Personal Info Icon.svg','[1,2]','<li id=\"update-personal-information\" class=\"nav-item\"> <a href=\"/profile\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Update Personal Info Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Personal Information</div> </div> </div> </a> </li>'),(8,'Choose Module Preference','/SVG Icons/Select Module Pref.svg','[2]','<li id=\"choose-module-preference\" class=\"nav-item\"> <a href=\"/module-preference\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Select Module Pref.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Choose Module Preference</div> </div> </div> </a> </li>'),(9,'View Assigned Module','/SVG Icons/Assigned Module.svg','[2]','<li id=\"view-assigned-module\" class=\"nav-item\"> <a href=\"/module-assignment\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Assigned Module.svg\" class=\"icons\"> <div class=\"navbar-title\">View Assigned Module</div> </div> </div> </a> </li>'),(10,'Change Password','/SVG Icons/Lock Icon.svg','[2]','<li id=\"change-password\" class=\"nav-item\"> <a href=\"/change-password\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Lock Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Change Password</div> </div> </div> </a> </li>'),(11,'Manage Reports','/SVG Icons/Reports.svg','[1,5]','<li class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-reports\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTwo \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Manage Reports</span> </button> </h3> <div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\" data-bs-parent=\"#accordion-reports\"><div class=\"accordion-body\"> <a href=\"/reports/assignment-report\" class=\"nav-link align-middle px-0\"> Assignment Report </a> <a href=\"/reports/mc-list\" class=\"nav-link align-middle px-0\"> Module Coordinator List </a> <a href=\"/reports/summary-by-module\" class=\"nav-link align-middle px-0\"> Summary By Module </a> <a href=\"/reports/summary-by-staff\" class=\"nav-link align-middle px-0\"> Summary By Staff </a> <a href=\"/reports/workload-summary\" class=\"nav-link align-middle px-0\"> Workload Summary </a> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\"> Upload Reports </a> </div> </div> </div> </div> </li>'),(12,'Manage Exam Reports','/SVG Icons/Reports.svg','[1,3]','<li class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion-exam-reports\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingExamReports\"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseExamReports\" aria-expanded=\"false\" aria-controls=\"flush-collapseExamReports\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Download Exam Reports</span> </button> </h3> <div id=\"flush-collapseExamReports\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingExamReports\" data-bs-parent=\"#accordion-exam-reports\"> <div class=\"accordion-body\"> <a href=\"/reports/examiner-and-moderator-report\" class=\"nav-link align-middle px-0\"> Examiner & Moderator Report </a> <a href=\"/reports/examiner-and-verifier-report\" class=\"nav-link align-middle px-0\"> Examiner & Verifier Report </a></div></div></div></div></li>'),(19,'Manage Classes','/SVG Icons/Teaching Allocation System.svg','[1,5]','<li id=\"change-password\" class=\"nav-item\"> <a href=\"/class-assignment\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Manage Classes</div> </div> </div> </a> </li>'),(20,'Maintenance System','/SVG Icons/Maintenance.svg','[4]','<li id=\"maintenance-mc\" class=\"nav-item active\"> <a href=\"/module-coordinator/maintenance\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Maintenance.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Maintenance System</div> </div> </div> </a> </li>');
/*!40000 ALTER TABLE `nav_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_teaching_req`
--

DROP TABLE IF EXISTS `personal_teaching_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_teaching_req` (
  `prefix` varchar(6) DEFAULT 'PTR',
  `ptr_id` int NOT NULL AUTO_INCREMENT,
  `fk_staff_id` varchar(64) NOT NULL,
  `ptr_day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `ptr_time` time NOT NULL,
  `ptr_duration` double NOT NULL,
  `ptr_reason` text NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`ptr_id`),
  KEY `personal_teaching_req_ibfk_1` (`fk_semester_code`),
  KEY `personal_teaching_req_ibfk_2` (`fk_staff_id`),
  CONSTRAINT `personal_teaching_req_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `personal_teaching_req_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_teaching_req`
--

LOCK TABLES `personal_teaching_req` WRITE;
/*!40000 ALTER TABLE `personal_teaching_req` DISABLE KEYS */;
INSERT INTO `personal_teaching_req` VALUES ('PTR',65,'654321','Monday','13:09:00',1.5,'Test','AY 2021/2022 SEM2'),('PTR',66,'654321','Monday','03:10:00',2,'Test','AY 2021/2022 SEM2');
/*!40000 ALTER TABLE `personal_teaching_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_picture`
--

DROP TABLE IF EXISTS `profile_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_picture` (
  `pfp_id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(64) NOT NULL,
  `fk_staff_id` varchar(6) NOT NULL,
  PRIMARY KEY (`pfp_id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `profile_picture_ibfk_1` (`fk_staff_id`),
  CONSTRAINT `profile_picture_ibfk_1` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_picture`
--

LOCK TABLES `profile_picture` WRITE;
/*!40000 ALTER TABLE `profile_picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ptr_remarks`
--

DROP TABLE IF EXISTS `ptr_remarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ptr_remarks` (
  `remark_id` int NOT NULL AUTO_INCREMENT,
  `fk_staff_id` varchar(6) NOT NULL,
  `ptr_remarks` text NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`remark_id`),
  KEY `ptr_remarks_ibfk_1` (`fk_semester_code`),
  KEY `ptr_remarks_ibfk_2` (`fk_staff_id`),
  CONSTRAINT `ptr_remarks_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `ptr_remarks_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ptr_remarks`
--

LOCK TABLES `ptr_remarks` WRITE;
/*!40000 ALTER TABLE `ptr_remarks` DISABLE KEYS */;
INSERT INTO `ptr_remarks` VALUES (8,'8405','Test','AY 2021/2022 SEM2');
/*!40000 ALTER TABLE `ptr_remarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports_file_store`
--

DROP TABLE IF EXISTS `reports_file_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports_file_store` (
  `file_id` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `uploaded_by` varchar(64) NOT NULL,
  `allocated_to` varchar(255) NOT NULL,
  `file_remarks` text,
  `fk_semester_code` varchar(64) NOT NULL,
  `uploaded_time` datetime NOT NULL,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `filename_UNIQUE` (`filename`),
  KEY `reports_file_store_ibfk_1` (`fk_semester_code`),
  KEY `reports_file_store_ibfk_2` (`allocated_to`),
  KEY `reports_file_store_ibfk_3` (`uploaded_by`),
  CONSTRAINT `reports_file_store_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `reports_file_store_ibfk_2` FOREIGN KEY (`allocated_to`) REFERENCES `system_roles` (`role_name`) ON UPDATE CASCADE,
  CONSTRAINT `reports_file_store_ibfk_3` FOREIGN KEY (`uploaded_by`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports_file_store`
--

LOCK TABLES `reports_file_store` WRITE;
/*!40000 ALTER TABLE `reports_file_store` DISABLE KEYS */;
INSERT INTO `reports_file_store` VALUES ('1641831943622_Classlist_AY2122S1.xls','Classlist_AY2122S1.xls','123456','exam_rep','9:53AM','AY 2021/2022 SEM1','2022-01-11 00:25:43'),('1641888842696_DIT_StudentProjectGuide_AY2122S2_20Aug2021_1.doc','Testing: Cade File Name','1144','admin_support','hehehehehe','AY 2021/2022 SEM1','2022-01-11 16:14:02'),('1641931679641_Development Guidelines - General.docx','Development Guidelines - General.docx','123456','exam_rep','9:53AM','AY 2021/2022 SEM2','2022-01-12 04:07:59'),('1641932966703_Projection_file_NewTemplate.xlsm','Projection_file_NewTemplate.xlsm','123456','mod_coord','File contains projection file','AY 2021/2022 SEM2','2022-01-12 04:29:26'),('1641968276515_Weekly Report Template.docx','Weekly Report Template.docx','1144','mod_coord','File contains projection file','AY 2021/2022 SEM2','2022-01-12 14:17:56'),('1641973061335_CA Presentation Techniques and Structure TIPS.pptx','CA Presentation Techniques and Structure TIPS.pptx','1144','exam_rep','File contains projection file','AY 2021/2022 SEM2','2022-01-12 15:37:41');
/*!40000 ALTER TABLE `reports_file_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` varchar(255) NOT NULL,
  `schedule_desc` text NOT NULL,
  `remarks` text,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('CET','Lecturers who lurk in the night',NULL),('PET','Lecturers who lurk in the morning',NULL),('PETCET','Lecturers who are hardcore',NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester_code`
--

DROP TABLE IF EXISTS `semester_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester_code` (
  `prefix` varchar(6) DEFAULT 'SC',
  `semester_id` varchar(64) NOT NULL,
  `semester_code` varchar(255) NOT NULL,
  `remarks` text,
  `latest_sem` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  PRIMARY KEY (`semester_id`),
  UNIQUE KEY `semester_code` (`semester_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester_code`
--

LOCK TABLES `semester_code` WRITE;
/*!40000 ALTER TABLE `semester_code` DISABLE KEYS */;
INSERT INTO `semester_code` VALUES ('SC','20212022SEM1','AY 2021/2022 SEM1',NULL,'INACTIVE'),('SC','20212022SEM2','AY 2021/2022 SEM2','Test','ACTIVE'),('SC','20212022SEM4','AY SEM TEST','TEST','INACTIVE');
/*!40000 ALTER TABLE `semester_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_information`
--

DROP TABLE IF EXISTS `staff_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_information` (
  `staff_id` varchar(64) NOT NULL,
  `staff_name` text NOT NULL,
  `staff_abbrv` text NOT NULL,
  `fk_designation_id` int NOT NULL,
  `staff_email` varchar(64) NOT NULL,
  `staff_number` varchar(10) NOT NULL,
  `staff_mobile` varchar(10) NOT NULL,
  `staff_remarks` text NOT NULL,
  `staff_password` varchar(255) NOT NULL,
  `fk_staff_type` varchar(255) NOT NULL,
  `fk_schedule_id` varchar(255) NOT NULL,
  `last_login` time DEFAULT NULL,
  `staff_status` enum('Active','Inactive') NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_number_UNIQUE` (`staff_number`),
  KEY `fk_staff_type_idx` (`fk_staff_type`),
  KEY `fk_schedule_id_idx` (`fk_schedule_id`),
  KEY `staff_information_ibfk_1_idx` (`fk_designation_id`),
  CONSTRAINT `staff_information_ibfk_1` FOREIGN KEY (`fk_designation_id`) REFERENCES `designation` (`designation_id`) ON UPDATE CASCADE,
  CONSTRAINT `staff_information_ibfk_2` FOREIGN KEY (`fk_schedule_id`) REFERENCES `schedule` (`schedule_id`) ON UPDATE CASCADE,
  CONSTRAINT `staff_information_ibfk_3` FOREIGN KEY (`fk_staff_type`) REFERENCES `staff_types` (`staff_type`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_information`
--

LOCK TABLES `staff_information` WRITE;
/*!40000 ALTER TABLE `staff_information` DISABLE KEYS */;
INSERT INTO `staff_information` VALUES ('1144','Kirby Hencock','DYJ19DCV1FG',1,'mi.lacinia.mattis@sapienimperdiet.net','5406810','2534413','nulla. Donec','admin_password','FT','CET',NULL,'Active'),('123456','Super Idol','S-I',6,'superidol@sp.edu.sg','91234567','61234567','This staff is great','$2a$10$eAa4ae8Pn.6Pi9oeL3MzEObb9mpc7mKHcSRGtZCFd2BXElLUcdMqG','FT','CET',NULL,'Active'),('424455','bob','test u',1,'tykcuber@gmail.com','2222225','4444444','                       wadwadaw  ','$2a$10$fMGQBrhSfCK4/fTwGhh33eZelfot26/tf/lb3RpjVcQXJ4mcuY7pq','FT','PET',NULL,'Inactive'),('5924','Cain Christensen','OXO35IUS9EO',6,'suspendisse@liberomauris.edu','573-2776','448-9963','nisl elementum purus, accumsan interdum libero dui','IT727UJFGI11655377153237952','AL','PET',NULL,'Active'),('654321','Brandon','lu',3,'tykcuber@gmail.com','34545342','87487763','awesome guy          ','$2a$10$6BHZ/qHRWBVTC6FmF3SOOukOww3bNwg6M0B/v0iuV9f0LUIjv1Exm','FT','PET',NULL,'Active'),('777777','valerie','dongi',1,'valeriee@gmail.com','12323123','31232312','                         awesome','$2a$10$G9vc0qkayY9kk.VwJ2283OXx/d91AtVxj7ouLk.1hOB12Ql7fUbjC','FT','PET',NULL,'Active'),('8007','Hope Schneider','LDG87HQL0YU',1,'vehicula.pellentesque@adipiscinglacusut.edu','856-3753','536-7229','orci.','BG16ONSK12965676055518','AL','PET',NULL,'Active'),('8201','Chloe Lott','VQS95GXS4IO',6,'ac.feugiat.non@sagittis.net','631-5629','225-6150','gravida sagittis. Duis','LU098769839521313556','AL','PET',NULL,'Active'),('8405','Steve Yobs','DMYN',1,'steve@email.com','12345678','82372252','non, sollicitudin a, malesuada test test test?','$2a$10$eAa4ae8Pn.6Pi9oeL3MzEObb9mpc7mKHcSRGtZCFd2BXElLUcdMqG','FT','PET',NULL,'Active'),('999999','user','user',3,'srwar','21445555','63255555','awsopme','$2a$10$LtSQk6sngdhaYP2YuNk96OkYP6MoAvfWJLcR/ROuVLLHA/ntwu2j.','FT','PET',NULL,'Active'),('S111111','module coord','mc',3,'11111','11114444','55556312','module coord','$2a$10$QUEdt6wHmTR4tKFNjBEbwuj23iWmaN.qL.waysJwLKKYBv2pUXS0.','FT','PET',NULL,'Active'),('S123456','Module Coordinator','MC1',2,'','','','                         ','$2a$10$bvehCsK3rkgKbnBN4uU7YOEU8dq.QneSt8v4c5bxtje3Un3Kn2alS','FT','PET',NULL,'Active'),('S222222','Scott','scott',3,'scott@gmail.com','96658786','87665735','scott is a lecturer','$2a$10$Nzi55fghuKnCRv3tOos6De9wBrMzRlXYZUDFuFx1RG80/4qJ0odmK','FT','PET',NULL,'Active'),('S333333','Liam','liam',3,'liam@gmail.com','96678263','84657363','liam has 3 apples','$2a$10$EjpLkjUZ9w1o/1w1llCKMehFkuKJsqJJRGElwjTip2uFhncXhWvaC','AL','CET',NULL,'Active'),('S444444','Michelle','michelle',3,'lecturer@gmail.com','87358393','98678565','Michelle is a great person','$2a$10$VqTJYwj7IuJy0N5tiv.E/.kChfdt9npm3n0v0KOUFBGtv/MGS2Rci','FT','PET',NULL,'Active'),('S555555','Ryan','ryan',3,'ryan@gmail.com','98678575','87567464','ryan backwards is nayr','$2a$10$rnpxtrSeKxCH.Xi8J3zr2.dljtYYngO.c8vGVFegGOdXvlmXceYsm','AL','PETCET',NULL,'Active'),('S666666','Lily','lily',3,'lily@gmail.com','96667543','87554445','lily is a pretty girl','$2a$10$BPda4t8ynNyYenfpobt7tOFrQRU4M2ElFkqkghw/d50KG0cHn8.zS','FT','PET',NULL,'Active');
/*!40000 ALTER TABLE `staff_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_privileges`
--

DROP TABLE IF EXISTS `staff_privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_privileges` (
  `staff_privilege_id` int NOT NULL AUTO_INCREMENT,
  `fk_role_id` varchar(255) NOT NULL,
  `fk_staff_id` varchar(255) NOT NULL,
  PRIMARY KEY (`staff_privilege_id`),
  KEY `fk_staff_privileges_staff_id_idx` (`fk_staff_id`),
  KEY `fk_staff_privileges_role_id_idx` (`fk_role_id`),
  CONSTRAINT `staff_privileges_ibfk_1` FOREIGN KEY (`fk_role_id`) REFERENCES `system_roles` (`role_id`) ON UPDATE CASCADE,
  CONSTRAINT `staff_privileges_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_privileges`
--

LOCK TABLES `staff_privileges` WRITE;
/*!40000 ALTER TABLE `staff_privileges` DISABLE KEYS */;
INSERT INTO `staff_privileges` VALUES (1,'1','123456'),(6,'1','424455'),(7,'2','654321'),(8,'1','654321'),(9,'1','8405'),(11,'4','S123456'),(20,'4','S111111'),(21,'1','999999'),(22,'2','999999'),(23,'3','999999'),(24,'4','999999'),(25,'5','999999'),(26,'2','S222222'),(27,'3','S333333'),(28,'5','S555555'),(29,'2','S666666'),(30,'5','S666666'),(31,'4','S444444');
/*!40000 ALTER TABLE `staff_privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_types`
--

DROP TABLE IF EXISTS `staff_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_types` (
  `staff_type` varchar(255) NOT NULL,
  `staff_description` text NOT NULL,
  `hours` decimal(3,1) NOT NULL,
  `remarks` text,
  PRIMARY KEY (`staff_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_types`
--

LOCK TABLES `staff_types` WRITE;
/*!40000 ALTER TABLE `staff_types` DISABLE KEYS */;
INSERT INTO `staff_types` VALUES ('AL','Adjunct Lecturer',10.0,''),('FT','Full-Time Lecturer',24.0,NULL);
/*!40000 ALTER TABLE `staff_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_roles`
--

DROP TABLE IF EXISTS `system_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_roles` (
  `prefix` varchar(6) DEFAULT 'SR',
  `role_id` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `remarks` text,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_roles`
--

LOCK TABLES `system_roles` WRITE;
/*!40000 ALTER TABLE `system_roles` DISABLE KEYS */;
INSERT INTO `system_roles` VALUES ('SR','1','admin','Admin with full privileges'),('SR','2','lecturer','Lecturers'),('SR','3','exam_rep','Exam Rep'),('SR','4','mod_coord','Module Coordinator'),('SR','5','admin_support','Admin support');
/*!40000 ALTER TABLE `system_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_user_accounts`
--

DROP TABLE IF EXISTS `temp_user_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_user_accounts` (
  `staff_id` varchar(6) NOT NULL,
  `staff_password` varchar(255) NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_user_accounts`
--

LOCK TABLES `temp_user_accounts` WRITE;
/*!40000 ALTER TABLE `temp_user_accounts` DISABLE KEYS */;
INSERT INTO `temp_user_accounts` VALUES ('123455','$2a$10$eAa4ae8Pn.6Pi9oeL3MzEObb9mpc7mKHcSRGtZCFd2BXElLUcdMqG'),('123456','admin');
/*!40000 ALTER TABLE `temp_user_accounts` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-05  4:39:03
