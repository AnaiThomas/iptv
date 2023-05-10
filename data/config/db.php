<?php

define( 'DB_USER', 'wikiredc_iptv' ); // set database user
define( 'DB_PASS', 'HGq282TQnI.Vwp@G' ); // set database password
define( 'DB_NAME', 'wikiredc_iptv' ); // set database name
// define( 'DB_PORT', 3308 ); // set database port

define( 'DB_HOST', 'localhost' ); // set database host
define( 'SEND_ERRORS_TO', 'error_log' ); //set email notification email address or debug_log
define( 'DISPLAY_DEBUG', true ); //display db errors?

define( 'WR_SALT' , '$2y$10$pHcKSXJ04vhf.YURAA.faugG566k6CGbWzRHlyh0t.fKdvJeCJ1Oq');
// salt para links
define( 'WR_SALT_LINK' , '$2y$10$sWPnlOwaqQGGQR87X2Jmfe7bavHd7vNBqa9BxbzQlz5yqxVfpqFmO');
// salt para ID
define( 'WR_SALT_ID' , '$2y$10$3CUwNqvSwou0TXqyngoeEeQK2wF0Wlt3PGWahREZc3whP0Jv23ySu');
// AES mode
define( 'AES' , 'AES-128-ECB');


define('_KeyK', '6LcxCzsUAAAAAP5IhwqJRTwR88EZF9fediqBmVaJ');


/* hash routines for login salt

echo "<h2> Composicion de hash </h2>" ;

$saltKey = 'WiKiReD##2018';
$password = 'LuisCarrizo2018@@';

$salt =  hashGen($saltKey , 10);
echo "salt     = " . $salt . "<br>";

$hash = crypt($password, $salt); 
echo "hash     = " . $hash . "<br>";

$hashUser = crypt($password , $salt); 
echo "hashUser = " . $hashUser . "<br>";

$validacion = ($hashUser == $hash) ? "OK" : "error";
echo "validacion = " . $validacion . "<br>";



function hashGen($Password , $Cost = 10){
    $salt = substr(base64_encode(openssl_random_pseudo_bytes(17)),0,22);
    $salt=str_replace("+",".",$salt);

    $param='$'.implode('$',array(
                    "2y", //select the most secure version of blowfish (>=PHP 5.3.7)
                    str_pad($Cost,2,"0",STR_PAD_LEFT), //add the cost in two digits
                    $salt //add the salt
                    ));

    return crypt($Password,$param);
}



//  hash routines for unsub salt

<?php

echo "<h2> Composicion de hash para links </h2>" ;

$saltKey = '2018Links@@WiKiReD';
$mail = 'lcarrizo2012@gmail.com';
$id = '1093';

$salt =  hashGen($saltKey , 10);
echo "salt     = " . $salt . "<br>";

$hashMail = crypt($mail, $salt); 
echo "hash Mail    = " . $hashMail . "<br>";

$hashId = crypt($id , $salt); 
echo "hash Id = " . $hashId . "<br>";






 */

