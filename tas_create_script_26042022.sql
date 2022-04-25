CREATE DATABASE  IF NOT EXISTS `tas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tas`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tas
-- ------------------------------------------------------
-- Server version	8.0.27

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
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
INSERT INTO `course` VALUES ('DAAA','Diploma In Applied AI and Analytics','active'),('DCITP','Common ICT Programme','active'),('DISM','Diploma in Security Management','active'),('DIT','Diploma In Information Technology','active'),('SOC','Others','active');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_items`
--

DROP TABLE IF EXISTS `dashboard_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_items` (
  `d_item_id` int NOT NULL AUTO_INCREMENT,
  `d_item_title` varchar(45) NOT NULL,
  `d_role_ids` varchar(45) NOT NULL,
  `d_item_html` text NOT NULL,
  PRIMARY KEY (`d_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_items`
--

LOCK TABLES `dashboard_items` WRITE;
/*!40000 ALTER TABLE `dashboard_items` DISABLE KEYS */;
INSERT INTO `dashboard_items` VALUES (1,'Mainenance System','[1]','<div class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\"> Maintenence System </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/semester\"> <div id=\"module-info-item\" class=\"list-item p-2 col\">Manage Semester</div> </a> <a href=\"/course\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Course</div> </a> <a href=\"/staff-hours\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Staff Type & Hours</div> </a> <a href=\"/designation\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Designation</div> </a> <a href=\"/maintenance\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Modules</div> </a> <a href=\"/maintenance/staff-info\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Staff List</div> </a> </div> </div>'),(3,'Teaching Assignment System','[1]','<div id=\"teaching-assignment\" class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\"> Teaching Assignment </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/upload-reports\"> <div id=\"module-info-item\" class=\"list-item p-2 col\">Upload Modules</div> </a> <a href=\"/class-assignment\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Manage Classes</div> </a> <a href=\"/teaching-assignment\"> <div id=\"staff-info-item\" class=\"list-item p-2 col\">Teaching Assignment System</div> </a> </div> </div>'),(5,'New Semester Tasks','[1]','<div class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\"> New Semester Tasks </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/semester\"><div class=\"list-item p-2 col\">Create new semester</div></a> <a href=\"/semester\"><div class=\"list-item p-2 col\">Activate new semester</div></a> <a href=\"/upload-reports\"><div class=\"list-item p-2 col\">Upload semester data</div></a> <a href=\"/teaching-assignment\"><div class=\"list-item p-2 col\">Assign Module Coordinator</div></a> <a href=\"/teaching-assignment\"><div class=\"list-item p-2 col\">Teaching Assignment</div></a> </div> </div>'),(6,'Module Coordinator Teaching Requirement','[4]','\n<div class=\"col-8 dashboard-item\"> <div class=\"dashboard-item-title\" style=\"text-align:center\">Module Coordinator Teaching Information<br> </div> <div class=\"dashboard-item-mc\"><table class=\"table table-dark \"><thead><tr><th scope=\"col\">Classes</th><th scope=\"col\">L</th><th scope=\"col\">T</th><th scope=\"col\">P</th><th scope=\"col\">Hours</th></tr></thead><tbody class=\"assigned-modules\"></tbody><thead class=\"total-hours\"></thead></table></div> </div>'),(8,'Lecturer Teaching Requirement','[2]','<div class=\"col-8 dashboard-item\"> <div class=\"dashboard-item-title\" style=\"text-align:center\">Teaching Information<br> </div> <div class=\"dashboard-item-lecturer\"><table class=\"table table-dark \"><thead><tr><th scope=\"col\">Classes</th><th scope=\"col\">L</th><th scope=\"col\">T</th><th scope=\"col\">P</th><th scope=\"col\">Hours</th></tr></thead><tbody class=\"assigned-modules\"></tbody><thead class=\"total-hours\"></thead></table></div> </div>'),(9997,'Other Functions','[2,4]','<div class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\">Semester Tasks </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/module-preference\"> <div class=\"list-item p-2 col\">Choose Module Preference</div> </a> <a href=\"/teaching-requirement\"> <div class=\"list-item p-2 col\">Update Teaching Requirement</div> </a> </div> </div>'),(9998,'Download Exam Reports','[1,3]','<div class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\"> Download Exam Reports </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/reports/examiner-and-moderator-report\"><div class=\"list-item p-2 col\">Exam & Moderator Report</div></a> <a href=\"/reports/examiner-and-verifier-report\"><div class=\"list-item p-2 col\">Exam & Verifier Report</div></a> </div> </div>'),(9999,'Reports','[5]','<div class=\"col-4 dashboard-item\"> <div class=\"dashboard-item-title\"> Reports </div> <div class=\"list-group d-flex flex-column\"> <a href=\"/reports/assignment-report\"><div class=\"list-item p-2 col\">Assignment Report</div></a> <a href=\"/reports/mc-list\"><div class=\"list-item p-2 col\">Module Coordinator List</div></a> <a href=\"/reports/summary-by-module\"><div class=\"list-item p-2 col\">Summary by Module</div></a> <a href=\"/reports/summary-by-staff\"><div class=\"list-item p-2 col\">Summary by Staff</div></a> <a href=\"/reports/workload-summary\"><div class=\"list-item p-2 col\">Workload by Summary</div></a> <a href=\"/upload-reports\"><div class=\"list-item p-2 col\">Upload Reports</div></a> </div> </div>');
/*!40000 ALTER TABLE `dashboard_items` ENABLE KEYS */;
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
  `fk_course_id` varchar(255) NOT NULL,
  `section_name` varchar(255) NOT NULL,
  PRIMARY KEY (`designation_id`),
  KEY `designation_ibfk_1` (`fk_course_id`),
  CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES ('DESIG',1,'Acad Staff','SOC','Admin Support'),('DESIG',2,'Adjunct Lecturer','SOC','Part-Time staff'),('DESIG',3,'Acad Staff','DAAA','DAAA'),('DESIG',6,'Non-Acad Staff','SOC','Admin Support'),('DESIG',20,'Acad Staff','DIT','DIT'),('DESIG',21,'Acad Staff','DISM','DISM'),('DESIG',22,'Acad Staff','SOC','Cluster'),('DESIG',23,'Acad Staff','SOC','Others'),('DESIG',24,'Acad Staff','SOC','Director Office');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_verifier_sys`
--

DROP TABLE IF EXISTS `exam_verifier_sys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_verifier_sys` (
  `fk_course_id` varchar(255) NOT NULL,
  `fk_module_code` varchar(255) NOT NULL,
  `fk_semester_code` varchar(255) NOT NULL,
  `moderator` varchar(64) DEFAULT NULL,
  `mdeo_marker` varchar(64) DEFAULT NULL,
  `co_marker` varchar(64) DEFAULT NULL,
  `verifier` varchar(64) DEFAULT NULL,
  `verifier_details` varchar(64) DEFAULT NULL,
  `markers_moderator` varchar(64) DEFAULT NULL,
  `module_mcl` varchar(64) DEFAULT NULL,
  `chief_examiner` varchar(64) DEFAULT NULL,
  `co_examiner` varchar(64) DEFAULT NULL,
  `shared_paper` varchar(255) DEFAULT NULL,
  `shared_question` varchar(255) DEFAULT NULL,
  `type_of_module` enum('exam','ica-term-test','ica-no-test''') NOT NULL,
  `external` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fk_module_code`,`fk_semester_code`,`type_of_module`,`fk_course_id`),
  KEY `fk_moderator_id_idx` (`moderator`),
  KEY `fk_semester_code_idx` (`fk_semester_code`),
  KEY `fk_evs_mdeo_marker_id_idx` (`mdeo_marker`),
  KEY `fk_evs_co_marker_id_idx` (`co_marker`),
  KEY `fk_evs_verifier_idx` (`verifier`),
  KEY `fk_evs_module_mcl_id_idx` (`markers_moderator`),
  KEY `fk_evs_module_mcl_id_idx1` (`module_mcl`),
  KEY `fk_evs_chief_examiner_idx` (`chief_examiner`),
  KEY `fk_evs_co_examiner_id_idx` (`co_examiner`),
  KEY `fk_evs_course_id_idx` (`fk_course_id`),
  CONSTRAINT `fk_evs_chief_examiner_id` FOREIGN KEY (`chief_examiner`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_co_examiner_id` FOREIGN KEY (`co_examiner`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_co_marker_id` FOREIGN KEY (`co_marker`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_course_id` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_markers_moderator_id` FOREIGN KEY (`markers_moderator`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_mdeo_marker_id` FOREIGN KEY (`mdeo_marker`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_moderator_id` FOREIGN KEY (`moderator`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_code` FOREIGN KEY (`fk_module_code`) REFERENCES `module` (`mod_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_mcl_id` FOREIGN KEY (`module_mcl`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_semester_code` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_verifier_id` FOREIGN KEY (`verifier`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
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
-- Table structure for table `jwt_token_storage`
--

DROP TABLE IF EXISTS `jwt_token_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwt_token_storage` (
  `jwt_id` int NOT NULL AUTO_INCREMENT,
  `fk_staff_id` varchar(64) NOT NULL,
  `jwt_token` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_accessed` time DEFAULT NULL,
  PRIMARY KEY (`jwt_id`),
  KEY `fk_jwt_staff_id_idx` (`fk_staff_id`),
  CONSTRAINT `jwt_token_storage_ibfk_1` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  CONSTRAINT `mod_assign_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mod_assign_ibfk_2` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mod_assign_ibfk_3` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `prefix` varchar(6) DEFAULT 'MW',
  `fk_mod_code` varchar(6) NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  `fk_uploaded_by` varchar(64) DEFAULT NULL,
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
  CONSTRAINT `mod_workload_ibfk_1` FOREIGN KEY (`fk_mod_code`) REFERENCES `module` (`mod_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mod_workload_ibfk_2` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mod_workload_ibfk_3` FOREIGN KEY (`fk_uploaded_by`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE
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
  `prefix` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'M',
  `mod_code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year_offered` int NOT NULL,
  `mod_stage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mod_name` mediumtext COLLATE utf8mb4_0900_as_ci NOT NULL,
  `mod_abbrv` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mod_dlt` decimal(4,1) NOT NULL,
  `mod_lecture` decimal(4,1) NOT NULL,
  `mod_tutorial` decimal(4,1) NOT NULL,
  `mod_practical` decimal(4,1) NOT NULL,
  `credit_unit` int NOT NULL,
  `prereq` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `module_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `total_hours` decimal(4,1) NOT NULL,
  `mass_lect` enum('Yes','No') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `odd_lechr` decimal(4,1) DEFAULT NULL,
  `even_lechr` decimal(4,1) DEFAULT NULL,
  `odd_prachr` decimal(4,1) DEFAULT NULL,
  `even_prachr` decimal(4,1) DEFAULT NULL,
  `odd_tuthr` decimal(4,1) DEFAULT NULL,
  `even_tuthr` decimal(4,1) DEFAULT NULL,
  `fk_semester_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fk_mod_coord` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fk_course_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `remarks` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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
  CONSTRAINT `module_ibfk_2` FOREIGN KEY (`fk_mod_coord`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_4` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_5` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
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
  CONSTRAINT `module_preference_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `module_preference_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_preference`
--

LOCK TABLES `module_preference` WRITE;
/*!40000 ALTER TABLE `module_preference` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nav_items`
--

LOCK TABLES `nav_items` WRITE;
/*!40000 ALTER TABLE `nav_items` DISABLE KEYS */;
INSERT INTO `nav_items` VALUES (1,'Dashboard','/SVG Icons/Dashboard.svg','[1,2,3,4,5]','<li id=\"dashboard\" class=\"nav-item active\"> <a href=\"/home\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Dashboard.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Home</div> </div> </div> </a> </li>'),(2,'Maintenance System','/SVG Icons/Maintenance.svg','[1]','<li id=\"maintenence-system\" class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingOne \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\"> <img src=\"../SVG Icons/Maintenance.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Maintenance System</span> </button> </h3> <div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\" data-bs-parent=\"#accordion\"> <div class=\"accordion-body\"><a href=\"/semester\" class=\"nav-link align-middle px-0\"> Manage Semester </a><a href=\"/course\" class=\"nav-link align-middle px-0\"> Manage Course </a>  <a href=\"/staff-hours\" class=\"nav-link align-middle px-0\"> Manage Staff Type & Hours </a> <a href=\"/designation\" class=\"nav-link align-middle px-0\"> Manage Designation </a> <a href=\"/maintenance\" class=\"nav-link align-middle px-0\"> Manage Modules  </a> <a href=\"/maintenance/staff-info\" class=\"nav-link align-middle px-0\">Manage Staff List </a>  </div> </div> </div> </div> </li>'),(3,'Teaching Assignment System','/SVG Icons/Teaching Allocation System.svg','[1]','<li id=\"teaching-assignment-system\" class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-tas\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTas \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTas\" aria-expanded=\"false\" aria-controls=\"flush-collapseTas\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Teaching Assignment</span> </button> </h3> <div id=\"flush-collapseTas\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTas\" data-bs-parent=\"#accordion-tas\"><div class=\"accordion-body\"> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\">Upload Modules</a> <a href=\"/class-assignment\" class=\"nav-link align-middle px-0\"> Manage Classes </a><a href=\"/teaching-assignment\" class=\"nav-link align-middle px-0\"> Teaching Assignment System</a> </div> </div> </div> </div> </li>'),(4,'Exam Matters','/SVG Icons/Exam Matters.svg','[1,4]','<li id=\"exam-matters\" class=\"nav-item\"> <a href=\"/exam-verifier\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Exam Matters.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Exam System</div> </div> </div> </a> </li>'),(11,'Manage Reports','/SVG Icons/Reports.svg','[1,5]','<li class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-reports\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTwo \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Reports</span> </button> </h3> <div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\" data-bs-parent=\"#accordion-reports\"><div class=\"accordion-body\"> <a href=\"/reports/assignment-report\" class=\"nav-link align-middle px-0\"> Assignment Report </a> <a href=\"/reports/mc-list\" class=\"nav-link align-middle px-0\"> Module Coordinator List </a> <a href=\"/reports/summary-by-module\" class=\"nav-link align-middle px-0\"> Summary By Module </a> <a href=\"/reports/summary-by-staff\" class=\"nav-link align-middle px-0\"> Summary By Staff </a> <a href=\"/reports/workload-summary\" class=\"nav-link align-middle px-0\"> Workload Summary </a> </div> </div> </div> </div> </li>'),(12,'Manage Exam Reports','/SVG Icons/Reports.svg','[1,3]','<li class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion-exam-reports\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingExamReports\"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseExamReports\" aria-expanded=\"false\" aria-controls=\"flush-collapseExamReports\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Download Exam Reports</span> </button> </h3> <div id=\"flush-collapseExamReports\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingExamReports\" data-bs-parent=\"#accordion-exam-reports\"> <div class=\"accordion-body\"> <a href=\"/reports/examiner-and-moderator-report\" class=\"nav-link align-middle px-0\"> Examiner & Moderator Report </a> <a href=\"/reports/examiner-and-verifier-report\" class=\"nav-link align-middle px-0\"> Examiner & Verifier Report </a></div></div></div></div></li>'),(20,'Maintenance System','/SVG Icons/Maintenance.svg','[4]','<li id=\"maintenance-mc\" class=\"nav-item active\"> <a href=\"/module-coordinator/maintenance\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Maintenance.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Maintenance System</div> </div> </div> </a> </li>'),(21,'Teaching Assignment System','/SVG Icons/Teaching Allocation System.svg','[5]','<li id=\"teaching-assignment-system\" class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-tas\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTas \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTas\" aria-expanded=\"false\" aria-controls=\"flush-collapseTas\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Teaching Assignment</span> </button> </h3> <div id=\"flush-collapseTas\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTas\" data-bs-parent=\"#accordion-tas\"><div class=\"accordion-body\"> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\">Upload Modules</a> <a href=\"/class-assignment\" class=\"nav-link align-middle px-0\"> Manage Classes </a> </div> </div> </div> </div> </li>'),(9994,'Update Teaching Requirement','/SVG Icons/update teaching requirement.svg','[2,4]','<li id=\"update-teaching-assignment\" class=\"nav-item\"> <a href=\"/teaching-requirement\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/update teaching requirement.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Teaching Requirement</div> </div> </div> </a> </li>'),(9995,'Choose Module Preference','/SVG Icons/Select Module Pref.svg','[2,4]','<li id=\"choose-module-preference\" class=\"nav-item\"> <a href=\"/module-preference\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Select Module Pref.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Choose Module Preference</div> </div> </div> </a> </li>'),(9996,'View Assigned Module','/SVG Icons/Assigned Module.svg','[2,4]','<li id=\"view-assigned-module\" class=\"nav-item\"> <a href=\"/module-assignment\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Assigned Module.svg\" class=\"icons\"> <div class=\"navbar-title\">View Assigned Module</div> </div> </div> </a> </li>'),(9997,'Update Personal Information','/SVG Icons/Update Personal Info Icon.svg','[2,3,4,5]','<li id=\"update-personal-information\" class=\"nav-item\"> <a href=\"/profile\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Update Personal Info Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Personal Information</div> </div> </div> </a> </li>'),(9998,'Change Password','/SVG Icons/Lock Icon.svg','[2,3,4,5]','<li id=\"change-password\" class=\"nav-item\"> <a href=\"/change-password\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Lock Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Change Password</div> </div> </div> </a> </li>'),(9999,'Announcements','/SVG Icons/Announcements.svg','[1,2,3,4,5]','<li id=\"announcements\" class=\"nav-item\"> <a href=\"/announcements\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Announcements.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Announcements</div> </div> </div> </a> </li>');
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
  CONSTRAINT `personal_teaching_req_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personal_teaching_req_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_teaching_req`
--

LOCK TABLES `personal_teaching_req` WRITE;
/*!40000 ALTER TABLE `personal_teaching_req` DISABLE KEYS */;
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
  `fk_staff_id` varchar(64) NOT NULL,
  `ptr_remarks` text NOT NULL,
  `fk_semester_code` varchar(64) NOT NULL,
  PRIMARY KEY (`remark_id`),
  KEY `ptr_remarks_ibfk_1` (`fk_semester_code`),
  KEY `ptr_remarks_ibfk_2` (`fk_staff_id`),
  CONSTRAINT `ptr_remarks_ibfk_1` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ptr_remarks_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ptr_remarks`
--

LOCK TABLES `ptr_remarks` WRITE;
/*!40000 ALTER TABLE `ptr_remarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `ptr_remarks` ENABLE KEYS */;
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
INSERT INTO `semester_code` VALUES ('SC','20222023SEM2','AY 2022/2023 SEM2','AY2223 S2','ACTIVE');
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
  `staff_name` text,
  `staff_abbrv` text,
  `fk_designation_id` int DEFAULT NULL,
  `staff_email` varchar(64) DEFAULT NULL,
  `staff_number` varchar(10) DEFAULT NULL,
  `staff_mobile` varchar(10) DEFAULT NULL,
  `staff_remarks` text,
  `staff_password` varchar(255) NOT NULL,
  `fk_staff_type` varchar(255) DEFAULT NULL,
  `fk_schedule_id` varchar(255) DEFAULT NULL,
  `last_login` time DEFAULT NULL,
  `staff_status` enum('Active','Inactive') DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `fk_staff_type_idx` (`fk_staff_type`),
  KEY `fk_schedule_id_idx` (`fk_schedule_id`),
  KEY `staff_information_ibfk_1_idx` (`fk_designation_id`),
  CONSTRAINT `staff_information_ibfk_1` FOREIGN KEY (`fk_designation_id`) REFERENCES `designation` (`designation_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `staff_information_ibfk_2` FOREIGN KEY (`fk_schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `staff_information_ibfk_3` FOREIGN KEY (`fk_staff_type`) REFERENCES `staff_types` (`staff_type`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_information`
--

LOCK TABLES `staff_information` WRITE;
/*!40000 ALTER TABLE `staff_information` DISABLE KEYS */;
INSERT INTO `staff_information` VALUES ('123456','Admin','Admin',1,'','','','This is the Admin account','$2a$10$kt8PnAr0a/PdAwdFkeiNGOtYFRtNqYWQPii0Uh4dTbLLnmoZABlhq','FT','PET',NULL,'Active'),('s10006062','GLEN TAN CHONG HOW','Glen Tan',20,'Glen_TAN@sp.edu.sg','','','','$2a$10$lTEjtK2NLwlRPRHu5Zs2duZkuEnM8CzsxzFu5jlqz/3jEHPbzV3jm','FT','PET',NULL,'Active'),('s10131825','BERNARD TANG WAI KIN','BERNARD TANG',21,'Bernard_TANG@sp.edu.sg','','','','$2a$10$Z7sIzn7AX9.luPl2kfMXuuV3S3GfMSz8/gStP.kwStXus2gsbU5YK','FT','PET',NULL,'Active'),('s10131946','SOH YONG SHENG','SohYS',21,'SOH_Yong_Sheng@sp.edu.sg','','','','$2a$10$qCMQnaJS8R4AQBqlRsjc0uLf7WJYkY0bXfh81VBHe94UDAfvvyiSa','FT','PET',NULL,'Active'),('s11006028','THOMAS QUEK WU LIAT','Thomas Quek',21,'Thomas_QUEK@sp.edu.sg','','','','$2a$10$J3U1YG8myXATge6pWQVn..g9BYyUropOfsgNoh5aAw5h9BOWvC/02','FT','PET',NULL,'Active'),('s11007087','SIAH PEIH WEE','SiahPW',20,'SIAH_Peih_Wee@sp.edu.sg','','','','$2a$10$T6DNAf4K5XexZKzRw9B0.eMXIFlv0dp3Rol0H8B6fiJwkLwIPmPcC','FT','PET',NULL,'Active'),('s17465','LEONG FONG SOW ','LeongFS',3,'LEONG_Fong_Sow@sp.edu.sg','','','','$2a$10$nhBfPR1Xdau4U/SeiwuAbOfpRAQBfWlbmy9yRs4lZT6/Xe9J5iX/2','FT','PET',NULL,'Active'),('s23615','LOH KWONG KHUIN','LohKK',3,'LOH_Kwong_Khuin@sp.edu.sg','','','','$2a$10$C9PM7TnGrzvOYHVZpiy4muO2pGmUAZhe8n6ZV.KJvU3NXh7MuKwFe','FT','PET',NULL,'Active'),('s23967','QUEK CHEE SIONG','QuekCS',20,'QUEK_Chee_Siong@sp.edu.sg','','','','$2a$10$1I2BnyFBa.JoqOfDnWmJZ.mgH4gbK2qkfkgRbJ4MtP8sIGAjItj2a','FT','PET',NULL,'Active'),('s24657','LEE KAY BENG','LeeKB',21,'LEE_Kay_Beng@sp.edu.sg','','','','$2a$10$w4aAWzvOS/hhzoe2eJhAP.Gna84UIGR.34bPR83i9hR86nnk6OsIi','FT','PET',NULL,'Active'),('s25854','WONG SHIN YUEH','WongSY',24,'WONG_Shin_Yueh@sp.edu.sg','','','','$2a$10$OjnWDHqkzi2wf86LOTiuaeGbba2vVh7nEWvmfQ4A6zE9nDxASsfqi','FT','PET',NULL,'Active'),('s25943','ELYNN CHEE CHUI KAM','Elynn Chee',23,'Elynn_CHEE@sp.edu.sg','','','','$2a$10$sqMTtbrVHUJ6dIPDQfODG.kOhOKttXIdRq/vIqJXai/U/07laPPyK','FT','PET',NULL,'Active'),('s26076','NGIAM-LAU BEE HUA SHIRLEY','Shirley Ngiam',20,'NGIAM-LAU_Bee_Hua@sp.edu.sg','','','','$2a$10$rbAFDm8NgAIPNp0Haq2HZuNjKSzbJII2IKIDO0jYh5ATgaZK82752','FT','PET',NULL,'Active'),('s27145','TEO SOEK LING','TeoSL',22,'TEO_Soek_Ling@sp.edu.sg','68706086','','Lecturer & MC roles','$2a$10$BK52xQgwwkaY4ylL0sea6ua/5UflVnlY5lkxysBKUWchz1U8hjgSK','FT','PET',NULL,'Active'),('s28396','BORST PAUWELS HUBERTUS','Hubetus',3,'Hubertus_BORST_PAUWELS@sp.edu.sg','','','','$2a$10$ndMkTtBFx8cC93uk00pV0uNGHvay3nP.vBxAJH5eWG96pzc.6/HuG','FT','PET',NULL,'Active'),('s30467','MAGDALENE LIM SEOT HUANG ','Magdalene Lim',20,'Magdalene_LIM@sp.edu.sg','','','','$2a$10$9Sx1pXm3dZflFMnR45kjG.DH7RMoxeLIgDUHBejKhtu/iPt6mgv7O','FT','PET',NULL,'Active'),('s31567','YEE SOOK FUN','YeeSF',6,'YEE_Sook_Fun@sp.edu.sg','','','Admin Support','$2a$10$SVNtMsiPpnq27AqOxfkTYepN3s0hvHxDe5LuSOvP0e5LWZ/I35Kru','AL','PET',NULL,'Active'),('s33083','TAN TECK JUNE','TanTJ',3,'TAN_Teck_June@sp.edu.sg','','','','$2a$10$aaGbgjAfO89Iq0.8hMMQqOJvv/Fp1TT8mi3v/jMC2IhAQvhXGKbPK','FT','PET',NULL,'Active'),('s33407','ONG YANG YANG','OngYY',22,'ONG_Yang_Yang@sp.edu.sg','','','','$2a$10$7fRjaoCe1r9jF6KjYQGJq.ZB80vLdNelRQD3u7iGC4f0EiqAZVTpK','FT','PET',NULL,'Active'),('s33961','YEO EI LEEN','Eileen Yeo',23,'Eileen_YEO@sp.edu.sg','','','','$2a$10$xV/frwXsxzEPGsjZcsWxE..5pkGmVpwjezEDDr4JAUioXzTfmJT9e','FT','PET',NULL,'Active'),('s33976','TAN CHECK MENG (DR)','TanCM',3,'TAN_Check_Meng@sp.edu.sg','','','','$2a$10$w4kFjsU89MW6xtfPJZHak.rXWx0w9q48p4jR0LZpuQK7.jw18ZtRi','FT','PET',NULL,'Active'),('s34666','JANNY CHAN WAI CHING','Janny Chan',23,'Janny_CHAN@sp.edu.sg','','','','$2a$10$8qy7fPuIXo611MjQYPT2POD3XzUmFpKtzWCok.Fn4ja8lOKYPoeMC','FT','PET',NULL,'Active'),('s34682','DORA CHUA HEOK HOON','Dora Chua',23,'Dora_CHUA@sp.edu.sg','','','','$2a$10$0D8QSl7gFI/dX7zOxzARJ.OVckXp55LchnW74kKO93au.fT5372pe','FT','PET',NULL,'Active'),('s35333','Lin Zhao','LinZhao',2,'','','','AL','$2a$10$WwwO21iJnltb3EMon.gYT.cek7mBW/b5tA0ydx6a/VMutlaW6Udt2','AL','PET',NULL,'Active'),('s36901','KENNY SEAH HIN YONG','Kenny Seah',24,'Kenny_SEAH@sp.edu.sg','','','','$2a$10$Vj6PXlLwpy6ivEtQyzwDDuwm.oKz6ySBUz618JWSXMt7E9dt3FXXO','AL','PET',NULL,'Active'),('s37251','MONREAL JUSTIN','Justin',23,'Justin_MONREAL@sp.edu.sg','','','','$2a$10$k2HoZRlSxvTCfNyapjVkfOJKFfHDlujWsEK0apM/ftiZdr0Th2U5u','FT','PET',NULL,'Active'),('s37405','TAN CHEE SEONG','TanCS',23,'TAN_Chee_Seong@sp.edu.sg','','','','$2a$10$JHM9lESSPdM05yKYfpThyOEa92a35H0AdAfmFY.Pci/D77JStRWTi','FT','PET',NULL,'Active'),('s37773','TAN BOON YUEN','TanBY',24,'TAN_Boon_Yuen@sp.edu.sg','','','','$2a$10$k26HoB5LlJGHKFuYDRz1Ju53bFlq0y6.uTab.gZ4UpVLXqGwd8KUi','FT','PET',NULL,'Active'),('s38092','CHONG CHEE SENG','ChongCC',20,'CHONG_Chee_Seng@sp.edu.sg','','','','$2a$10$vEKzjS5f2kvfvgjITo4UKedpt2Cb0JT9s/8aBBHO1yj5oyT0PZKAq','FT','PET',NULL,'Active'),('s38111','TAN HU-SHIEN','TanHS',23,'TAN_Hu-Shien@sp.edu.sg','','','','$2a$10$fs5sSqJYb70Mk3EO73.LBu0oB6edLo.TQ9skmmEd2SHlk1ptnzMSC','FT','PET',NULL,'Active'),('s38215','VERNON TAN SENG WAH ','Vernon Tan',23,'Vernon_TAN@sp.edu.sg','','','','$2a$10$3LcCY6zO6vfnFeeNPTPOSOc3OBmzoLFIR76GoggVcqaa4jqgRUzWq','FT','PET',NULL,'Active'),('s38471','CALVIN SIAK CHIA BIN','Calvin Siak',23,'Calvin_SIAK@sp.edu.sg','','','','$2a$10$yXF7pQ7ozuAskRnIKDjAxu6EikIyHEfSukvpgR3VgYpiqtvRJLQhK','FT','PET',NULL,'Active'),('s38552','EDWIN LIM','Edwin Lim',22,'Edwin_LIM@sp.edu.sg','','','','$2a$10$9QFRAQWLPc0/06qr2Q/AGOhUpUmHjlkCgI6IBw2yigUlezas0a4Bq','FT','PET',NULL,'Active'),('s39056','JUNIE TAN SOEK LENG','Junie Tan',23,'Junie_TAN@sp.edu.sg','','','','$2a$10$2hlX6vpjyqF63gwGy.IqpOXSeV6rxBxEVfpcHQE.9ynibaGu.J05K','FT','PET',NULL,'Active'),('s39296','PETER LEONG KHAI WENG (DR)','Peter Leong',3,'Peter_LEONG@sp.edu.sg','','','','$2a$10$r0bxlQMY8DgQyCPIHaOyOudZGAEXNbYfxi/Pt6pBRno/zD8yQC3.i','FT','PET',NULL,'Active'),('s39586','LIEW CHIN CHUAN','LiewCC',24,'LIEW_Chin_Chuan@sp.edu.sg','','','','$2a$10$m/4/PjboXFQFN0YG4iz/QeLj5rQPYZkjFj0fZaCGlw5OBYaAXRUi.','FT','PET',NULL,'Active'),('s41112','SAMSON YEOW SOON KEONG','Samson Yeow',21,'Samson_YEOW@sp.edu.sg','','','','$2a$10$ogaBIBeNxP42qjlMa2foU.ZeXGZ6mkw8pjdj05SvpLqxbEygBG/1q','FT','PET',NULL,'Active'),('s41367','ALVIN TANG','Alvin Tang',24,'Alvin_TANG@sp.edu.sg','','','','$2a$10$cSYsCLQTSPN8.6xF7OVN4.pgre5bMvKDxaqL1DVp6Xxif.kWxq10O','FT','PET',NULL,'Active'),('s41559','KARL KWAN KAR KIN','Karl Kwan',21,'Karl_KWAN@sp.edu.sg','','','','$2a$10$dB6WztnZaF6zBQA.Dt1xiuQB/eW13I6a0fx48ei2pfzZ/TFM1D2Te','FT','PET',NULL,'Active'),('s41652','LOW JIN KIAT','LowJK',20,'LOW_Jin_Kiat@sp.edu.sg','','','Lecturer & MC role','$2a$10$fJTvLKs0tLDdKsduKWjKbO6SoXFg7Oo2yJiM79RGWZ2pjpwh1COaS','FT','PET',NULL,'Active'),('s41829','VINCENT GOH LIAN KOON','Vincent Goh',20,'Vincent_GOH@sp.edu.sg','','','','$2a$10$vfQKYSvko2NZGRu5eC6fjeh4a/oLov7auJmslGEIicUj6MXHaqxtm','FT','PET',NULL,'Active'),('s42469','LIM CHENG CHONG','LimCC',23,'LIM_Cheng_Chong@sp.edu.sg','','','','$2a$10$mlVTgqo2JARwcfJkcikSrO.UbPXOEAuY3dlRhGzG0sbwpsqf6bmwW','FT','PET',NULL,'Active'),('s43036','DARYL LIM HOCK LYE','Daryl Lim',23,'Daryl_LIM@sp.edu.sg','','','','$2a$10$T1oCrLZFKxBkJreMVKAiquuXpjOQtZwSMzF.HJg/BdL6Ip2XgStKe','FT','PET',NULL,'Active'),('s43331','BORIS CHOO YUNG THAI','Boris choo',21,'Boris_CHOO@sp.edu.sg','','','','$2a$10$GwOwgi9HfVNOtqbEFJF51eM3krO7jsss9s4HQDJ0L7DInIpWVRu0G','FT','PET',NULL,'Active'),('s43500','JEREMIAH ANG YONG EN','Jeremiah Ang',20,'Jeremiah_ANG@sp.edu.sg','','','','$2a$10$N0jDCZDfZL9Q54mEVJ.I/.8PYq2vth6VXF63yeAPTwtAEcmM.SNve','FT','PET',NULL,'Active'),('s43518','STEVEN NG NGEE KUNG','Steven Ng',3,'Steven_NG@SP.EDU.SG','','','','$2a$10$b4gVaEnNaXCn8QLK7soRwOZcSgPwvm0LklplDPGhsRZXmZ363XBIS','FT','PET',NULL,'Active'),('s43546','KENNETH TAN PUAY YONG','Kenneth Tan',23,'Kenneth_TAN@SP.EDU.SG','','','','$2a$10$LPpeZr/N9a0TLAmL7Adfz.esFQafuCAvRNOZKD3/3CFwCYwwReHlq','FT','PET',NULL,'Active'),('s43547','QIU ZIXUAN WILSON (DR)','Wilson Qiu',3,'QIU_Zixuan@SP.EDU.SG','','','','$2a$10$6/abKmF5SqsNIZBts8e6Ru8rnBXlPtKOm7kbMH6pM98PBf92unxpK','FT','PET',NULL,'Active'),('s43578','TIMOTHY TAN JI REN','Timothy Tan',21,'Timothy_TAN@SP.EDU.SG','','','','$2a$10$5c1ZaAyYkGDo2XL3gryuPuz1SsJNs2OcpVtN8YEHvuoYTFoONPGt2','FT','PET',NULL,'Active');
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
  CONSTRAINT `staff_privileges_ibfk_1` FOREIGN KEY (`fk_role_id`) REFERENCES `system_roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staff_privileges_ibfk_2` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_privileges`
--

LOCK TABLES `staff_privileges` WRITE;
/*!40000 ALTER TABLE `staff_privileges` DISABLE KEYS */;
INSERT INTO `staff_privileges` VALUES (48,'1','123456'),(57,'2','s35333'),(83,'5','s31567'),(85,'2','s41652'),(86,'4','s41652'),(87,'2','s24657'),(88,'2','s27145'),(89,'4','s27145'),(90,'2','s33407'),(91,'2','s10131825'),(92,'4','s10131825'),(93,'2','s28396'),(94,'4','s28396'),(99,'2','s38092'),(100,'4','s38092'),(106,'2','s43500'),(107,'4','s43500'),(108,'2','s43546'),(109,'4','s43546'),(115,'2','s43331'),(116,'4','s43331'),(117,'2','s41829'),(118,'4','s41829'),(119,'2','s36901'),(120,'2','s34682'),(121,'2','s34666'),(122,'2','s25943'),(123,'4','s25943'),(125,'2','s41559'),(126,'4','s41559'),(127,'2','s17465'),(128,'4','s17465'),(129,'2','s39296'),(130,'4','s39296'),(131,'2','s39586'),(132,'2','s42469'),(133,'2','s43036'),(134,'2','s30467'),(135,'4','s30467'),(136,'2','s23615'),(137,'4','s23615'),(138,'2','s37251'),(139,'4','s37251'),(140,'2','s43518'),(141,'4','s43518'),(142,'2','s26076'),(143,'4','s26076'),(144,'2','s43547'),(145,'4','s43547'),(146,'2','s23967'),(147,'4','s23967'),(148,'2','s38471'),(149,'2','s10131946'),(150,'4','s10131946'),(151,'2','s37773'),(152,'2','s33976'),(153,'2','s37405'),(154,'4','s37405'),(155,'2','s38111'),(156,'4','s38111'),(157,'2','s43578'),(158,'4','s43578'),(159,'2','s38215'),(160,'2','s39056'),(161,'2','s33083'),(162,'4','s33083'),(163,'2','s25854'),(164,'2','s33961'),(165,'2','s41112'),(166,'2','s11006028'),(167,'4','s11006028'),(168,'2','s10006062'),(169,'4','s10006062'),(170,'2','s11007087'),(171,'4','s11007087'),(172,'2','s38552'),(173,'2','s41367');
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
INSERT INTO `staff_types` VALUES ('AL','Adjunct Lecturer',24.0,'PET+CET+other schools'),('FT','Full-Time Lecturer',20.0,'Full-Time Lecturer');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-26  0:03:03
