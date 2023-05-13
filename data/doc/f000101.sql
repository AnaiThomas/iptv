-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-05-2023 a las 17:42:49
-- Versión del servidor: 10.6.12-MariaDB-cll-lve
-- Versión de PHP: 7.4.33

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wikiredc_dp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f000101`
--

DROP TABLE IF EXISTS `f000101`;
CREATE TABLE `f000101` (
  `id` int UNSIGNED NOT NULL COMMENT 'PK' AUTO_INCREMENT ,
  `gId` varchar(250) NOT NULL,
  `gEmail` varchar(250) NOT NULL,
  `gName` varchar(250) NOT NULL,
  `gNameLast` varchar(250) NOT NULL,
  `gNameFirst` varchar(250) NOT NULL,
  `gLocale` varchar(20) NOT NULL,
  `gAvatar` varchar(250) NOT NULL,
  `gEmailVerified` tinyint NOT NULL DEFAULT 1,
  `status` char(2) DEFAULT NULL,
  `dateAdded` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateLast` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rol` tinyint NOT NULL DEFAULT 0,
    `remote` tinyint NOT NULL DEFAULT 0,
 PRIMARY KEY (`id`),
 UNIQUE KEY `gId` (`gId`),
 UNIQUE KEY `gEmail` (`gEmail`)    
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `f000101`
--

INSERT INTO `f000101` (`id`, `gId`, `gEmail`, `gName`, `gNameLast`, `gNameFirst`, `gLocale`, `gAvatar`, `gEmailVerified`, `status`, `DateAdded`, `DateLast`, `rol`, `remote`) VALUES
(8000, '103672384297313980133', 'lcarrizo2012@gmail.com', 'Luis Carrizo', 'Carrizo', 'Luis', 'es', 'https://lh3.googleusercontent.com/-QeiJ65lBy8w/AAAAAAAAAAI/AAAAAAAAA34/IQOsDVnzXXY/s96-c/photo.jp', 1, 'ok', '2018-12-01 17:34:38', '2022-11-12 14:51:10', 9,  1),
(8001, '106132431682513478260', 'wikiredargentina@gmail.com', 'wikired argentina', 'argentina', 'wikired', 'es-419', 'https://lh6.googleusercontent.com/-sspXQnVF7rg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucldZ1eGmyle4QkMeIXxhOM0DX4gEg/s96-c/photo.jpg', 0, 'ok', '2020-05-14 20:25:24', '2020-11-23 13:45:02', 8,  0),
(8002, '88888888888888888888', 'dp@wikired.com.ar', 'DP Automatic Process', 'Automatic Process', 'DP', 'es', 'https://dp.wikired.com.ar/data/res/img/user.png', 0, 'no', '2020-07-24 16:08:19', '2022-08-31 19:30:25', 0,  0)
;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
