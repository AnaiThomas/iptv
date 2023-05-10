/*
*   p0590 &  p0591  js logic
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
    let optionList;
    if ( dataSource == 'f0591'){
      optionList   = await getOptionList( 'optionList_conceptoAll' );  
      ol_Sector    = await getOptionList( 'optionList_sector' );  
      ol_Subsector = await getOptionList( 'optionList_subsector' );  
      ol_Entidad   = await getOptionList( 'optionList_entidad' );  
    }
    if ( dataSource == 'f0590'){
      optionList = await getOptionList( 'optionList_tipoDato' ); 
      _.each(optionList , function (element) {
        $('#filterType')
            .append($("<option></option>")
                       // .attr("value", key)
                       .text(element)); 
      });
    }
    
    // configure jTable
    const td = await tableDefinition( dataSource , optionList ) ;
    // make jTable
    $('#wrTableContainer').jtable( td );
    // load data from server
    $('#wrTableContainer').jtable('load');

    // filter event
    // modificado el 2022-08-03
    // se agrego el filtro por nombre
    //$('#filterType' ).change(function() {

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
    rv = {
      columnResizable     : true,
      multiselect         : false,
      selecting           : false,
      selectingCheckboxes : false,
      paging              : true,
      pageSize            : 10,
      sorting             : true,
      defaultSorting      : 'nombre ASC',
      actions             : {
        createAction        : '/ajax/crud03.php?action=create_' + $dataSource,
        listAction          : '/ajax/crud03.php?action=read_'   + $dataSource,
        updateAction        : '/ajax/crud03.php?action=update_' + $dataSource,
        deleteAction        : '/ajax/crud03.php?action=delete_' + $dataSource,
      },
      ajaxSettings: {
        type: 'POST',
        data: {user: '8855'}
      },
      fields              : {
        id: {
          key    : true,
          width  : '5%',
          create : false,
          edit   : false,
          title  : 'id',
          list   : true
        },
        nombre: {
          title      : 'Nombre',
          width      : '20%'   ,
          inputClass : 'validate[required]'
        },
        orden: {
          title      : 'Orden',
          width      : '5%',
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
      case 'f0590':
        rv.defaultSorting = 'tipo, nombre ASC',
        rv.title          = 'U.D.C.';
        rv.fields.tipo    = {
          title      : 'Tipo de Dato',
          width      : '10%',
          options    : $optionList,
          inputClass : 'validate[required]'
        };
        rv.fields.titulo  = {
          title      : 'Titulo',
          width      : '15%',
        };
        rv.fields.t1      = {
          title      : 'T1',
          width      : '5%',
        };
        rv.fields.t2      = {
          title      : 'T2',
          width      : '5%',
          create     : false,
          edit       : false,
        };
        rv.fields.t3      = {
          title      : 'T3',
          width      : '5%',
          create     : false,
          edit       : false,
        };
        rv.fields.n1      = {
          title      : 'N1',
          width      : '5%',
        };
        rv.fields.n2      = {
          title      : 'N2',
          width      : '5%',
          create     : false,
          edit       : false,
        };
        rv.fields.n3      = {
          title      : 'N3',
          width      : '5%',
          create     : false,
          edit       : false,
        };
        break;

      case 'f0591':
        rv.title          = 'Planes de Gobierno';
        //rv.defaultSorting = 'NOMBRE ASC';
        rv.fields.concepto      = {
          title      : 'Concepto',
          width      : '10%',
          //options    : '/ajax/crud059.php?action=optionList_concepto',
          // options: { '1': 'Activa', '2': 'Inactiva' , '3': 'Terminada' },
          options: $optionList,
          inputClass : 'validate[required]'
        };
        rv.fields.sector      = {
          title      : 'Sector',
          width      : '10%',
          //options    : '/ajax/crud059.php?action=optionList_concepto',
          // options: { '1': 'Activa', '2': 'Inactiva' , '3': 'Terminada' },
          options: ol_Sector,
          inputClass : 'validate[required]'
        };
        rv.fields.subsector      = {
          title      : 'Sub Sector',
          width      : '10%',
          //options    : '/ajax/crud059.php?action=optionList_concepto',
          // options: { '1': 'Activa', '2': 'Inactiva' , '3': 'Terminada' },
          options: ol_Subsector,
          inputClass : 'validate[required]'
        };
        rv.fields.entidad      = {
          title      : 'Entidad',
          width      : '10%',
          //options    : '/ajax/crud059.php?action=optionList_concepto',
          // options: { '1': 'Activa', '2': 'Inactiva' , '3': 'Terminada' },
          options: ol_Entidad,
          inputClass : 'validate[required]'
        };
        rv.fields.ap      = {
          title      : 'AP',
          width      : '5%',
          inputClass : 'validate[required]'
        };
        rv.fields.og      = {
          title      : 'OG',
          width      : '5%',
          inputClass : 'validate[required]'
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
    dataResponse = await fetch('/ajax/crud059.php' , options) ;
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

