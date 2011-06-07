Ext.ns("com.fvr.school");

com.fvr.school.LogError = {
	init : function(){
		Ext.Msg.alert("Error","Acceso restringido inicie sesion.",function(btn,text){
			if (btn == 'ok'){
				var redirect = '../html/'; 
				window.location = redirect;
			}
		});
     
	}
}
Ext.onReady(com.fvr.school.LogError.init,com.fvr.school.LogError);
