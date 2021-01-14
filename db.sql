-- MySQL dump 10.13  Distrib 5.7.18, for Win64 (x86_64)
--
-- Host: localhost    Database: agencias
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agencias`
--

DROP TABLE IF EXISTS `agencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombrefantasia` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `cuit` varchar(45) DEFAULT NULL,
  `habilitada` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencias`
--

LOCK TABLES `agencias` WRITE;
/*!40000 ALTER TABLE `agencias` DISABLE KEYS */;
INSERT INTO `agencias` VALUES (2,'','Remiseria','2035592648',1),(3,'','Remiseria','19238912',0),(4,'','Remiseria','12312343',0),(5,'','Remiseria','123123',0),(6,'','Remiseria','123143',0),(7,'asdasd','Remiseria','123123',0),(8,'asdasd','Remiseria','123123',0),(9,'sadasd','Remiseria','123123',0),(10,'','Remiseria','',0),(11,'Remiseria','Remiseria','201578125481',0),(12,'asdsdas','Remiseria','12312321',0);
/*!40000 ALTER TABLE `agencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivos`
--

DROP TABLE IF EXISTS `archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtramite` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `ruta` varchar(160) DEFAULT NULL,
  `idvinculante` int(11) DEFAULT NULL,
  `tipovinculante` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

LOCK TABLES `archivos` WRITE;
/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
INSERT INTO `archivos` VALUES (1,NULL,'Habilitacion','./archivos/2020-05-03T211533.086Z2',2,'agencia'),(2,NULL,'Habilitacion','./archivos/2020-05-03T235048.051Z2',2,'agencia'),(3,NULL,'Habilitacion','./archivos/2020-05-03T235258.217Z2',2,'agencia'),(4,NULL,'Habilitacion','./archivos/2020-05-03T235344.964Z2',2,'agencia'),(5,NULL,'Habilitacion','./archivos/2020-05-04T000339.214Z2',2,'agencia'),(6,NULL,'Habilitacion','./archivos/2020-05-04T000430.871Z2',2,'agencia'),(7,NULL,'Habilitacion','./archivos/2020-05-04T003350.762Z2',2,'agencia'),(8,NULL,'Habilitacion','./archivos/2020-05-04T004001.909Z2',2,'agencia'),(9,NULL,'Licencia Conducir','./archivos/2020-05-04T122622.666Z3',3,'Persona'),(10,NULL,'Licencia Conducir','./archivos/2020-05-04T122732.440Z3',3,'Persona'),(11,NULL,'Licencia Conducir','./archivos/2020-05-04T122743.426Z3',3,'Persona'),(12,NULL,'Licencia Conducir','./archivos/2020-05-04T122939.431Z3',3,'Persona'),(13,NULL,'Licencia Conducir','./archivos/2020-05-04T123020.585Z3',3,'Persona'),(14,NULL,'Cedula Verde','./archivos/2020-05-04T134028.053Z1',1,'Vehiculo'),(15,NULL,'Cedula Verde','./archivos/2020-05-04T134122.505Z1',1,'Vehiculo'),(16,NULL,'Cedula Verde','./archivos/2020-05-04T134212.972Z1',1,'Vehiculo'),(17,NULL,'Licencia Conducir','./archivos/2020-05-05T114732.549Z2',2,'Persona'),(18,NULL,'Cedula Verde','./archivos/2020-05-05T114845.580Z2',2,'Vehiculo'),(19,NULL,'Cedula Verde','./archivos/2020-05-05T115315.995Z2',2,'Vehiculo'),(20,NULL,'Cedula Verde','./archivos/2020-05-05T115416.756Z2',2,'Vehiculo'),(21,NULL,'Cedula Verde','./archivos/2020-05-06T124710.980Z2',2,'Vehiculo');
/*!40000 ALTER TABLE `archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asociadosvehiculos`
--

DROP TABLE IF EXISTS `asociadosvehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asociadosvehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idvehiculo` int(11) DEFAULT NULL,
  `idpersona` int(11) DEFAULT NULL,
  `idremiseria` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asociadosvehiculos`
--

LOCK TABLES `asociadosvehiculos` WRITE;
/*!40000 ALTER TABLE `asociadosvehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `asociadosvehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direcciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `dpto` varchar(45) DEFAULT NULL,
  `partido` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,'Humberto','509','',NULL,'Burzaco',NULL),(2,'Algja','104','',NULL,'kasjld',NULL),(3,'asdasd','1231','',NULL,'asdasd',NULL),(4,'asdasd','12313','',NULL,'asdasd',NULL),(5,'asdasd','123','',NULL,'asdasd',NULL),(6,'sadasd','123','',NULL,'asdasd',NULL),(7,'asdasd','123','',NULL,'asdasd',NULL),(8,'sadasd','123123','',NULL,'asdasdasd',NULL),(9,'','','',NULL,'',NULL),(10,'Av Hipolito irigoyen','7000','',NULL,'Lanus',NULL),(11,'sadad','123123','asd',NULL,'asdasd',NULL);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadotramites`
--

DROP TABLE IF EXISTS `estadotramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadotramites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadotramites`
--

LOCK TABLES `estadotramites` WRITE;
/*!40000 ALTER TABLE `estadotramites` DISABLE KEYS */;
/*!40000 ALTER TABLE `estadotramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etapatramites`
--

DROP TABLE IF EXISTS `etapatramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etapatramites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtipotramite` int(11) DEFAULT NULL,
  `numeroetapa` int(11) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etapatramites`
--

LOCK TABLES `etapatramites` WRITE;
/*!40000 ALTER TABLE `etapatramites` DISABLE KEYS */;
/*!40000 ALTER TABLE `etapatramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilitaciones`
--

DROP TABLE IF EXISTS `habilitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `habilitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idvinculada` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `vencimiento` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilitaciones`
--

LOCK TABLES `habilitaciones` WRITE;
/*!40000 ALTER TABLE `habilitaciones` DISABLE KEYS */;
INSERT INTO `habilitaciones` VALUES (1,2,'Cuarentena','2020-05-03 20:54:45','2020-05-10'),(2,2,'Cuarentena','2020-05-03 21:04:36','2020-05-10'),(4,3,'Licencia Conducir','2020-05-04 09:27:46','2040-05-10'),(5,3,'Licencia Conducir','2020-05-04 09:29:44','2040-05-10'),(6,3,'Licencia Conducir','2020-05-04 09:30:22','2040-05-10'),(7,2,'Licencia Conducir','2020-05-05 08:47:45','2020-05-10');
/*!40000 ALTER TABLE `habilitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialasociadosvehiculos`
--

DROP TABLE IF EXISTS `historialasociadosvehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialasociadosvehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idvehiculo` int(11) DEFAULT NULL,
  `idpersona` int(11) DEFAULT NULL,
  `idremiseria` int(11) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `fechamodificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialasociadosvehiculos`
--

LOCK TABLES `historialasociadosvehiculos` WRITE;
/*!40000 ALTER TABLE `historialasociadosvehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialasociadosvehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialmovimientos`
--

DROP TABLE IF EXISTS `historialmovimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialmovimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtramite` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `etapa` int(11) NOT NULL,
  `comentario` varchar(1000) DEFAULT NULL,
  `historialmovimientoscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialmovimientos`
--

LOCK TABLES `historialmovimientos` WRITE;
/*!40000 ALTER TABLE `historialmovimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialmovimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialsocios`
--

DROP TABLE IF EXISTS `historialsocios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historialsocios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idremiseria` int(11) DEFAULT NULL,
  `idpersona` int(11) DEFAULT NULL,
  `relacion` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialsocios`
--

LOCK TABLES `historialsocios` WRITE;
/*!40000 ALTER TABLE `historialsocios` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialsocios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspeccionvehiculos`
--

DROP TABLE IF EXISTS `inspeccionvehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inspeccionvehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtramite` int(11) DEFAULT NULL,
  `idvehiculo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspeccionvehiculos`
--

LOCK TABLES `inspeccionvehiculos` WRITE;
/*!40000 ALTER TABLE `inspeccionvehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspeccionvehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemsinspeccionvehiculos`
--

DROP TABLE IF EXISTS `itemsinspeccionvehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsinspeccionvehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idinspeccion` int(11) DEFAULT NULL,
  `campo` varchar(45) DEFAULT NULL,
  `texto` varchar(45) DEFAULT NULL,
  `check` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemsinspeccionvehiculos`
--

LOCK TABLES `itemsinspeccionvehiculos` WRITE;
/*!40000 ALTER TABLE `itemsinspeccionvehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `itemsinspeccionvehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `nomfantasia` varchar(45) DEFAULT NULL,
  `tipodoc` varchar(45) DEFAULT NULL,
  `documento` varchar(45) DEFAULT NULL,
  `cuit` varchar(45) DEFAULT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `nacionalidad` varchar(45) DEFAULT NULL,
  `conductor` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'a','a',NULL,'DNI','23','123412','2020-05-05','asdasd',0),(2,'Pedro','Alvarez',NULL,'DNI','245180484','2145482484','2004-05-15','Argentina',1),(3,'Juan','Perez',NULL,'DNI','13452784','20134527841','2000-05-06','Argentino',1);
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relaciones`
--

DROP TABLE IF EXISTS `relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id1` int(11) NOT NULL,
  `tipo1` varchar(20) NOT NULL,
  `id2` int(11) NOT NULL,
  `tipo2` varchar(20) NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` varchar(50) DEFAULT NULL,
  `vigente` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relaciones`
--

LOCK TABLES `relaciones` WRITE;
/*!40000 ALTER TABLE `relaciones` DISABLE KEYS */;
INSERT INTO `relaciones` VALUES (1,2,'Agencia',1,'Direccion','2020-05-03 12:31:17','Casa Central',1),(2,3,'Agencia',2,'Direccion','2020-05-03 13:29:59','Casa Central',1),(3,4,'Agencia',3,'Direccion','2020-05-03 13:30:28','Casa Central',1),(4,5,'Agencia',4,'Direccion','2020-05-03 13:31:08','Casa Central',1),(5,6,'Agencia',5,'Direccion','2020-05-03 13:31:54','Casa Central',1),(6,7,'Agencia',6,'Direccion','2020-05-03 13:36:38','Casa Central',1),(7,8,'Agencia',7,'Direccion','2020-05-03 13:37:30','Casa Central',1),(8,9,'Agencia',8,'Direccion','2020-05-03 13:37:49','Casa Central',1),(9,1,'Habilitacion',4,'Archivo','2020-05-03 20:54:45','Habilitacion',1),(10,2,'Habilitacion',6,'Archivo','2020-05-03 21:04:36','Habilitacion',1),(11,4,'Habilitacion',11,'Archivo','2020-05-04 09:27:46','Licencia Conducir',1),(12,5,'Habilitacion',12,'Archivo','2020-05-04 09:29:44','Licencia Conducir',1),(13,6,'Habilitacion',13,'Archivo','2020-05-04 09:30:22','Licencia Conducir',1),(14,3,'Persona',1,'Vehiculo','2020-05-04 10:43:16','Titular',1),(15,14,'Relacion',16,'Archivo','2020-05-04 10:43:16','Cedula Verde',1),(16,3,'Persona',1,'Vehiculo','2020-05-04 22:16:15','Conductor',1),(17,10,'Agencia',9,'Direccion','2020-05-05 02:32:22','Casa Central',1),(18,7,'Habilitacion',17,'Archivo','2020-05-05 08:47:45','Licencia Conducir',1),(19,2,'Persona',2,'Vehiculo','2020-05-05 08:48:48','Titular',1),(20,19,'Relacion',18,'Archivo','2020-05-05 08:48:48','Cedula Verde',1),(22,3,'Persona',2,'Vehiculo','2020-05-05 08:53:17','Titular',1),(23,22,'Relacion',19,'Archivo','2020-05-05 08:53:17','Cedula Verde',1),(24,2,'Persona',2,'Vehiculo','2020-05-05 08:54:18','Titular',1),(25,24,'Relacion',20,'Archivo','2020-05-05 08:54:18','Cedula Verde',1),(26,2,'Persona',2,'Vehiculo','2020-05-06 09:47:12','Titular',1),(27,26,'Relacion',21,'Archivo','2020-05-06 09:47:12','Cedula Verde',1),(28,11,'Agencia',10,'Direccion','2020-05-06 09:50:02','Casa Central',1),(29,12,'Agencia',11,'Direccion','2021-01-13 10:11:33','Casa Central',1);
/*!40000 ALTER TABLE `relaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sociosagencias`
--

DROP TABLE IF EXISTS `sociosagencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sociosagencias` (
  `id` int(11) NOT NULL,
  `idagencia` int(11) DEFAULT NULL,
  `idpersona` int(11) DEFAULT NULL,
  `relacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sociosagencias`
--

LOCK TABLES `sociosagencias` WRITE;
/*!40000 ALTER TABLE `sociosagencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `sociosagencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipotramites`
--

DROP TABLE IF EXISTS `tipotramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipotramites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipotramites`
--

LOCK TABLES `tipotramites` WRITE;
/*!40000 ALTER TABLE `tipotramites` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipotramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramites`
--

DROP TABLE IF EXISTS `tramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tramites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `tipo` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `etapa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramites`
--

LOCK TABLES `tramites` WRITE;
/*!40000 ALTER TABLE `tramites` DISABLE KEYS */;
/*!40000 ALTER TABLE `tramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `dominio` varchar(45) DEFAULT NULL,
  `anio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'a','a','a','a'),(2,'asd','asd','asd','asd');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-13 23:43:49
