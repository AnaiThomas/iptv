let exportFileName = '';

// tree variables - internal use exclusive
let treeNodes = {};
let lastId = {};
let node  ;
let $tree = '#jsTree';
// variables - mix use 
let treeType = false, treePath = false, treeName = false ;
let rememberProject = true;
let variableButtons;
let treeSelectedNode = false;

$(function () {
	// cloase loader
	//$("body").addClass("loaded");

	// save grid options modal
	$('#modalSave').on('shown.bs.modal', function (e) {
		// $('#tooltipSaveData').popover();
		$('[data-toggle="popover"]').popover();
		$('#cbIncludeData').prop('checked', false);
	});

	$('#doSave').on('click', function (e) {
		let okFilename = {};
		let okSubFolder = {};
		try {
			if ( $('#inputFileNameSave').val().length  == 0){
				okFilename.string = moment().format('YYYY-MM-DD_HH-mm-ss');
			} else {
				okFilename =  validateFileName( $('#inputFileNameSave').val() ) ;
				if ( !okFilename.status ){
					throw 'Nombre de Archivo: ' + okFilename.msg;
				}
			}

			if ( $('#inputFolder').val().length  == 0){
				okSubFolder.string = false;
			} else {
				let originalString = $('#inputFolder').val();
				if ( originalString.includes('//') ) {
					throw 'Nombre de Carpeta no puede contener dos / seguidos  ' ;
				}
				if ( _right( originalString , 1 ) == '/' ){
					originalString = originalString.slice(0, -1);
				}
				if ( _left( originalString , 1 ) == '/' ){
					originalString = originalString.substring(1);
				}				
				okSubFolder.string = '';
				const splitFolder = originalString.split('/');
				_.each(splitFolder, function(subfolder) {
					tempFolder = validateFileName( subfolder ) ;
					if ( !tempFolder.status ){
						throw 'Nombre de Carpeta: ' + tempFolder.msg;
					}
					okSubFolder.string +=  tempFolder.string + '/';
				});
			
			}
			// get report structure
			pivotSaved = myPivot.getReport();
			if ( false === $('#cbIncludeData')[0].checked  ) {
				pivotSaved.dataSource.data.length = 0;
			}
			const saveValues 	= {
				'action'      	: 'save'
				, 'module'     : pivotModule
				, 'subFolder'	:  okSubFolder.string
				, 'filename'   : okFilename.string + '.json'
				, 'gridData'   : JSON.stringify(pivotSaved)
			};

			// call ajax to save report structure
			ajaxUrl = '/ajax/pivotFiles.php';
			$.ajax({ 
			  url         : ajaxUrl   ,
			  type        : 'POST'    ,
			  dataType    : 'json'    ,
			  cache       : true      ,
			  processData : true      ,
			  contentType : 'application/x-www-form-urlencoded; charset=UTF-8' ,
			  data        : saveValues ,
			  
			  success: function(response, textStatus, jqXHR) {
			    if (response.status == "ok")  {
			      ShowNotyPopUp ( 'se ha guardado la grilla actual <br>' +  response.msg , 'ok' , 'center');
			    } else {
			       ShowNotyPopUp ( 'Error guardando la grilla actual' , 'errorModal'  );
			    } 
			    return true;
			  }
			  , error: function(jqXHR, textStatus, errorThrown) {
			    finalMsg = 'Error crítico en acceso al servidor: ' + ajaxUrl + ' , ' + textStatus + ' - ' + errorThrown ;
			    ShowNotyPopUp ( finalMsg , 'errorModal'  );
			  }
			}); 

		} catch(err) {					
				ShowNotyPopUp( err , 'errorModal');
				return false;
			}
			$('#modalSave').modal('hide'); 
	});	

	// export options modal 
	// 
	$('#modalExport').on('shown.bs.modal', function (e) {
		formControls();
	  	$('#inputTitulo').val( exportTitle );
	  	$('#inputFileName').val( exportTitle );
	});

	$('#inputFileName').on('change', function(e) {
		const newValue = $('#inputFileName').val();
	   const validation =  validateFileName( newValue ) ;
	   if ( !validation.status ){
	   	ShowNotyPopUp( validation.msg , 'errorModal');
	   } else {
	   	exportFileName = validation.string;
	   }
	});				

	$('input[name="rbFormato"]').on('change', function(e) {
	   formControls(  e.currentTarget.value );
	});

	$('#doExport').on('click', function (e) {
		const titulo 			= $('#inputTitulo').val() ;
		const exportFooter 	= '<div class="container"> ' + 
			'<div class="row"> '+ 
			'<div class="col">Portal de la Dirección de Presupuesto</div>'+
			'<div class="col">Secretaría de Energía</div> ' +
			'<div class="col">##CURRENT-DATE##</div> '+
			'</div></div>';
		// const exportHeader  	= '<div class="text-center font-weight-bold">' + 
		const exportHeader  	= "<div class='text-center font-weight-bold'>" + 
			titulo.replace(/\s+/g,"&nbsp;" ) + 
			'</div>';

		const exportValues 	= {
			titulo 		: titulo , 
			fileName 	: $('#inputTitulo').val() 										, 
			header 		: exportHeader														,
			footer 		: exportFooter														,
			formato 		: $('input[name="rbFormato"]:checked').val() 			, 
			orientacion	: $('input[name="rbPageOrientation"]:checked').val() 	, 
			filtros 		: $('#cbIncludeFilters')[0].checked							,
		};

		let exportOptions = {
	    	pageOrientation : exportValues.orientacion
	    	// , header          : exportValues.header
	    	, filename 			: exportValues.fileName 
	    	//, footer          : exportValues.footer
	    	, excelSheetName  : exportValues.titulo
	    	, showFilters 		: exportValues.filtros			
		}

		if ( pivotModule != 'gas' ){
			exportOptions.header = exportValues.header;
			exportOptions.footer = exportValues.footer;
		}

		myPivot.exportTo(
			exportValues.formato ,
		  	exportOptions,
		  	function () {}
		);
	  	// formControls();
	  	$('#modalExport').modal('hide');
	});

	// tree modal 
	// 
	$('#modalTree').on('shown.bs.modal', function (e) {
		_createTree();
	});

	$('#doLoad').on('click', function (e) {
		if ( false === treeSelectedNode ){
			ShowNotyPopUp( 'Primero debe seleccionar un archivo' , 'errorModal');
		} else {
			_loadGrid ( treeSelectedNode )
		}
	});

	$('#doDelete').on('click', function (e) {
		if ( false === treeSelectedNode ){
			ShowNotyPopUp( 'Primero debe seleccionar un archivo' , 'errorModal');
		} else {
			var n = new Noty({
				theme: notyTheme            
				,layout: 'center'
				,modal 	: true
			  	,text: 'Confirma eliminar el archivo?' + "<br>" + 'Esta operación no puede deshacerse'
				,buttons: [
				 Noty.button('No', 'btn btn-outline-danger btn-sm ', function () {
				     n.close();
				 }),
				 Noty.button('Si', 'btn btn-outline-success  btn-sm', function () {
				     _deleteFile( treeSelectedNode );
				     n.close();
				 }), 


				]
			}).show();
		}
	});

});	// end jquery document ready

// customize Pivot Table Toolbar
function customizeToolbar(toolbar) {

	let newtabHandler_Back = function() {
	 $('#tab1').tab('show');
	 $('#tabPT').removeClass('active');
	}; 

	let newtabHandler_Export = function() {
	 $('#modalExport').modal('show');
	};   

	let newtabHandler_Open = function() {
	 $('#modalTree').modal('show');
	}; 


	let newtabHandler_Save = function() {
	 $('#modalSave').modal('show');    
	}; 

	let tabs = toolbar.getTabs();               
	let customIcons = {
	 Export    : '<i class="fas fa-print tbIcon"></i>'    ,
	 Format    : '<i class="fas fa-edit tbIcon"></i>'            ,
	 Options   : '<i class="fas fa-cog tbIcon"></i>'           ,
	 Fields    : '<i class="fas fa-th tbIcon"></i>'    , 
	 Fullscreen: '<i class="fas fa-expand-arrows-alt tbIcon"></i>'   ,
	};

  	let customTabs = [
		{ id      : 'wdr-tab-custom-format-cell'      , 
			title   : 'Celdas'            ,
			handler : tabs[3].menu[0].handler  ,
			icon    : '<img src="/data/res/img/cell.png" alt="" width="26px" height="18px" title="Dar Formato a Celdas">'
		},
		{ id      : 'wdr-tab-custom-format-cond'      , 
			title   : 'Condicional'            ,
			handler : tabs[3].menu[1].handler  ,
			icon    : '<img src="/data/res/img/conditional.png" alt="" width="26px" height="18px" title="Formato Condicional">'
		},
		{ id      : 'wdr-tab-custom-export'      , 
			title   : 'Exportar'            ,
			handler : newtabHandler_Export  ,
			icon    : '<i class="fas fa-download tbIcon"></i>'
		},
		{ id      : 'wdr-tab-custom-open'      , 
			title   : 'Abrir'            ,
			handler : newtabHandler_Open  ,
			// handler : tabs[0].handler   ,
			icon    : '<i class="fas fa-folder-open tbIcon"></i>'
		},                  
		{ id      : 'wdr-tab-custom-save'      , 
			title   : 'Guardar'            ,
			handler : newtabHandler_Save  ,
			// handler : tabs[1].handler   ,
			icon    : '<i class="fas fa-save tbIcon"></i>'
		},


  	];

  	if ( typeof hideToolbarBack === typeof undefined || !hideToolbarBack ){
  		const toolbarBack = 	{ 
  			id      : 'wdr-tab-custom-back'      , 
			title   : 'Volver'            ,
			handler : newtabHandler_Back  ,
			icon    : '<i class="fas fa-arrow-left tbIcon"></i>'
		};
		customTabs.push(toolbarBack); 
  	}

  	toolbar.getTabs = function() {
   	_.each(tabs , function(el, index) {
	      if (customIcons[el.title]) {
	        el.icon = customIcons[el.title];
	      }
	      switch (el.title){
	        case 'Open':
	        case 'Save':
	        case 'Export':
	        case 'Format':
	          delete tabs[index];
	          break;
	        default:
	          tabs[index].rightGroup = false;
	      }
    	});
		// add custom buttons
		// 
		_.each(customTabs , function(customTab, index) {
			tabs.unshift({
			    id     : customTab.id       ,
			    title  : customTab.title    ,
			    handler: customTab.handler  ,
			    icon   : customTab.icon
			});
		});

		// end function
	   return tabs;
  	}
} 

// load grid modal modal
function _loadGrid( $filename = false){
	ajaxData = {
		'action'				: 'load'
		, 'module' 			: pivotModule
		, 'filename'		: treeSelectedNode
	};
	$.ajax({
	    url         : '/ajax/pivotFiles.php'
	  , type        : 'POST'
	  , dataType    : 'json'
	  , data        : ajaxData  
	  ,  success: function(data, textStatus, jqXHR) {
    		if (data.status == 'ok' )  {
    			// re create pivot grid
    			let newGrid = JSON.parse(data.gridData);
    			if ( 'gauges' == pivotModule ){
    				newGrid.dataSource.data = pivotData.data;
    			} else {
    				newGrid.dataSource.data = pivotJson.data;	
    			}
    			
    			myPivot.setReport( newGrid );
    			$('#modalTree').modal('hide');
	         ShowNotyPopUp( 'Se aplicó el formato de Grillla guardado en: <br>' +  data.msg, 'ok', 'center');        
	    } else {
	        ShowNotyPopUp( data.msg , 'errorModal');
	    } 
	  }
	  , error: function(jqXHR, textStatus, errorThrown) {
	    // xMsg = 'Critical error on Ajax: ' + ajaxUrl + ' , ' + textStatus + ' - ' + errorThrown ;
	    // ajaxFinally(xMsg , 'e' );
	    // ajaxFinally( jqXHR.responseText , 'e' );
	    ShowNotyPopUp( jqXHR.responseText  , 'errorModal');
	     
	  }
	});
}

// export options modal
function formControls( $type = false ){
	if ($type === false ){
		$type = 'pdf';
		$("input[name=rbFormato][value='pdf']").prop("checked",true);
	}
	switch ( $type  ) {
		case 'pdf':
			$('.hideIncludeFilters').show();
			$('.hidePageOrientation').show();
			break;
		case 'excel':
			$('.hideIncludeFilters').hide();
			$('.hidePageOrientation').hide();
			break;
		case 'html':
			$('.hideIncludeFilters').hide();
			$('.hidePageOrientation').hide();
			break;
		default:
			// no action
			break;
	}
}

// tree modal
function doIteration($array , $tree){
   _.each($array, function(element) {
    let newNode = {};
    newNode.id = element.id;
    newNode.path = element.path;
    newNode.name = element.text;
    treeNodes[$tree][element.id] = newNode;
    if (_.isArray(element.children) ){
        doIteration(element.children , $tree);
    }
   });		   
};

function _createTree( ){
	if ( $($tree).jstree(true) )	{
		$($tree).jstree(true).destroy();
	}		
  	lastId[$tree] = 0;
  	_debug( pivotRoot , 'pivotRoot')
	node = {
	     id  	: lastId[$tree]  
	   // , path 	: 'd:/dropbox/dp/data/pivot/' + pivotModule + '/'      
	   , path 	: pivotRoot + pivotModule + '/'      
	   , name 	: pivotModule
	   // path: treePath       ,
	   // name: treeName
	};
	treeNodes[$tree] = [];
	treeNodes[$tree][lastId[$tree]] = node;
	$($tree)
	  	.on('ready.jstree', function (e, data) { 
	    	const nodeRoot = data.instance.element[0].attributes['aria-activedescendant'].value ;
	    	$($tree).jstree(true).toggle_node(nodeRoot);
	  	})
	  	.on('select_node.jstree', function (ev , sel) {
	  		treeSelectedNode =  ( sel.node.icon == 'fas fa-file') ? sel.node.original.path : false;
	  	})
	  	.jstree({
	   	'core' : {
	      	'multiple' : false,
	      	'data':{
	        		'type'		: 'POST',
	        		'dataType' 	: 'json',
	        		'url'			: '/ajax/pivotFiles.php',
	        		'data'		: function (node) { 
	          		let thisId , thisPath;
	          		// root node			          		
	          		if ( node.id == 'j1_1') { node.id = '#'};
	          		if ( node.id == '#'   ) {            
	            		thisId = node.id;   
	            		thisPath = treeNodes[$tree][0].path;   
	            		thisName = treeNodes[$tree][0].name;
	          		} else {                             
	            		thisId =  parseInt(node.id);                         
	            		thisPath = treeNodes[$tree][thisId].path;
	            		thisName = treeNodes[$tree][thisId].name;
	          		}
	          		lastId[$tree]++;
	          		return { 
	          			'action'				: 'tree'
	          			, 'module' 			: pivotModule
	          			, 'treeNodeId'		: thisId
	          			, 'treeLastId' 	: lastId[$tree]
	            		, 'treePath'   	: thisPath				//ojo
	            		, 'treeType'   	: 'files'
	            		, 'treeNodeName'  : thisName
	          		}; 
	        		},
	        		'success': function (retval) {          
	          		lastId[$tree] = retval[0].lastId;                
	          		let root = retval[0].path;
	          		treePath = root;
	          		return doIteration( retval[0].children , $tree);
	        		},
	        		'error': function (retval) {
	          		console.log(retval.responseText);
	          		alert('error from ajax');
	        		}
	      	}
	    	}
	    	, 'plugins' : [  'wholerow' ]    //, 'dnd' , 'contextmenu' 
	    	//, 'contextmenu':  contextMenu[$tree]
	  	})          // end jsTree definition
	// }
}

function _deleteFile($path){
	ajaxData = {
		'action'				: 'treeDeleteNode'
		, 'module' 			: pivotModule
		, 'treeNodeId'		: 'void'
		, 'treeLastId' 	: 'void'
			, 'treePath'   	: $path
  		, 'treeType'   	: 'void'
  		, 'treeNodeName'  : 'void'
	};
	// const sourceNode = $($tree).jstree(true).get_selected(true);  
	// const parentNodeId = sourceNode[0].parent; 
	// const parentNode = $($tree).jstree(true)._model.data[parentNodeId];
	$.ajax({
	    url         : '/ajax/pivotFiles.php'
	  , type        : 'POST'
	  , dataType    : 'json'
	  , data        : ajaxData  
	  ,  success: function(data, textStatus, jqXHR) {
    		if (data.status == 'ok' )  {
    			// re create tree
    			_createTree( );
	         ShowNotyPopUp( data.msg , 'ok');        
	    } else {
	        ShowNotyPopUp( data.msg , 'errorModal');
	    } 
	  }
	  , error: function(jqXHR, textStatus, errorThrown) {
	    // xMsg = 'Critical error on Ajax: ' + ajaxUrl + ' , ' + textStatus + ' - ' + errorThrown ;
	    // ajaxFinally(xMsg , 'e' );
	    // ajaxFinally( jqXHR.responseText , 'e' );
	    ShowNotyPopUp( jqXHR.responseText  , 'errorModal');
	     
	  }
	});	   
};	