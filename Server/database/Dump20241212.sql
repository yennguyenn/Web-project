-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mytest
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `bought`
--

DROP TABLE IF EXISTS `bought`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bought` (
  `invoiceId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`invoiceId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `bought_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`invoiceId`),
  CONSTRAINT `bought_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bought`
--

LOCK TABLES `bought` WRITE;
/*!40000 ALTER TABLE `bought` DISABLE KEYS */;
INSERT INTO `bought` VALUES (1,1,'1',1500.00,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,2,'1',2500.00,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,3,'1',300.00,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,4,'1',400.00,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,5,'1',2800.00,'2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `bought` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `discountId` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`discountId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,'10% off on gold jewelry','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'15% off on diamond rings','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'Free shipping on orders over $500','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'20% off on silver bracelets','2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,'5% off on all purchases','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoiceId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `paymentId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`invoiceId`),
  KEY `userId` (`userId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`paymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,1,1500.00,1,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,2,2500.00,2,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,3,300.00,3,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,4,400.00,4,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,5,2800.00,5,'2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`paymentId`),
  UNIQUE KEY `paymentMethod` (`paymentMethod`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'Credit Card','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'PayPal','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'Bank Transfer','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'Cash on Delivery','2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,'Debit Card','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `productTypeId` int DEFAULT NULL,
  `quantityInStock` int DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `productTypeId` (`productTypeId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productTypeId`) REFERENCES `producttypes` (`productTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Gold Necklace',1500.00,1,10,'18K gold necklace with diamonds','gold_necklace.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'Diamond Ring',2500.00,2,15,'Platinum ring with diamond','diamond_ring.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'Silver Bracelet',300.00,3,20,'Sterling silver bracelet','silver_bracelet.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'Pearl Earrings',400.00,4,25,'Classic pearl earrings','pearl_earrings.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,'Platinum Ring',2800.00,2,8,'Platinum ring with sapphire','platinum_ring.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producttypes`
--

DROP TABLE IF EXISTS `producttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producttypes` (
  `productTypeId` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producttypes`
--

LOCK TABLES `producttypes` WRITE;
/*!40000 ALTER TABLE `producttypes` DISABLE KEYS */;
INSERT INTO `producttypes` VALUES (1,'Necklaces','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'Rings','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'Bracelets','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'Earrings','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `producttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recievediscount`
--

DROP TABLE IF EXISTS `recievediscount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recievediscount` (
  `discountId` int NOT NULL,
  `userid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`discountId`,`userid`),
  KEY `userid` (`userid`),
  CONSTRAINT `recievediscount_ibfk_1` FOREIGN KEY (`discountId`) REFERENCES `discounts` (`discountId`),
  CONSTRAINT `recievediscount_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recievediscount`
--

LOCK TABLES `recievediscount` WRITE;
/*!40000 ALTER TABLE `recievediscount` DISABLE KEYS */;
INSERT INTO `recievediscount` VALUES (1,1,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,2,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,3,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,4,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,5,'2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `recievediscount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'Customer','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'Jeweler','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'Manager','2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,'Guest','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('1-Create-discount.js'),('1-create-payment.js'),('1-create-product-type.js'),('1-create-role.js'),('2-create-product.js'),('2-create-user.js'),('3-create-invoice.js'),('3-create-shopping-cart.js'),('4-create-bought.js'),('4-create-recieve-discount.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcarts`
--

DROP TABLE IF EXISTS `shoppingcarts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppingcarts` (
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `shoppingcarts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `shoppingcarts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcarts`
--

LOCK TABLES `shoppingcarts` WRITE;
/*!40000 ALTER TABLE `shoppingcarts` DISABLE KEYS */;
INSERT INTO `shoppingcarts` VALUES (1,3,1,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,4,2,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,5,1,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,1,1,'2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,2,1,'2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `shoppingcarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `roleId` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phonenumber` (`phonenumber`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john.doe@example.com','password123','John','Doe','123 Main St',1,'1234567890',2,'john.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(2,'jane.smith@example.com','password456','Jane','Smith','456 Elm St',2,'0987654321',3,'jane.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(3,'admin@example.com','adminpass','Admin','User','789 Oak St',1,'1112223333',1,'admin.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(4,'jeweler@example.com','jewelerpass','Tom','Jeweler','321 Pine St',1,'4445556666',3,'tom.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56'),(5,'guest@example.com','guestpass','Guest','User','654 Maple St',1,'7778889999',5,'guest.jpg','2024-12-12 16:20:56','2024-12-12 16:20:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 16:21:28
