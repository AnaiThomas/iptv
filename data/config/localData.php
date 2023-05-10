<?php 

$wr = array();

$wr['uid']      =  8008;
$wr['name']     = 'DP Procesos Automaticos';
$wr['email']    = 'dp.wikired.com.ar';
$wr['avatar']   = 'https://dp.wikired.com.ar/data/res/img/user.png';
$wr['first']    = 'DP';
$wr['last']     = 'Procesos Automaticos';
$wr['locale']   = 'es';
$wr['gid']      = '1';
$wr['rol']      = 0;

if ( function_exists('session_status') ){
	$SessionStatus = (session_status() == PHP_SESSION_NONE) ? false : true;	
} else {
	$SessionStatus = (session_id() == '') ? false : true;
}
if ( $SessionStatus === false) {	
	session_start();
}

$_SESSION['wr'][_appName] = $wr;