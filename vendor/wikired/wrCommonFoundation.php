<?php
/*
 * This file is part of the wrCommon package.
 *
 * (c) Luis Carrizo<lcarrizo@wikired.com.ar>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Wikired;

class wrCommonFoundation {

	static private $log_file, $fp;

 	function __construct(){
 	}

  static private function _fileOpen($pLogFile = false) {
	        
		$folder = _folderExist( LOGS , true);
		if (!$folder) {
			exit("Can't open LOG");
		}

	  $logFilename = ( $pLogFile) ? $pLogFile : 'app.log';
		$log_file_default = LOGS . $logFilename;
	  $lfile = self::$log_file ? self::$log_file : $log_file_default;
	  self::$fp = fopen($lfile, 'a') or exit("Can't open $lfile!");
	}

  static public function __test(){
  	echo _showConfig(true);
  	return __FILE__;
	}

	static public function log($pObject , $pBreak = true, $pFormato = "print" , $pDetalle = false , $pLogFile = false , $pSimple = false) {
	    // if file pointer doesn't exist, then open log file
    if (!is_resource(self::$fp)) {
        self::_fileOpen($pLogFile );
    }
    // define script name
    $script_name = pathinfo($_SERVER['PHP_SELF'], PATHINFO_FILENAME);
    $time = @date("Y-m-d H:i:s");

    $pDetalle = ($pDetalle == 8) ? false : $pDetalle;	//Why???
		$xDetalle = debug_backtrace(2);		
    if ($pDetalle) {
        $Mensaje  =  'Generado desde: ' . str_replace("\\", "/", $xDetalle[0]['file']) ;
        $Mensaje .=  ' - Linea ' . $xDetalle[0]['line'] . _ff;   
        fwrite(self::$fp, $Mensaje );
    }
    $Mensaje = 'wr-Log ' . $time . ' : ';
    switch ($pFormato) {
        case "var_dump":
        case "2":
            $Mensaje .=  self::var_dump_log($pObject ) . _ff ;
            break;
        case "var_export":
        case "1":
            $Mensaje .=   var_export($pObject , true ) . _ff ;
            break;
        default: 
        	if ($pSimple){
        		$Mensaje = $pObject . _ff;
        	} else {
            	$Mensaje .=  print_r($pObject , true)  . _ff ;
        	}
    }
    fwrite(self::$fp, $Mensaje ); 
    if ($pBreak) {fwrite(self::$fp, str_repeat("-", 100) . _ff);}      
    fclose(self::$fp); 
  }

  static private function _fileClose() {
      fclose($this->fp);
  }

  static private function var_dump_log( $object=null ){
      ob_start();                    	// start buffer capture
      var_dump( $object );           	// dump the values
      $contents = ob_get_contents(); 	// put the buffer into a variable
      ob_end_clean();                	// end capture
      return  $contents;        		// log contents of the result of var_dump( $object )
  }

/* --- auxiliar common functions -------------------------- */

/* --- tests ---------------------------------------------- */

 	static function Config(){
 		$xConfig = array();
 		$xConfigDefault = self::_readConfig('default');
 		$xConfigApp = self::_readConfig('app');
 		$xConfigRoot = self::_readConfig('root');
 		$xConfig = array_merge( $xConfigDefault , $xConfigRoot , $xConfigApp );
 		return $xConfig;
 	}

	static private function _readConfig($pInstance){
		$xReturn = array();
		switch ($pInstance) {
			case 'app':
				$configFile = dirname($_SERVER["SCRIPT_FILENAME"])  ;
				break;
			case 'root':
				$configFile = $_SERVER['DOCUMENT_ROOT']  ;
				break; 
			case 'default':	  			
			default:
				$configFile = __DIR__ ;
				break;
		}
		$configFile .= '/config.php' ;
		// check if config file exists
		if (file_exists($configFile)) {
			include $configFile;  				
			$xReturn = $xConfig;
		}
		return $xReturn;
	}

}			// end Class


