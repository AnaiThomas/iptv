
DROP TABLE IF EXISTS `f0311`;
CREATE TABLE `f0311` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'PK',
  `rms` char(30) NOT NULL COMMENT 'Selector',
  `rmv` varchar(120) NOT NULL COMMENT 'Hashed Validator',
  `uid` int(10) UNSIGNED NOT NULL,
  `fexp` datetime NOT NULL,
  `falta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fmodi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;



