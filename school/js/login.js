Ext.ns("com.fvr.school");

com.fvr.school.login = {
	init: function(){
		Ext.QuickTips.init();
		
		this.login = new Ext.form.Panel({
			url		: "../server/login.php",
			labelWidth: 80,
			defaultType:'textfield',
			border	: false,
			items	: [
				{fieldLabel : "Usuario", name : "user", allowBlank:false},
				{fieldLabel : "Contraseña", name : "passwrd", inputType:"password", allowBlank:false}]
		});
		
		var win = new Ext.Window({
			layout	: "fit",
			width	: 430,
			height	: 200,
			resizable	: false,
			bodyStyle	: 'background: #fff url(../img/fca.png) 10px center no-repeat;padding-left:151px;padding-top:50px',
			items	: [this.login],
			fbar		: [
				{text : "Iniciar", handler : this.start, scope : this},
				{text : "Cancelar", handler : this.cancel, scope : this}]
		});
		win.show();
	},
	
	start : function(){
		if(this.login.getForm().isValid()){
			this.login.getForm().submit({
				waitTitle	:'Conectando', 
 				waitMsg	:'Buscando Usuario...',
 				scope 	: this,
				success	: this.success,
				failure	: this.failure
			});
		}else{
			Ext.Msg.alert("Error", "Todos los campos son requeridos");
		}
	},
	
	cancel : function(){
		this.login.getForm().reset();
	},
	
	success : function(){
		Ext.Msg.alert('Estado', 'Inicio Exitoso!', function(btn, text){
		   if (btn == 'ok'){
                   var redirect = '../html/home.php'; 
                   window.location = redirect;
			}
		});
	},
	
	failure : function(form,action){
		var error = Ext.decode(action.response.responseText);
		if(action.failureType == 'server'){
			Ext.Msg.alert("Estado",error.errors.reason);
			this.login.getForm().reset(); 
		}else{
			Ext.Msg.alert("Estado","Error nombre de usuario y contraseñ no concuerdad");
			this.login.getForm().reset();
		}
	}
}
Ext.onReady(com.fvr.school.login.init,com.fvr.school.login);
