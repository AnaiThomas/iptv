-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-05-2023 a las 17:44:19
-- Versión del servidor: 10.6.12-MariaDB-cll-lve
-- Versión de PHP: 7.4.33

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
-- Estructura Stand-in para la vista `auditoria`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `auditoria`;
CREATE TABLE `auditoria` (
`usuario` varchar(250)
,`fecha` timestamp
,`query` text
,`msg` text
,`obj` varchar(120)
,`method` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `beneficiario`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `beneficiario`;
CREATE TABLE `beneficiario` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `concepto`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `concepto`;
CREATE TABLE `concepto` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `conceptoAll`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `conceptoAll`;
CREATE TABLE `conceptoAll` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cotizacion`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `cotizacion`;
CREATE TABLE `cotizacion` (
`eje` year(4)
,`Prom` varchar(20)
,`ENE` varchar(20)
,`FEB` varchar(20)
,`MAR` varchar(20)
,`ABR` varchar(20)
,`MAY` varchar(20)
,`JUN` varchar(20)
,`JUL` varchar(20)
,`AGO` varchar(20)
,`SEP` varchar(20)
,`OCT` varchar(20)
,`NOV` varchar(20)
,`DIC` varchar(20)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `dependencia`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `dependencia`;
CREATE TABLE `dependencia` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `ee`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `ee`;
CREATE TABLE `ee` (
`id` int(10) unsigned
,`plan` int(10) unsigned
,`concepto` int(10) unsigned
,`beneficiario` int(10) unsigned
,`proyecto` int(10) unsigned
,`dependencia` int(10) unsigned
,`estado` int(10) unsigned
,`fuente` int(10) unsigned
,`liquidacion` int(10) unsigned
,`eje` smallint(5) unsigned
,`detalle` varchar(250)
,`descripcion` varchar(250)
,`expediente` varchar(250)
,`obs` varchar(250)
,`comprobante` varchar(250)
,`ap` varchar(20)
,`og` varchar(20)
,`dictamen` tinyint(3) unsigned
,`acto` tinyint(3) unsigned
,`monto` decimal(18,2)
,`periodo` date
,`periodo_fin` date
,`fidp` date
,`fum` date
,`fing` date
,`fprev` date
,`fdev` date
,`fpag` date
,`ualta` int(10) unsigned
,`umodi` int(10) unsigned
,`falta` timestamp
,`fmodi` timestamp
,`useg` int(10) unsigned
,`d_Beneficiario` varchar(250)
,`d_Concepto` varchar(250)
,`d_Dependencia` varchar(250)
,`d_Estado` varchar(250)
,`d_Fuente` varchar(250)
,`d_Liquidacion` varchar(250)
,`d_Plan` varchar(250)
,`d_Proyecto` varchar(250)
,`d_Ualta` varchar(250)
,`d_Umodi` varchar(250)
,`d_Useg` varchar(250)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `entidad`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `entidad`;
CREATE TABLE `entidad` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `equipo`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `equipo`;
CREATE TABLE `equipo` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`first` varchar(250)
,`avatar` varchar(250)
,`rol` tinyint(4)
,`equipo` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `estado`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `estado`;
CREATE TABLE `estado` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f000101`
--

DROP TABLE IF EXISTS `f000101`;
CREATE TABLE `f000101` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `gId` varchar(250) NOT NULL,
  `gEmail` varchar(250) NOT NULL,
  `gName` varchar(250) NOT NULL,
  `gNameLast` varchar(250) NOT NULL,
  `gNameFirst` varchar(250) NOT NULL,
  `gLocale` varchar(20) NOT NULL,
  `gAvatar` varchar(250) NOT NULL,
  `gEmailVerified` tinyint(1) NOT NULL DEFAULT 1,
  `status` char(2) DEFAULT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT current_timestamp(),
  `DateLast` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rol` tinyint(4) NOT NULL DEFAULT 0,
  `equipo` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `remote` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f000111`
--

DROP TABLE IF EXISTS `f000111`;
CREATE TABLE `f000111` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `cts` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Current TimeStamp',
  `ip` varchar(250) NOT NULL COMMENT 'IP address',
  `reqm` varchar(250) NOT NULL COMMENT 'Req Method',
  `errorCode` varchar(250) NOT NULL,
  `errorDesc` varchar(250) NOT NULL,
  `ipContinent` varchar(250) NOT NULL,
  `ipCountry` varchar(250) NOT NULL,
  `ipRegion` varchar(250) NOT NULL,
  `ipCity` varchar(250) NOT NULL,
  `ipZip` varchar(250) NOT NULL,
  `gErrorCode` varchar(250) NOT NULL,
  `gErrorDesc` varchar(250) NOT NULL,
  `gId` varchar(250) NOT NULL,
  `gToken` varchar(250) NOT NULL,
  `gEmail` varchar(250) NOT NULL,
  `gName` varchar(250) NOT NULL,
  `gNameLast` varchar(250) NOT NULL,
  `gNameFirst` varchar(250) NOT NULL,
  `gAvatar` varchar(250) NOT NULL,
  `gLocale` varchar(20) NOT NULL,
  `gEmailVerified` tinyint(1) NOT NULL DEFAULT 1,
  `gAtHash` varchar(100) NOT NULL,
  `gDateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `gDateExp` timestamp NOT NULL DEFAULT current_timestamp(),
  `gJti` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f000211`
--

DROP TABLE IF EXISTS `f000211`;
CREATE TABLE `f000211` (
  `id` int(10) UNSIGNED NOT NULL,
  `userFrom` int(10) UNSIGNED NOT NULL,
  `userTo` int(10) UNSIGNED NOT NULL,
  `msg` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f000311`
--

DROP TABLE IF EXISTS `f000311`;
CREATE TABLE `f000311` (
  `id` int(10) UNSIGNED NOT NULL,
  `obj` varchar(120) NOT NULL,
  `method` varchar(50) NOT NULL,
  `uid` int(10) UNSIGNED NOT NULL,
  `query` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f00811`
--

DROP TABLE IF EXISTS `f00811`;
CREATE TABLE `f00811` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(512) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateModified` datetime NOT NULL,
  `size` int(10) UNSIGNED NOT NULL,
  `fileId` bigint(20) UNSIGNED NOT NULL,
  `folderParent` bigint(20) UNSIGNED NOT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f00812`
--

DROP TABLE IF EXISTS `f00812`;
CREATE TABLE `f00812` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) NOT NULL DEFAULT 'na',
  `falta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0501`
--

DROP TABLE IF EXISTS `f0501`;
CREATE TABLE `f0501` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `concepto` int(10) UNSIGNED NOT NULL,
  `plan` int(10) UNSIGNED NOT NULL,
  `sector` int(10) UNSIGNED NOT NULL,
  `subsector` int(10) UNSIGNED NOT NULL,
  `jur` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `saf` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `eje` year(4) NOT NULL DEFAULT 2020,
  `ape` char(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `oga` char(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `lim_ap` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `lim_og` varchar(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `pg` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `sp` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `py` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `ac` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `ob` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `inc` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `pri` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `par` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `sup` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `ipp` char(5) NOT NULL DEFAULT '',
  `d_pg` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_sp` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_py` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_ac` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_ob` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_inc` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_pri` varchar(200) NOT NULL DEFAULT ' ',
  `d_par` varchar(200) NOT NULL DEFAULT ' ',
  `d_sup` varchar(200) NOT NULL DEFAULT 'n_a',
  `d_concepto` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_plan` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_sector` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_subsector` varchar(250) NOT NULL DEFAULT 'n_a',
  `ubi` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fue` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `eco` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fin` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `pro` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fte` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `pex` varchar(50) NOT NULL DEFAULT '',
  `bapin` varchar(50) NOT NULL DEFAULT '',
  `inicial` decimal(18,2) NOT NULL DEFAULT 0.00,
  `vigente` decimal(18,2) NOT NULL DEFAULT 0.00,
  `potencial` decimal(18,2) NOT NULL DEFAULT 0.00,
  `distribuido` decimal(18,2) NOT NULL DEFAULT 0.00,
  `restringido` decimal(18,2) NOT NULL DEFAULT 0.00,
  `preventivo` decimal(18,2) NOT NULL DEFAULT 0.00,
  `compromiso` decimal(18,2) NOT NULL DEFAULT 0.00,
  `devengado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pagado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pagadofin` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pagadototal` decimal(18,2) NOT NULL DEFAULT 0.00,
  `reserva_dev` decimal(18,2) NOT NULL DEFAULT 0.00,
  `reserva_comp` decimal(18,2) NOT NULL DEFAULT 0.00,
  `dispo_comp` decimal(18,2) NOT NULL DEFAULT 0.00,
  `dispo_dev` decimal(18,2) NOT NULL DEFAULT 0.00,
  `dispo_gastar` decimal(18,2) NOT NULL DEFAULT 0.00,
  `ualta` int(10) UNSIGNED NOT NULL,
  `umodi` int(10) UNSIGNED DEFAULT NULL,
  `falta` timestamp NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0502`
--

DROP TABLE IF EXISTS `f0502`;
CREATE TABLE `f0502` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `concepto` int(10) UNSIGNED NOT NULL,
  `plan` int(10) UNSIGNED NOT NULL,
  `sector` int(10) UNSIGNED NOT NULL,
  `subsector` int(10) UNSIGNED NOT NULL,
  `jur` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `saf` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `eje` year(4) NOT NULL DEFAULT 2020,
  `ape` char(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `oga` char(14) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `pg` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `sp` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `py` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `ac` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `ob` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `inc` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `pri` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `par` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `sup` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `ipp` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL DEFAULT '',
  `d_ac` varchar(100) NOT NULL DEFAULT '',
  `d_sup` varchar(100) NOT NULL DEFAULT '',
  `d_concepto` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_plan` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_sector` varchar(250) NOT NULL DEFAULT 'n_a',
  `d_subsector` varchar(250) NOT NULL DEFAULT 'n_a',
  `ubi` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fue` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `eco` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fin` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `pex` varchar(50) NOT NULL DEFAULT '',
  `bapin` varchar(50) NOT NULL DEFAULT '',
  `ee_aa` year(4) NOT NULL DEFAULT 2000,
  `ee_tipo` char(3) NOT NULL DEFAULT '',
  `ee_num` varchar(50) NOT NULL DEFAULT '',
  `expediente` varchar(100) NOT NULL DEFAULT '',
  `freg` date DEFAULT NULL COMMENT 'Fecha Registro',
  `faut` date DEFAULT NULL COMMENT 'Fecha Autorizacion',
  `fcre` date DEFAULT NULL COMMENT 'Fecha Creacion',
  `fcpt` date DEFAULT NULL COMMENT 'Fecha Cpte.',
  `cpt_tipo` varchar(10) NOT NULL DEFAULT '',
  `cpt_eje` year(4) NOT NULL DEFAULT 2000,
  `cpt_num` varchar(50) NOT NULL DEFAULT '',
  `cpt_estado` varchar(50) NOT NULL DEFAULT '',
  `ben_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `ben_nombre` varchar(100) NOT NULL DEFAULT '',
  `preventivo` decimal(18,2) NOT NULL DEFAULT 0.00,
  `compromiso` decimal(18,2) NOT NULL DEFAULT 0.00,
  `devengado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pagado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pagadofin` decimal(18,2) NOT NULL DEFAULT 0.00,
  `original` decimal(18,2) NOT NULL DEFAULT 0.00,
  `vigente` decimal(18,2) NOT NULL DEFAULT 0.00,
  `regularizado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `consumido` decimal(18,2) NOT NULL DEFAULT 0.00,
  `saldo` decimal(18,2) NOT NULL DEFAULT 0.00,
  `reservado` decimal(18,2) NOT NULL DEFAULT 0.00,
  `ualta` int(10) UNSIGNED NOT NULL,
  `umodi` int(10) UNSIGNED DEFAULT NULL,
  `falta` timestamp NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0511`
--

DROP TABLE IF EXISTS `f0511`;
CREATE TABLE `f0511` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `plan` int(10) UNSIGNED NOT NULL,
  `concepto` int(10) UNSIGNED NOT NULL,
  `beneficiario` int(10) UNSIGNED NOT NULL,
  `proyecto` int(10) UNSIGNED NOT NULL,
  `dependencia` int(10) UNSIGNED NOT NULL,
  `estado` int(10) UNSIGNED NOT NULL,
  `fuente` int(10) UNSIGNED NOT NULL,
  `liquidacion` int(10) UNSIGNED NOT NULL,
  `eje` smallint(5) UNSIGNED NOT NULL,
  `detalle` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL DEFAULT '',
  `expediente` varchar(250) NOT NULL,
  `obs` varchar(250) NOT NULL,
  `comprobante` varchar(250) NOT NULL DEFAULT '''''',
  `ap` varchar(20) NOT NULL,
  `og` varchar(20) NOT NULL,
  `dictamen` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `acto` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `monto` decimal(18,2) NOT NULL DEFAULT 0.00,
  `periodo` date NOT NULL,
  `periodo_fin` date DEFAULT NULL,
  `fidp` date DEFAULT NULL COMMENT 'Fecha ingreso DP',
  `fum` date DEFAULT NULL COMMENT 'Fecha Ultimo Mov. GDE',
  `fing` date DEFAULT NULL COMMENT 'Fecha Ingreso Dependencia',
  `fprev` date DEFAULT NULL COMMENT 'Fecha Preventivo',
  `fdev` date DEFAULT NULL COMMENT 'Fecha Devengado',
  `fpag` date DEFAULT NULL COMMENT 'Fecha Pagado',
  `ualta` int(10) UNSIGNED NOT NULL,
  `umodi` int(10) UNSIGNED DEFAULT NULL,
  `falta` timestamp NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `useg` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `estadoAnt` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0590`
--

DROP TABLE IF EXISTS `f0590`;
CREATE TABLE `f0590` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `tipo` varchar(20) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `orden` tinyint(3) UNSIGNED NOT NULL DEFAULT 250,
  `t1` varchar(250) DEFAULT NULL,
  `t2` varchar(250) DEFAULT NULL,
  `t3` varchar(250) DEFAULT NULL,
  `n1` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `n2` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `n3` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `ualta` int(10) UNSIGNED NOT NULL,
  `umodi` int(10) UNSIGNED DEFAULT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0591`
--

DROP TABLE IF EXISTS `f0591`;
CREATE TABLE `f0591` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `nombre` varchar(250) NOT NULL,
  `ap` varchar(20) DEFAULT NULL,
  `og` varchar(20) DEFAULT NULL,
  `concepto` int(10) UNSIGNED NOT NULL DEFAULT 6,
  `sector` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `subsector` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `entidad` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `orden` tinyint(3) UNSIGNED NOT NULL DEFAULT 250,
  `ualta` int(10) UNSIGNED NOT NULL DEFAULT 8000,
  `umodi` int(10) UNSIGNED DEFAULT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0592`
--

DROP TABLE IF EXISTS `f0592`;
CREATE TABLE `f0592` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `tipo` varchar(20) NOT NULL,
  `codigo` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `titulo` varchar(50) NOT NULL DEFAULT '',
  `orden` tinyint(3) UNSIGNED NOT NULL DEFAULT 10,
  `ualta` int(10) UNSIGNED NOT NULL DEFAULT 8000,
  `umodi` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0593`
--

DROP TABLE IF EXISTS `f0593`;
CREATE TABLE `f0593` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `tipo` char(3) NOT NULL,
  `codigo` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `titulo` varchar(50) NOT NULL DEFAULT '',
  `orden` tinyint(3) UNSIGNED NOT NULL DEFAULT 10,
  `ualta` int(10) UNSIGNED NOT NULL DEFAULT 8000,
  `falta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f07001`
--

DROP TABLE IF EXISTS `f07001`;
CREATE TABLE `f07001` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL DEFAULT '',
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `isbot` tinyint(1) NOT NULL DEFAULT 0,
  `first` varchar(250) NOT NULL DEFAULT '',
  `last` varchar(250) NOT NULL DEFAULT '',
  `lang` varchar(10) NOT NULL DEFAULT '',
  `email` varchar(250) NOT NULL DEFAULT 'pendiente',
  `status` char(2) NOT NULL DEFAULT 'pe',
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `up_today` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `up_total` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `up_last` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fbanned` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f07011`
--

DROP TABLE IF EXISTS `f07011`;
CREATE TABLE `f07011` (
  `id` int(10) UNSIGNED NOT NULL,
  `update_id` int(10) UNSIGNED NOT NULL,
  `msg_id` int(10) UNSIGNED DEFAULT NULL,
  `msg_date` int(10) UNSIGNED NOT NULL,
  `msg_type` varchar(100) NOT NULL DEFAULT 'text',
  `msg_text` varchar(5000) NOT NULL DEFAULT '',
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_isbot` tinyint(1) NOT NULL DEFAULT 0,
  `user_first` varchar(250) NOT NULL DEFAULT '',
  `user_last` varchar(250) NOT NULL DEFAULT '',
  `user_name` varchar(250) NOT NULL DEFAULT '',
  `user_lang` varchar(10) NOT NULL DEFAULT '',
  `chat_id` bigint(20) UNSIGNED DEFAULT NULL,
  `chat_type` varchar(50) DEFAULT NULL,
  `chat_title` varchar(250) NOT NULL DEFAULT '',
  `falta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0810`
--

DROP TABLE IF EXISTS `f0810`;
CREATE TABLE `f0810` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `eje` year(4) NOT NULL DEFAULT 2000 COMMENT 'EJERCICIO',
  `saf` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'SAF',
  `pg` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'PROG',
  `sp` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'SUBPG',
  `py` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'PROY',
  `ac` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'ACT',
  `ob` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'OBRA',
  `inc` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'INCISO',
  `pri` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'PRINCIPAL',
  `par` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'PAR',
  `sup` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'SPAR',
  `eco` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'ECO',
  `fue` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'FUENTE',
  `ubi` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'UBIC.GEOG.',
  `fin` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'FIN FUNCION',
  `alta` date NOT NULL COMMENT 'Fecha Alta',
  `doc` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL COMMENT 'Doc.Respaldo',
  `pas` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.Año Sig.',
  `pta` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.Total Actual',
  `p01` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M01',
  `p02` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M02',
  `p03` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M03',
  `p04` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M04',
  `p05` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M05',
  `p06` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M06',
  `p07` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M07',
  `p08` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M08',
  `p09` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M09',
  `p10` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M10',
  `p11` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M11',
  `p12` decimal(18,2) NOT NULL DEFAULT 0.00 COMMENT 'Proy.M12',
  `k1` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.1',
  `k2` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.2',
  `k3` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.3',
  `k4` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.4',
  `k5` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.5',
  `k6` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.6',
  `k7` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.7',
  `k8` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.8',
  `k9` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'ID CAT.9',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'PROCESS ID'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f0901`
--

DROP TABLE IF EXISTS `f0901`;
CREATE TABLE `f0901` (
  `id` int(10) UNSIGNED NOT NULL,
  `eje` year(4) NOT NULL DEFAULT 2000 COMMENT 'EJERCICIO',
  `mm` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'MES',
  `cot` decimal(18,4) NOT NULL DEFAULT 1.0000 COMMENT 'COTIZACION'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `fuente`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `fuente`;
CREATE TABLE `fuente` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `liquidacion`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `liquidacion`;
CREATE TABLE `liquidacion` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `plan`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `plan`;
CREATE TABLE `plan` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`concepto` int(10) unsigned
,`orden` tinyint(3) unsigned
,`ap` varchar(20)
,`og` varchar(20)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proyecto`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `proyecto`;
CREATE TABLE `proyecto` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `sector`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `sector`;
CREATE TABLE `sector` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `subsector`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `subsector`;
CREATE TABLE `subsector` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`titulo` varchar(50)
,`orden` tinyint(3) unsigned
,`t1` varchar(250)
,`t2` varchar(250)
,`t3` varchar(250)
,`n1` mediumint(8) unsigned
,`n2` mediumint(8) unsigned
,`n3` mediumint(8) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `subsidiosGas`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `subsidiosGas`;
CREATE TABLE `subsidiosGas` (
`eje` smallint(5) unsigned
,`monto` decimal(18,2)
,`id_beneficiario` int(10) unsigned
,`id_plan` int(10) unsigned
,`beneficiario` varchar(250)
,`plan` varchar(250)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tipoDato`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `tipoDato`;
CREATE TABLE `tipoDato` (
`nombre` varchar(20)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuario`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `usuario`;
CREATE TABLE `usuario` (
`id` int(10) unsigned
,`nombre` varchar(250)
,`first` varchar(250)
,`avatar` varchar(250)
,`rol` tinyint(4)
,`equipo` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v000311`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `v000311`;
CREATE TABLE `v000311` (
`_fecha` date
,`_nombre` varchar(250)
,`_hora` time /* mariadb-5.3 */
,`_year` int(4)
,`_month` int(2)
,`_uid` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Estructura para la vista `auditoria`
--
DROP TABLE IF EXISTS `auditoria`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `auditoria`  AS SELECT `u`.`gName` AS `usuario`, `a`.`fecha` AS `fecha`, `a`.`query` AS `query`, `a`.`msg` AS `msg`, `a`.`obj` AS `obj`, `a`.`method` AS `method` FROM (`f000311` `a` join `f000101` `u` on(`a`.`uid` = `u`.`id`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `beneficiario`
--
DROP TABLE IF EXISTS `beneficiario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `beneficiario`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'beneficiario' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `concepto`
--
DROP TABLE IF EXISTS `concepto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `concepto`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'concepto' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `conceptoAll`
--
DROP TABLE IF EXISTS `conceptoAll`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `conceptoAll`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'concepto''concepto' ;

-- --------------------------------------------------------

--
-- Estructura para la vista `cotizacion`
--
DROP TABLE IF EXISTS `cotizacion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `cotizacion`  AS SELECT `f0901`.`eje` AS `eje`, max(case when `f0901`.`mm` = 0 then `f0901`.`cot` else '' end) AS `Prom`, max(case when `f0901`.`mm` = 1 then `f0901`.`cot` else '' end) AS `ENE`, max(case when `f0901`.`mm` = 2 then `f0901`.`cot` else '' end) AS `FEB`, max(case when `f0901`.`mm` = 3 then `f0901`.`cot` else '' end) AS `MAR`, max(case when `f0901`.`mm` = 4 then `f0901`.`cot` else '' end) AS `ABR`, max(case when `f0901`.`mm` = 5 then `f0901`.`cot` else '' end) AS `MAY`, max(case when `f0901`.`mm` = 6 then `f0901`.`cot` else '' end) AS `JUN`, max(case when `f0901`.`mm` = 7 then `f0901`.`cot` else '' end) AS `JUL`, max(case when `f0901`.`mm` = 8 then `f0901`.`cot` else '' end) AS `AGO`, max(case when `f0901`.`mm` = 9 then `f0901`.`cot` else '' end) AS `SEP`, max(case when `f0901`.`mm` = 10 then `f0901`.`cot` else '' end) AS `OCT`, max(case when `f0901`.`mm` = 11 then `f0901`.`cot` else '' end) AS `NOV`, max(case when `f0901`.`mm` = 12 then `f0901`.`cot` else '' end) AS `DIC` FROM `f0901` GROUP BY `f0901`.`eje``eje` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `dependencia`
--
DROP TABLE IF EXISTS `dependencia`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `dependencia`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'dependencia' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `ee`
--
DROP TABLE IF EXISTS `ee`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `ee`  AS SELECT `a`.`id` AS `id`, `a`.`plan` AS `plan`, `a`.`concepto` AS `concepto`, `a`.`beneficiario` AS `beneficiario`, `a`.`proyecto` AS `proyecto`, `a`.`dependencia` AS `dependencia`, `a`.`estado` AS `estado`, `a`.`fuente` AS `fuente`, `a`.`liquidacion` AS `liquidacion`, `a`.`eje` AS `eje`, `a`.`detalle` AS `detalle`, `a`.`descripcion` AS `descripcion`, `a`.`expediente` AS `expediente`, `a`.`obs` AS `obs`, `a`.`comprobante` AS `comprobante`, `a`.`ap` AS `ap`, `a`.`og` AS `og`, `a`.`dictamen` AS `dictamen`, `a`.`acto` AS `acto`, `a`.`monto` AS `monto`, `a`.`periodo` AS `periodo`, `a`.`periodo_fin` AS `periodo_fin`, `a`.`fidp` AS `fidp`, `a`.`fum` AS `fum`, `a`.`fing` AS `fing`, `a`.`fprev` AS `fprev`, `a`.`fdev` AS `fdev`, `a`.`fpag` AS `fpag`, `a`.`ualta` AS `ualta`, `a`.`umodi` AS `umodi`, `a`.`falta` AS `falta`, `a`.`fmodi` AS `fmodi`, `a`.`useg` AS `useg`, `b`.`nombre` AS `d_Beneficiario`, `c`.`nombre` AS `d_Concepto`, `d`.`nombre` AS `d_Dependencia`, `e`.`nombre` AS `d_Estado`, `f`.`nombre` AS `d_Fuente`, `g`.`nombre` AS `d_Liquidacion`, `p`.`nombre` AS `d_Plan`, `y`.`nombre` AS `d_Proyecto`, `ua`.`gName` AS `d_Ualta`, `um`.`gName` AS `d_Umodi`, `us`.`gName` AS `d_Useg` FROM (((((((((((`f0511` `a` left join `beneficiario` `b` on(`a`.`beneficiario` = `b`.`id`)) left join `concepto` `c` on(`a`.`concepto` = `c`.`id`)) left join `dependencia` `d` on(`a`.`dependencia` = `d`.`id`)) left join `estado` `e` on(`a`.`estado` = `e`.`id`)) left join `fuente` `f` on(`a`.`fuente` = `f`.`id`)) left join `liquidacion` `g` on(`a`.`liquidacion` = `g`.`id`)) left join `plan` `p` on(`a`.`plan` = `p`.`id`)) left join `proyecto` `y` on(`a`.`proyecto` = `y`.`id`)) left join `f000101` `ua` on(`a`.`ualta` = `ua`.`id`)) left join `f000101` `um` on(`a`.`umodi` = `um`.`id`)) left join `f000101` `us` on(`a`.`useg` = `us`.`id`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `entidad`
--
DROP TABLE IF EXISTS `entidad`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `entidad`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'entidad' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `equipo`
--
DROP TABLE IF EXISTS `equipo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `equipo`  AS SELECT `f000101`.`id` AS `id`, `f000101`.`gName` AS `nombre`, `f000101`.`gNameFirst` AS `first`, `f000101`.`gAvatar` AS `avatar`, `f000101`.`rol` AS `rol`, `f000101`.`equipo` AS `equipo` FROM `f000101` WHERE `f000101`.`equipo` = 11 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `estado`
--
DROP TABLE IF EXISTS `estado`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `estado`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'estado' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `fuente`
--
DROP TABLE IF EXISTS `fuente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `fuente`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'fuente' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `liquidacion`
--
DROP TABLE IF EXISTS `liquidacion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `liquidacion`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'liquidacion' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `plan`
--
DROP TABLE IF EXISTS `plan`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `plan`  AS SELECT `f0591`.`id` AS `id`, `f0591`.`nombre` AS `nombre`, `f0591`.`concepto` AS `concepto`, `f0591`.`orden` AS `orden`, `f0591`.`ap` AS `ap`, `f0591`.`og` AS `og` FROM `f0591` WHERE `f0591`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proyecto`
--
DROP TABLE IF EXISTS `proyecto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `proyecto`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'proyecto' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `sector`
--
DROP TABLE IF EXISTS `sector`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `sector`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'sector' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `subsector`
--
DROP TABLE IF EXISTS `subsector`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `subsector`  AS SELECT `f0590`.`id` AS `id`, `f0590`.`nombre` AS `nombre`, `f0590`.`titulo` AS `titulo`, `f0590`.`orden` AS `orden`, `f0590`.`t1` AS `t1`, `f0590`.`t2` AS `t2`, `f0590`.`t3` AS `t3`, `f0590`.`n1` AS `n1`, `f0590`.`n2` AS `n2`, `f0590`.`n3` AS `n3` FROM `f0590` WHERE `f0590`.`tipo` = 'subsector' AND `f0590`.`orden` > 00 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `subsidiosGas`
--
DROP TABLE IF EXISTS `subsidiosGas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `subsidiosGas`  AS SELECT `a`.`eje` AS `eje`, `a`.`monto` AS `monto`, `a`.`beneficiario` AS `id_beneficiario`, `a`.`plan` AS `id_plan`, `b`.`nombre` AS `beneficiario`, `p`.`nombre` AS `plan` FROM ((`f0511` `a` join `beneficiario` `b` on(`a`.`beneficiario` = `b`.`id`)) join `plan` `p` on(`a`.`plan` = `p`.`id`)) WHERE `a`.`estado` in (195,196,197) AND `a`.`concepto` = 77 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tipoDato`
--
DROP TABLE IF EXISTS `tipoDato`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `tipoDato`  AS SELECT DISTINCT `f0590`.`tipo` AS `nombre` FROM `f0590``f0590` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `usuario`
--
DROP TABLE IF EXISTS `usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `usuario`  AS SELECT `f000101`.`id` AS `id`, `f000101`.`gName` AS `nombre`, `f000101`.`gNameFirst` AS `first`, `f000101`.`gAvatar` AS `avatar`, `f000101`.`rol` AS `rol`, `f000101`.`equipo` AS `equipo` FROM `f000101` WHERE `f000101`.`gEmailVerified` = 11 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v000311`
--
DROP TABLE IF EXISTS `v000311`;

CREATE ALGORITHM=UNDEFINED DEFINER=`wikiredc`@`localhost` SQL SECURITY DEFINER VIEW `v000311`  AS SELECT cast(`P`.`fecha` as date) AS `_fecha`, `U`.`gName` AS `_nombre`, cast(`P`.`fecha` as time) AS `_hora`, year(`P`.`fecha`) AS `_year`, month(`P`.`fecha`) AS `_month`, `P`.`uid` AS `_uid` FROM (`f000311` `P` join `f000101` `U` on(`P`.`uid` = `U`.`id`)) WHERE `P`.`obj` = '/ajax/A05.php''/ajax/A05.php' ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `f000101`
--
ALTER TABLE `f000101`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gId` (`gId`),
  ADD UNIQUE KEY `gEmail` (`gEmail`);

--
-- Indices de la tabla `f000102`
--
ALTER TABLE `f000102`
  ADD PRIMARY KEY (`id`),
  ADD KEY `i_rmv` (`rmv`);

--
-- Indices de la tabla `f000111`
--
ALTER TABLE `f000111`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `f000211`
--
ALTER TABLE `f000211`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_date` (`userFrom`,`falta`),
  ADD KEY `from_to_date` (`userFrom`,`userTo`,`falta`),
  ADD KEY `to_date` (`userTo`,`falta`),
  ADD KEY `to_from_date` (`userTo`,`userFrom`,`falta`);

--
-- Indices de la tabla `f000311`
--
ALTER TABLE `f000311`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `f00811`
--
ALTER TABLE `f00811`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `i_name` (`name`),
  ADD KEY `i_fileId` (`fileId`);

--
-- Indices de la tabla `f00812`
--
ALTER TABLE `f00812`
  ADD PRIMARY KEY (`id`),
  ADD KEY `i_name` (`name`);

--
-- Indices de la tabla `f0501`
--
ALTER TABLE `f0501`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concepto` (`concepto`),
  ADD KEY `eje_concepto` (`eje`,`concepto`);

--
-- Indices de la tabla `f0502`
--
ALTER TABLE `f0502`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concepto` (`concepto`);

--
-- Indices de la tabla `f0511`
--
ALTER TABLE `f0511`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expediente` (`expediente`),
  ADD KEY `plan` (`plan`),
  ADD KEY `eje` (`eje`);

--
-- Indices de la tabla `f0590`
--
ALTER TABLE `f0590`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo_nombre` (`tipo`,`nombre`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `nombre` (`nombre`);

--
-- Indices de la tabla `f0591`
--
ALTER TABLE `f0591`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`concepto`,`nombre`) USING BTREE;

--
-- Indices de la tabla `f0592`
--
ALTER TABLE `f0592`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo_key` (`tipo`,`codigo`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `nombre` (`nombre`),
  ADD KEY `key` (`codigo`);

--
-- Indices de la tabla `f0593`
--
ALTER TABLE `f0593`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `nombre` (`nombre`),
  ADD KEY `key` (`codigo`);

--
-- Indices de la tabla `f07001`
--
ALTER TABLE `f07001`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`name`),
  ADD KEY `userId` (`user_id`),
  ADD KEY `userEmail` (`email`);

--
-- Indices de la tabla `f07011`
--
ALTER TABLE `f07011`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_falta` (`user_id`,`falta`);

--
-- Indices de la tabla `f0810`
--
ALTER TABLE `f0810`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `f0901`
--
ALTER TABLE `f0901`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unica` (`eje`,`mm`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `f000101`
--
ALTER TABLE `f000101`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f000102`
--
ALTER TABLE `f000102`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f000111`
--
ALTER TABLE `f000111`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f000211`
--
ALTER TABLE `f000211`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f000311`
--
ALTER TABLE `f000311`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f00811`
--
ALTER TABLE `f00811`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f00812`
--
ALTER TABLE `f00812`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f0501`
--
ALTER TABLE `f0501`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0502`
--
ALTER TABLE `f0502`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0511`
--
ALTER TABLE `f0511`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0590`
--
ALTER TABLE `f0590`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0591`
--
ALTER TABLE `f0591`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0592`
--
ALTER TABLE `f0592`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0593`
--
ALTER TABLE `f0593`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f07001`
--
ALTER TABLE `f07001`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f07011`
--
ALTER TABLE `f07011`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `f0810`
--
ALTER TABLE `f0810`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK';

--
-- AUTO_INCREMENT de la tabla `f0901`
--
ALTER TABLE `f0901`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
