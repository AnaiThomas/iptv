<?php 
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';
use \Wikired\wrCommonFoundation as wr;

header('Content-Type: application/json; charset=utf-8');

$response = array(
	'status' => 'error',
	'msg' 	=> basename(__FILE__),
	'log' 	=> 'no'
);

try {
	//check if is valid the google id_token
	$id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjZGEzNjBmYjM2Y2QxNWZmODNhZjgzZTE3M2Y0N2ZmYzM2ZDExMWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMzg5ODM4MzY1OS1wbXFwNDU3YWE4ZmQwcHNwbWlrNWxiam4xcGV0ZWg1aC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMzODk4MzgzNjU5LXMzcmdhOG9kZ2hqajVycjExMjU1amJ2OTFqaTVwOGpzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MTMyNDMxNjgyNTEzNDc4MjYwIiwiZW1haWwiOiJ3aWtpcmVkYXJnZW50aW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoid2lraXJlZCBhcmdlbnRpbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YkVrQk5uLXQ0V1NDOVdOU25fS2RLT1Y0SWthX3VXaUtLQjhuNkw9czk2LWMiLCJnaXZlbl9uYW1lIjoid2lraXJlZCIsImZhbWlseV9uYW1lIjoiYXJnZW50aW5hIiwibG9jYWxlIjoiZXMtNDE5IiwiaWF0IjoxNjgwODI2MzM5LCJleHAiOjE2ODA4Mjk5Mzl9.ErqD8vepmGMKbKVMBjZ6YoQ7H9L_pqUTQq1Y2Mk56d0o3MaKPziYtvpbnpk06-YXWcH1e-wJjCGjMr5AGFLVNiG3OpO1Wo5kquk_ON1jkJpqmKKLVzWsvii-bnTqhjbOqQkYdwsi4rcC1H-omsWqeN5Xhjj4GsDXXSxr2qVSBvASNHC-GWkfMCmqW3iMnZNg84g5HwZxmhaj0mfVx-OfSrx3n2JETCO3lnKDQl20oF_qqSznsKX855NyQ06RMXmr8pgcdi9LXOV90vlPwm1lCy0KNP0lNiGYss1SiwDR7eBg0KYdc9lIWroZAx3VrE3Qrnibwl4eujFASnkRi7_70A";

	if ( $_SERVER['REQUEST_METHOD'] !== 'POST') {
		throw new Exception('Invalid Method');}
		//$xPost = json_decode(file_get_contents('php://input') , True);
	if ( array_key_exists('pId_token', $_POST) &&  !empty($_POST['pId_token']) ){
		$id_token = $_POST['pId_token']  ;
	} else {
	    throw new Exception('Invalid ID Token ');
	}

	
	// Main Google Validation
	// load library
     // 		require '../include/google-api-php-client-2.2.2/vendor/autoload.php';
   require $_SERVER['DOCUMENT_ROOT'] . '/libs/google/api-php-client/v241/vendor/autoload.php';
   $client = new Google_Client(
   ['client_id' => '830475387020-pbqdb4m5oj1rppgm8pkli107dg2gfq55.apps.googleusercontent.com']);
   $payload = $client->verifyIdToken($id_token);
    
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
	$response['status_message'] .=  $e->getMessage();
	$userId = -3 ;
}

__write($response,  __FILE__ , true);
echo json_encode($response);
exit;