-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(500) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `timestamps` bigint DEFAULT NULL,
  `user_id` int NOT NULL,
  `likes` int DEFAULT '0',
  `userLiked` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (81,'','http://localhost:3000/images/jozsef-szabo-cxR9R_hTdtg-unsplash1656338365036.jpg',1656338365324,11,0,NULL),(98,'','http://localhost:3000/images/matthew-hamilton-5GNo4cx0PvM-unsplash1656352902387.jpg',1656352902646,18,0,NULL),(105,'','http://localhost:3000/images/zac-porter-XLmjl7VCbeU-unsplash1656416831095.jpg',1656416831360,11,0,NULL),(106,'Et si je modifié le texte?','http://localhost:3000/images/marek-piwnicki-n2SEGqld_G8-unsplash1656425856692.jpg',1656416903920,11,0,NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,'Admin','Istrateur','admin@istrateur.com','$2b$10$5OdqXuG4pFHrHwuDe8OzOeQh.ExlsTs33UYH7Lgm3Kz99zsq45wAS',1),(17,'Estelle','Beauchamp','fcbeauchamp2@yopmail.com','$2b$10$kwmqzOxeMRjuSLQbAlOuvOpF/8Wsvf7K1JwEfl9ZxO/53BfviRIAm',0),(18,'Flore ','Basset','fubasset20@gmail.com','$2b$10$RYZOTfOuaUzkmdaEzmLqVO7m6qGH5iRYMpob/BUFODQGlUyRpaIWS',0),(19,'Justin','Vail','imvail12@outlook.com','$2b$10$qVpXQfKCxhDN24dAzCzli.6F1sLporoQVHQ9IPSFJyMgN9Xh5sel2',0),(20,'Valentin','Vesely','hhvesely7@proton.me','$2b$10$.KbPhDJIDpHjcs2P9RJc2embMtNpTMyNwUdvNrOLm4QdMT4NT6KKi',0),(22,'Loïc ','Caouën','caouen.l@proton.me','$2b$10$frcWa2cS1hQCWeYfGl0Asu57cWdv9FaNFMcH1rMaoHaqjpGo23LR.',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'groupomania'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-28 16:36:00
