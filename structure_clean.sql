��-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)

--

-- Host: localhost    Database: metamong

-- ------------------------------------------------------

-- Server version	8.0.39



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

-- Table structure for table `collection`

--



DROP TABLE IF EXISTS `collection`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `collection` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `name` varchar(255) NOT NULL,

  `like` bigint NOT NULL DEFAULT '0',

  `modifiedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `collection_movies_movie`

--



DROP TABLE IF EXISTS `collection_movies_movie`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `collection_movies_movie` (

  `collectionId` bigint NOT NULL,

  `movieId` bigint NOT NULL,

  PRIMARY KEY (`collectionId`,`movieId`),

  KEY `IDX_e66252590fc2eeb3ca58e0584b` (`collectionId`),

  KEY `IDX_1a570574143b8707d80ce072ec` (`movieId`),

  CONSTRAINT `FK_1a570574143b8707d80ce072ecd` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`),

  CONSTRAINT `FK_e66252590fc2eeb3ca58e0584b4` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `comment`

--



DROP TABLE IF EXISTS `comment`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `comment` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `content` text NOT NULL,

  `userId` bigint DEFAULT NULL,

  `movieId` varchar(255) NOT NULL,

  PRIMARY KEY (`id`),

  KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),

  CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `comment_reply`

--



DROP TABLE IF EXISTS `comment_reply`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `comment_reply` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `content` text NOT NULL,

  `userId` bigint DEFAULT NULL,

  `commentId` bigint DEFAULT NULL,

  PRIMARY KEY (`id`),

  KEY `FK_006aeeb4c5be3db0060e3ed6a21` (`userId`),

  KEY `FK_a6e1a3e9e2bf05abccdc0072aa1` (`commentId`),

  CONSTRAINT `FK_006aeeb4c5be3db0060e3ed6a21` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,

  CONSTRAINT `FK_a6e1a3e9e2bf05abccdc0072aa1` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `favorite`

--



DROP TABLE IF EXISTS `favorite`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `favorite` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `addedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `userId` bigint DEFAULT NULL,

  `movieId` bigint DEFAULT NULL,

  PRIMARY KEY (`id`),

  KEY `FK_83b775fdebbe24c29b2b5831f2d` (`userId`),

  KEY `FK_c2e2781471d2bcdea6c55845d11` (`movieId`),

  CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),

  CONSTRAINT `FK_c2e2781471d2bcdea6c55845d11` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `movie`

--



DROP TABLE IF EXISTS `movie`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `movie` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `title` varchar(255) NOT NULL,

  `genre` varchar(100) NOT NULL,

  `contents` text NOT NULL,

  `posterUrl` varchar(255) NOT NULL,

  `favorite` int NOT NULL,

  `runningTime` int NOT NULL,

  `nation` varchar(100) NOT NULL,

  `company` varchar(255) NOT NULL,

  `ratedYn` tinyint NOT NULL,

  `type` varchar(50) NOT NULL,

  `actor` varchar(255) NOT NULL,

  `releasedAt` timestamp NULL DEFAULT NULL,

  `modifiedAt` timestamp NULL DEFAULT NULL,

  `directorName` varchar(100) NOT NULL,

  `stillUrl` varchar(255) NOT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `movie_collections_collection`

--



DROP TABLE IF EXISTS `movie_collections_collection`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `movie_collections_collection` (

  `movieId` bigint NOT NULL,

  `collectionId` bigint NOT NULL,

  PRIMARY KEY (`movieId`,`collectionId`),

  KEY `IDX_16059aa51cff780c5b71d69acc` (`movieId`),

  KEY `IDX_7fd959fdeea397935b0046686d` (`collectionId`),

  CONSTRAINT `FK_16059aa51cff780c5b71d69acc4` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `FK_7fd959fdeea397935b0046686d4` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `user`

--



DROP TABLE IF EXISTS `user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `user` (

  `id` bigint NOT NULL AUTO_INCREMENT,

  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  `updateAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  `deletedAt` timestamp(6) NULL DEFAULT NULL,

  `email` varchar(255) NOT NULL,

  `username` varchar(255) NOT NULL,

  `password` varchar(255) NOT NULL,

  `role` varchar(255) NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)

) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;



--

-- Table structure for table `user_collections_collection`

--



DROP TABLE IF EXISTS `user_collections_collection`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `user_collections_collection` (

  `userId` bigint NOT NULL,

  `collectionId` bigint NOT NULL,

  PRIMARY KEY (`userId`,`collectionId`),

  KEY `IDX_f3bd7583545751727726908fe8` (`userId`),

  KEY `IDX_ab8ff4e83beda8962c93c88a5c` (`collectionId`),

  CONSTRAINT `FK_ab8ff4e83beda8962c93c88a5c2` FOREIGN KEY (`collectionId`) REFERENCES `collection` (`id`),

  CONSTRAINT `FK_f3bd7583545751727726908fe8d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

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



-- Dump completed on 2024-10-13 11:11:45

