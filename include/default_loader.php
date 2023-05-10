<?php 

$_loader_default = array(
	'hash'	=> time(),
	'preloader' => true,
	'folder' => array(
		'libs' 	=> '/libs/',
		'obj' 	=> '/obj/'
	),
	'core' => array(
		'show'	=> true,
		'css' 	=> array(
			'preloader/preloader.css' , 
			'bootstrap/v431/css/bootstrap.min.css',
			'font-awesome/v572/css/all.min.css',
			'noty/v3/noty.css',
			'noty/v3/themes/metroui.css',
			'jquery-ui/full/jquery-ui.css',
			'wikired/animate.css',
			'wikired/master.css'
		),
		'js' 	=> array(
			'jquery/jquery.min.js' , 
			'bootstrap/v431/js/bootstrap.bundle.min.js',
			'noty/v3/noty.min.js',
			'underscore/underscore-min.js',
			'jquery-easing/jquery.easing.min.js',
			'jquery-ui/full/jquery-ui.min.js' , 
			'moment/moment-with-locales.js' ,
			'utils/jquery.blockUI.js',
			'numeral/numeral.js',
			'numeral/locales.js',
			'utils/jquery.scrollTo.min.js',
			'utils/jquery.preload.min.js' , 
			'wikired/master.js'
		),
	),
	'core2' => array(
		'show'	=> false,
		'css' 	=> array(
			// 'preloader/preloader.css' , 
			'bootstrap/v431/css/bootstrap.min.css',
			// 'font-awesome/v572/css/all.min.css',
			'font-awesome/full/v513/css/all.min.css',
			'noty/v3/noty.css',
			'noty/v3/themes/metroui.css',
			// 'jquery-ui/full/jquery-ui.css',
			// 'wikired/animate.css',
			'wikired/master.css'
		),
		'js' 	=> array(
			'jquery/jquery.min.js' , 
			'bootstrap/v431/js/bootstrap.bundle.min.js',
			'noty/v3/noty.min.js',
			'underscore/underscore-min.js',
			// 'jquery-easing/jquery.easing.min.js',
			// 'jquery-ui/full/jquery-ui.min.js' , 
			'moment/moment-with-locales.js' ,
			// 'utils/jquery.blockUI.js',
			'numeral/numeral.js',
			'numeral/locales.js',
			'utils/jquery.scrollTo.min.js',
			// 'utils/jquery.preload.min.js' , 
			'wikired/master.js'
		),
	),
	'gauges'	=> array(
		'show'	=> false,
		'logic' =>  'wrLogicGaugeV2.js',
		'css' 	=> array(
			'webdatarocks/v102/webdatarocks.css',
			'jstree/themes/default/style.min.css',
		),
		'js' 	=> array(
			'pp/papaparse.min.js' ,
			'webdatarocks/v102/webdatarocks.toolbar.js' ,
			'webdatarocks/v102/webdatarocks.js',
			'amcharts/v449/core.js' ,
			'amcharts/v449/charts.js' ,
			'amcharts/v449/themes/animated.js' ,
			'jstree/jstree.min.js',
			'wikired/modalPivot.js'
		),
	),
	'c3'	=> array(
		'show'	=> false,
		'data'  =>  'tableroData.js',
		'logic' =>  'wrLogic2.js',
		'css' 	=> array(
			'c3/c3.css',
		),
		'js' 	=> array(
			'd3/d3.min.js' ,
			'c3/c3.min.js'
		),
	),
	'mi'	=> array(
		'show'	=> false,
		'data'  =>  array( 'tableroMI.js' , 'tableroMetas2.js','wrLogicMetas2.js'),
	),
	'pivot'	=> array(
		'show'	=> false,
		'css' 	=> array(
			'webdatarocks/v102/webdatarocks.css',
			'jstree/themes/default/style.min.css',
			'https://fonts.googleapis.com/css?family=Roboto:400,500'
		),
		'js' 	=> array(
			'webdatarocks/v102/webdatarocks.toolbar.js' ,
			'webdatarocks/v102/webdatarocks.js',
			'jstree/jstree.min.js',
			// 'utils/clipboard.min.js',
			'wikired/modalPivot.js'
		),
	),	
	'grid'	=> array(
		'show'	=> false,
		'css' 	=> array(
			// 'grid/v430/css/tabulator.min.css',
			// 'grid/v480/css/tabulator.min.css',
			'grid/v484/css/tabulator.min.css',
		),
		'js' 	=> array(
			// 'grid/v430/js/tabulator_locale.js' ,
			// 'grid/v430/js/tabulator.js',
			// 'grid/v430/xlsx/xlsx.full.min.js',
			// 'grid/v430/pdf/jspdf.min.js',
			// 'grid/v430/pdf/jspdf.plugin.autotable.min.js',
			// 'grid/v480/tabulator_locale.js' ,
			// 'grid/v480/js/tabulator.js',
			'grid/v484/tabulator_locale.js' ,
			'grid/v484/js/tabulator.js',
			'grid/addons/jquery.sparkline.min.js',
			'grid/addons/xlsx/xlsx.full.min.js',
			'grid/addons/pdf/jspdf/v153/jspdf.min.js',
			'grid/addons/pdf/autotable/v356/jspdf.plugin.autotable.min.js',
		),
		'data'  =>  false,
		'logic' =>  false,
	),
	'planHogar'	=> array(
		'show'	=> false,
		'data'  =>  'tableroPlanHogar.js',
		'logic' =>  'wrLogicPH.js',
		'css' 	=> array(
			'c3/c3.css',
		),
		'js' 	=> array(
			'd3/d3.min.js' ,
			'c3/c3.min.js' ,
			'amcharts/v449/core.js' ,
			'amcharts/v449/charts.js' ,
			'amcharts/v449/maps.js' ,
			'amcharts/v449/themes/dataviz.js' ,
			'amcharts/v449/themes/animated.js' ,
			'amcharts/v449/geodata/argentinaLow.js' ,
		),
	),
	'logs'	=> array(
		'show'	=> false,
		'css' 	=> array(
			'w2ui/w2ui.min.css',
			'wikired/logs.css'
		),
		'js' 	=> array(
			'w2ui/w2ui.min.js' ,
			'wikired/logs.js' ,

		),
	),	
	// specific for pages
	'perPage'	=> array(
		'show'	=> false,
		'css'		=> false,
		'js'		=> false,
		'data'	=> false,
		'logic'	=> false,
	),	
	'finally' => array(
		'gaugeReady' 		=> false,
		'documentReady' 	=> false,
		'miReady' 			=> false,
	),
);
