<?php 

$_navbar_default = array(
  'id'     => 'navbarMain',
  'class'  => 'collapse navbar-collapse  pl-5' ,
  // navbar Brand
	'navBrand' => array( 
	  'show'  => true,
  	'text'  => '' ,
    'style' => '',
    'class' => '',
  	'home'  => array( 'show' => true , 'href' => '/index.php', 'target' => '_self', 'icon' => 'fas fa-home'  ),
  	'items' => array(
    	'help' => array(
        'show'  => true, 
        'class' => 'font-weight-bold text-white' ,
        'href' => '/intranet/index.php' , 
        'icon' => 'fas fa-fw fa-info-circle fa-lg' , 
    		'options' => array(
        		'data-trigger' => 'hover' , 'data-html' => 'true' , 'data-placement' => 'right' ,
        		'data-content' => 'haga click aqui para ver la Información General del Portal <br><ul><li>Normativa Aplicable </li><li>Supuestos Macroeconómicos</li><li>Cotización del dólar</li><li>Fuentes de Información</li><li>Información de Contacto</li></ul> ',
        		'style' => 'font-size: 1,0em; ' , 'id' => 'help' 
    		),
    	), 
  	),
	),
	// conjunto de  <a> sencillos
	'navItem'  => array( 'show'    => false,
  	'classDiv'  => 'navbar-nav ml-auto' ,
  	'classA'  	=> 'nav-item nav-link' ,
  	'target' 	=> '_self' ,
  	'items'  => array(

    	'ee'				=> array('href' => '/card01.php' 	, 'text' => 'Energía Eléctrica'),
    	'hc'				=> array('href' => '/card02.php' 	, 'text' => 'Hidrocarburos'),
    	'nuclear'		=> array('href' => '/nuclear.php' 	, 'text' => 'Energía Nuclear' , 
    		'badge' => array(
    			'show'  => false,
    			'class' => 'nav-link badge wrBadge' , 'text' => 'N',
    		)
    	),
    	'pivot' 			=> array('href' => '/consultas.php' 	, 'text' => 'Consultas y Reportes' ,
        'badge' => array(
          'show'  => true,
          'class' => 'badge badge-pill wrBadge' , 'text' => 'Nuevo',
        )
      ),
      'expedientes' => array('href' => '/expedientes.php'   , 'text' => 'Expedientes' , 
        'badge' => array(
          'show'  => false,
          'class' => 'badge badge-pill wrBadge' , 'text' => 'Nuevo',
        )
      ),
      'prestamos' => array('href' => '/prestamos.php'   , 'text' => 'Préstamos' , 
        'badge' => array(
          'show'  => false,
          'class' => 'badge badge-pill wrBadge' , 'text' => 'Nuevo',
          // 'class' => 'nav-link badge badge-danger' , 'text' => 'Nuevo',
        )
      ),
      'eje21'     => array('href' => '/2021.php'   , 'text' => 'FOP 2021' , 
        'badge' => array( 'show'  => false, )
      ),
    	'consolidado'	=> array('href' => '/card00.php' , 'text' => 'Consolidado'),
    	'area'			=> array('href' => '/card03.php' , 'text' => 'por Área'),
  	),
	),
	// conjunto de buttons en forma de pildoras
	'navTabs'  => array( 'show'   => false,
  	'ulID'   => 'ulNavTabs',
  	'classUL'  => 'navbar-nav ml-auto nav nav-tabs border-0' ,
  	'classLI'     => 'dropdown nav-item',
  	'classButton' => 'btn wrLight wrBtnBkg  btn-sm  rounded-pill' ,
  	'items'  => array(
    	'destacados' => array( 
    		'show' => false,
    		'id' => 'aTab1' , 'active' => true ,'text' => 'Portada' ,
      	'options' => array(
       		'aria-controls' => 'tab1' ,   'href' => '#tab1', 
       		'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , //'aria-selected' => 'false' ,
      		),
      	'badge' => array('show' => true , 'class' => 'badge badge-pill wrBadge' , 'text' => 3)
    	),
    	'seleccionar' => array(
    		'show' => false , 
    		'id' => 'aTab2' , 'active' => false ,'text' => 'Seleccionar Indicador' ,
      		'options' => array(
        		'aria-controls' => 'tab2' ,   'href' => '#tab2', 
        		'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , 
      		),
      		'badge' => array('show' => true , 'class' => 'badge badge-pill wrBadge' , 'text' => 58)
    	),
    	'metas' => array(
    		'show' => false , 
    		'id' => 'aTab3' , 'active' => false ,'text' => 'Metas e Indicadores' ,
      		'options' => array(
       		'aria-controls' => 'tab3' ,   'href' => '#tab3', 
       		'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , 
      		),
      		'badge' => array('show' => true , 'class' => 'badge badge-pill wrBadge' , 'text' => 3)
    	),
    	'cammesa' => array(
    		'show' => false , 
    		'id' => 'aTab8' , 'active' => false ,'text' => 'CAMMESA' ,
      		'options' => array(
       		'aria-controls' => 'tab8' ,   'href' => '/cammesa.php', 
       		'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , 
      		),
      		'badge' => array('show' => true , 'class' => 'badge badge-pill wrBadge' , 'text' => 5)
    	),
    	'eby' => array(
 			  'show' => false , 
 			  'id' => 'aTab7' , 'active' => false ,'text' => 'Informes E.B.Y.' ,
    		'options' => array(
				   'aria-controls' => 'tab7' ,   'href' => '/eby.php', 
				   'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , 
      	),
      	'badge' => array('show' => true , 'class' => 'badge badge-pill wrBadge' , 'text' => 4)
    	),
    	'planhogar' => array(
 			  'show' => false , 
 			  'id' => 'aTab7' , 'active' => false ,'text' => 'Mapa Programa Hogar' ,
      	'options' => array(
				 'aria-controls' => 'tab7' ,   'href' => '/ph.php', 
				 'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' ,
				 'title' => 'Programa Hogar (mapa intectactivo)' 
      	),
      		'badge' => array('show' => false , 'class' => 'badge badge-pill wrBadge' , 'text' => 4)
    	),
    	'gas' => array(
 			  'show' => false , 
 			  'id' => 'aTab8' , 'active' => false ,'text' => 'Subsidios Gas' ,
      	'options' => array(
				  'aria-controls' => 'tab78' ,   'href' => '/gas.php', 
				  'role' => 'tab' ,  'type' => 'button' , 'data-toggle' => 'tab' , 
      	),
      	'badge' => array('show' => false , 'class' => 'badge badge-pill wrBadge' , 'text' => 4)
    	),
      
  	),
	),
	// buttons on navbar
	'navButtons'  => array( 'show'      => false,
    'items'     => array(
      array('id' => '', 'class' => '' , 'icon' => '' , 'text' => ''),
    ),
	),
	// avatar with options
	'navAvatar' => array( 'show'    => false,
  	'class'   => 'nav-link dropdown-toggle p-0',
  	'options' => array(
    	'id'            => 'avatarDropdown',
    	'role'          => 'button',
    	'data-toggle'   => 'dropdown' ,
    	'aria-haspopup' => 'true' ,
    	'aria-expanded' => 'false'
  	),
  	'image'   => array(
    	'size'    => '24',
    	'id'      => 'gAvatar',
    	'class'   => 'rounded-circle'
  	),
  	'submenu'    => array(
    	'classDiv' => 'dropdown-menu dropdown-menu-right dropdown-secondary wrDropdown-menu',
    	'classA'   => 'dropdown-item wrDropdown-item',
    	'items'    => array(
      		array( 	'level' => 0 , 'class' => 'dropdown-item wrDropdown-item' ,
        		'text'=>'Desconectarse' , 'icon' => 'fas fa-power-off ' ,
        		'options' => array(
          		// 'data-toggle' => 'modal' , 'data-target' => '#modalLogout' ,
              'href' => '/logout.php' ,
        		),
      		),
      		array( 	'level' => 5 , 'class' => 'dropdown-item wrDropdown-item' ,
        		'text'=>'Ver Logs' , 'icon' => 'far fa-eye' ,
        		'options' => array(
          		'href' => '/logsViewer.php' ,
        		),
      		),
      		array( 	'level' => 8 , 'class' => 'dropdown-item wrDropdown-item' ,
        		'text'=>'Autorizaciones' , 'icon' => 'fas fa-users' ,
        		'options' => array(
          		'href' => '/ajax/f000101.php' ,
        		),
      		),                
     	),
  	),
	),
  // agregado 2020-11-25 - w2ui toolbar
  'navToolbar'  => array( 'show' => false , 'id' => 'navToolbar' ),
);