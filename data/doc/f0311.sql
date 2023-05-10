
DROP TABLE IF EXISTS `f0311`;
CREATE TABLE `f0311` (
  `id`     int(10) UNSIGNED  NOT NULL COMMENT 'PK',
  `tipo`   char(10)          NOT NULL COMMENT 'Tipo de Registro',
  `td`     int(10) SIGNED    NOT NULL COMMENT 'Track Duration',
  `logo`   varchar(300)      NOT NULL COMMENT 'Logo url',
  `grupo`  int(10) UNSIGNED  NOT NULL COMMENT 'id de Grupo',
  `nombre` varchar(100)      NOT NULL COMMENT 'Descripcion',
  `url`    varchar(1000)     NOT NULL COMMENT 'URL',
  `orden`  int(10) UNSIGNED  NOT NULL COMMENT 'Orden',
  `ualta` int(10) unsigned            COMMENT 'Usuario Alta',
  `umodi` int(10) unsigned            COMMENT 'Usuario Alta',,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;



/*

#EXTINF:-1 tvg-logo="https://wikired.com.ar/__k0d1/png/VI--LS86.png" group-title="1.Aire",America NoAnda
http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0053

tipo de registro  => #EXTINF
duracion          => -1         [-1 indica que no se tome en cuenta]
tvg-logo          => "https://wikired.com.ar/__k0d1/png/VI--LS86.png" 
group-title       => "1.Aire"
descripcion       => America
url               => http://www.radiosargentina.com.ar/php/tvm3u.php?id=DIAR0053


*/