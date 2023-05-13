/*
*   index.php logic
*/

// global variables

let crud = false;
let optionList;
let ol_Sector;
let ol_Subsector;
let ol_Entidad;

// Custom documment ready
async function documentReady(){
    // global config
    numeral.locale('es-es');
    moment.locale('es-us');

    // get optionList
    let optionList   = await getOptionList( 'optionList_grupo' );  

    // configure jTable
    const td = await tableDefinition( dataSource , optionList ) ;
    // make jTable
    $('#wrTableContainer').jtable( td );
    // load data from server
    $('#wrTableContainer').jtable('load');

    // filter event
    $('.filterSelector' ).change(function() {
      $('#wrTableContainer').jtable('load', {
        tipo   : $('#filterType').val() , 
        nombre : $('#filterName').val()
      });
    })

    return true;
}       // end Custom Document Ready     -------------------------


async function tableDefinition( $dataSource = false , $optionList){
  
  let rv ;    // return variable
  try {
    // check main parammeter
    if ( false === $dataSource ){
      throw 'missing data source ';
    }
    // common configuration

    const pageSizes = [10,15,25,50,100,250,500];

    rv = {
      columnResizable     : true,
      multiselect         : false,
      selecting           : false,
      selectingCheckboxes : false,
      paging              : true,
      pageSizes           : pageSizes,
      pageSize            : 15,
      sorting             : true,
      defaultSorting      : 'orden,nombre ASC',
      actions             : {
        createAction        : '/ajax/crud03.php?action=create_' + $dataSource,
        listAction          : '/ajax/crud03.php?action=read_'   + $dataSource,
        updateAction        : '/ajax/crud03.php?action=update_' + $dataSource,
        deleteAction        : '/ajax/crud03.php?action=delete_' + $dataSource,
      },
      ajaxSettings: {
        type: 'POST',
        data: {user: '8002'}
      },
      fields              : {
        id: {
          key    : true,
          width  : '3%',
          create : false,
          edit   : false,
          title  : 'id',
          list   : true
        },
        orden: {
          title      : 'Orden',
          width      : '5%',
          inputClass : 'validate[required]'
        }, 
        nombre: {
          title      : 'Nombre',
          width      : '15%'   ,
          inputClass : 'validate[required]'
        },

      }
      //Initialize validation logic when a form is created
      ,formCreated: function (event, data) {
        data.form.validationEngine(
          { promptPosition: "Right", 
          autoPositionUpdate: true}
        );
        setTimeout(function () {
          data.form.css('width', '50vw');
          data.form.find('input').css('width','40vw');
          let $dialogDiv = data.form.closest('.ui-dialog');
          $dialogDiv.css('top', '70px');
          $dialogDiv.css('left', '25vw');
        }, 500);
      }
      //Validate form when it is being submitted
      ,formSubmitting: function(event, data){
        return data.form.validationEngine('validate');
      }
      //Dispose validation logic when form is closed
      ,formClosed: function (event, data) {
        data.form.validationEngine('hide');
        data.form.validationEngine('detach');
        if ( false === crud ){
          ShowNotyPopUp('Acción cancelada', 'warning_fast' );
        }
        crud = false;
      }
      ,recordAdded(event, data) {
        ShowNotyPopUp('Registro insertado' , 'ok_fast'   ); 
        crud = true; 
      }  
      ,recordDeleted(event, data) {
        ShowNotyPopUp('Registro eliminado' , 'ok_fast'   );  
        crud = true; 
      }    
      ,recordUpdated(event, data) {
        ShowNotyPopUp('Registro actualizado' , 'ok_fast'   ); 
        crud = true;    
      }   
    };
    // data source switcher
    switch ( $dataSource ){
      case 'f0311':
        rv.defaultSorting = 'orden, nombre ASC',
        rv.title          = 'Canales de IPTV';
        rv.fields.logo    = {
          title      : 'Logo',
          width      : '15%',
        };
        rv.fields.url  = {
          title      : 'URL',
          width      : '50%',
        };
        rv.fields.grupo      = {
          title      : 'Grupo',
          width      : '7%',
        };
        break;

      default:
        throw 'invalid data source: ' + $source;
    }

  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString() ,  'errorModal') ;
  }
  finally {
    procesando('hide');
    return rv;
  }
}

function procesando( $action ){
  //pendiente
}

async function getOptionList($source = false , $sort = 'nombre ASC'){
  let rv = false;
  try{
    postParam    = { action : $source, jtSorting : $sort };
    options      = {
      method  : 'POST',
      headers : {'Content-Type': 'application/json'  },
      body    : JSON.stringify( postParam ),
      cache   : 'no-cache'
    };
    dataResponse = await fetch('/ajax/crud03.php' , options) ;
    dataJson     = await dataResponse.json() ;

    if ( dataJson.Result != 'OK' ) {
      throw dataJson.Message;
    } else {
      rv = dataJson.Options;
    }

  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString() ,  'errorModal') ;
  }
  finally {
    procesando('hide');
    return rv;
  }
}
