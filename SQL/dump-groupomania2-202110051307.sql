-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania2
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `gif_comments`
--

DROP TABLE IF EXISTS `gif_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gif_comments` (
  `comment` varchar(255) DEFAULT NULL,
  `userid` int NOT NULL,
  `gifid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `gif_comments_ibfk_1` (`userid`),
  KEY `gif_comments_ibfk_2` (`gifid`),
  CONSTRAINT `gif_comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `gif_comments_ibfk_2` FOREIGN KEY (`gifid`) REFERENCES `gifs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gif_comments`
--

LOCK TABLES `gif_comments` WRITE;
/*!40000 ALTER TABLE `gif_comments` DISABLE KEYS */;
INSERT INTO `gif_comments` VALUES ('C\'était une super balade!',32,56,'2021-10-04 14:39:20','2021-10-04 14:39:20',41),('Trop choupinette!!',76,55,'2021-10-04 14:50:09','2021-10-04 14:50:09',46),('vraiment bien',32,56,'2021-10-04 14:57:05','2021-10-04 14:57:13',47),('C\'est le bonheur!',32,58,'2021-10-04 16:00:54','2021-10-04 16:00:54',49),('Adorable!!',76,58,'2021-10-04 16:07:11','2021-10-04 16:07:11',50),('Ma soeur et moi!!',76,59,'2021-10-04 16:08:11','2021-10-04 16:08:11',51);
/*!40000 ALTER TABLE `gif_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gif_likes`
--

DROP TABLE IF EXISTS `gif_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gif_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jaime` tinyint(1) NOT NULL DEFAULT '0',
  `userid` int NOT NULL,
  `gifid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gif_likes_ibfk_2` (`gifid`),
  KEY `gif_likes_ibfk_1` (`userid`),
  CONSTRAINT `gif_likes_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `gif_likes_ibfk_2` FOREIGN KEY (`gifid`) REFERENCES `gifs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gif_likes`
--

LOCK TABLES `gif_likes` WRITE;
/*!40000 ALTER TABLE `gif_likes` DISABLE KEYS */;
INSERT INTO `gif_likes` VALUES (237,1,32,53,'2021-10-03 16:28:10','2021-10-03 16:28:10'),(238,1,32,55,'2021-10-03 16:46:38','2021-10-03 16:46:38'),(240,1,76,56,'2021-10-04 14:00:33','2021-10-04 14:00:33'),(245,1,32,56,'2021-10-04 14:58:40','2021-10-04 14:58:40'),(247,1,32,58,'2021-10-04 16:00:38','2021-10-04 16:00:38'),(248,1,76,59,'2021-10-04 16:07:58','2021-10-04 16:07:58'),(249,1,32,59,'2021-10-04 16:10:06','2021-10-04 16:10:06');
/*!40000 ALTER TABLE `gif_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gifs`
--

DROP TABLE IF EXISTS `gifs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gifs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageurl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gifs_ibfk_1` (`userid`),
  CONSTRAINT `gifs_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gifs`
--

LOCK TABLES `gifs` WRITE;
/*!40000 ALTER TABLE `gifs` DISABLE KEYS */;
INSERT INTO `gifs` VALUES (53,32,'Vive les vacances!!','http://localhost:3000/images/IMG_20200930_164954_1633278115442.jpg','2021-10-03 16:21:55','2021-10-03 16:21:55'),(55,32,'Quelle belle gosse Napoli!!!','http://localhost:3000/images/IMG_0156.JPG1633278187220.jpg','2021-10-03 16:23:07','2021-10-03 16:23:07'),(56,32,'Vive les balades','http://localhost:3000/images/IMG_20200309_104447_1633278239649.jpg','2021-10-03 16:23:59','2021-10-04 13:51:21'),(58,32,'La grosse sieste!','http://localhost:3000/images/IMG_20200627_135930_1633363231233.jpg','2021-10-04 16:00:31','2021-10-04 16:00:31'),(59,76,'Ma jeunesse...','http://localhost:3000/images/IMG_0101.JPG1633363653073.jpg','2021-10-04 16:07:33','2021-10-04 16:07:33');
/*!40000 ALTER TABLE `gifs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210716092617-create-user.js'),('20210716092901-create-gif.js'),('20210716093135-create-gif-like.js'),('20210716093310-create-gif-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (32,'prouve','caroline','Caroline','caroline.prouve@orange.fr','$2b$10$eY8rpkXn6ErnuTVbuzH6ke89Vbnm0K2eG8o6cSr3iNu/p1p1bYsS2',1,'2021-08-20 11:37:16','2021-10-04 16:08:45','Ravie de tous vous retrouver sur ce réseau social! j\'espère apprendre à mieux vous connaitre et que vous aimerez tous mes partages... N\'hésitez pas à commenter!!','http://localhost:3000/images/moi_1633278094049.jpg'),(76,'Cottel','Viviane','Viviane','viviane.cottel@orange.fr','$2b$10$07jHU263yp2TXZu7h/Aq1.EunSxgZmFQp3ZPMF/angZtkY7SiJJKq',0,'2021-10-04 13:59:22','2021-10-04 13:59:22','Je n\'ai pas l\'habitude des réseaux sociaux mais cela me semble être une très bonne idée pour mieux connaitre mes collègues... Au plaisir de partager!!','http://localhost:3000/images/IMG_0101.JPG1633355962653.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'groupomania2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-05 13:07:58
