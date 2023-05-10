<?php

//poner TRUE solo para probar correr directamente en el navegador
$debugThisScript = false;

// 0. set SESSION on
if (function_exists('session_status')) {
	$SessionStatus = (session_status() == PHP_SESSION_NONE) ? false : true;
} else {
	$SessionStatus = (session_id() == '') ? false : true;
}
if ($SessionStatus === false) {
	session_start();
}

if (!defined('ROOT')) {
	define('ROOT', $_SERVER['DOCUMENT_ROOT'] . '/');
}


try {
	error_reporting(E_ALL);

	// 1. basic  settings and functions
	require ROOT . 'vendor/wikired/wrFunctions.php';

	// 1. basic  settings
	ini_set('max_execution_time', 1200);
	set_time_limit(1200);
	error_reporting(E_ALL);

	$backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
	$caller = ($backtrace) ? $backtrace[count($backtrace) - 1]['file'] : 'unkown';

	// 2. General Config
	// 
	//$mainConfiguration = setGeneralConfig();


	// 3. App specific config VOID
	// 
	// getSpecificConfig();

	// 4. authentication 
	//

	if (_loginverification === true) {

		// valida cookies
		// _log( $_COOKIE , 'inicio validacion Cookies en wrStartup 1 ' , true );
		if (
			isset($_COOKIE['rms']) && !empty($_COOKIE['rms']) &&
			isset($_COOKIE['rmv']) && !empty($_COOKIE['rmv'])
		) {
			$rm = checkCookie($_COOKIE['rms'], $_COOKIE['rmv'], false); // do not renew cookie
		} else {
			$rm = array('status' => false);
		}
		//_log( $rm , 'fin  validacion Cookies en wrStartup 1 ' , true );
		if (true !== $rm['status']) {

			require CONFIG . 'localHosts.php';

			if (_isLocalhost($whitelist, $localHosts) || _noLogin($xOK)) {
				if (empty($_SESSION['wr'][_appName])) {
					// wrLog('se toman datos de localData.php',  true,  "auto" , true );
					//_log( $_SESSION , 'wrStartup' , true  );
					require CONFIG . 'localData.php';
					$_SESSION['wr'][_appName] = $wr;
				}
			} else {
				if (_noLogin($xLoginPage)) {
					// es la pagina de login, no hace nada porque pedirá loguearse
				} else {
					// valida cookies
					if (
						isset($_COOKIE['rms']) && !empty($_COOKIE['rms']) &&
						isset($_COOKIE['rmv']) && !empty($_COOKIE['rmv'])
					) {
						$rm = checkCookie($_COOKIE['rms'], $_COOKIE['rmv']);
					} else {
						$rm = array('status' => false);
					}
					// validacion final
					if (false == $rm['status'] || !isset($_SESSION['wr'][_appName]['uid'])) {
						//_debug ( 'usuario no identificado');
						unset($_SESSION['wr'][_appName]);
						$redirectionMsg = '
							<!DOCTYPE html>
							<html>
							<head>
								<meta charset="utf-8">
								<meta http-equiv="X-UA-Compatible" content="IE=edge">
								<meta name="viewport" content="width=device-width, initial-scale=1">
								<title>redireccionando</title>
							  	<style type="text/css" media="screen">
							  		.center-screen {
							  		  display: flex;
							  		  flex-direction: column;
							  		  justify-content: center;
							  		  align-items: center;
							  		  text-align: center;
							  		  min-height: 100vh;
							  		}
							  		.fs18 {
							  		    font-size:18px;
							  		}
							       @media all and (max-width: 480px) {
							           .fs18 { font-size: 30px;  }
							       }
							  	</style>
							</head>
							<body>
								<div  class="center-screen">';

						if (isset($rm['code']) && $rm['code'] > 100) {
							$redirectionMsg .= '
										<p class="fs18">AVISO: Se ha detectado un situación anómala<br>
										                en la rutina de Auto Conexión, con el siguiente mensaje: <br>
								' . $rm['msg'] . '<br> POr favor, verifique la seguridad de su computadora o avise al administrador del sistema. <br> Puede continuar normálmente con el proceso de conexión<p>';
						}
						$redirectionMsg .= '
									<p class="fs18">redireccionando a la <br>
										<a href="/login.php" class="fs18">página de conexión</a> 
										<br>en <span id="countdown"></span>
									</p>
								</div>
								<script type="text/javascript">
							 	var timeleft = 15;
							 	var downloadTimer = setInterval(function(){
							 	  if(timeleft <= 0){
							 	    clearInterval(downloadTimer);
							 	    // document.getElementById("countdown").innerHTML = "Finished";
							 	    window.open ("/login.php","_self",false);
							 	  } else {
							 	    document.getElementById("countdown").innerHTML = timeleft + " segundos";
							 	  }
							 	  timeleft -= 1;
							 	}, 1000);

									// setTimeout(function () { window.open ("/index.php","_self",false); }, 3000);
								</script>
							</body>
							</html>
							';
						echo $redirectionMsg;
						die;
					} else {
						// no hace nada, las variables de sesion ya estan inicializadas
					}
				}
			}
		}
	} else {
		require CONFIG . 'localData.php';
	}

	// echo 'fin login verification' . _ff;

	// finally debug
	if ($debugThisScript === true) {
		_showConfig(true);
		_showConfig(false);
	}

} catch (Exception $e) {
	$catchMsg = $e->getMessage();
	$logFolder = ROOT . 'logs/';
	if (!file_exists($logFolder) || !is_dir($logFolder)) {
		$logFolder = ROOT;
	}
	$phpLogFile = $logFolder . 'php_error.log';
	$appLogFile = $logFolder . 'app.log';
	ini_set('error_log', $phpLogFile);
	error_log($catchMsg, 0);
	error_log($catchMsg, 3, $appLogFile);
}


// ****************************************************************************
// Specific  Use Functions

function _isLocalhost($whitelist, $localHosts)
{

	return stripos($_SERVER["SCRIPT_FILENAME"], 'test') !== false ||
		stripos($_SERVER["SCRIPT_FILENAME"], 'ajax') !== false ||
		stripos($_SERVER["SCRIPT_FILENAME"], 'telegram') !== false ||
		stripos($_SERVER["SCRIPT_FILENAME"], 'cron') !== false ||
		in_array($_SERVER['REMOTE_ADDR'], $whitelist) ||
		in_array($_SERVER["HTTP_HOST"], $localHosts) ||
		in_array('*', $localHosts);
}

function _noLogin($xOK)
{ // app admited not to login
	return in_array(basename($_SERVER['PHP_SELF']), $xOK) || in_array('*', $xOK);
}

function setGeneralConfig()
{
	// get general configuration
	// 
	$mainConfig = array_change_key_case(include CONFIG . 'config.php');
	return $mainConfig;
}

function getSpecificConfig()
{
	require CONFIG . 'wasConfig.php';
	define('WasConfig', $wasConfig);
	if (stripos($_SERVER["SCRIPT_FILENAME"], 'ajax') === false) {
		echo '<script type="text/javascript" >let $was = ' . json_encode($wasConfig) . ';</script>';
	}
	require CONFIG . 'excludeFolders.php';
}

function _showConfig($pSilence = false)
{

	$mainConfiguration = array_change_key_case(include CONFIG . 'config.php');

	$showConfig = _ff . '<pre>' . _ff;
	$showConfig .= '__FILE__ = ' . __FILE__ . _ff;
	$showConfig .= 'ROOT = ' . ROOT . _ff;
	$showConfig .= 'DATA = ' . DATA . _ff;
	$showConfig .= 'OBJ = ' . OBJ . _ff;
	$showConfig .= 'CONFIG = ' . CONFIG . _ff;

	$showConfig .= 'LOGS = ' . LOGS . _ff;
	$showConfig .= 'INC = ' . INC . _ff;

	// 	$showConfig .= 'TEMPLATES = ' . TEMPLATES . _ff;
	// 	$showConfig .= 'PROJ_TEMPLATES = ' . PROJ_TEMPLATES . _ff;


	$showConfig .= 'LIBS = ' . LIBS . _ff;

	$showConfig .= 'BKG = ' . BKG . _ff;
	$showConfig .= 'IMAGE = ' . IMAGE . _ff;
	$showConfig .= 'VIDEO = ' . VIDEO . _ff;
	$showConfig .= 'AUDIO = ' . AUDIO . _ff;


	$showConfig .= 'docRoot = ' . $_SERVER['DOCUMENT_ROOT'] . _ff;

	$showConfig .= '</pre>';


	if ($pSilence !== false) {
		echo $showConfig;
		echo '<pre>';
		var_dump($_SERVER);
		echo '</pre>';
	} else {
		_log($showConfig, 'General Configuration', true);

	}
	return $showConfig;
}


function checkCookie($rms, $rmv, $renew = true)
{
	$returnValue = array(
		'status' => false,
		'code' => 1,
		'msg' => 'Remember me exception: '
	);

	try {
		require ROOT . 'vendor/wikired/wrDB.php';
		$database = new \Wikired\wrDB();
		$query = 'SELECT *  FROM `f000102` ';
		$query .= "where `rms` =  '$rms' ";
		$qr = $database->get_row($query, true);
		if (empty($qr)) {
			// can't find cookie on db
			// not fatal, but cookie must be deleted
			throw new Exception('cookie not found on db', 100);
		}
		//  validate cookie token
		if (!password_verify($rmv, $qr->rmv)) {
			// validation token not valid
			// means that the cookie was used => may be a hack
			// cookie must be deleted and user notified
			throw new Exception('cookie token not valid', 200);
		}
		// validate cookie expiration
		$now = new DateTime("now");
		$exp = new DateTime($qr->fexp);
		if ($now > $exp) {
			// cookie is expired on db
			// not fatal, but cookie must be deleted
			throw new Exception('cookie expired', 100);
		}
		$qid = $qr->id;
		// get user data
		$uid = $qr->uid;
		$query = 'SELECT *  FROM `f000101` ';
		$query .= "where `id` =  '$uid' ";
		$qr = $database->get_row($query, true);
		if (empty($qr)) {
			// user not found
			// not fatal, but cookie must be deleted
			throw new Exception('user not found ' . $uid, 100);
		}
		// check user status
		if ($qr->status != 'ok') {
			// user not allowed to login
			// not fatal, but cookie must be deleted
			throw new Exception('user not found ' . $uid, 100);
		}
		// validation OK
		//replace validator cookie 

		// modificado el 2020-11-23
		if (!empty($renew)) {
			$rmv = wrHash(50);
			$exp = time() + 30 * 24 * 60 * 60;
			$id = $qr->id;
			$updateVariables = array('rmv' => password_hash($rmv, PASSWORD_DEFAULT), 'fexp' => date('Y-m-d H:i:s', $exp));
			$upadateWhere = array('id' => $qid);
			if ($database->update('f000102', $updateVariables, $upadateWhere)) {
				setcookie('rmv', $rmv, $exp, '/');
			}
		}

		// set session variables
		$wr['uid'] = $qr->id;
		$wr['name'] = $qr->gName;
		$wr['email'] = $qr->gEmail;
		$wr['avatar'] = $qr->gAvatar;
		$wr['first'] = $qr->gNameFirst;
		$wr['last'] = $qr->gNameLast;
		$wr['locale'] = $qr->gLocale;
		$wr['gid'] = $qr->gId;
		$wr['rol'] = $qr->rol;
		$_SESSION['wr'][_appName] = $wr;
		// everything OK
		$returnValue['status'] = true;
		$returnValue['msg'] = '';
		$returnValue['code'] = 0;

	} catch (Exception $e) {
		$returnValue['msg'] .= $e->getMessage() . ' - (' . $e->getCode() . ')';
		$returnValue['code'] = $e->getCode();
		wrLog($returnValue['msg'], true, 'auto', true);
		if ($e->getCode() > 1) {
			removeCookies(array('rms', 'rmv'));
		}
	}

	return $returnValue;

}

function removeCookies($cookies = array())
{
	foreach ($cookies as $key => $value) {
		setcookie($value, '', -1, '/');
	}
}