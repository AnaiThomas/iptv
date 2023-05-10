/****************************************************************************
//  master.js
//  Description.....: common js scripts                                                             
//  Author..........: Luis Carrizo - wikired.com.ar  
//  Copyright.......: (2019) Luis Carrizo (https://github.com/LuisCarrizo) 
//  Licensed........: MIT (https://github.com/LuisCarrizo/wrCommon/blob/master/LICENSE)                      
//  Date Created....: 2012-09-30
//  Version.........: 1.0                                            
//  Modifications...: 2019-03-17                                                          
/****************************************************************************/


const notyTheme = 'metroui';
let currentTab = false;
 
$(function () {

	// document.oncontextmenu = function () { return false; };
	// $(document).mousedown(function (e) {
	//     if (e.button == 2) {
	//         ShowNotyPopUp("No esta permitido usar click derecho!!", "error", "bottomLeft");
	//         return false;
	//     }
	//     return true;
	// });
    
    // prueba  el 2021-07-14 - darkmode
    // new Darkmode({
    //   bottom: '32px',
    //   right: '32px',
    //   time: '0.5s',
    //   label: '🌓'
    // }).showWidget();

	// bootstrap popover ON  
	$('[data-toggle="popover"]').popover();

  /* muestra mensaje emergente pendientes */
	ShowNoty();   

    // lazy avatar img load
    if ( typeof preload === "function" ) {
        $('#gAvatar').preload({
          placeholder :'/data/res/img/user-bw.png',
          notFound    :'/data/res/img/user-bw.png'
        });  

    }
  


  // logs tab panel
  // 
  // manage tab panels navigation
  // 
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  currentTab = e.target.id;
	  if ('aTab3' == currentTab) {
	      $("#logProgressBar").hide();
	      currentTab = 'aLogTab1';
	  }
	  if ('aLogTab3' == currentTab) {
	      $('#bLogTrash').prop('disabled', true);
	      $('#bLogRefresh').prop('disabled', true);
	  } else {
	      $('#bLogTrash').prop('disabled', false);
	      $('#bLogRefresh').prop('disabled', false);
	  }            
	})
  // button Log Refresh
	$('#bLogRefresh').click(function() {
    logsAjax('refresh' , currentTab);
	}) 
  // button Empty Log 
	$('#bLogTrash').click(function() {
   	logsAjax('trash' , currentTab);
	}) 


  // button ToTop
  // 
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

});

/****************************************************************************/
/*                                                                          */
/* Auxiliar  Functions                                                      */
/*                                                                          */
/****************************************************************************/

function _log($msg , $title = false , $time = false){
    if ($title){
        console.info( '*** ' + $title + ' ------------------------');
    }
    if ($time){
        const $ahora = new Date().getTime() / 1000;
        console.log( '*** ' + $ahora); 
    }
    if ( typeof $msg == 'boolean'){
        $msg = $msg.toString();
    }
    console.log($msg);    
}

function _debug($msg , $title = false , $time = false){
    _log($msg , $title  , $time);
}

function _debugClone($msg , $title = false , $time = false){
    _log( _.extendOwn({},$msg) , $title  , $time);
}

function _right(text , number){
    return text.substring(text.length - number, text.length);
}
function _left(text , number){
    return text.substring(0 , number);
}
function _mid(text , start , len){
    return text.substring(start -1 , start + len -1);
}

function _trim( text = ''){
    // return text.replace(/\s+/g, '');
    return text.replace(/ /g, '');
}

function _now( miliseconds = false , format = false){
    /*
    _now(true , true)   = 17:01:58.352
    _now(true , false)  = 1591128118368
    _now(false , true)  = 2020-06-02T20:01:58.370Z  
    _now(false , false) = 2/6/2020 17:07:23
    */
    const d = new Date();
    let result;
    if (miliseconds === true) {
        if ( format  === true){
            // const t = d.toLocaleTimeString();
            // return `${t.substring(0,8)}.${date.getMilliseconds() + t.substring(8,11)}`;
            // return `${d.toLocaleTimeString('it-US')}.${d.getMilliseconds()}`;
            result = d.toLocaleTimeString() + `.${d.getMilliseconds()}`;
        } else {
            result = d.getTime();    
        }
        
    } else {
        if ( format  === true ){
            return  d.toISOString();
        } else {
            return d.toLocaleString();   
            // result =  d.toLocaleTimeString();
        }
        
    }
    return result;
}

function validateFileName( $string = false){
    let response = { string: $string , status:false , msg: 'Error: '};
    const rx1 = new RegExp(/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/ , 'i');
    const rx2 = new RegExp( /[^a-zA-Z0-9]+/ , 'g');
    if ( !$string ){
        response.msg  += 'Nombre vacio'; 
    } else if ( rx1.test($string) ){
        response.msg  += 'Nombre invalido'; 
    } else {
        response.string     = $string.replace(rx2,'_');
        response.status     = true;
        response.msg        = 'ok';
    }
    return response;
}

// noty
//
function notyPopup(pText, pType = 'warning', pLayout = 'topRight' , pIsModal = false , pContainer = false) {
    ShowNotyPopUp(pText, pType , pLayout  , pIsModal  , pContainer  );
}
function showNotyPopup(pText, pType = 'warning', pLayout = 'topRight' , pIsModal = false , pContainer = false) {
    ShowNotyPopUp(pText, pType , pLayout  , pIsModal  , pContainer  );
}
//
//
function ShowNotyPopUp(pText, pType = 'warning', pLayout = 'topRight' , pIsModal = false , pContainer = false ) {

    var Buttons;
    var dQ = false;
    var notyReturn = true;
    var Duration = 4000;
    switch(pType) {

        case 'YesNo':
            Buttons = 
            [
                Noty.button('Si', 'btn btn-success btn-lg ', function () {
                    notyReturn = NotyBtn(n, true);  }), 
                Noty.button('No', 'btn btn-danger btn-lg ', function () {
                    notyReturn = NotyBtn(n, false);  })
            ];
            pType = 'alert';
            pIsModal = true;
            pLayout = 'topCenter';
            break;

        case 'OkCancel':
            Buttons = 
            [
                Noty.button('OK', 'btn btn-success btn-lg ', function () {
                    notyReturn = NotyBtn(n, true);  }), 
                Noty.button('Cancelar', 'btn btn-danger btn-lg ', function () {
                    notyReturn = NotyBtn(n, false);  })
            ];
            pType = 'warning';
            break;

        case 'errorModal':
            pType = 'error';
            pLayout = 'center';
            //dQ = true;
            pIsModal = true;
            break;

        case 'errorFatal':
            Buttons = 
            [
                Noty.button('Ok', 'btn btn-primary btn-block ', function () {
                    n.close();  }), 
            ];
            pType = 'error';
            pLayout = 'center';
            dQ = true;
            break;

        case 'success':   
        case 'ok': 
            pType = 'success';
            Duration = 2000;
            break;

        case 'ok_fast': 
            pType = 'success';
            Duration = 500;
            break;

        case 'warning_fast': 
            pType = 'warning';
            Duration = 500;
            break;

        default:
            //code block
    }

    var n = new Noty({
        theme: notyTheme            ,
        text: pText                 ,
        layout: pLayout             ,
        type: pType                 ,
        progressBar: !pIsModal      ,
        timeout: !pIsModal * Duration   ,
        modal: pIsModal             , 
        buttons: Buttons            ,
        killer: dQ                  ,
        container: pContainer       ,
        closeWith: ['click', 'button']
    }).show();

    return notyReturn

}; 
 
function ShowNoty() {
    let FlagNotyshow = $('#hNotyShow').val();
    if (FlagNotyshow == "T") {
        const xTexto = $('#hNotyText').val(); 
        const xTipo = $('#hNotyType').val();
        const xLayout = $('#hNotyLayout').val();
        ShowNotyPopUp(xTexto, xTipo, xLayout);
        $('#hNotyShow').val('F');
    };
};

function NotyBtn(pNoty , pBtn){
    pNoty.close();
    return pBtn;
/*    
    var m = new Noty({
        theme: notyTheme,
        dismissQueue: true, 
        force: true,
        progressBar: true , 
        modal: false , 
        timeout: 2000,
        type: 'success',
        closeWith: ['click', 'button'],
        text: 'You clicked "Ok" button',
        layout: 'center'
    }).show();
*/
}   


// logs
// 
function logsAjax(pAction ) {
    $("#logProgressBar").show();
    try{
        switch(pAction) { 
            case "refresh":
            case "trash":
                $.ajax({
                  type: "POST",
                  url: "/ajax/logs.php",
                  dataType: "json",
                  data: {pAccion: pAction , pTab: currentTab},
                  success: function(data){
                    if (data.Result == "OK"){
                        $('#logPre' + data.Tab).html(decodeURI(data.Content.replace(/\r\n/g,'<br>')));
                        //ShowNotyPopUp("OK: ", "success", "topRight");
                    } else {
                        throw  data.Message;
                    } 
                  } , 
                  error: function (xhr, desc, err) {
                    console.log("Ajax call error - " +  desc + " - " + err);
                    throw "General Error:" + desc + " - " + err;
                  }
                });
            break; 
            default:
                throw "Accion Incorrecta: " + pAction ;
        } 
    }
    catch(err) {
        catchMsg = 'logsAjax: ' + err  ; 
        console.log(catchMsg );
        ShowNotyPopUp( catchMsg , "error", "topRight");
        return false;
    }
    finally {
        $( "#logProgressBar" ).fadeOut( 1500, function() {});
    }


}

var _MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_};

function makeid(length) {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function decodeEntities(encodedString) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}

//   Cookies ----------------------------------- 
//   
function wrCookie($action = false , $name = false , $cookieValue = false){
	$return = false;
	try {
		if ($action === false ){
			throw 'no se ha especificado la acción';
		} 
		if ($name === false ){
			throw 'no se ha especificado el nombre del cookie';
		} 
		switch ($action ){
			case 'create':
				_log ( 'creating cookie: ' + $name);
				let date = new Date();
          	date.setTime(date.getTime()+(7*24*60*60*1000));
          	document.cookie = $name + "=" + $cookieValue + "; expires=" + date.toGMTString()+ ' path=/';
          	$return = true;
				break;
			case 'read':
				_log ( 'reading cookie: ' + $name);
				$name += '=';
				const decodedCookie = decodeURIComponent(document.cookie);
				const ca = decodedCookie.split(';');
				const loop = ca.length;
				for (let i = 0; i < loop ; i++) {
				   let c = ca[i];
				   while (c.charAt(0) == ' ') {
				     c = c.substring(1);
				   }
				   if (c.indexOf($name) == 0) {
				     $return = c.substring($name.length, c.length);
				   }
				 }
				break;
			case 'delete':
				_log ( 'deleting cookie: ' + $name);
				break;
			default:
				throw 'accion incorrecta';
		}
	}
	catch(err) {
	    catchMsg = 'cookie Error: ' + err  ; 
	    console.log(catchMsg );
	}

	return $return;

}

function procesando( $action = false , $msg = false){

    if ( $msg != false ){
        $("#procesando").text($msg);
    }
    switch ($action ){
        case 'show':
        case 'on':
        case true:
            $("#procesando").show();
        break;

        default:
            $("#procesando").hide();
    }
}