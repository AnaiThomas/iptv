-- parametros iniciales
-- 
SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


-- tablas
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


DROP TABLE IF EXISTS `f000102`;
CREATE TABLE `f000102` (
  `id` int UNSIGNED NOT NULL COMMENT 'PK'AUTO_INCREMENT ,
  `rms` char(30) NOT NULL COMMENT 'Selector',
  `rmv` varchar(120) NOT NULL COMMENT 'Hashed Validator',
  `uid` int UNSIGNED NOT NULL,
  `fexp` datetime NOT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `i_rmv` (`rmv`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


DROP TABLE IF EXISTS `f0311`;
CREATE TABLE `f0311` (
  `id`     int UNSIGNED  NOT NULL COMMENT 'PK' AUTO_INCREMENT ,
  `tipo`   char(10)          NOT NULL COMMENT 'Tipo de Registro'  DEFAULT '#EXTINF',
  `td`     int     NOT NULL COMMENT 'Track Duration'    DEFAULT '-1',
  `logo`   varchar(300)      NOT NULL COMMENT 'Logo url'          DEFAULT 'argentina.png',
  `grupo`  varchar(50)       NOT NULL COMMENT 'id de Grupo'       DEFAULT '0.Sin Asignar',
  `nombre` varchar(100)      NOT NULL COMMENT 'Descripcion'       DEFAULT 'Sin Identificar',
  `url`    varchar(1000)     NOT NULL COMMENT 'URL',
  `orden`  int UNSIGNED  NOT NULL COMMENT 'Orden'             DEFAULT '100',
  `ualta` int unsigned            COMMENT 'Usuario Alta'          DEFAULT '8000',
  `umodi` int unsigned            COMMENT 'Usuario Modificacion'  DEFAULT '8000',
  `falta` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha Alta',
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()    COMMENT 'Fecha Modificacion',

  PRIMARY KEY (`id`),
  KEY `orden` (`tipo`,`orden`) USING BTREE
) ENGINE=MyISAM  CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


-- vistas

DROP view IF EXISTS `grupo`;
create view `grupo` as SELECT DISTINCT grupo as nombre FROM `f0311` order by grupo


-- importacion de datos

INSERT INTO `f000101` (`id`, `gId`, `gEmail`, `gName`, `gNameLast`, `gNameFirst`, `gLocale`, `gAvatar`, `gEmailVerified`, `status`, `DateAdded`, `DateLast`, `rol`, `remote`) VALUES
(8000, '103672384297313980133', 'lcarrizo2012@gmail.com', 'Luis Carrizo', 'Carrizo', 'Luis', 'es', 'https://lh3.googleusercontent.com/-QeiJ65lBy8w/AAAAAAAAAAI/AAAAAAAAA34/IQOsDVnzXXY/s96-c/photo.jp', 1, 'ok', '2018-12-01 17:34:38', '2022-11-12 14:51:10', 9,  1),
(8001, '106132431682513478260', 'wikiredargentina@gmail.com', 'wikired argentina', 'argentina', 'wikired', 'es-419', 'https://lh6.googleusercontent.com/-sspXQnVF7rg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucldZ1eGmyle4QkMeIXxhOM0DX4gEg/s96-c/photo.jpg', 0, 'ok', '2020-05-14 20:25:24', '2020-11-23 13:45:02', 8,  0),
(8002, '88888888888888888888', 'dp@wikired.com.ar', 'DP Automatic Process', 'Automatic Process', 'DP', 'es', 'https://dp.wikired.com.ar/data/res/img/user.png', 0, 'no', '2020-07-24 16:08:19', '2022-08-31 19:30:25', 0,  0)
;

INSERT INTO  `f0311` ( `logo` , `grupo` , `nombre` ,   `url` ,  `orden`) VALUES

('VI--LS86.png' , '1.Aire' , 'America NoAnda' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0053' , 100),
('VI---TVP.png' , '1.Aire' , 'TV Pública' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0035' ,   102 )
,('VI--LS83.png' , '1.Aire' , 'Canal 9' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0052' ,    104)
,('VITELEFE.png' , '1.Aire' , 'Telefe' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0051' ,   106 )
,('VI--LS85.png' , '1.Aire' , 'El Trece' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0050' ,  108  )
,('VI----IP.png' , '1.Aire' , 'IP' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0040' , 110   )
,('VI--26TV.png' , '1.Aire' , 'TierraMia' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0026' ,   112 )

,('VI---A24.png' , '2.Noticias' , 'A24 NoAnda' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0054' , 200)
,('VICRONIC.png' , '2.Noticias' , 'Cronica NoAnda' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0039' ,   202 )
,('VI---C5N.png' , '2.Noticias' , 'C5N' , 'plugin://plugin.video.youtube/play/?video_id=CO7ougR0GPY' ,  204  )
,('VI----TN.png' , '2.Noticias' , 'TN' , 'plugin://plugin.video.youtube/play/?video_id=O3bhL1gPdxM' ,  206  )
,('VI--26TV.png' , '2.Noticias' , 'Canal 26' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0047' , 208   )
,('VI----LN.png' , '2.Noticias' , 'La Nación+' , 'plugin://plugin.video.youtube/play/?video_id=6_d4yYpCqsk' ,  210  )
,('VI-NETTV.png' , '2.Noticias' , 'NET TV' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0049' ,  212  )
,('VI---TLX.png' , '2.Noticias' , 'Telemax' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0048' ,  214  )
,('VI----DW.png' , '2.Noticias' , 'DW Español' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0015' ,  216  )
,('Russia-today-logo.svg.png' , '2.Noticias' , 'Rusia Today en Español' , 'https://rt-esp.rttv.com/live/rtesp/playlist.m3u8' , 218   )
,('France24.png' , '2.Noticias' , 'France 24' , 'https://hls.youtb.workers.dev/channel/UCUdOoVWuWmgo1wByzcsyKDQ.m3u8' , 220   )
,('telesur.png' , '2.Noticias' , 'teleSUR' , 'https://github.com/LaneSh4d0w/IPTV_Exception/raw/master/channels/ve/telesur.m3u8' , 222   )
,('histronauta.png' , '2.Noticias' , 'El Histonauta' , 'https://stmv1.cnarlatam.com/elhistonauta/elhistonauta/playlist.m3u8' ,  224  )
,('pymesTV.png' , '2.Noticias' , 'Pymes TV' , 'https://vse2-sa-all62.secdn.net/tvstartup6-channel/live/pymestv/playlist.m3u8' , 226   )
,('VICRURAL.png' , '2.Noticias' , 'Canal Rural' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0010' ,  228  )
,('cgtn.png' , '2.Noticias' , 'China Gobal Español' , 'https://livees.cgtn.com/1000e/prog_index.m3u8' , 230   )
,('vpiTV.png' , '2.Noticias' , 'Venezuela IPtv ' , 'https://ott3.streann.com/loadbalancer/services/public/channels/5d23d5882cdce61dae029fd8/playlist.m3u8' , 232   )

,('abcTV.png' , '3.Paraguay' , 'ABC TV' , 'https://d2e809bgs49c6y.cloudfront.net/live/d87c2b7b-9ecf-4e6e-b63b-b32772bd7851/live.isml/d87c2b7b-9ecf-4e6e-b63b-b32772bd7851.m3u8' ,  300 )
,('c9npy.png' , '3.Paraguay' , 'C9N' , 'https://d4xunn272arip.cloudfront.net/hls/c9n.m3u8' ,  302  )
,('nanduti.png' , '3.Paraguay' , 'Ñanduti TV' , 'https://tvdatta.com:3839/live/nandutitvlive.m3u8' , 304   )
,('snt.png' , '3.Paraguay' , 'SNT' , 'https://d4xunn272arip.cloudfront.net/hls/snt.m3u8' , 306   )
,('trecePY.png' , '3.Paraguay' , 'Trece [No 24x7]' , 'https://stream.rpc.com.py/live/trece.m3u8' ,  308  )
,('unicanal.png' , '3.Paraguay' , 'Unicanal (720p) [No 24x7]' , 'http://45.55.127.106/live/unicanal_mid.m3u8' , 310   )
,('tvaPY.png' , '3.Paraguay' , 'TV Aire' , 'https://59ce1298bfb98.streamlock.net/tvaire/tvaire/playlist.m3u8' ,  312  )

,('VI-GENTV.png' , '4.Variedades' , 'GenTV' , 'http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0028' , 400   )
,('humormax.png' , '4.Variedades' , 'Humor Max' , 'http://vcpar.myplaytv.com/humormax/live/playlist.m3u8' ,  402  )
,('rcn+.png' , '4.Variedades' , 'RCN Más' , 'https://rcntv-rcnmas-1-us.plex.wurl.tv/playlist.m3u8' , 404   )
,('solostandup.png' , '4.Variedades' , 'SoloStandUp [No 24x7]' , 'https://paneltv.online:1936/8116/8116/playlist.m3u8' ,  406  )
,('cdeTV.png' , '4.Variedades' , 'Somos Del Este' , 'https://59ce1298bfb98.streamlock.net/somosdeleste/somosdeleste/playlist.m3u8' , 408   )
,('topLatino.png' , '4.Variedades' , 'Top Latino' , 'https://5cefcbf58ba2e.streamlock.net:543/tltvweb/latintv.stream/playlist.m3u8' , 410   )

,('americaSports.png' , '5.Deportes' , 'America Sports' , 'plugin://plugin.video.youtube/play/?video_id=PD4awtTH58A' ,  500  );





-- fin

SET FOREIGN_KEY_CHECKS=1;
COMMIT;