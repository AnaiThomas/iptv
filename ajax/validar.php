<?php 
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';
use \Wikired\wrCommonFoundation as wr;

header('Content-Type: application/json; charset=utf-8');

$response = array(
	'status' => 'error',
	'msg' 	=> basename(__FILE__),
	'log' 	=> 'no'
);

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
		// $pageParams['session']       	= $_SESSION['wr'][_appName];
		// test values
		$pageParams['action']         = 'validate';
		$pageParams['token']  			= "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjZGEzNjBmYjM2Y2QxNWZmODNhZjgzZTE3M2Y0N2ZmYzM2ZDExMWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMzg5ODM4MzY1OS1wbXFwNDU3YWE4ZmQwcHNwbWlrNWxiam4xcGV0ZWg1aC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMzODk4MzgzNjU5LXMzcmdhOG9kZ2hqajVycjExMjU1amJ2OTFqaTVwOGpzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MTMyNDMxNjgyNTEzNDc4MjYwIiwiZW1haWwiOiJ3aWtpcmVkYXJnZW50aW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoid2lraXJlZCBhcmdlbnRpbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YkVrQk5uLXQ0V1NDOVdOU25fS2RLT1Y0SWthX3VXaUtLQjhuNkw9czk2LWMiLCJnaXZlbl9uYW1lIjoid2lraXJlZCIsImZhbWlseV9uYW1lIjoiYXJnZW50aW5hIiwibG9jYWxlIjoiZXMtNDE5IiwiaWF0IjoxNjgwODI2MzM5LCJleHAiOjE2ODA4Mjk5Mzl9.ErqD8vepmGMKbKVMBjZ6YoQ7H9L_pqUTQq1Y2Mk56d0o3MaKPziYtvpbnpk06-YXWcH1e-wJjCGjMr5AGFLVNiG3OpO1Wo5kquk_ON1jkJpqmKKLVzWsvii-bnTqhjbOqQkYdwsi4rcC1H-omsWqeN5Xhjj4GsDXXSxr2qVSBvASNHC-GWkfMCmqW3iMnZNg84g5HwZxmhaj0mfVx-OfSrx3n2JETCO3lnKDQl20oF_qqSznsKX855NyQ06RMXmr8pgcdi9LXOV90vlPwm1lCy0KNP0lNiGYss1SiwDR7eBg0KYdc9lIWroZAx3VrE3Qrnibwl4eujFASnkRi7_70A";
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
	if ( array_key_exists('token', $pageParams) &&  !empty($pageParams['token']) ){
		$token = $pageParams['token']  ;
	} else {
		throw new Exception('Parametro faltante: token ');
	}

	
	// Main Google Validation
	// load library
     // 		require '../include/google-api-php-client-2.2.2/vendor/autoload.php';
   require $_SERVER['DOCUMENT_ROOT'] . '/libs/google/php-client/v2.15.0/php8.0/vendor/autoload.php';

		// C:\dev\web\iptv\libs\google\php-client\v2.15.0\php8.0\vendor\



   $client = new Google_Client(
   ['client_id' => '1038643436239-hbco17769gbkofoj0ae9c1pn802ag3au.apps.googleusercontent.com']);
   $payload = $client->verifyIdToken($token);
    
	if ($payload) {
		// everything is OK
		$response['status'] = 'OK' ;
		$response['payload'] = $payload ;
	} else {
		// Invalid ID token
		throw new Exception('Invalid ID token');
	}
}
catch (Exception $e) {
	$response['msg'] .=  $e->getMessage();
	$userId = -3 ;
}

__write($response,  __FILE__ , true);
echo json_encode($response);
exit;


function __write($message = false , $description = ' ' , $mandatory = false){
	try {
		$fp = fopen( LOGS . 'validar.log', 'a');
		if ($mandatory ) {
			if (is_object($message) OR is_array($message) ) {
				$message = var_export($message , true);
			}
			fwrite($fp, date('j/n/y G:i:s') . ' - ' . $description . ' = ' . $message . _ff ); 
		}  elseif (!$message) {
			fwrite($fp, str_repeat('-', 80) . _ff );
		} 
		fclose($fp);
	} catch (Exception $e) {
		error_log(str_repeat('-', 100) , 0);
		error_log('*** ' . $descripcion . ' / ' . ($message?$message:'') , 0);
		error_log(str_repeat('*', 100) , 0); 
	}
}