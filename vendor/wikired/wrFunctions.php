<?php

// funciones de uso comun y general

//poner TRUE solo para probar correr directamente en el navegador
$debugThisScript = false; 			


if ( !defined('ROOT') ){
	define('ROOT' 		 			, $_SERVER['DOCUMENT_ROOT']. '/' );
}
try {
	// 1. basic  settings
	ini_set('max_execution_time', 1200);
	set_time_limit(1200);
	error_reporting(E_ALL);
	require ROOT . 'vendor/wikired/wrConstants.php'; 

	// $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
	// $caller = ($backtrace ) ? $backtrace[count($backtrace) -1]['file']  :'unkown';
	// echo 'caller2: ' . $caller . _ff; 

	$FILE = pathinfo(__FILE__ ) ;
	$SERVER_SELF = pathinfo($_SERVER['PHP_SELF'] );

	// if ( $debugThisScript === true && pathinfo(__FILE__ )['basename'] == pathinfo($_SERVER['PHP_SELF'] )['basename'] ){
	if ( $debugThisScript === true && $FILE['basename'] == $SERVER_SELF ['basename'] ){
		error_reporting(0);			// Turn off all error reporting
		_showConfig(true);
	}

} catch (Exception $e) {
	$catchMsg = $e->getMessage();
	$logFolder = ROOT . 'logs/';
	if( !file_exists($logFolder) || !is_dir($logFolder) ){
		$logFolder = ROOT;
	}
	$phpLogFile = $logFolder . 'php_error.log';
	$appLogFile = $logFolder . 'app.log';
	ini_set('error_log', $phpLogFile);
	error_log($catchMsg , 0);
	error_log($catchMsg , 3 , $appLogFile);
}
	


// ****************************************************************************
// 
// General Use Functions
// 	
// ----------------------------------------------------------------------------	
// 
function showTimer($timerStart){
    $msg = '*** Elapsed time: ' . sprintf('%.4f', (  microtime(true) -  $timerStart)  ) . " seconds";
    return $msg;
}

function logStart($folder = 'generic' , $module = 'generic'){
	// check folder
	$folderComplete = LOGS . 'files' ;
	_folderExist( $folderComplete , true);

	$folderComplete .= '/' . $folder ;
	_folderExist( $folderComplete , true);

	// create this process log URI
	$pid    = date("Y_m_d_") . time();
	$pidLog =  $pid . '.log';
	//
	if ( array_key_exists('HTTP_ORIGIN', $_SERVER)  ){
		$logUri = $_SERVER['HTTP_ORIGIN'] ;
	} else {
		if ( 80 == $_SERVER[ 'SERVER_PORT'] ){
			$logUri = 'http://';
		} else {
			$logUri = 'https://';
		}
		$logUri .= $_SERVER[ 'HTTP_HOST'];
	}
	$logUri .= '/logs/files/' . $folder . '/' . $pidLog;

	// write general log with link to this process log  file
	$cronLog = LOGS . $module . '.log';
	$logText  = ' Proceso ' .  $module   .  ' - ' . $_SERVER['REQUEST_URI']  . _ff;
	$logText .= 'log de detalle: <strong><a href="' . $logUri . '" target="_blank">' . $logUri . '</a></strong>'  ;
	wrLog($logText,  true,  'auto' , false , $cronLog) ;
	return  $folderComplete . '/' . $pidLog ;
}
function _ff($msgBreakLine = false){

   if ($msgBreakLine) { echo _hr ;  } else { echo _ff ; }
}
// se agregò el valor prederteminado 1 al segundo parametro para compatibiidad con php 8
function _left($str = false, $length =1) {
	if ($str === false ) {
		return '';
	} else {
		return substr($str, 0, $length); 	
	}  
}
// se agregò el valor prederteminado 1 al segundo parametro para compatibiidad con php 8
function _right($str = false, $length = 1) {
	if ($str === false ) {
		return '';
	} else {
		return substr($str, -$length); 	
	}  
}
// se agregò el valor prederteminado 1 al segundo y tercer  parametro para compatibiidad con php 8
function _mid($str = false, $offset = 1 , $length = 1) {
	if ($str === false ) {
		return '';
	} else {
		return substr($str, $offset , $length); 	
	}  
}

/**
 * Convert bytes to the unit specified by the $to parameter.
 * 
 * @param integer $bytes The filesize in Bytes.
 * @param string $to The unit type to convert to. Accepts K, M, or G for Kilobytes, Megabytes, or Gigabytes, respectively.
 * @param integer $decimal_places The number of decimal places to return.
 *
 * @return integer Returns only the number of units, not the type letter. Returns 0 if the $to unit type is out of scope.
 *
 */
function isa_convert_bytes_to_specified($bytes, $to = 'M', $decimal_places = 0) {
	$bytes = intval($bytes);
	$formulas = array(
	  'K' => number_format($bytes / 1024, $decimal_places),
	  'M' => number_format($bytes / 1048576, $decimal_places),
	  'G' => number_format($bytes / 1073741824, $decimal_places)
	);
	return isset($formulas[$to]) ? $formulas[$to] . ' ' . $to . 'B' : '0 B';
}

function toBytes( $value , $unit){
  switch ( strtolower( substr( $unit, 0, 1 ) ) ){
    case 't': $value *= 1024;
    case 'g': $value *= 1024;
    case 'm': $value *= 1024;
    case 'k': $value *= 1024;
  }
  return $value;
}
function _now($pNewLine = false , $short = false){
	$msg = ' * ' ;
  	$msg .=  $short ? date("j/n/y G:i:s")  : date("Y-m-d H:i:s");
  	$msg .= ($pNewLine ) ? _ff : '';
  	return $msg ;
}
function _folderExist($folder = null , $create = false) {
	// If it exist, check if it's a directory
	if( file_exists($folder) ){
		if( is_dir($folder) ) {
			return $folder;
		} else {
			// exist but isn´t a folder
			return false;
		}
	} else {
		if ($create) {
			if (mkdir($folder , 0777, true)){
				return $folder;
			} else {
				return false;
			} 
		} else {
			return false;
		}
	}
}
function wrHash($largo = 10 , $extendido = false){
	if ($extendido) {
		$letras = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-*+ºª^{}[]~#@";
	} else {
		$letras = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";	
	}
 	return substr(str_shuffle($letras),0,$largo);
}
function FileSizeConvert($bytes){
	$bytes = intval($bytes);
	if (0 == $bytes){
		$result = '0 B';
	} else {
		$bytes = floatval($bytes);
		$arBytes = array(
			0 => array(
			    "UNIT" => "TB",
			    "VALUE" => pow(1024, 4)
			),
			1 => array(
			    "UNIT" => "GB",
			    "VALUE" => pow(1024, 3)
			),
			2 => array(
			    "UNIT" => "MB",
			    "VALUE" => pow(1024, 2)
			),
			3 => array(
			    "UNIT" => "KB",
			    "VALUE" => 1024
			),
			4 => array(
			    "UNIT" => "B",
			    "VALUE" => 1
			),
		);

		foreach($arBytes as $arItem) {
			if($bytes >= $arItem["VALUE"]) {
				$result = $bytes / $arItem["VALUE"];
				$result = str_replace(".", "," , strval(round($result, 2)))." ".$arItem["UNIT"];
				break;
			}
		}
	}    
	return $result;
}
function formatBytes($bytes) {
	$bytes = intval($bytes);
	$symbols = array('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
	$exp = floor(log($bytes)/log(1024));

	return sprintf('%.2f '.$symbols[$exp], ($bytes/pow(1024, floor($exp))));
}
function getStringBetween($str,$from,$to, $withFromAndTo = false ){
	$sub = substr($str, strpos($str,$from)+strlen($from),strlen($str));
	if ($withFromAndTo) {
		return $from . substr($sub,0, strrpos($sub,$to)) . $to;
	} else{
		return substr($sub,0, strrpos($sub,$to));
	}
}
function getNiceFileSize($bytes, $binaryPrefix=false) {
	if ($binaryPrefix) {
		$unit=array('B','KiB','MiB','GiB','TiB','PiB');
		if ($bytes==0) return '0 ' . $unit[0];
		return @round($bytes/pow(1024,($i=floor(log($bytes,1024)))),2) .' '. (isset($unit[$i]) ? $unit[$i] : 'B');
	} else {
		$unit=array('B','KB','MB','GB','TB','PB');
		if ($bytes==0) return '0 ' . $unit[0];
		return @round($bytes/pow(1000,($i=floor(log($bytes,1000)))),2) .' '. (isset($unit[$i]) ? $unit[$i] : 'B');
	}
}
function _slash($str , $action = 'add'){
	$errorLevel = error_reporting();
	error_reporting(0 );
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
		wrLog( $e->getMessage() );
	}
	error_reporting($errorLevel);
	return $str;
}

// new string functions --------------------------------------------------------------
// 
// after ('@', 'biohazard@online.ge');
// //returns 'online.ge'
// //from the first occurrence of '@'

// before ('@', 'biohazard@online.ge');
// //returns 'biohazard'
// //from the first occurrence of '@'

// between ('@', '.', 'biohazard@online.ge');
// //returns 'online'
// //from the first occurrence of '@'

// after_last ('[', 'sin[90]*cos[180]');
// //returns '180]'
// //from the last occurrence of '['

// before_last ('[', 'sin[90]*cos[180]');
// //returns 'sin[90]*cos['
// //from the last occurrence of '['

// between_last ('[', ']', 'sin[90]*cos[180]');
// //returns '180'
// //from the last occurrence of '['
function _after ($thisStr, $inthat){
   if (!is_bool(strpos($inthat, $thisStr)))
    return substr($inthat, strpos($inthat,$thisStr)+strlen($thisStr));
};
function _after_last ($thisStr, $inthat){
   if (!is_bool(strrevpos($inthat, $thisStr)))
   return substr($inthat, strrevpos($inthat, $thisStr)+strlen($thisStr));
};
function _before ($thisStr, $inthat){

	return substr($inthat, 0, strpos($inthat, $thisStr));
};
function _before_last ($thisStr, $inthat){

   return substr($inthat, 0, strrevpos($inthat, $thisStr));
};
function _between ($thisStr, $that, $inthat){

   return _before ($that, _after($thisStr, $inthat));
};
function _between_last ($thisStr, $that, $inthat){

 	return _after_last($thisStr, _before_last($that, $inthat));
};
// use strrevpos function in case your php version does not include it
function strrevpos($instr, $needle){
    $rev_pos = strpos (strrev($instr), strrev($needle));
    if ($rev_pos===false) return false;
    else return strlen($instr) - $rev_pos - strlen($needle);
};

// logging --------------------------------------------------------

function _debug( $msgText = ' ', $title = ' ' ){

	$isJson = false;
	$headers = headers_list(); 
	foreach ($headers as $key => $value) {
		// echo $value . _ff;
		if ( false !== strpos( $value , 'Content-Type')    ){
			$headerLine = explode(';', $value);
			foreach ($headerLine as $keyHL => $valueHL) {
				if ( false !== strpos( $valueHL , 'Content-Type')    ){
					$contentType = trim(_after(':' , $valueHL  )) ;
					$isJson      = strpos( $contentType , 'json')  ;
					break;
				}	
			}
			break;
		}
	}

	$msg = date("j/n/y G:i:s") . ' ' . $title . ' '   ;
	if (is_scalar($msgText)) {
		if (true === is_bool($msgText)) {
			if (true === $msgText) {
				$msg .=  'TRUE';
			} else {
				$msg .=  'FALSE';
			}
		} else {
			$msg .=  $msgText;
		}
		$msg .= _ff;
		echo $msg;
	} else {
		echo $msg . _hr;
		if (  $isJson ) {
			var_export($msgText  );
		} else {
			var_dump($msgText  );
		}
		echo _hr;
	}

	if ( ob_get_level()  ) {
		ob_flush();
		flush();
	}
}
function _log($msgText , $msgTitle = false , $toFile = false) {
	// if ajax routine, hardcode tofile
	if (  stripos ( $_SERVER["SCRIPT_FILENAME"] , 'ajax' ) !== false){
		$toFile = true;
	}

	// first, get variable name
	$bt   = debug_backtrace();
	$file = file($bt[0]['file']);
	$src  = $file[$bt[0]['line']-1];
	$pat = '#(.*)'.__FUNCTION__.' *?\( *?(.*) *?\)(.*)#i';
	$var  = preg_replace($pat, '$2', $src);

	$comma =  strpos ( $var , ',' );
	if ( $comma > 1 ){
		$var = _left( $var , $comma);
	}
	//compose msg variable
	$msg  = '';
	if ( $toFile ) {
		$msg  .= ( $msgTitle ) ? $msgTitle : '';
		$msg  .=  _now() . ' * ' . trim($var) . ' => ' .  PHP_EOL;
	} else {
		$msg  .=  '<pre><h3>' ;
		$msg  .= ( $msgTitle ) ? $msgTitle : '';
		$msg  .= ' ' . _now() . ' * ' . trim($var) . '</h3>';
	}


	if (is_scalar($msgText)) {
		if (true === is_bool($msgText)) {
			if (true === $msgText) {
				$msg .=  'TRUE';
			} else {
				$msg .=  'FALSE';
			}
		} else {
			$msg .=  $msgText;
		}

	} else {
		$msg .= var_export($msgText , true );
	}

	$msg .=  ( $toFile ) ? PHP_EOL  : '</pre>' . _ff  ;

	if ( true === $toFile ) {
		// error_log( $msg);
		wrLog($msg , true , 'auto' , true , false);
	} else {
		echo $msg;
	}
}
function wrLog($msgText = '',  $msgBreak = true, $msgFormat = "auto" , $msgDetail = false , $logFile = false){
	if ($msgFormat === true ) { $msgFormat = 'auto';}
	$wrLog = new Logging();
	if ( $logFile !== false ){
		$wrLog->lfile( $logFile);
	}
	$wrLog->lwrite( $msgText , $msgBreak , $msgFormat , $msgDetail  );
}

function _varDump($object = false){
	ob_start();
	var_dump($object);
	$result = ob_get_contents();
	ob_get_clean();
	return  $result;
}
class Logging {
    // declare log file and file pointer as private properties
    private $log_file, $fp;
    // set log file (path and name)
    public function lfile($path) {
        $this->log_file = $path;
    }
    // write message to the log file
    public function lwrite($msgText , $msgBreak = false, $msgFormat = 'auto' , $msgDetail = false) {
        // if file pointer doesn't exist, then open log file
        if (!is_resource($this->fp)) {
            $this->lopen();
        }
        // define current time and suppress E_WARNING if using the system TZ settings
        // (don't forget to set the INI setting date.timezone)
        $time = @date("Y-m-d H:i:s");

        if ($msgDetail) {
            $msgLine =  $_SERVER['PHP_SELF'] . PHP_EOL;   
            fwrite($this->fp, $msgLine );
        }
        $msgLine = "wrLog " . $time . " : ";

        if ($msgFormat === true ) { $msgFormat = 'auto';}
        if ( 'auto' == $msgFormat ){
        	if (is_scalar($msgText)) {
        		if (true === is_bool($msgText)) {
        			if (true === $msgText) {
        				$msgText =  'TRUE';
        			} else {
        				$msgText =  'FALSE';
        			}
        		}
        		$msgLine .=  print_r($msgText , true)  . PHP_EOL ;
        	} else {
        		$msgLine .=  var_export($msgText  , true) . PHP_EOL ;
        	}
        } else {
        	switch ($msgFormat) {
        	    case "var_dump":
        	    case "1":
        	        $msgLine .=  _varDump($msgText ) . PHP_EOL ;
        	        break;
        	    case "var_export":
        	    case "2":
        	        // error_log("wr_error_log  " . var_export($msgText , true ), 0 );
        	        $msgLine .=   var_export($msgText , true ) . PHP_EOL ;
        	        break;
        	    default:
        	        // error_log("wr_error_log  " . print_r($msgText , true), 0 );  
        	        $msgLine .=  print_r($msgText , true)  . PHP_EOL ;
        	}
        }

        fwrite($this->fp, $msgLine ); 
        
        if ($msgBreak) {fwrite($this->fp, str_repeat("-", 100) . PHP_EOL);}      
        
        // close file - agregado por Luisc
        fclose($this->fp); 
    }
    // close log file (it's always a good idea to close a file when you're done with it)
    public function lclose() {
        fclose($this->fp);
    }
	// open log file (private method)
	private function lopen() {
      $log_file_default = ROOT . 'logs/app.log';
     	// define log file from lfile method or use previously set default
     	$lfile = $this->log_file ? $this->log_file : $log_file_default;
			// open log file for writing only and place file pointer at the end of the file
			// (if the file does not exist, try to create it)
			// lcOri $this->fp = fopen($lfile, 'a') or exit("Can't open $lfile!");
			$this->fp = fopen($lfile, 'a') or exit("Can't open $lfile!");
	    }
}
function _echo($msg = '' , $flush = false){
	if ( '' == $msg ){
		echo _ff;
	} else {
		if (is_scalar($msg)) {
			if (true === is_bool($msg)) {
				if (true === $msg) {
					$msg =  'TRUE';
				} else {
					$msg =  'FALSE';
				}
			}
			echo  '<pre>' . $msg . '</pre>'._ff;
		} else {
			var_dump($msg) ;
			echo _ff;
		}
	}
	if ( $flush === true ){
		ob_flush();
		flush();
	}
}
function wr_ed( $str = false ,$ed = false){
	try {
		if ($str === false || $ed === false){
			throw new Exception('incorrect parammeters');
		}
		if ( is_scalar($str) ) {
			if ( 'string' != gettype( $str ) ){
				$str = strval( $str) ;
			}
		} else {
			throw new Exception('incorrect variable type');
		}
		// Store the cipher method 
		$ciphering = "AES-128-CTR";
		// Use OpenSSl Encryption method 
		$iv_length = openssl_cipher_iv_length($ciphering); 
		$options = 0; 
		$iv = date('AdGDYM');
		$key = date('mYAdD') ;
		if ($ed === 'd'){
			return openssl_decrypt( $str, $ciphering, $key, $options, $iv ); 
		} else if ( $ed === 'e' ) {
			return openssl_encrypt( $str, $ciphering, $key, $options, $iv );
		} else {
			throw new Exception('incorrect action');
		}
	} catch (Exception $e) {
		_log( __FILE__ . ' error on function: wr_ed: ' . $e->getMessage() ) ;
		return false;
	}
}

function getPublicIp(){
	try {
		$externalContent = file_get_contents('http://checkip.dyndns.com/');
		preg_match('/Current IP Address: \[?([:.0-9a-fA-F]+)\]?/', $externalContent, $m);
		return $m[1];
	} catch (Exception $e) {
		return false;
	}
}