<?php

$_stage = array(
     'default'   => 0 
    ,'local'     => 1   
    ,'gmail'     => 2  
    );
    
$_mailServer[0] = array(
      'SMTPDebug'     => 0
    , 'SMTPAuth'      => true
    , 'Host'          => 'mail.portalpresupuesto.ar'
    , 'SMTPSecure'    => 'ssl'
    , 'Port'          => '465'
    , 'CharSet'       => 'UTF-8'
    , 'Username'      => 'admin@portalpresupuesto.ar'
    , 'Password'      => 'Yt*FiPBC@yu)jZlg'
    , 'iUser'         => 'admin@portalpresupuesto.ar'
    , 'iPasw'         => 'Yt*FiPBC@yu)jZlg'
    , 'iPort'         => '993'
    , 'pop3Port'      => '995'
    , 'setFrom_id'    => 'admin@portalpresupuesto.ar'
    , 'setFrom_name'  => 'Administrador Portal Energia'
    , 'iFlags'        => '/novalidate-cert'
);   
    
$_mailServer[1] = array(
      'SMTPDebug'     => false
    , 'SMTPAuth'      => true
    , 'Host'          => 'mail.portalpresupuesto.ar'
    , 'SMTPSecure'    => 'ssl'
    //, 'Port'          => '587'
    , "Port"          => "465"  
    , 'CharSet'       => 'UTF-8'
    , "Username"      => "reportes@portalpresupuesto.ar"           
    , "Password"      => "Yt*FiPBC@yu)jZlg"  
    , 'iUser'         => 'dp@wikired.com.ar'
    , 'iPasw'         => 'qU$3gRQ8(Ti33Mc2'
    , 'iPort'         => '993'
    , 'pop3Port'      => '995'
    , 'setFrom_id'    => 'reportes@portalpresupuesto.ar'
    , 'setFrom_name'  => 'Agente de Envio Automatico de Reportes'
    , 'iFlags'        => '/novalidate-cert'
); 

$_mailServer[2] = array(
      'SMTPDebug'     => false
    , 'SMTPAuth'      => true
    , 'Host'          => 'smtp.gmail.com'
    , 'SMTPSecure'    => 'tls'
    , "Port"          => "587"  
    , 'CharSet'       => 'UTF-8'
    , "Username"      => "portalpresupuesto@gmail.com"           
    , "Password"      => "9u4GAymRD3UbfeJ"  
    , 'iUser'         => 'dp@wikired.com.ar'
    , 'iPasw'         => '9u4GAymRD3UbfeJ'
    , 'iPort'         => '587'
    , 'pop3Port'      => '587'
    , 'setFrom_id'    => 'portalpresupuesto@gmail.com'
    , 'setFrom_name'  => 'Agente de Envio Automatico de Reportes Portal de Presupuesto'
    , 'iFlags'        => '/novalidate-cert'
); 
