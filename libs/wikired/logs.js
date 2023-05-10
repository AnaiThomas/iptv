// -----------------------------------------------------------------------------
// logs js routines
// 

// general variables definition 

let xf = [];
let tabs = false;
let currentLayout = 'layout';
let htmlTabTemplate = 
    '<li>' 
  + '<a href="#{href}">#{label}</a>' 
  + '<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>'
  + '</li>';

// Custom documment ready
async function documentReady(){
  // jquery  Document Ready
  $( function() { 
    // create HTML main element
    createMain();

    // buttons listener
    $('.btn').click(function(e){
      e.preventDefault()
      switch (e.target.id){
        case 'Go':
          buttonGo;
          break;
       case 'reRun':
          buttonReRun;
          break;
        default:
          console.error('unkoun button');
      }
    })

    /*
      // button Log Refresh
      $('#bLogRefresh').click(function() {
        logsAjax('refresh' , currentTab);
      }) 
      // button Empty Log 
      $('#bLogTrash').click(function() {
        logsAjax('trash' , currentTab);
      }) 
    */


  }); // end jQuery Document Ready
  return true;
};      // end Custom Document Ready

// ------------------------------------------------------------------------------
// layouts 
// 
// get active tab ID
function getActiveTabId($childNodes = false){
  let id = false;
  if ( $childNodes ){
    _.each( $childNodes ,  function(node) {
      // _debug( node , 'node')
      if ( node.id && node.attributes['aria-hidden'].value == 'false'){
        id = node.id;
      }
    })
  }
  return id;
}
// create main layout 
async function createMain(){
  try{
    // create DOM element
    // let $main  =  document.createElement("main");
    let $main  =  document.createElement("div");
    $main.style.width="100%";
    $main.style.height= getHeight();
    $main.style.margin="0px";
    $main.id = "layout";
    document.body.appendChild($main);

    // variable definitions
    const htmlBot = '<div style="display: inline;">'                                  
      + '<i id="msgIcon" class="far fa-envelope" style="padding: 0px 5px 0px 5px;"> </i>' 
      + '<span id="msgText"></span>'                                                      
      + '</div>';
    let htmlMain = '<div id="tabs"><div id="scrollerAbsolute" aria-hidden="true"><div class="scroller">';
    htmlMain    +=  '<ul >';

      // + '<li><a href="#tabs-1">PHP Error Log</a></li>'
      // + '<li><a href="#tabs-2">APP Log</a></li>'
      // + '<li><a href="#tabs-4">CRON Log</a></li>'
      // + '<li><a href="#tabs-3">PhpInfo</a></li>'
    _.each(_logs , function ( el , index ){
      htmlMain += '<li><a href="#tabs-' + (index + 1) + '">' + el.name + '</a></li>';
    });  

    htmlMain    +=  '</ul></div></div>';           
 
    _.each(_logs , function ( el , index ){
      htmlMain += '<div id="tabs-' + (index + 1) + '">';
      htmlMain += '<pre id="pre' + (index + 1) + '" ';
      if (el.type == 'file') {
        htmlMain += 'class="log2"';
      }
      htmlMain += '></pre> ';
      htmlMain += '</div>';
    });  

    htmlMain    +=  '</div>';


    const style1  = 'border: 1px solid #dfdfdf; padding: 5px;';
    const style2  = 'border: 1px solid #dfdfdf; padding-top: 5px;padding-bottom: 0px;background-color: #F2F2F2;';
    const button = {
      Orange : 'background-color: rgb(255,193,7);color: white !important;font-weight: bold',
      Green  : 'background-color: rgb(33,136,56);color: white !important;font-weight: bold',
    };
    const tbTop = {
      name:'mainToolbar',
      style   : 'background-color: #4267B2 ;color: white ;font-weight: bold;',
      items: [
        { type: 'html',  id: 'logo',
          html: function (item) {
            const html =
            // '<img src="/data/res/img/ic_launcher.png" alt="logo" height="32" width="32">' + 
            '<a href="/index.php" style="color: white ;font-weight: bold;"><i class="fas fa-home"></i></a>' + 
            '<span class="pl-3">Visor de Logs</span>'

            return html;
          }
        },
        { type: 'spacer' },
        { type: 'button',  id: 'read'         , text: 'Refresh'         , icon: 'fas fa-sync ' },
        { type: 'button',  id: 'trash'        , text: 'Empty'           , icon: 'fas fa-trash '  },
        { type: 'button',  id: 'layout_resize', tooltip: 'Resize Layout', icon: 'fas fa-expand-arrows-alt'},
      ],
      onClick: function (event) {
        tb1Click(event , this.name);

      }
    };
    const panel =  [ 
      { type: 'top'    , style: style1 , resizable: false, size: 30   , toolbar: tbTop         },
      { type: 'main'   , style: style1 , resizable: false, size: '99%' , content: htmlMain   },
      { type: 'bottom' , style: style2 , resizable: false, size: 40, content: htmlBot        }
    ]

    // set w2ui main layout
    $('#layout').w2layout({
        name    : 'layout',
        padding : 4,
        panels  : panel,
    });

    tabs = $( "#tabs" ).tabs(  );
    // set correct size to tab panel
    resizeAll();

    logsLauncher( true );

    return true;

  } catch(err) {
      alert('Error creating Main Layout: ' + err.message) ;
    return false;
  }
}
           
// toolbars manager
function tb1Click($event , $toolbar){
  // _debug ( $event )
  // _debug ( tabs )
  // _debug ( tabs[0].childNodes )
  let tabId = getActiveTabId(tabs[0].childNodes);
  _debug ( tabId )
  let $logFile , $url , $action , $pre;

  switch ($toolbar){

    case 'layout_top_toolbar':                  //Main
      switch ($event.target){

        case 'layout_resize':
          resizeAll();
          break;

        case 'read':
          $url = '/ajax/logsReload.php';
          break;  
        case 'trash':
          $url = '/ajax/logsTrash.php';
          break;  
        default:
          // _log(event.target , false,false,'e');
          messageWrite('Action not available: ' + $event.target , 'e');
          return false;
      } 
      $action  = $event.target;

      if ($action == 'layout_resize') {
        return true;
      }

      id = parseInt(_right(tabId , 1) ) - 1; 

      if ( _logs[id].type == 'file' ){
        $logFile = _logs[id].content;
        $pre = '#pre' + (id + 1 );

      } else {
        return false;
      }

      logsLauncher(false , $action , $logFile , $pre);
      break;

    default:
      messageWrite('Toolbar not available: ' + $toolbar , 'e');
  }
}

// -----------------------------------------------------------------------------
// ajax calls

async function logsLauncher($initial =  false , $action = false , $logFile = false , $pre = false){
  if ($initial === true ){
    const logsCount = _logs.length;
    let i;
    for (i = 0; i < logsCount ; i++) {
      await logsFetch(  'read'  , _logs[i].content  , '#pre' + (i + 1));
    }
    messageWrite('OK Initializating Logs  ' , 'ok') 
  } else {
    logsFetch(  $action  , $logFile  , $pre);
    messageWrite('OK reading file: ' + $logFile , 'ok') 
  }
}

async function logsFetch($action = false , $logFile = false , $pre = false){
    $url = ( $action == 'trash') ? '/ajax/logsTrash.php' : '/ajax/logsRead.php' ;
    $logFile = $logFile || 'app.log';
    $pre = $pre || '#pre2';
    const postParam = {  'logFile' : $logFile , 'action' : $action};
    const options = { 
      method: 'POST', 
      // headers: {'Content-Type': 'x-www-form-urlencoded' , 'charset': 'utf-8' }, 
      headers: {'Content-Type': 'application/json'  }, 
      body: JSON.stringify( postParam ), 
      // body:  postParam , 
        cache: 'no-cache'};
    const dataResponse = await fetch($url , options) ;
    const data = await dataResponse.json() ;

    $($pre).html(data.msg)

    return data.status;

}


// -----------------------------------------------------------------------------
// ui 
// 
function resizeAll(){
  // get overall height
  let tabPanelHeight = getHeight(true);
  // change entire layout height
  $("#layout").height( tabPanelHeight );
  w2ui.layout.resize();
  // change tab panels height
  tabPanelHeight -=  100;
  $('.ui-tabs-panel').css('height',tabPanelHeight);

}

function ajaxFinally( $msg = false , $type = false ){
  processing(false);
  if ($msg) {   
    messageWrite($msg , $type)  
  } 
}

function messageWrite($msg = false , $type = false , $timeout = 2000 , $clear = true){
  let $popUp = true;
  switch ($type){
    case 'ok':
      $('#layout_layout_panel_bottom .w2ui-panel-content').css('background-color','#99e699');
      $popUp = false
      break;
    case 'ok2':
      $('#layout_layout_panel_bottom .w2ui-panel-content').css('background-color','#99e699')
      $timeout = 4000 ;
      break;
    case 'error':
    case 'e':
      $('#layout_layout_panel_bottom .w2ui-panel-content').css('background-color','#ff8080')
      $timeout = false ;
      break;
      
    case 'warning':
    case 'warning2':
    case 'w':
    case 'w2':
      $('#layout_layout_panel_bottom .w2ui-panel-content').css('background-color','#EFDE0F')
      if ($timeout === false) {
        $popUp = false;
      }
      break;
    case 'clear':
    default:
      $('#layout_layout_panel_bottom .w2ui-panel-content').css('background-color','#F2F2F2');
      $popUp = false;
      $msg = '';
  }

  $('#msgText').text($msg);
  if ( $popUp ) {
    messageShow($msg , $type , $timeout , $clear );
  }
  if ( $clear ) {

    setTimeout(function () { 
      messageWrite(false , 'clear',false , false);
    }, $timeout || 3000);
  }  
}
function messageShow($msg = false , $type = false , $timeout = 2000 ){
  if ( !$msg ){
    $msg = 'Alert message';
  }
  w2ui[currentLayout].message('main', {
      width: 300,
      height: 200,
      hideOnClick : true,
      body: '<div class="w2ui-centered">'+ $msg +'</div>',
      buttons: '<button class="w2ui-btn" onclick="w2ui.' + currentLayout + '.message(\'main\')">Close</button>'
  })

  if ( $timeout ) {
    setTimeout(function () { w2ui[currentLayout].message('main'); }, $timeout);
  } 
 
}

function processing($start = true , $long = false){
  if ($start) { 
    $('#msgIcon').removeClass( "far fas fa-envelope" ).addClass( "fas fa-spinner  fa-spin" );
    if ( $long ) {
      const longMsg = '  Please wait, processing on Server...';
      messageWrite(longMsg ,'w' , false)
      $.blockUI({ 
        message: '<i class="fas fa-spinner  fa-spin"> </i><span>'+longMsg+'</span>' ,
        css: { 
             border: 'none', 
             padding: '15px', 
             backgroundColor: '#000', 
             '-webkit-border-radius': '10px', 
             '-moz-border-radius': '10px', 
             opacity: .5, 
             color: '#fff' 
        } 
      }); 
    }

  } else {
    $('#msgIcon').removeClass( "fas fa-spinner  fa-spin" ).addClass( "fas fa-envelope" ); 
    $.unblockUI();  
  }
};
function getHeight($px = false){
  const  body = document.body,
         html = document.documentElement;
  const height = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
  if ($px == true) {
    return height;
  } else {
    return height + 'px';
  }
}