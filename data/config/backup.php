<?php

$bkTypes = [ 
	  'root'
  , 'replication'
];
    
$bkData['root'] = [
    'folders'   => [ ROOT  , INCMASTER ]
  , 'zipNames'	=> [ 'root' , 'inc-php' ]
  , 'exFolders' => [ 
  									  ['data' , 'db' , 'test' ,'zRevisar' , 'revisar' ]
  									, ['backup' , 'temp']
  								 ]
  , 'exFiles'   => [ 
  									  ['.htaccess' , 'composer.json', 'lc.php']
  									, []
  								 ]
  , 'dbType'    => [ 'full' , 'none']
  , 'dbName'    => [ ]
];

/*
$bkData['root'] = [
    'folders'   => [ ROOT  , INCMASTER ]
  , 'zipNames'	=> [ 'root' , 'inc-php' ]
  , 'exFolders' => [ 
  									  ['data' , 'db' , 'test' ,'zRevisar' ]
  									, ['backup' , 'temp']
  								 ]
  , 'exFiles'   => [ 
  									  ['.htaccess' , 'composer.json', 'test', 'zRevisar', 'lc.php']
  									, []
  								 ]
];


 */
