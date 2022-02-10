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
-- Dumping data for table `nav_items`
--

LOCK TABLES `nav_items` WRITE;
/*!40000 ALTER TABLE `nav_items` DISABLE KEYS */;
INSERT INTO `nav_items` VALUES (1,'Dashboard','/SVG Icons/Dashboard.svg','[1,2,3,4,5]','<li id=\"dashboard\" class=\"nav-item active\"> <a href=\"/home\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Dashboard.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Home</div> </div> </div> </a> </li>'),(2,'Maintenance System','/SVG Icons/Maintenance.svg','[1]','<li id=\"maintenence-system\" class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingOne \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne\"> <img src=\"../SVG Icons/Maintenance.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Maintenance System</span> </button> </h3> <div id=\"flush-collapseOne\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne\" data-bs-parent=\"#accordion\"> <div class=\"accordion-body\"><a href=\"/semester\" class=\"nav-link align-middle px-0\"> Manage Semester </a><a href=\"/course\" class=\"nav-link align-middle px-0\"> Manage Course </a>  <a href=\"/staff-hours\" class=\"nav-link align-middle px-0\"> Manage Staff Type & Hours </a> <a href=\"/designation\" class=\"nav-link align-middle px-0\"> Manage Designation </a> <a href=\"/maintenance\" class=\"nav-link align-middle px-0\"> Manage Modules  </a> <a href=\"/maintenance/staff-info\" class=\"nav-link align-middle px-0\">Manage Staff List </a>  </div> </div> </div> </div> </li>'),(3,'Teaching Assignment System','/SVG Icons/Teaching Allocation System.svg','[1]','<li id=\"teaching-assignment-system\" class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-tas\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTas \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTas\" aria-expanded=\"false\" aria-controls=\"flush-collapseTas\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Teaching Assignment</span> </button> </h3> <div id=\"flush-collapseTas\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTas\" data-bs-parent=\"#accordion-tas\"><div class=\"accordion-body\"> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\">Upload Modules</a> <a href=\"/class-assignment\" class=\"nav-link align-middle px-0\"> Manage Classes </a><a href=\"/teaching-assignment\" class=\"nav-link align-middle px-0\"> Teaching Assignment System</a> </div> </div> </div> </div> </li>'),(4,'Exam Matters','/SVG Icons/Exam Matters.svg','[4]','<li id=\"exam-matters\" class=\"nav-item\"> <a href=\"/exam-verifier\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Exam Matters.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Exam Matters</div> </div> </div> </a> </li>'),(6,'Update Teaching Requirement','/SVG Icons/update teaching requirement.svg','[2]','<li id=\"update-teaching-assignment\" class=\"nav-item\"> <a href=\"/teaching-requirement\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/update teaching requirement.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Teaching Requirement</div> </div> </div> </a> </li>'),(8,'Choose Module Preference','/SVG Icons/Select Module Pref.svg','[2]','<li id=\"choose-module-preference\" class=\"nav-item\"> <a href=\"/module-preference\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Select Module Pref.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Choose Module Preference</div> </div> </div> </a> </li>'),(9,'View Assigned Module','/SVG Icons/Assigned Module.svg','[2]','<li id=\"view-assigned-module\" class=\"nav-item\"> <a href=\"/module-assignment\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Assigned Module.svg\" class=\"icons\"> <div class=\"navbar-title\">View Assigned Module</div> </div> </div> </a> </li>'),(11,'Manage Reports','/SVG Icons/Reports.svg','[1,5]','<li class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-reports\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTwo \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTwo\" aria-expanded=\"false\" aria-controls=\"flush-collapseTwo\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Reports</span> </button> </h3> <div id=\"flush-collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTwo\" data-bs-parent=\"#accordion-reports\"><div class=\"accordion-body\"> <a href=\"/reports/assignment-report\" class=\"nav-link align-middle px-0\"> Assignment Report </a> <a href=\"/reports/mc-list\" class=\"nav-link align-middle px-0\"> Module Coordinator List </a> <a href=\"/reports/summary-by-module\" class=\"nav-link align-middle px-0\"> Summary By Module </a> <a href=\"/reports/summary-by-staff\" class=\"nav-link align-middle px-0\"> Summary By Staff </a> <a href=\"/reports/workload-summary\" class=\"nav-link align-middle px-0\"> Workload Summary </a> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\"> Upload Reports </a> </div> </div> </div> </div> </li>'),(12,'Manage Exam Reports','/SVG Icons/Reports.svg','[1,3]','<li class=\"nav-item-dropdown active\"> <div class=\"accordion accordion-flush\" id=\"accordion-exam-reports\"> <div class=\"accordion-item\"> <h3 class=\"accordion-header\" id=\"flush-headingExamReports\"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseExamReports\" aria-expanded=\"false\" aria-controls=\"flush-collapseExamReports\"> <img src=\"/SVG Icons/Reports.svg\" class=\"icons\"></img> <span class=\"nav-item-text ms-1 d-none d-sm-inline\">Download Exam Reports</span> </button> </h3> <div id=\"flush-collapseExamReports\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingExamReports\" data-bs-parent=\"#accordion-exam-reports\"> <div class=\"accordion-body\"> <a href=\"/reports/examiner-and-moderator-report\" class=\"nav-link align-middle px-0\"> Examiner & Moderator Report </a> <a href=\"/reports/examiner-and-verifier-report\" class=\"nav-link align-middle px-0\"> Examiner & Verifier Report </a></div></div></div></div></li>'),(20,'Maintenance System','/SVG Icons/Maintenance.svg','[4]','<li id=\"maintenance-mc\" class=\"nav-item active\"> <a href=\"/module-coordinator/maintenance\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\" > <img src=\"/SVG Icons/Maintenance.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Maintenance System</div> </div> </div> </a> </li>'),(21,'Teaching Assignment System','/SVG Icons/Teaching Allocation System.svg','[5]','<li id=\"teaching-assignment-system\" class=\"nav-item-dropdown active\"><div class=\"accordion accordion-flush\" id=\"accordion-tas\"><div  class=\"accordion-item\"><h3 class=\"accordion-header\" id=\"flush-headingTas \"> <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseTas\" aria-expanded=\"false\" aria-controls=\"flush-collapseTas\"> <img src=\"/SVG Icons/Teaching Allocation System.svg\" class=\"icons\"></img><span class=\"nav-item-text ms-1 d-none d-sm-inline\">Teaching Assignment</span> </button> </h3> <div id=\"flush-collapseTas\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingTas\" data-bs-parent=\"#accordion-tas\"><div class=\"accordion-body\"> <a href=\"/upload-reports\" class=\"nav-link align-middle px-0\">Upload Modules</a> <a href=\"/class-assignment\" class=\"nav-link align-middle px-0\"> Manage Classes </a> </div> </div> </div> </div> </li>'),(9997,'Update Personal Information','/SVG Icons/Update Personal Info Icon.svg','[2,3,4,5]','<li id=\"update-personal-information\" class=\"nav-item\"> <a href=\"/profile\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Update Personal Info Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Update Personal Information</div> </div> </div> </a> </li>'),(9998,'Change Password','/SVG Icons/Lock Icon.svg','[2,3,4,5]','<li id=\"change-password\" class=\"nav-item\"> <a href=\"/api/change-password\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Lock Icon.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Change Password</div> </div> </div> </a> </li>'),(9999,'Announcements','/SVG Icons/Announcements.svg','[1,2,3,4,5]','<li id=\"announcements\" class=\"nav-item\"> <a href=\"announcements\" class=\"nav-link align-middle px-0\"> <div class=\"navbar-item-outer-wrap\"> <div class=\"navbar-item-wrap\"> <img src=\"/SVG Icons/Announcements.svg\" class=\"icons\"></img> <div class=\"navbar-title\">Announcements</div> </div> </div> </a> </li>');
/*!40000 ALTER TABLE `nav_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profile_picture`
--

LOCK TABLES `profile_picture` WRITE;
/*!40000 ALTER TABLE `profile_picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('CET','Lecturers who lurk in the night',NULL),('PET','Lecturers who lurk in the morning',NULL),('PETCET','Lecturers who are hardcore',NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `staff_privileges`
--

LOCK TABLES `staff_privileges` WRITE;
/*!40000 ALTER TABLE `staff_privileges` DISABLE KEYS */;
INSERT INTO `staff_privileges` VALUES (1,'1','123456'),(6,'1','424455'),(7,'2','654321'),(8,'1','654321'),(9,'1','8405'),(11,'4','S123456'),(20,'4','S111111'),(21,'1','999999'),(22,'2','999999'),(23,'3','999999'),(24,'4','999999'),(25,'5','999999'),(26,'2','S222222'),(27,'3','S333333'),(28,'5','S555555'),(29,'2','S666666'),(30,'5','S666666'),(31,'4','S444444'),(32,'2','s54172');
/*!40000 ALTER TABLE `staff_privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `staff_types`
--

LOCK TABLES `staff_types` WRITE;
/*!40000 ALTER TABLE `staff_types` DISABLE KEYS */;
INSERT INTO `staff_types` VALUES ('AL','Adjunct Lecturer',10.0,''),('FT','Full-Time Lecturer',24.0,NULL);
/*!40000 ALTER TABLE `staff_types` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2022-02-08 23:04:07
