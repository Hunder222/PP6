-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: third_party_data
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
                              `id` varchar(5) NOT NULL,
                              `name` varchar(45) DEFAULT NULL,
                              `starting_salary` int DEFAULT NULL,
                              `average_salary` int DEFAULT NULL,
                              `highest_salary` int DEFAULT NULL,
                              `unemployment_new_grad_pct` int DEFAULT NULL,
                              `dropout_first_year_pct` int DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `id_UNIQUE` (`id`),
                              CONSTRAINT `chk_average_salary` CHECK ((`average_salary` > 0)),
                              CONSTRAINT `chk_dropout` CHECK ((`dropout_first_year_pct` between 0 and 100)),
                              CONSTRAINT `chk_highest_salary` CHECK ((`highest_salary` > 0)),
                              CONSTRAINT `chk_starting_salary` CHECK ((`starting_salary` > 0)),
                              CONSTRAINT `chk_unemployment` CHECK ((`unemployment_new_grad_pct` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` VALUES ('CYBS','Cybersikkerhed',37600,42100,48000,2,17),('DATA','Datamatiker',31950,36300,43600,5,19),('ITAR','IT-Arkitektur',40000,47000,55000,NULL,21),('ITTE','IT-Teknolog',28000,34200,39300,5,24),('MEKO','Multimediedesigner',19400,26600,32800,8,15),('ØKIT','Økonomi_og_IT',30150,36050,41300,6,27);
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_data`
--

DROP TABLE IF EXISTS `other_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other_data` (
                              `avgBusinessAcademyDropoutPct` float NOT NULL,
                              `avgBusinessAcademyUnemploymentNewGradPct` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_data`
--

LOCK TABLES `other_data` WRITE;
/*!40000 ALTER TABLE `other_data` DISABLE KEYS */;
INSERT INTO `other_data` VALUES (20.6,6.7);
/*!40000 ALTER TABLE `other_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
                          `survey_id` int NOT NULL AUTO_INCREMENT,
                          `survey_name` varchar(150) NOT NULL,
                          PRIMARY KEY (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,'jobSurvey'),(2,'socialSurvey'),(3,'professionalSurvey');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_answers`
--

DROP TABLE IF EXISTS `survey_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_answers` (
                                  `id` varchar(5) NOT NULL,
                                  `question_id` int NOT NULL,
                                  `answer_pct` int DEFAULT NULL,
                                  PRIMARY KEY (`id`,`question_id`),
                                  KEY `fk_educations_has_reasonsForApplying_reasonsForApplying1_idx` (`question_id`),
                                  KEY `fk_educations_has_reasonsForApplying_educations_idx` (`id`),
                                  CONSTRAINT `fk_educations_has_reasonsForApplying_educations` FOREIGN KEY (`id`) REFERENCES `educations` (`id`),
                                  CONSTRAINT `fk_educations_has_reasonsForApplying_reasonsForApplying1` FOREIGN KEY (`question_id`) REFERENCES `survey_questions` (`question_id`),
                                  CONSTRAINT `chk_answer_pct_range` CHECK ((`answer_pct` between 0 and 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_answers`
--

LOCK TABLES `survey_answers` WRITE;
/*!40000 ALTER TABLE `survey_answers` DISABLE KEYS */;
INSERT INTO `survey_answers` VALUES ('CYBS',1,30),('CYBS',2,17),('CYBS',3,17),('CYBS',4,17),('CYBS',5,69),('CYBS',6,78),('CYBS',7,81),('CYBS',8,70),('CYBS',9,79),('CYBS',10,86),('CYBS',11,84),('CYBS',12,79),('DATA',1,52),('DATA',2,20),('DATA',3,14),('DATA',4,7),('DATA',5,76),('DATA',6,81),('DATA',7,78),('DATA',8,76),('DATA',9,79),('DATA',10,82),('DATA',11,83),('DATA',12,77),('ITAR',1,NULL),('ITAR',2,NULL),('ITAR',3,NULL),('ITAR',4,NULL),('ITAR',5,79),('ITAR',6,81),('ITAR',7,82),('ITAR',8,77),('ITAR',9,81),('ITAR',10,85),('ITAR',11,85),('ITAR',12,76),('ITTE',1,39),('ITTE',2,22),('ITTE',3,22),('ITTE',4,17),('ITTE',5,79),('ITTE',6,78),('ITTE',7,81),('ITTE',8,71),('ITTE',9,78),('ITTE',10,83),('ITTE',11,84),('ITTE',12,71),('MEKO',1,25),('MEKO',2,23),('MEKO',3,23),('MEKO',4,15),('MEKO',5,78),('MEKO',6,84),('MEKO',7,76),('MEKO',8,69),('MEKO',9,82),('MEKO',10,84),('MEKO',11,85),('MEKO',12,80),('ØKIT',1,56),('ØKIT',2,17),('ØKIT',3,14),('ØKIT',4,6),('ØKIT',5,77),('ØKIT',6,79),('ØKIT',7,78),('ØKIT',8,74),('ØKIT',9,76),('ØKIT',10,84),('ØKIT',11,83),('ØKIT',12,74);
/*!40000 ALTER TABLE `survey_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_questions` (
                                    `question_id` int NOT NULL AUTO_INCREMENT,
                                    `survey_id` int NOT NULL,
                                    `question_text` varchar(150) NOT NULL,
                                    PRIMARY KEY (`question_id`),
                                    KEY `fk_survey_questions_survey1_idx` (`survey_id`),
                                    CONSTRAINT `fk_survey_questions_survey1` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
INSERT INTO `survey_questions` VALUES (1,1,'Jeg søgte og blev ansat efter et stillingsopslag'),(2,1,'Jeg fik job gennem mit netværk'),(3,1,'Jeg fortsatte i job på den arbejdsplads, hvor jeg skrev opgave / projekt / speciale eller var i praktik'),(4,1,'Jeg fortsatte i job på den arbejdsplads, hvor jeg havde studiejob'),(5,2,'Der er et godt socialt miljø'),(6,2,'Jeg føler mig generelt rigtig godt tilpas på min uddannelse'),(7,2,'Har du oplevet at føle dig ensom på studiet?'),(8,2,'Har du oplevet stærke stress-symptomer i forbindelse med dit studie i dagligdagen?'),(9,3,'Der er et godt fagligt miljø'),(10,3,'Jeg har det generelt godt med at arbejde sammen med andre studerende'),(11,3,'Jeg forstår tingene bedre, når jeg har talt med mine medstuderende om dem'),(12,3,'Mit udbytte af undervisningen er højt');
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16  2:49:24
