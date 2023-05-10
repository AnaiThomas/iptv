<?php 
require  $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
use \Wikired\wrCommonFoundation as wr;
use \Wikired\wrDB as wrDB;
// ojo revisar si es TABLERO o no
define( 'TABLERO', true );
$rv = array("status" => true ,"msg" => "" , "queryResult" => array() );
$pid = time();
$pidLog =  $pid . '.log';
$jsWork = [ 'tStart' => microtime(true) , 'tIni' => microtime(true)  ];
$jsIni  = [ 'excelFile' => '' , 'emptyFirst' => '' , 'update' => '' ,
           'tMax' => 0 , 'corte' => 0 , 'filesTotal' => 0 ,  'filesDone' => 0];
$jsTime = [ 'tUsed' => 0 , 'tOverall' => 0 , 'mode' => '' , 'mU' => '' ];
$jsReg  = [ 'nLeidos' => 0 , 'nGrabados' => 0];
header("Content-type: text/html; charset=utf-8");
echo '<html><body><pre>';
try {
   $msg =  ' memory_limit = ' . ini_get('memory_limit') . EOL; 
   // ini_set('memory_limit', '32M');
   sendMsg($msg , 'Inicio del Proceso') ;
   $db = new wrDB();
   $sqlFiles=array (
/*      
  0 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f000101.sql',
  2 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f000111.sql',
  3 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0710.sql',
  4 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0711.sql',
  5 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0712.sql',
  6 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0713.sql',
  7 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0721.sql',
  8 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0722.sql',
  9 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0723.sql',
  10 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0724.sql',
  11 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0810.sql',
  13 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0900.sql',
  15 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0901.sql',
  17 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0901a.sql',
  20 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0901g.sql',
  23 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0901j.sql',
  25 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0901s.sql',
  27 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0902.sql',
  29 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0910.sql',
  191 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0911.sql',
  311 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0912.sql',
  375 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0913.sql',
  403 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0921.sql',
  406 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0922.sql',
  408 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0923.sql',
  410 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0924.sql',
  412 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0990.sql',  
  414 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0991.sql',
  416 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0992.sql',
  418 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0993.sql',
  420 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0994.sql',
  422 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0995.sql',
  424 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0996.sql',
  426 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0997.sql',
  428 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0998.sql',
  430 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f0999.sql', 
*/

   0 => './2022-09-21_ok/wikiredc_tablero_2_table_create_f000101.sql',
   1 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f000101_0001.sql',




) ;
   // the loop
   foreach ($sqlFiles as $key => $sqlFile){
      $jsIni['tMax'] = setMaxTime();
      $jsIni['excelFile'] = $sqlFile;
      ++$jsIni['filesDone'];
      sendMsg('ini');
      $queryResult = array($key => array("file" => $sqlFile , "multi_query" => "" ) ); 
      $query = file_get_contents ($sqlFile);
      if ( empty( $query ) ){
         $queryResult[$key]["multi_query"] = "query vacio"; 
      } else {
         // arregla utf8
         $query = str_replace('utf8 ' , 'utf8mb4 ' , $query );
         $query = str_replace('utf8_' , 'utf8mb4_' , $query );
         $query = str_replace('ENGINE=MyISAM' , 'ENGINE=InnoDB' , $query );
         $queryResult[$key]["multi_query"] = $db->multi_query( $query);
      } //end if
      $rv["queryResult"][] = $queryResult;
      $jsReg['nLeidos'] = $nLeidos;
      $jsReg['nGrabados'] = $nImportados;
      sendMsg( 'reg' ) ;
      sleep(2);
   } //end foreach
   sendMsg( 'texto' , sprintf('%.4f', (  microtime(true) -  $jsWork['tIni'])  ) . " segundos"  , 'Final Paso ' . ++$Stage . ' en ') ;

} catch (Exception $e) {
  $rv["status"] = false;
  $rv["msg"] = $e->getMessage() ;
  $rv["pidLog"] = $GLOBALS["pidLog"];
}
_debug( $rv , "Fin proceso Restauración");
echo "</pre></body></html>";

// fin del proceso principal
// 
function formatElapsed( $ini = false ){
   $rv = '';
   try {
      if ( false == $ini ){
         $ini = $_SERVER["REQUEST_TIME_FLOAT"];
      }
      $elapsed = microtime(true) - $ini ;
      $rv = gmdate("i:s",  intval($elapsed)  ) .  intval( ($elapsed - intval($elapsed) * 1000000 ) );
   } catch (Exception $e) {
      $rv = "Error calculando tiempo transcurrido";
   }
   return $rv;
}
function sendMsg($mode = false ,$msg = false , $titulo = false){
   try {
      if ($mode){
         if ($msg) {
            $mensaje = date('H:i:s') . ' ' ;
            $mensaje .= ($titulo) ? $titulo . ' ' : ' ';
            switch ( gettype($msg) ) {
               case 'array':
               case 'object':
                  $mensaje .= _varDump($msg , true);  
                  break;
               default:
                  $mensaje .= ' ' . $msg;
                  break;
            }  
         } else {
            $mensaje = false;
         }
         updateMsg($mode , $mensaje  );
      }     
   } catch (Exception $e) {
      wr::log($e->getMessage() ,  true,  "print" , true , $GLOBALS['pidLog']);
   }
}

function updateMsg($mode = false, $msg = false){
    try {
        if ($mode){
            global $jsWork;
            $data = array_merge($GLOBALS['jsTime']);
            $data['mode'] = $mode;
            $tNow = microtime(true);
            $tElapsed = $tNow - $jsWork['tIni'];
            $data['tUsed'] = formatElapsed($jsWork['tIni']);
            $data['tOverall'] = formatElapsed( $jsWork['tStart'] );
            $data['mU'] = getNiceFileSize( memory_get_peak_usage( false ) ) . ' / ' ;
            $data['mU'] .= getNiceFileSize( memory_get_usage( true ) ) . ' / '  ;
            $data['mU'] .= getNiceFileSize( memory_get_peak_usage( false ) ) . ' / ' ;
            $data['mU'] .= getNiceFileSize( memory_get_peak_usage( true ) );

            switch ($mode) {
                case 'ini':
                    $data = array_merge($GLOBALS['jsIni'] , $data);
                    break;
                case 'reg':
                    $data = array_merge($GLOBALS['jsReg'] , $data);
                    break;
                case 'msg':
                case 'debug':
                case 'texto':
                    $data['msg'] = $msg;
                    wr::log($msg ,  false,  "print" , false , $GLOBALS['pidLog'] , true);
                    break;
                default:
                    break;
            };

            _debug( $data );
            if ( ob_get_level()  ) {
                ob_flush();
                flush();
            }
        }
        // resetea el tiempo limite si ya paso mas del 75%
        if ( ($tElapsed / 1200) > 0.75 ){
            set_time_limit(1200);
            $GLOBALS['jsWork']['tIni'] = microtime(true);
        }   

    } catch (Exception $e) {
        wr::log($e->getMessage() ,  true,  "print" , true , $GLOBALS['pidLog']);
    }
}

function setMaxTime(){
   set_time_limit(1200);
   $GLOBALS['jsWork']['tIni'] = microtime(true); 
   return gmdate("i:s", ini_get('max_execution_time'));
}









  /*

*/   

/*
  1 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f000101_0001.sql',
  12 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0810_0001.sql',
  14 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0900_0001.sql',
  16 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901_0001.sql',
  18 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901a_0001.sql',
  19 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901a_0002.sql',
  21 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901g_0001.sql',
  22 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901g_0002.sql',
  24 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901j_0001.sql',
  26 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0901s_0001.sql',
  28 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0902_0001.sql',
  30 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0001.sql',
  31 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0002.sql',
  32 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0003.sql',
  33 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0004.sql',
  34 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0005.sql',
  35 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0006.sql',
  36 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0007.sql',
  37 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0008.sql',
  38 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0009.sql',
  39 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0010.sql',
  40 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0011.sql',
  41 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0012.sql',
  42 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0013.sql',
  43 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0014.sql',
  44 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0015.sql',
  45 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0016.sql',
  46 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0017.sql',
  47 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0018.sql',
  48 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0019.sql',
  49 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0020.sql',
  50 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0021.sql',
  51 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0022.sql',
  52 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0023.sql',
  53 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0024.sql',
  54 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0025.sql',
  55 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0026.sql',
  56 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0027.sql',
  57 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0028.sql',
  58 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0029.sql',
  59 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0030.sql',
  60 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0031.sql',
  61 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0032.sql',
  62 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0033.sql',
  63 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0034.sql',
  64 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0035.sql',
  65 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0036.sql',
  66 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0037.sql',
  67 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0038.sql',
  68 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0039.sql',
  69 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0040.sql',
  70 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0041.sql',
  71 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0042.sql',
  72 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0043.sql',
  73 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0044.sql',
  74 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0045.sql',
  75 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0046.sql',
  76 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0047.sql',
  77 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0048.sql',
  78 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0049.sql',
  79 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0050.sql',
  80 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0051.sql',
  81 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0052.sql',
  82 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0053.sql',
  83 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0054.sql',
  84 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0055.sql',
  85 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0056.sql',
  86 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0057.sql',
  87 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0058.sql',
  88 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0059.sql',
  89 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0060.sql',
  90 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0061.sql',
  91 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0062.sql',
  92 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0063.sql',
  93 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0064.sql',
  94 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0065.sql',
  95 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0066.sql',
  96 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0067.sql',
  97 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0068.sql',
  98 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0069.sql',
  99 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0070.sql',
  100 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0071.sql',
  101 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0072.sql',
  102 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0073.sql',
  103 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0074.sql',
  104 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0075.sql',
  105 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0076.sql',
  106 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0077.sql',
  107 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0078.sql',
  108 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0079.sql',
  109 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0080.sql',
  110 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0081.sql',
  111 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0082.sql',
  112 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0083.sql',
  113 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0084.sql',
  114 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0085.sql',
  115 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0086.sql',
  116 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0087.sql',
  117 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0088.sql',
  118 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0089.sql',
  119 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0090.sql',
  120 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0091.sql',
  121 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0092.sql',
  122 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0093.sql',
  123 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0094.sql',
  124 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0095.sql',
  125 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0096.sql',
  126 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0097.sql',
  127 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0098.sql',
  128 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0099.sql',
  129 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0100.sql',
  130 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0101.sql',
  131 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0102.sql',
  132 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0103.sql',
  133 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0104.sql',
  134 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0105.sql',
  135 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0106.sql',
  136 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0107.sql',
  137 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0108.sql',
  138 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0109.sql',
  139 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0110.sql',
  140 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0111.sql',
  141 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0112.sql',
  142 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0113.sql',
  143 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0114.sql',
  144 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0115.sql',
  145 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0116.sql',
  146 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0117.sql',
  147 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0118.sql',
  148 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0119.sql',
  149 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0120.sql',
  150 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0121.sql',
  151 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0122.sql',
  152 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0123.sql',
  153 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0124.sql',
  154 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0125.sql',
  155 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0126.sql',
  156 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0127.sql',
  157 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0128.sql',
  158 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0129.sql',
  159 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0130.sql',
  160 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0131.sql',
  161 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0132.sql',
  162 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0133.sql',
  163 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0134.sql',
  164 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0135.sql',
  165 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0136.sql',
  166 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0137.sql',
  167 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0138.sql',
  168 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0139.sql',
  169 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0140.sql',
  170 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0141.sql',
  171 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0142.sql',
  172 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0143.sql',
  173 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0144.sql',
  174 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0145.sql',
  175 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0146.sql',
  176 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0147.sql',
  177 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0148.sql',
  178 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0149.sql',
  179 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0150.sql',
  180 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0151.sql',
  181 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0152.sql',
  182 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0153.sql',
  183 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0154.sql',
  184 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0155.sql',
  185 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0156.sql',
  186 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0157.sql',
  187 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0158.sql',
  188 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0159.sql',
  189 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0160.sql',
  190 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0910_0161.sql',
  192 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0001.sql',
  193 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0002.sql',
  194 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0003.sql',
  195 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0004.sql',
  196 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0005.sql',
  197 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0006.sql',
  198 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0007.sql',
  199 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0008.sql',
  200 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0009.sql',
  201 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0010.sql',
  202 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0011.sql',
  203 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0012.sql',
  204 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0013.sql',
  205 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0014.sql',
  206 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0015.sql',
  207 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0016.sql',
  208 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0017.sql',
  209 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0018.sql',
  210 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0019.sql',
  211 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0020.sql',
  212 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0021.sql',
  213 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0022.sql',
  214 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0023.sql',
  215 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0024.sql',
  216 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0025.sql',
  217 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0026.sql',
  218 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0027.sql',
  219 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0028.sql',
  220 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0029.sql',
  221 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0030.sql',
  222 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0031.sql',
  223 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0032.sql',
  224 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0033.sql',
  225 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0034.sql',
  226 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0035.sql',
  227 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0036.sql',
  228 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0037.sql',
  229 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0038.sql',
  230 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0039.sql',
  231 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0040.sql',
  232 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0041.sql',
  233 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0042.sql',
  234 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0043.sql',
  235 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0044.sql',
  236 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0045.sql',
  237 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0046.sql',
  238 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0047.sql',
  239 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0048.sql',
  240 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0049.sql',
  241 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0050.sql',
  242 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0051.sql',
  243 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0052.sql',
  244 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0053.sql',
  245 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0054.sql',
  246 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0055.sql',
  247 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0056.sql',
  248 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0057.sql',
  249 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0058.sql',
  250 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0059.sql',
  251 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0060.sql',
  252 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0061.sql',
  253 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0062.sql',
  254 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0063.sql',
  255 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0064.sql',
  256 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0065.sql',
  257 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0066.sql',
  258 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0067.sql',
  259 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0068.sql',
  260 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0069.sql',
  261 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0070.sql',
  262 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0071.sql',
  263 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0072.sql',
  264 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0073.sql',
  265 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0074.sql',
  266 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0075.sql',
  267 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0076.sql',
  268 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0077.sql',
  269 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0078.sql',
  270 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0079.sql',
  271 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0080.sql',
  272 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0081.sql',
  273 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0082.sql',
  274 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0083.sql',
  275 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0084.sql',
  276 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0085.sql',
  277 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0086.sql',
  278 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0087.sql',
  279 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0088.sql',
  280 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0089.sql',
  281 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0090.sql',
  282 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0091.sql',
  283 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0092.sql',
  284 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0093.sql',
  285 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0094.sql',
  286 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0095.sql',
  287 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0096.sql',
  288 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0097.sql',
  289 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0098.sql',
  290 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0099.sql',
  291 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0100.sql',
  292 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0101.sql',
  293 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0102.sql',
  294 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0103.sql',
  295 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0104.sql',
  296 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0105.sql',
  297 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0106.sql',
  298 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0107.sql',
  299 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0108.sql',
  300 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0109.sql',
  301 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0110.sql',
  302 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0111.sql',
  303 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0112.sql',
  304 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0113.sql',
  305 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0114.sql',
  306 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0115.sql',
  307 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0116.sql',
  308 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0117.sql',
  309 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0118.sql',
  310 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0911_0119.sql',
  312 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0001.sql',
  313 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0002.sql',
  314 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0003.sql',
  315 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0004.sql',
  316 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0005.sql',
  317 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0006.sql',
  318 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0007.sql',
  319 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0008.sql',
  320 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0009.sql',
  321 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0010.sql',
  322 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0011.sql',
  323 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0012.sql',
  324 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0013.sql',
  325 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0014.sql',
  326 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0015.sql',
  327 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0016.sql',
  328 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0017.sql',
  329 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0018.sql',
  330 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0019.sql',
  331 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0020.sql',
  332 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0021.sql',
  333 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0022.sql',
  334 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0023.sql',
  335 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0024.sql',
  336 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0025.sql',
  337 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0026.sql',
  338 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0027.sql',
  339 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0028.sql',
  340 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0029.sql',
  341 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0030.sql',
  342 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0031.sql',
  343 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0032.sql',
  344 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0033.sql',
  345 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0034.sql',
  346 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0035.sql',
  347 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0036.sql',
  348 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0037.sql',
  349 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0038.sql',
  350 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0039.sql',
  351 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0040.sql',
  352 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0041.sql',
  353 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0042.sql',
  354 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0043.sql',
  355 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0044.sql',
  356 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0045.sql',
  357 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0046.sql',
  358 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0047.sql',
  359 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0048.sql',
  360 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0049.sql',
  361 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0050.sql',
  362 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0051.sql',
  363 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0052.sql',
  364 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0053.sql',
  365 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0054.sql',
  366 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0055.sql',
  367 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0056.sql',
  368 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0057.sql',
  369 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0058.sql',
  370 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0059.sql',
  371 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0060.sql',
  372 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0061.sql',
  373 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0062.sql',
  374 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0912_0063.sql',
  376 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0001.sql',
  377 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0002.sql',
  378 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0003.sql',
  379 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0004.sql',
  380 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0005.sql',
  381 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0006.sql',
  382 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0007.sql',
  383 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0008.sql',
  384 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0009.sql',
  385 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0010.sql',
  386 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0011.sql',
  387 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0012.sql',
  388 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0013.sql',
  389 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0014.sql',
  390 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0015.sql',
  391 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0016.sql',
  392 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0017.sql',
  393 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0018.sql',
  394 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0019.sql',
  395 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0020.sql',
  396 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0021.sql',
  397 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0022.sql',
  398 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0023.sql',
  399 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0024.sql',
  400 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0025.sql',
  401 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0026.sql',
  402 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0913_0027.sql',
  404 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0921_0001.sql',
  405 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0921_0002.sql',
  407 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0922_0001.sql',
  409 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0923_0001.sql',
  411 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0924_0001.sql',
  413 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0990_0001.sql',
  415 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0991_0001.sql',
  417 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0992_0001.sql',
  419 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0993_0001.sql',
  421 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0994_0001.sql',
  423 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0995_0001.sql',
  425 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0996_0001.sql',
  427 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0997_0001.sql',
  429 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0998_0001.sql',
  431 => './2022-09-21_ok/wikiredc_tablero_3_table_data_f0999_0001.sql',
*/