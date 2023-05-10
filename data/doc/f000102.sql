-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-05-2023 a las 17:43:35
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
-- Estructura de tabla para la tabla `f000102`
--

DROP TABLE IF EXISTS `f000102`;
CREATE TABLE `f000102` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `rms` char(30) NOT NULL COMMENT 'Selector',
  `rmv` varchar(120) NOT NULL COMMENT 'Hashed Validator',
  `uid` int(10) UNSIGNED NOT NULL,
  `fexp` datetime NOT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `f000102`
--
ALTER TABLE `f000102`
  ADD PRIMARY KEY (`id`),
  ADD KEY `i_rmv` (`rmv`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `f000102`
--
ALTER TABLE `f000102`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
