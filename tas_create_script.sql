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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  KEY `fk_course_id` (`fk_course_id`),
  CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `fk_evs_mdeo_marker_id` FOREIGN KEY (`mdeo_marker`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_moderator_id` FOREIGN KEY (`moderator`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_code` FOREIGN KEY (`fk_module_code`) REFERENCES `module` (`mod_code`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_module_mcl_id` FOREIGN KEY (`module_mcl`) REFERENCES `staff_information` (`staff_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_semester_code` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE,
  CONSTRAINT `fk_evs_verifier_id` FOREIGN KEY (`verifier`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `jwt_token_storage_ibfk_1` FOREIGN KEY (`fk_staff_id`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=576 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `module_ibfk_2` FOREIGN KEY (`fk_mod_coord`) REFERENCES `staff_information` (`staff_id`) ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_4` FOREIGN KEY (`fk_course_id`) REFERENCES `course` (`course_id`) ON UPDATE CASCADE,
  CONSTRAINT `module_ibfk_5` FOREIGN KEY (`fk_semester_code`) REFERENCES `semester_code` (`semester_code`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 19:48:14
