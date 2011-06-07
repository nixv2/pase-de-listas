Ext.ns("com.fvr.school");

com.fvr.school.home = {
	id : 0,
	init : function(){
		Ext.QuickTips.init();
		var vport = new Ext.Viewport({
			layout	: "border",
			padding	: '0 5 5 5',
			items	: [{id : 'app-header',xtype : "box",region : "north", height : 40,html : "Pase de Lista de Asambleas"},
					   {xtype : "container",region : "center",layout : "border", items : [this.menu(),this.portal()]}]
			 
		});
		
		Ext.define('asLista',{extend: "Ext.data.Model",
			fields:[{name : "value"},{name : "label"}],
			proxy:{type:'ajax',url:'../server/paseLista.php',reader:{xtype:'json',root:'data'}}
		});
		this.asamStore = new Ext.data.Store({
			model	: 'asLista',
			autoLoad	: true,
			
		});
	},
	//funcion donde se crean la region west(menu)
	menu : function(){
		var menu = {
			title	: 'Menu',
			tbar		: [{text: "logout",scope:this,handler:this.logout,iconCls:'logout-icon',tooltip:"Cerrar sesion"}],
		     region	: 'west',
		     animCollapse: true,
		     width	: 200,
		     minWidth	: 150,
		     maxWidth	: 250,
		     split	: true,
		     collapsible: true,
		     layout	: "accordion",
			items	: this.menus()
			};
         
         return menu;
	},
	//funcion para crear el portal(region center del vport)
	portal : function(){
			
		this.esForm = new Ext.panel.Panel({
			layout	: "card",
			height	: 250,
			bodyPadding:10,
			border	: false,
			items	: [this.verEstudiantes(),this.busEstudiante()]
		});
		
		var portal = {
			xtype	: "portalpanel",
			region	: "center",
			border	: false,
			items	: [
				{//columna uno
				items : [{title:"Asambleas",layout:"fit",items:this.verAsam()}]
				},{//columna dos
				items: [{title:"Estudiantes",items:this.esForm}]
				}]//fin items portal
		};
		return portal;
	},
	//funcion que se encarga de cerrar las secion
	logout : function(){
		Ext.Ajax.request({
			scope	:this,
			url		: "../server/logout.php",
			success	: function(){
				var redirect = '../html/'; 
				window.location = redirect;
			},
			failure	: function(e){
				console.debug(e);
			}
		});
	},
	//funcion que pinta los botones del panel de menu...
	menus : function(){
		var admAsamblea = new Ext.Panel({
			title	: "Administrar Asambleas",
			layout	: {type:"vbox",align:'stretchmax',padding:5},
			defaults	: {margins:'0 0 5 0'},
			items	: [
						{xtype : "button",text : "Nueva Asamblea",handler:this.nuevaAsam,scope:this},
						{xtype : "button",text : "Pasar Lista",handler:this.lista,scope:this}
					]
		});
		
		var admEstudiantes = new Ext.Panel({
			title 	: "Administrar Estudiantes",
			layout	: {type:"vbox",align:'stretchmax',padding:5},
			defaults	: {margins:'0 0 5 0'},
			items	: [
						{xtype : "button",text : "Añadir Estudiante",scope : this,handler : this.addEstudiante},
						{xtype : "button",text : "Ver Estudiantes",scope : this, handler : function(){
								var cardlayout = this.esForm.getLayout();
								cardlayout.setActiveItem(1);
							}
						},
						{xtype : "button",text : "buscar Estudiante",scope : this, handler : function(){
								var cardlayout = this.esForm.getLayout();
								cardlayout.setActiveItem(2);
							}
						}
					]
		});
		var all = [admAsamblea,admEstudiantes];
		return all;
	},
	//funcion para la creacion de una nueva asamblea
	nuevaAsam : function(btn){
		this.asambleaForm = new Ext.form.Panel({
			url		: "../server/nuevaAsamblea.php",
			border	: false,
			labelWidth: 50,
			items	: [
				{xtype : "combo",fieldLabel : "Tipo de Samblea",triggerAction : "all",store : ["Mentor","General","Carrera","Facultad"],anchor:"100%",allowBlank : false,name : "asamblea"},
				
				{xtype : "datefield",fieldLabel : "Fecha",anchor : "100%",allowBlank : false,name:"fecha"},
				
				{xtype : "timefield",fieldLabel : "Hora de inicio",minValue : "9:00 AM",maxValue : "10:00 AM",increment : 15, anchor : '100%',allowBlank : false,name : "horaInit"},
				
				{xtype : "timefield",fieldLabel : "Tiempo limite",minValue : "9:00 AM",maxValue : "10:00 AM",increment : 15, anchor : '100%',allowBlank : false,name : "horaFin"},
				
			]
		});
		this.asamWin = new Ext.Window({
			title	: "Crear nueva asamblea",
			bodyStyle	: 'padding:10px;background-color:#fff;',
			width	: 300,
			height	: 270,
			x		: 300,
			y		: 100,
			items	: this.asambleaForm,
			fbar		: [
				{text : "Cancelar",handler : function(){this.asambleaForm.getForm().reset();},scope : this},
				{text : "Crear",handler: this.crearAsablea,scope : this}]
		});
		
		this.asamWin.show();
		btn.disable();
		this.asamWin.on('destroy',function(){
			btn.enable();
		});
	},
	//funcion que manda datos de la asamblea al servidor via Ajax
	crearAsablea : function(){
		if(this.asambleaForm.getForm().isValid()){
			this.asambleaForm.getForm().submit({
				scope	: this,
				success	: this.success,
				failure	: function(form,action){
					Ext.Msg.alert("Error","Ocurrio un error al conectarse al servidor");
				}
			});
		}else{
			Ext.Msg.alert("Error","Todos los campos son requeridos");
		}	
	},
	success : function(form,action){
		Ext.MessageBox.show({
			title	: 'Estado',
			msg		: action.result.msg,
			buttons	: Ext.MessageBox.OK,
			icon		: Ext.MessageBox.QUESTION,
			scope	:this,
			fn		: function(btn, text){
				if (btn == 'ok'){
					this.asamWin.destroy();
					this.asamStore.load();
				}
			}
		});
		this.asamGrid.getStore().load();
	},
	//funcion que pinta la grilla(portal) para ver las asambleas
	verAsam : function(){
		Ext.define('asambleas',{extend: "Ext.data.Model",
			fields:[{name : "id"},{name : "tipoAsam"},{name : "fecha"},{name : "horaIni"},{name : "horaFin"},{name:"terminada",type: 'bool'}],
			proxy:{type:'rest',url:'../server/getAsambleas.php',
				reader:{xtype:'json',root:'data'}
				}
		});
		var asamStore = new Ext.data.Store({
			model: 'asambleas',
			autoLoad	:true,
		});
		this.asamGrid = new Ext.grid.Panel({
			store	: asamStore,
			height	: 300,
			columns	:[
				{id:"id",header:"Tipo de Asamblea",dataIndex:"tipoAsam",width:115},
				{header: "Fecha",dataIndex: "fecha"},
				{header: "Hora Inicio",dataIndex: "horaIni"},
				{header: "Hora Fin",dataIndex: "horaFin"},
				{xtype: 'booleancolumn',header: 'Estado',dataIndex: "terminada",width: 60,trueText: "Terminada terminar",falseText:"Sin terminadar"}
			]
		});
		return this.asamGrid;
	},
	//funciones que se encargan del pase de lista(frontend y backend)
	lista : function(btn){
		
		this.selectAsm = new Ext.form.Panel({
			border	: false,
			labelWidth: 20,
			items	: [{xtype:"combo",fieldLabel:"Asamblea",store:this.asamStore,triggerAction:'all',displayField:"label",valueFiend:"value",queryMode:"local",width:300,listeners:{scope:this,'select':function(field,value){
			Ext.each(value,function(data){
				this.id = data.data.value;
				this.listaForm.getForm().findField("asId").setValue(this.id);
			},this);

			var winLayout = this.listaWin.getLayout();
			winLayout.setActiveItem(1);
			}}}]
		});
		this.listaForm = new Ext.form.Panel({
			border	:false,
			labelWidth: 80,
			items	: [{xtype:"textfield",fieldLabel:"Maticula",allowBlank:false,name:"matricula",minLength:7,maxLength:7},
						{xtype:"textfield",name:"asId",hidden:true}]

		});
		this.listaWin = new Ext.window.Window({
			title	: "Pase de Lista",
			bodyStyle	: 'padding:10px;background-color:#fff;',
			layout	: "card",
			activeItem: 0,
			width	: 350,
			height	: 150,
			x		: 620,
			y		: 200,
			items	: [this.selectAsm,this.listaForm],
			fbar		: [{text:"Presente",scope:this,handler:this.pasarLista}]
			
		});
		this.listaWin.show();
		btn.disable();
		this.listaWin.on('destroy',function(){
			btn.enable();
		},this);
	},
	pasarLista : function(){
		if(this.listaForm.getForm().isValid()){
			this.listaForm.getForm().submit({
				url		: "../server/paseLista.php",
				scope	: this,
				success	: function(form,action){
					Ext.Msg.alert("OK",action.result.msg);
				},
				failure	: function(form,action){
					Ext.Msg.alert("Error",action.result.msg);
					this.asamGrid.getStore().load();
				}
			});
		}else{
			Ext.MessageBox.show({
				title	: 'Error',
				msg		: "El campo no puede estar vacio.<br/> Minimo y maximo de 7 caracteres.<br/>Intentelo una vez mas",
				buttons	: Ext.MessageBox.OK,
				icon		: Ext.MessageBox.ERROR
			});
		}
	},
	addEstudiante  : function(){
		var fomita = new Ext.Panel({
			height	: 250,
		});
		return fomita;
	},
	
	verEstudiantes : function(){
		return {
		xtype	: "form",
		height	: 250,
		html		: "panel para ver todos los estudiantes",
		}
	},
	
	busEstudiante : function(){
		return {
		xtype	: "form",
		height	: 250,
		html		: "busqueda de estudiante"
		}
	}
}
Ext.onReady(com.fvr.school.home.init,com.fvr.school.home);
