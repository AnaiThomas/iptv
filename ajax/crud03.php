<?php 
require  $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use \Wikired\wrCommonFoundation as wr;
use \Wikired\wrDB as wrDB;
// agregado el 2021-07-20
use \ForceUTF8\Encoding;
header('Content-Type: application/json; charset=utf-8');
$response=array(
  'status'          => 'error'
  , 'msg'           => 'ajax: ' . basename(__FILE__) . "\n"
  , 'data'          => []
  , 'elapsed'       => ''  );

// Result Array
$jTableResult['Result'] = "OK";

//  set time elapsed
$tIni = microtime(true);

try {
	// parammeter management
	$showPageParams = true;		// for debug

	$pageParams['hasData'] = false;
  	// post params
	if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
		if ( empty ($_POST) ){
			$pageParams = json_decode(file_get_contents('php://input'), true); 
		} else {
			$pageParams['post'] = $_POST;
		}
		// validacion final
		if (!empty($pageParams) ){
			$pageParams['hasData'] = true;
      }
   }

	// get params
	if ( !empty ($_GET)) {
		foreach ($_GET as $key => $value) {
			$pageParams[$key] =  $value ;
		}
		$pageParams['hasData'] = true;
	}

	// default values, just for tests
	if ( !$pageParams['hasData'] ){
		// default values, do not delete
		$pageParams['session']       	= $_SESSION['wr'][_appName];
		// test values
		$pageParams['action']         = 'read_f0311';
		$pageParams['jtStartIndex']   = 0;
		$pageParams['jtPageSize']     = 25;
		$pageParams['jtSorting']      = 'orden ASC,nombre ASC';
		$pageParams['user']           = 8002;
	}

	// parammeters validations
	if ( !is_array( $pageParams ) || empty( $pageParams) ){
		throw new Exception('Parametros incorrectos');
	}
	if ( !array_key_exists('action', $pageParams) || empty($pageParams['action']) ){
		throw new Exception('Parametro faltante: Accion ');
	} else {
		$actionParam = $pageParams['action']  ;
	}


	// get table and action
	$table  = _after('_' , $actionParam);
	$action = _before('_' , $actionParam);

	// parametros opcionales
	$sort = ' ORDER BY ';
	if ( !array_key_exists('jtSorting', $pageParams) || empty($pageParams['jtSorting']) ){
		$sort .= ('tipoDato' == $table) ? 'orden , nombre ASC' : 'orden,nombre ASC';
	} else {
		$sort .= $pageParams['jtSorting']  ;
	} 	

	if ( !array_key_exists('jtStartIndex', $pageParams) || empty($pageParams['jtStartIndex']) ){
		$startIndex = 0;
	} else {
		$startIndex = $pageParams['jtStartIndex']  ;
	} 		
	if ( !array_key_exists('jtPageSize', $pageParams) || empty($pageParams['jtPageSize']) ){
		$pageSize = 10;
	} else {
		$pageSize = $pageParams['jtPageSize']  ;
	} 
	$limit = ' LIMIT ' . $startIndex . ',' . $pageSize ;

	// update and delete params
	if ( in_array ( $action , ['update' , 'delete'] ) ){
		if ( !array_key_exists('id', $pageParams['post']) || empty($pageParams['post']['id']) ){
			throw new Exception('Parametro faltante: ID ');
		} else {
			$id = $pageParams['post']['id']  ;
		}
	}

	if ( 	array_key_exists('wr', $_SESSION ) 								&& 
			array_key_exists(_appName, $_SESSION['wr'] )					&&
			array_key_exists('uid', $_SESSION['wr'][_appName] )		&&
			!empty( $_SESSION['wr'][_appName]['uid'] )
		)
	{	
		$uid = $_SESSION['wr'][_appName]['uid'];
	} else {
		$uid = 8002;
	}

	/* 
	// modificado el 2022-08-02 
	// se agregan mas filtros 
	if ( !array_key_exists('post', $pageParams)         || 
		  !array_key_exists('tipo', $pageParams['post']) || 
		  empty($pageParams['post']['tipo']) ){
		$filterType = '';
	} else {
		$tipo = $pageParams['post']['tipo'];
		$filterType = ('Todos' != $tipo ) ? " WHERE tipo = '" . $tipo . "' " : '' ;
	} 
	*/

	$filterType = ' WHERE tipo '; //IS NOT NULL

	if ( !array_key_exists('post', $pageParams)  ){
		// no hay ningun filtro
		$filterType .= 'IS NOT NULL';
	} else {
		if ( !array_key_exists('tipo', $pageParams['post']) || 
		  		empty($pageParams['post']['tipo']) ){
			$filterType .= 'IS NOT NULL';
		} else {
			$filterType .= ('Todos' != $pageParams['post']['tipo'] ) ? " = '" . $pageParams['post']['tipo'] . "' " : 'IS NOT NULL' ;
		}

		// nombre
		if ( array_key_exists('nombre', $pageParams['post']) && 
		  	!empty($pageParams['post']['nombre']) ){
			$filterType .= " AND nombre like '%" . $pageParams['post']['nombre']  .  "%' ";
		} 
		// titulo
		if ( array_key_exists('titulo', $pageParams['post']) && 
		  	!empty($pageParams['post']['titulo']) ){
			$filterType .= " AND titulo like '%" . $pageParams['post']['titulo']  .  "%' ";
		} 
		// n1
		if ( array_key_exists('n1', $pageParams['post']) && 
		  	!empty($pageParams['post']['n1']) ){
			$filterType .= " AND n1 like '%" . $pageParams['post']['n1']  .  "%' ";
		} 

	}

	


	// update and create  params
	if ( in_array ( $action , ['update' , 'create'] ) ){
		$postData = array_slice($pageParams['post'], 0);
		if ( array_key_exists('id', $postData) ){
			unset( $postData['id']);
		}
		if ($action == 'update' ){
			$postData['umodi'] = $uid;
		} else {
			$postData['ualta'] = $uid;
		}
		if ( array_key_exists('n1', $postData) && empty( $postData['n1']) ) {
			$postData['n1'] = 0;
		}
		if ( array_key_exists('n2', $postData) && empty( $postData['n2']) ) {
			$postData['n2'] = 0;
		}
		if ( array_key_exists('n3', $postData) && empty( $postData['n3']) ) {
			$postData['n3'] = 0;
		}
		// agregado el 2021-07-21 para resolver problemas de UTF
		if ( array_key_exists('nombre', $postData) && empty( $postData['nombre']) ) {
			$postData['nombre'] = Encoding::fixUTF8( $postData['nombre'] );
		}
		if ( array_key_exists('titulo', $postData) && empty( $postData['titulo']) ) {
			$postData['titulo'] = Encoding::fixUTF8( $postData['titulo'] );
		}

	}

  	// core process
  	// 
  	$db = new wrDB();

  	switch ($action) {

  		case 'delete':	
			$where = array( 'id' => $id);
			if ( false === $db->delete( $table , $where , 1 ) ){
				throw new Exception('Error borrando registro ' . $id);
			};
  			break;
  		case 'create':
			$newId = $db->insert( $table, $postData , false , true , true  );	
	  		if ( false === $newId ){
	  			throw new Exception('Error insertando registro ');
	  		}
			$postData['id'] = $newId ;
	  		//Return result to jTable
	  		$jTableResult['Record'][] = $postData;
  			break;
  		case 'update':
			$where = array( 'id' => $id);
			// modificado el 2021-07-20 para evitar problema de encoding
			// if ( false === $db->update( $table , $postData , $where , 1 ) ){
			if ( false === $db->update( $table , $postData , $where , 1 , false ) ){
				//update(                 $table, $variables , $where , $limit = false , $safe = true , $audit = true)
				throw new Exception('Error actualizando registro ' . $id);
			};
  			break;
  		case 'optionList':
	  		$rowId = 0;
	  		$resultado = array();
	  		$fields  = 'SELECT ';
	  		$fields .= ( $table == 'tipoDato' || $table == 'grupo') ? '' : 'id,';
	  		$fields .= 'nombre FROM '; 

	  		$sort    = ' ORDER BY ';
	  		$sort   .= ( $table == 'tipoDato') ? '' : 'orden,';
	  		$sort    = ' nombre ';

	  		$query = $fields . $table  . $sort ;
	  		$resultType = ( $table == 'tipoDato' || $table == 'grupo') ? 3 : 0;
	  		$rows = $db->get_results( $query , $resultType);

	  		if ( $table == 'tipoDato' || $table == 'grupo' ){
				$jTableResult['Options'] = $rows;
	  		} else {
	  			foreach($rows as $row) {
	  			    $resultado[$row['id']] = $row['nombre'];
	  			}
	  			//Return result to jTable
	  			$jTableResult['Options'] = $resultado;
	  		}
  			break;
  		case 'read':
			//Get record count
			$recordCount = $db->count_rows( $table , $filterType );
			$jTableResult['TotalRecordCount'] = $recordCount;

			$response['data']   = array() ;
			if (empty($recordCount) ){
				$jTableResult['Records'] = null;
			} else {
				$query = 'SELECT * FROM ' . $table  . $filterType . $sort . $limit;
				$rows = $db->get_results( $query );
				//Return result to jTable
				$jTableResult['Records'] = $rows;
				// foreach ($matrix as $key => $value) {
				// 	$response['data'][] = $value;
				// }
			}
         break;


  		break;


  		default:
  			throw new Exception('Acción incorrecta: ' . $action);

  	}

  	// OK
  	// 
  	$response['status'] 		= 'ok'; 
  	$jTableResult['Result'] = 'OK'; 
} catch (Exception $ex) {
	$jTableResult['Result'] = "ERROR";
	$jTableResult['Message'] = $ex->getMessage();
}

// end Script
if ( $showPageParams ){
	$response['session'] = $_SESSION;
	$response['elapsed']  = sprintf('%.4f', (  microtime(true) -  $tIni)  ) . " segundos";
	$jTableResult['response'] = $response; 
	$jTableResult['params'] = $pageParams;

	if ( isset($query) ){
		$jTableResult['params']['query'] = $query;
	}
}
// $response['elapsed']  = sprintf('%.4f', (  microtime(true) -  $tIni)  ) . " segundos";
// $jTableResult['elapsed']  = sprintf('%.4f', (  microtime(true) -  $tIni)  ) . " segundos";
print json_encode($jTableResult);
exit;

