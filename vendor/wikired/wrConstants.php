<?php
// Proyecto IPTV

// funciones necesarias
if ( !function_exists('_slash') ){
	function _slash($str , $action = 'add'){
		$errorLevel = error_reporting();
		error_reporting( 0 );
		try {
			if ( !is_string ($str) ){
			 	throw new Exception('invalid string ');
			}   
			if ( true === $action  || 'add' == $action) {
				if ( '/' != substr($str, -1) ) {
					$str .= '/';  
				}
			} else {
				if ( '/' == substr($str, -1) ) {
					$str = substr($str , 0 , strlen($str)-1); 
				}     
			}
		} catch (Exception $e) {
			error_log($e->getMessage() , 0);
		}
		error_reporting($errorLevel);
		return $str;
	}
}

// ui
define('_ff' , '<br>' . PHP_EOL);
define('_hr' , '<hr>' . PHP_EOL);
define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

// constantes principales

if ( !defined('ROOT') ){
	define('ROOT' 		 			, _slash($_SERVER['DOCUMENT_ROOT']) );
}
if ( !defined('LIBS') ){
	define('LIBS'					, _slash(ROOT . 'libs') );
}

if ( !defined('OBJ') ){
	define('OBJ'					, _slash(ROOT . 'src') );
}

if ( !defined('LOGS') ){
	define('LOGS'					, _slash(ROOT . 'logs') );
}

if ( !defined('INC') ){
	define('INC'					, _slash(ROOT . 'include') );
}
if ( !defined('DATA') ){
	define('DATA'					, _slash(ROOT . 'data') );
}

// config files and folders
if ( !defined('CONFIG') ){
	define('CONFIG'				, _slash( DATA . 'config') );
}
if ( !defined('CONFIG_DB') ){
	define('CONFIG_DB'			, CONFIG . 'db.php' );
}
if ( !defined('CONFIG_MAIL') ) {
	define('CONFIG_MAIL'			, CONFIG . 'mail.php' );
}
if ( !defined('CONFIG_BAK') ){
	define('CONFIG_BAK'			, CONFIG . 'backup.php' );
}
if ( !defined('BACKUP') ){
	define('BACKUP'				, _slash( DATA . 'backup') );
}

// resources folders

$res = _slash(DATA 	. 'res'	);
if ( !defined('BKG') ){
	define('BKG'					,  _slash( $res . 'bkg') );
}
if ( !defined('IMAGE') ){
	define('IMAGE'					, _slash( $res . 'img') );
}
if ( !defined('VIDEO') ){
	define('VIDEO'					, _slash( $res . 'video') );
}
if ( !defined('AUDIO') ){
	define('AUDIO'					, _slash( $res . 'audio') );
}


// logs folder and file
_folderExist(LOGS , true);
ini_set('error_log', LOGS . 'php_error.log');

// php config
if ( file_exists(CONFIG . 'config.php')  ){
	$mainConfig = array_change_key_case( include CONFIG . 'config.php' );
} else {
	$mainConfig = [];
}

if ( !defined('loginverification') ){
	if (array_key_exists('loginverification', $mainConfig) ){
		define('_loginverification' , $mainConfig['loginverification'] );
	} else {
		define('_loginverification' , true);
	}	
}
if ( !defined('_appName') ){
	if (array_key_exists('appname', $mainConfig) ){
		define('_appName' , $mainConfig['appname'] );
	} else {
		define('_appName' , 'default');
	}	
}

if (isset($mainConfig['timezone'] )  && $mainConfig['timezone'] )  {
	date_default_timezone_set($mainConfig['timezone']);
} else {
	date_default_timezone_set('America/Argentina/Buenos_Aires');
}
if (isset($mainConfig['devmode'] )  && $mainConfig['devmode'] )  {
	ini_set('display_errors','On');
	define('_DEV' , true);
} else {
	ini_set('display_errors','Off');
	define('_DEV' , false);
}