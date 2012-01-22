Ext.namespace("Puremvc.demo");Ext.define("Puremvc.demo.ApplicationFacade",{extend:"org.puremvc.js.multicore.patterns.facade.Facade",constructor:function(key){this.callParent(arguments);
},startup:function(viewComponent){this.sendNotification(Puremvc.demo.ApplicationFacade.STARTUP,viewComponent);
},initializeController:function(){this.callParent(arguments);this.registerCommand(Puremvc.demo.ApplicationFacade.STARTUP,Puremvc.demo.controller.StartupCommand);
},statics:{STARTUP:"Startup",NEW_USER:"newUser",DELETE_USER:"deleteUser",CANCEL_SELECTED:"cancelSelected",USER_SELECTED:"userSelected",USER_ADDED:"userAdded",USER_UPDATED:"userUpdated",USER_DELETED:"userDeleted",ADD_ROLE:"addRole",ADD_ROLE_RESULT:"addRoleResult",getInstance:function(key){if(!org.puremvc.js.multicore.patterns.facade.Facade.hasCore(key)){new Puremvc.demo.ApplicationFacade(key);
}var retVal=org.puremvc.js.multicore.patterns.facade.Facade.getInstance(key);return retVal;
}}});Ext.namespace("Puremvc.demo.common");Ext.define("Puremvc.demo.common.Util",{extend:"Object",constructor:function(){this.callParent(arguments);
},statics:{alert:function(message,title){Ext.Msg.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO});
}}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.AddRoleResultCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncCommand",execute:function(notification){var result=notification.getBody();
if(result===false){Puremvc.demo.common.Util.alert("Role already exists for this user!","Add User Role");
}this.commandComplete();}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.DeleteUserCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncCommand",execute:function(notification){var user=notification.getBody();
var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);userProxy.deleteItem(user);
var roleProxy=this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);roleProxy.deleteItem(user);
this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);this.commandComplete();
}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.PrepControllerCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncCommand",constructor:function(){this.callParent(arguments);
},execute:function(notification){this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT,Puremvc.demo.controller.AddRoleResultCommand);
this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER,Puremvc.demo.controller.DeleteUserCommand);
this.commandComplete();}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.PrepModelCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncCommand",constructor:function(){this.callParent(arguments);
},execute:function(notification){this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());this.commandComplete();
}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.PrepViewCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncCommand",constructor:function(){this.callParent(arguments);
},execute:function(notification){var app=new Puremvc.demo.view.components.Application();
this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));this.commandComplete();
}});Ext.namespace("Puremvc.demo.controller");Ext.define("Puremvc.demo.controller.StartupCommand",{extend:"org.puremvc.js.multicore.patterns.command.AsyncMacroCommand",initializeAsyncMacroCommand:function(note){this.addSubCommand(Puremvc.demo.controller.PrepControllerCommand);
this.addSubCommand(Puremvc.demo.controller.PrepModelCommand);this.addSubCommand(Puremvc.demo.controller.PrepViewCommand);
}});Ext.namespace("Puremvc.demo.model");Ext.define("Puremvc.demo.model.DeptEnum",{extend:"Object",constructor:function(value,ordinal){this.callParent();
this.value=value;this.ordinal=ordinal;},equals:function(roleEnum){return(this.ordinal==roleEnum.ordinal&&this.value==roleEnum.value);
},statics:{getList:function(){return[Puremvc.demo.model.DeptEnum.ACCT,Puremvc.demo.model.DeptEnum.SALES,Puremvc.demo.model.DeptEnum.PLANT];
},getComboList:function(){var cList=Puremvc.demo.model.DeptEnum.getList();cList.unshift(Puremvc.demo.model.DeptEnum.NONE_SELECTED);
return cList;}}});Ext.apply(Puremvc.demo.model.DeptEnum,{NONE_SELECTED:new Puremvc.demo.model.DeptEnum("--None Selected--",-1),ACCT:new Puremvc.demo.model.DeptEnum("Accounting",0),SALES:new Puremvc.demo.model.DeptEnum("Sales",1),PLANT:new Puremvc.demo.model.DeptEnum("Plant",2),SHIPPING:new Puremvc.demo.model.DeptEnum("Shipping",3),QC:new Puremvc.demo.model.DeptEnum("Quality Control",4)});
Ext.namespace("Puremvc.demo.model");Ext.define("Puremvc.demo.model.RoleEnum",{extend:"Object",constructor:function(value,ordinal){this.callParent();
this.value=value;this.ordinal=ordinal;},equals:function(roleEnum){return(this.ordinal==roleEnum.ordinal&&this.value==roleEnum.value);
},statics:{getList:function(){return[Puremvc.demo.model.RoleEnum.ADMIN,Puremvc.demo.model.RoleEnum.ACCT_PAY,Puremvc.demo.model.RoleEnum.ACCT_RCV,Puremvc.demo.model.RoleEnum.EMP_BENEFITS,Puremvc.demo.model.RoleEnum.GEN_LEDGER,Puremvc.demo.model.RoleEnum.PAYROLL,Puremvc.demo.model.RoleEnum.INVENTORY,Puremvc.demo.model.RoleEnum.PRODUCTION,Puremvc.demo.model.RoleEnum.QUALITY_CTL,Puremvc.demo.model.RoleEnum.SALES,Puremvc.demo.model.RoleEnum.ORDERS,Puremvc.demo.model.RoleEnum.CUSTOMERS,Puremvc.demo.model.RoleEnum.SHIPPING,Puremvc.demo.model.RoleEnum.RETURNS];
},getComboList:function(){var cList=Puremvc.demo.model.RoleEnum.getList();cList.unshift(Puremvc.demo.model.RoleEnum.NONE_SELECTED);
return cList;}}});Ext.apply(Puremvc.demo.model.RoleEnum,{NONE_SELECTED:new Puremvc.demo.model.RoleEnum("--None Selected--",-1),ADMIN:new Puremvc.demo.model.RoleEnum("Administrator",0),ACCT_PAY:new Puremvc.demo.model.RoleEnum("Accounts Payable",1),ACCT_RCV:new Puremvc.demo.model.RoleEnum("Accounts Receivable",2),EMP_BENEFITS:new Puremvc.demo.model.RoleEnum("Employee Benefits",3),GEN_LEDGER:new Puremvc.demo.model.RoleEnum("General Ledger",4),PAYROLL:new Puremvc.demo.model.RoleEnum("Payroll",5),INVENTORY:new Puremvc.demo.model.RoleEnum("Inventory",6),PRODUCTION:new Puremvc.demo.model.RoleEnum("Production",7),QUALITY_CTL:new Puremvc.demo.model.RoleEnum("Quality Control",8),SALES:new Puremvc.demo.model.RoleEnum("Sales",9),ORDERS:new Puremvc.demo.model.RoleEnum("Orders",10),CUSTOMERS:new Puremvc.demo.model.RoleEnum("Customers",11),SHIPPING:new Puremvc.demo.model.RoleEnum("Shipping",12),RETURNS:new Puremvc.demo.model.RoleEnum("Returns",13)});
Ext.namespace("Puremvc.demo.model.vo");Ext.define("Puremvc.demo.model.vo.EnumItemVO",{extend:"Ext.data.Model",fields:[{name:"value",allowBlank:false,type:"string"},{name:"ordinal",allowBlank:false,type:"int"},{name:"associatedValue",allowBlank:false,type:"auto"}]});
Ext.namespace("Puremvc.demo.model.vo");Ext.define("Puremvc.demo.model.vo.RoleVO",{extend:"Ext.data.Model",fields:[{name:"uname",allowBlank:false,type:"string",defaultValue:""},{name:"roles",allowBlank:false,type:"auto",defaultValue:[]}]});
Ext.namespace("Puremvc.demo.model.vo");Ext.define("Puremvc.demo.model.vo.UserVO",{extend:"Ext.data.Model",fields:[{name:"uname",allowBlank:false,type:"string"},{name:"fname",allowBlank:false,type:"string"},{name:"lname",allowBlank:false,type:"string"},{name:"email",allowBlank:true,type:"string"},{name:"password",allowBlank:false,type:"string"},{name:"department",type:"auto"}],getIsValid:function(){var retVal=(this.get("uname")!=""&&this.get("password")!=""&&this.get("department")!=Puremvc.demo.model.DeptEnum.NONE_SELECTED);
return retVal;},getGivenName:function(){var retVal=String.format("{0}, {1}",this.get("lname"),this.get("fname"));
return retVal;}});Ext.namespace("Puremvc.demo.model");Ext.define("Puremvc.demo.model.RoleProxy",{extend:"org.puremvc.js.multicore.patterns.proxy.Proxy",constructor:function(){this.callParent([Puremvc.demo.model.RoleProxy.NAME,[]]);
this.addItem(new Puremvc.demo.model.vo.RoleVO({uname:"lstooge",roles:[Puremvc.demo.model.RoleEnum.PAYROLL,Puremvc.demo.model.RoleEnum.EMP_BENEFITS]}));
this.addItem(new Puremvc.demo.model.vo.RoleVO({uname:"cstooge",roles:[Puremvc.demo.model.RoleEnum.ACCT_PAY,Puremvc.demo.model.RoleEnum.ACCT_RCV,Puremvc.demo.model.RoleEnum.GEN_LEDGER]}));
this.addItem(new Puremvc.demo.model.vo.RoleVO({uname:"mstooge",roles:[Puremvc.demo.model.RoleEnum.INVENTORY,Puremvc.demo.model.RoleEnum.PRODUCTION,Puremvc.demo.model.RoleEnum.SALES,Puremvc.demo.model.RoleEnum.SHIPPING]}));
},getRoles:function(){return this.data;},addItem:function(item){this.getRoles().push(item);
},deleteItem:function(item){var roles=this.getRoles();for(var i=0;i<roles.length;
i++){if(roles[i].uname==item.uname){roles.splice(i,1);break;}}},doesUserHaveRole:function(user,role){var roles=this.getRoles();
var hasRole=false;for(var i=0;i<roles.length;i++){if(roles[i].get("uname")==user.get("uname")){var userRoles=roles[i].get("roles");
for(var j=0;j<userRoles.length;j++){var roleEnum=userRoles[j];if(roleEnum.equals(role)){hasRole=true;
break;}}break;}}return hasRole;},addRoleToUser:function(user,role){var roles=this.getRoles();
var result=false;if(!this.doesUserHaveRole(user,role)){for(var i=0;i<roles.length;
i++){if(roles[i].get("uname")==user.get("uname")){var userRoles=roles[i].get("roles");
userRoles.push(role);result=true;break;}}}this.sendNotification(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT,result);
},removeRoleFromUser:function(user,role){var roles=this.getRoles();if(this.doesUserHaveRole(user,role)){for(var i=0;
i<roles.length;i++){if(roles[i].get("uname")==user.get("uname")){var userRoles=roles[i].get("roles");
for(var j=0;j<userRoles.length;j++){var roleEnum=userRoles[j];if(roleEnum.equals(role)){userRoles.splice(j,1);
break;}}break;}}}},getUserRoles:function(uname){var roles=this.getRoles();var userRoles=new Array();
for(var i=0;i<roles.length;i++){if(roles[i].get("uname")==uname){userRoles=roles[i].get("roles");
break;}}return userRoles;},statics:{NAME:"RoleProxy"}});Ext.namespace("Puremvc.demo.model");
Ext.define("Puremvc.demo.model.UserProxy",{extend:"org.puremvc.js.multicore.patterns.proxy.Proxy",constructor:function(){this.callParent([Puremvc.demo.model.UserProxy.NAME,[]]);
this.addItem(new Puremvc.demo.model.vo.UserVO({uname:"lstooge",fname:"Larry",lname:"Stooge",email:"larry@stooges.com",password:"ijk456",department:Puremvc.demo.model.DeptEnum.ACCT}));
this.addItem(new Puremvc.demo.model.vo.UserVO({uname:"cstooge",fname:"Curly",lname:"Stooge",email:"curly@stooges.com",password:"xyz987",department:Puremvc.demo.model.DeptEnum.SALES}));
this.addItem(new Puremvc.demo.model.vo.UserVO({uname:"mstooge",fname:"Moe",lname:"Stooge",email:"moe@stooges.com",password:"abc123",department:Puremvc.demo.model.DeptEnum.PLANT}));
},getUsers:function(){return this.data;},addItem:function(item){this.getUsers().push(item);
},updateItem:function(item){var user=item;var users=this.getUsers();for(var i=0;i<users.length;
i++){if(users[i].get("uname")==user.get("uname")){users[i]=user;}}},deleteItem:function(item){var user=item;
var users=this.getUsers();for(var i=0;i<users.length;i++){if(users[i].get("uname")==user.get("uname")){users.splice(i,1);
}}},statics:{NAME:"UserProxy"}});Ext.namespace("Puremvc.demo.view.components");Ext.define("Puremvc.demo.view.components.Application",{extend:"Ext.container.Viewport",constructor:function(config){this.callParent(config);
},initComponent:function(){var config=Ext.apply({id:"applicationViewport",layout:"fit",defaults:{bodyBorder:false,frame:true},items:[{xtype:"panel",id:"viewPortCenterRegion",region:"center",layout:{type:"vbox",align:"center",pack:"start"},defaults:{bodyBorder:false,border:0,frame:false},items:[{xtype:"label",html:'<span class="application-name">Employee Admin</span>&nbsp;<span class="application-category">PureMVC JavaScript/ExtJS Demo</span>',flex:0},{xtype:"x-demo-user-list-panel",id:"userList",width:650,height:250,flex:1},{xtype:"panel",id:"userInformationPanel",layout:{type:"hbox",align:"stretch",pack:"start"},width:650,height:300,flex:1,defaults:{bodyBorder:false,frame:true},items:[{xtype:"x-demo-user-form-panel",id:"userForm",width:300,flex:1},{xtype:"x-demo-role-list-panel",id:"rolePanel",width:350,flex:1}]}]}]});
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);this.callParent(arguments);
}});Ext.namespace("Puremvc.demo.view.components");Ext.define("Puremvc.demo.view.components.RolePanel",{extend:"Ext.form.Panel",alias:"widget.x-demo-role-list-panel",user:null,selectedRole:null,mode:null,constructor:function(config){this.callParent(arguments);
this.user=null;this.selectedRole=null;this.mode=null;},initComponent:function(){var config={title:"User Roles",buttons:[{xtype:"combobox",id:"roleList",valueField:"ordinal",displayField:"value",typeAhead:true,queryMode:"local",forceSelection:true,triggerAction:"all",selectOnFocus:true,width:140,store:Ext.create("Ext.data.Store",{model:"EnumItemVO",proxy:{type:"memory",reader:{type:"array"}}}),listeners:{"select":{fn:this.roleList_changeHandler,scope:this}}},{xtype:"button",id:"addRoleButton",text:"Add",listeners:{"click":{fn:this.addRoleButton_clickHandler,scope:this}}},{xtype:"button",id:"removeRoleButton",text:"Remove",listeners:{"click":{fn:this.removeRoleButton_clickHandler,scope:this}}}],items:[{xtype:"gridpanel",id:"userRoleList",layout:"fit",viewConfig:{deferEmptyText:false,emptyText:"No Roles Assigned Yet",forceFit:true,itemSelector:"tr.x-grid-row",stripeRows:true,tpl:new Ext.XTemplate("<div></div>")},viewType:"gridview",selModel:{mode:"SINGLE"},selType:"rowmodel",hideHeaders:true,frame:false,columns:[{dataIndex:"value",flex:1}],store:Ext.create("Ext.data.Store",{model:"RoleVO",proxy:{type:"memory",reader:{type:"array"}}}),listeners:{"selectionchange":{fn:this.userRoleList_changeHandler,scope:this}}}]};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);this.callParent(arguments);
this.addEvents(Puremvc.demo.view.components.RolePanel.ADD,Puremvc.demo.view.components.RolePanel.REMOVE);
this.fillRoleList();this.setEnabled(false);},fillRoleList:function(){var roleEnumList=Puremvc.demo.model.RoleEnum.getComboList();
var roleListCombo=this.getFooterToolbar().getComponent("roleList");var store=roleListCombo.getStore();
store.removeAll(true);for(var i=0;i<roleEnumList.length;i++){var role=roleEnumList[i];
var roleRecord=new Puremvc.demo.model.vo.EnumItemVO({value:role.value,ordinal:role.ordinal,associatedValue:role});
store.add(roleRecord);}},setUserRoles:function(userRoles){userRoles=userRoles||[];
var roleList=this.getComponent("userRoleList");var store=roleList.getStore();store.removeAll(false);
for(var i=0;i<userRoles.length;i++){var role=userRoles[i];var roleRecord=new Puremvc.demo.model.vo.EnumItemVO({value:role.value,ordinal:role.ordinal,associatedValue:role});
store.add(roleRecord);}},getSelectedRole:function(){var roleListCombo=this.getFooterToolbar().getComponent("roleList");
var store=roleListCombo.getStore();var value=roleListCombo.getValue();var selectedRecord=store.findRecord("ordinal",value);
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedRoleValue:function(value){var roleListCombo=this.getFooterToolbar().getComponent("roleList");
roleListCombo.setValue(value);},getSelectedUserRole:function(selectedRecords){var selectedRecord=(selectedRecords.length>0)?selectedRecords[0]:null;
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedUserRoleValue:function(value){var userRoleListView=this.getComponent("userRoleList");
var sm=userRoleListView.getSelectionModel();if(value==-1){sm.selected.clear();}else{sm.select(value,false);
}},setEnabled:function(isEnabled){var flag=!isEnabled;var controls=["addRoleButton","removeRoleButton","roleList"];
for(var i=0;i<controls.length;++i){var control=this.getFooterToolbar().getComponent(controls[i]);
control.setDisabled(flag);}var userRoleList=this.getComponent("userRoleList");userRoleList.setDisabled(flag);
if(flag){this.setSelectedRoleValue(-1);}},setMode:function(mode){var fbar=this.getFooterToolbar();
var addRoleButton=fbar.getComponent("addRoleButton");var removeRoleButton=fbar.getComponent("removeRoleButton");
switch(mode){case Puremvc.demo.view.components.RolePanel.ADD_MODE:addRoleButton.enable();
removeRoleButton.disable();break;case Puremvc.demo.view.components.RolePanel.REMOVE_MODE:addRoleButton.disable();
removeRoleButton.enable();this.setSelectedRoleValue(-1);break;default:addRoleButton.disable();
removeRoleButton.disable();}},clearForm:function(){this.user=null;this.setUserRoles();
this.setSelectedRoleValue(-1);},addRoleButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.RolePanel.ADD,this);
},removeRoleButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.RolePanel.REMOVE,this);
},userRoleList_changeHandler:function(selectionModel,selectedRecords,eOpts){this.setSelectedRoleValue(-1);
this.selectedRole=this.getSelectedUserRole(selectedRecords);this.setMode(Puremvc.demo.view.components.RolePanel.REMOVE_MODE);
},roleList_changeHandler:function(){this.setSelectedUserRoleValue(-1);this.selectedRole=this.getSelectedRole();
if(this.selectedRole==Puremvc.demo.model.RoleEnum.NONE_SELECTED){this.setMode(null);
}else{this.setMode(Puremvc.demo.view.components.RolePanel.ADD_MODE);}},getFooterToolbar:function(){var retVal=this.dockedItems.findBy(function(inItem){return(inItem.alias=="widget.toolbar"&&inItem.dock=="bottom");
});return retVal;},statics:{ADD:"add",REMOVE:"remove",ADD_MODE:"addMode",REMOVE_MODE:"removeMode"}});
Ext.namespace("Puremvc.demo.view.components");Ext.define("Puremvc.demo.view.components.UserForm",{extend:"Ext.form.Panel",alias:"widget.x-demo-user-form-panel",user:null,mode:null,constructor:function(config){this.callParent(arguments);
this.user=null;this.mode=null;},initComponent:function(){var config={title:"User Profile",buttons:[{xtype:"button",id:"submitButton",text:"Add User",handler:Ext.bind(this.submit_clickHandler,this)},{xtype:"button",id:"cancelButton",text:"Cancel",handler:Ext.bind(this.cancel_clickHandler,this)}],defaults:{labelWidth:120},items:[{xtype:"textfield",id:"fname",fieldLabel:"First Name",msgTarget:"side"},{xtype:"textfield",id:"lname",fieldLabel:"Last Name",msgTarget:"side"},{xtype:"textfield",id:"email",fieldLabel:"Email",msgTarget:"side",vtype:"email"},{xtype:"textfield",id:"uname",fieldLabel:"User Name",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},labelClsExtra:"required"},{xtype:"textfield",id:"password",fieldLabel:"Password",inputType:"password",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},labelClsExtra:"required"},{xtype:"textfield",id:"confirm",fieldLabel:"Confirm Password",inputType:"password",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},labelClsExtra:"required"},{xtype:"combobox",id:"department",fieldLabel:"Department",valueField:"ordinal",displayField:"value",typeAhead:true,queryMode:"local",forceSelection:true,triggerAction:"all",selectOnFocus:true,msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},store:Ext.create("Ext.data.Store",{model:"EnumItemVO",proxy:{type:"memory",reader:{type:"array"}}}),labelClsExtra:"required"}]};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);this.callParent(arguments);
this.addEvents(Puremvc.demo.view.components.UserForm.ADD,Puremvc.demo.view.components.UserForm.UPDATE,Puremvc.demo.view.components.UserForm.CANCEL);
this.fillList();this.clearForm();this.setEnabled(false);},getSelectedDept:function(){var deptListCombo=this.getForm().findField("department");
var store=deptListCombo.getStore();var value=deptListCombo.getValue();var selectedRecord=store.findRecord("ordinal",value);
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedDeptValue:function(value){var deptListCombo=this.getForm().findField("department");
deptListCombo.setValue(value);},fillList:function(){var deptEnumList=Puremvc.demo.model.DeptEnum.getComboList();
var deptListCombo=this.getForm().findField("department");var store=deptListCombo.getStore();
store.removeAll(true);for(var i=0;i<deptEnumList.length;i++){var dept=deptEnumList[i];
var deptRecord=new Puremvc.demo.model.vo.EnumItemVO({value:dept.value,ordinal:dept.ordinal,associatedValue:dept});
store.add(deptRecord);}},setFocus:function(){var firstNameField=this.getForm().findField("fname");
firstNameField.focus();},setUser:function(user){this.user=user;if(user==null){this.clearForm();
}else{var form=this.getForm();form.findField("uname").setValue(user.get("uname"));
form.findField("fname").setValue(user.get("fname"));form.findField("lname").setValue(user.get("lname"));
form.findField("email").setValue(user.get("email"));form.findField("password").setValue(user.get("password"));
form.findField("confirm").setValue(user.get("password"));this.setSelectedDeptValue(user.get("department").ordinal);
}},getUser:function(){this.updateUser();return this.user;},updateUser:function(){var form=this.getForm();
this.user.set("uname",form.findField("uname").getValue());this.user.set("fname",form.findField("fname").getValue());
this.user.set("lname",form.findField("lname").getValue());this.user.set("email",form.findField("email").getValue());
this.user.set("password",form.findField("password").getValue());this.user.set("department",this.getSelectedDept());
this.user.commit(false);},clearForm:function(){var form=this.getForm();form.reset();
form.findField("department").setValue(-1);form.clearInvalid();},setEnabled:function(isEnabled){var flag=!isEnabled;
var form=this.getForm();var controls=["fname","lname","email","password","confirm","department"];
var control=null;for(var i=0;i<controls.length;++i){control=form.findField(controls[i]);
control.setDisabled(flag);}controls=["submitButton","cancelButton"];for(var j=0;j<controls.length;
++j){control=this.getFooterToolbar().getComponent(controls[j]);control.setDisabled(flag);
}form.findField("uname").setDisabled(!(isEnabled&&this.mode==Puremvc.demo.view.components.UserForm.MODE_ADD));
},setMode:function(mode){this.mode=mode;var submitButton=this.getFooterToolbar().getComponent("submitButton");
switch(mode){case Puremvc.demo.view.components.UserForm.MODE_ADD:submitButton.setText("Add User");
break;case Puremvc.demo.view.components.UserForm.MODE_EDIT:submitButton.setText("Update Profile");
this.getForm().findField("uname").disable();break;}},submit_clickHandler:function(){if(!this.getErrors()){this.updateUser();
if(this.user.getIsValid()){if(this.mode==Puremvc.demo.view.components.UserForm.MODE_ADD){this.fireEvent(Puremvc.demo.view.components.UserForm.ADD,this);
}else{this.fireEvent(Puremvc.demo.view.components.UserForm.UPDATE,this);}}}},getErrors:function(){var retVal=false;
var form=this.getForm();var uname=form.findField("uname").getValue();var error=Ext.isEmpty(uname);
var errorMessage=(error)?"User Name is a required field.":null;this.setFieldError("uname",errorMessage);
retVal=error;var password=form.findField("password").getValue();error=Ext.isEmpty(password);
errorMessage=(error)?"Password is a required field.":null;this.setFieldError("password",errorMessage);
retVal=retVal|error;var confirm=form.findField("confirm").getValue();error=(Ext.isEmpty(password)||confirm!=password);
errorMessage=(error)?"The value of the Confirm Password field must match the value of the Password field.":null;
this.setFieldError("confirm",errorMessage);retVal=retVal||error;var department=this.getSelectedDept();
error=(department==Puremvc.demo.model.DeptEnum.NONE_SELECTED);errorMessage=(error)?"A value must be selected for the Department field.":null;
this.setFieldError("department",errorMessage);retVal=retVal||error;return retVal;
},cancel_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.UserForm.CANCEL,this);
},field_focusHandler:function(field){this.setFieldError(field.id,null);},setFieldError:function(fieldName,errorMessage){var field=this.getForm().findField(fieldName);
if(!Ext.isEmpty(errorMessage)){field.markInvalid(errorMessage);}else{field.clearInvalid();
}},getFooterToolbar:function(){var retVal=this.dockedItems.findBy(function(inItem){return(inItem.alias=="widget.toolbar"&&inItem.dock=="bottom");
});return retVal;},statics:{ADD:"add",UPDATE:"update",CANCEL:"cancel",MODE_ADD:"modeAdd",MODE_EDIT:"modeEdit"}});
Ext.namespace("Puremvc.demo.view.components");Ext.define("Puremvc.demo.view.components.UserList",{extend:"Ext.grid.Panel",alias:"widget.x-demo-user-list-panel",selectedUser:null,constructor:function(config){this.callParent(arguments);
this.selectedUser=null;},initComponent:function(){var config={title:"Users",frame:true,buttons:[{xtype:"button",id:"deleteButton",text:"Delete",listeners:{"click":{fn:this.deleteButton_clickHandler,scope:this}}},{xtype:"button",id:"newButton",text:"Add",listeners:{"click":{fn:this.newButton_clickHandler,scope:this}}}],columns:[{header:"User Name",dataIndex:"uname",width:100},{header:"First Name",dataIndex:"fname",width:100},{header:"Last Name",dataIndex:"lname",width:100},{header:"Email",dataIndex:"email",width:122},{header:"Password",dataIndex:"password",width:100},{header:"Department",dataIndex:"department",renderer:function(data,metaData,record,rowIndex,colIndex,store){var retVal=(data.value!=Puremvc.demo.model.DeptEnum.NONE_SELECTED?data.value:"");
return retVal;},width:100}],selModel:{mode:"SINGLE"},selType:"rowmodel",listeners:{"select":{fn:this.userList_changeHandler,scope:this}},store:Ext.create("Ext.data.Store",{model:"UserVO",proxy:{type:"memory",reader:{type:"array"}}}),viewConfig:{forceFit:true,itemSelector:"tr.x-grid-row",stripeRows:true,tpl:new Ext.XTemplate("<div></div>")},viewType:"gridview"};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);this.callParent(arguments);
this.addEvents(Puremvc.demo.view.components.UserList.NEW,Puremvc.demo.view.components.UserList.DELETE,Puremvc.demo.view.components.UserList.SELECT);
},setUsers:function(userList){var store=this.getStore();store.removeAll(false);var recordsToAdd=[];
for(var i=0;i<userList.length;i++){var user=userList[i];recordsToAdd.push(user);}store.add(recordsToAdd);
},userList_changeHandler:function(sm,record,rowIndex){this.selectedUser=record;var deleteButton=this.getFooterToolbar().getComponent("deleteButton");
deleteButton.enable();this.fireEvent(Puremvc.demo.view.components.UserList.SELECT,this);
},newButton_clickHandler:function(){this.deSelect();this.fireEvent(Puremvc.demo.view.components.UserList.NEW,this);
},deleteButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.UserList.DELETE,this);
},deSelect:function(){var sm=this.getSelectionModel();sm.deselectAll(false);this.selectedUser=null;
var deleteButton=this.getFooterToolbar().getComponent("deleteButton");deleteButton.disable();
},getFooterToolbar:function(){var retVal=this.dockedItems.findBy(function(inItem){return(inItem.alias=="widget.toolbar"&&inItem.dock=="bottom");
});return retVal;},statics:{NEW:"new",DELETE:"delete",SELECT:"SelectUser"}});Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.ApplicationMediator",{extend:"org.puremvc.js.multicore.patterns.mediator.Mediator",app:null,constructor:function(viewComponent){this.callParent([Puremvc.demo.view.ApplicationMediator.NAME,viewComponent]);
this.app=this.getViewComponent();},listNotificationInterests:function(){return[];
},handleNotification:function(notification){switch(notification.getName()){default:break;
}},onRegister:function(){this.callParent(arguments);var child=this.app.query("#userForm")[0];
this.facade.registerMediator(new Puremvc.demo.view.UserFormMediator(child));child=this.app.query("#userList")[0];
this.facade.registerMediator(new Puremvc.demo.view.UserListMediator(child));child=this.app.query("#rolePanel")[0];
this.facade.registerMediator(new Puremvc.demo.view.RolePanelMediator(child));this.initializeComponent();
},initializeComponent:function(){},statics:{NAME:"ApplicationMediator"}});Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.RolePanelMediator",{extend:"org.puremvc.js.multicore.patterns.mediator.Mediator",constructor:function(viewComponent){this.callParent([Puremvc.demo.view.RolePanelMediator.NAME,viewComponent]);
},getRolePanel:function(){return this.viewComponent;},onAddRole:function(){var rolePanel=this.getRolePanel();
this.roleProxy.addRoleToUser(rolePanel.user,rolePanel.selectedRole);rolePanel.setMode(null);
},onRemoveRole:function(){var rolePanel=this.getRolePanel();this.roleProxy.removeRoleFromUser(rolePanel.user,rolePanel.selectedRole);
this.updateUserRoleList();rolePanel.setMode(null);},updateUserRoleList:function(){var rolePanel=this.getRolePanel();
var userName=rolePanel.user.get("uname");var userRoles=this.roleProxy.getUserRoles(userName);
rolePanel.setUserRoles(userRoles);},listNotificationInterests:function(){return[Puremvc.demo.ApplicationFacade.NEW_USER,Puremvc.demo.ApplicationFacade.USER_ADDED,Puremvc.demo.ApplicationFacade.USER_UPDATED,Puremvc.demo.ApplicationFacade.USER_DELETED,Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,Puremvc.demo.ApplicationFacade.USER_SELECTED,Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT];
},handleNotification:function(note){var rolePanel=this.getRolePanel();switch(note.getName()){case Puremvc.demo.ApplicationFacade.NEW_USER:rolePanel.clearForm();
rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_ADDED:rolePanel.user=note.getBody();
var roleVO=new Puremvc.demo.model.vo.RoleVO({uname:rolePanel.user.get("uname")});
this.roleProxy.addItem(roleVO);rolePanel.clearForm();rolePanel.setEnabled(false);
break;case Puremvc.demo.ApplicationFacade.USER_UPDATED:rolePanel.clearForm();rolePanel.setEnabled(false);
break;case Puremvc.demo.ApplicationFacade.USER_DELETED:rolePanel.clearForm();rolePanel.setEnabled(false);
break;case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:rolePanel.clearForm();rolePanel.setEnabled(false);
break;case Puremvc.demo.ApplicationFacade.USER_SELECTED:rolePanel.setEnabled(true);
rolePanel.setMode(null);rolePanel.user=note.getBody();this.updateUserRoleList();break;
case Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT:this.updateUserRoleList();break;
}},onRegister:function(){this.callParent(arguments);this.initializeComponent();},initializeComponent:function(){var rolePanel=this.getRolePanel();
rolePanel.on(Puremvc.demo.view.components.RolePanel.ADD,this.onAddRole,this);rolePanel.on(Puremvc.demo.view.components.RolePanel.REMOVE,this.onRemoveRole,this);
this.roleProxy=this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);},statics:{NAME:"RolePanelMediator"}});
Ext.namespace("Puremvc.demo.view");Ext.define("Puremvc.demo.view.UserFormMediator",{extend:"org.puremvc.js.multicore.patterns.mediator.Mediator",constructor:function(viewComponent){this.callParent([Puremvc.demo.view.UserFormMediator.NAME,viewComponent]);
},userProxy:null,getUserForm:function(){return this.viewComponent;},onAdd:function(){var user=this.getUserForm().getUser();
this.userProxy.addItem(user);this.sendNotification(Puremvc.demo.ApplicationFacade.USER_ADDED,user);
var userForm=this.getUserForm();userForm.clearForm();userForm.setEnabled(false);userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
},onUpdate:function(){var user=this.getUserForm().getUser();this.userProxy.updateItem(user);
this.sendNotification(Puremvc.demo.ApplicationFacade.USER_UPDATED,user);var userForm=this.getUserForm();
userForm.clearForm();userForm.setEnabled(false);userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
},onCancel:function(){this.sendNotification(Puremvc.demo.ApplicationFacade.CANCEL_SELECTED);
var userForm=this.getUserForm();userForm.clearForm();userForm.setEnabled(false);userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
},listNotificationInterests:function(){return[Puremvc.demo.ApplicationFacade.NEW_USER,Puremvc.demo.ApplicationFacade.USER_DELETED,Puremvc.demo.ApplicationFacade.USER_SELECTED];
},handleNotification:function(note){var userForm=this.getUserForm();switch(note.getName()){case Puremvc.demo.ApplicationFacade.NEW_USER:userForm.setUser(note.getBody());
userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);userForm.setEnabled(true);
userForm.setFocus();break;case Puremvc.demo.ApplicationFacade.USER_DELETED:userForm.clearForm();
userForm.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_SELECTED:userForm.clearForm();
userForm.setUser(note.getBody());userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_EDIT);
userForm.setEnabled(true);userForm.setFocus();break;}},onRegister:function(){this.callParent(arguments);
this.initializeComponent();},initializeComponent:function(){var userForm=this.getUserForm();
userForm.on(Puremvc.demo.view.components.UserForm.ADD,this.onAdd,this);userForm.on(Puremvc.demo.view.components.UserForm.UPDATE,this.onUpdate,this);
userForm.on(Puremvc.demo.view.components.UserForm.CANCEL,this.onCancel,this);this.userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
},statics:{NAME:"UserFormMediator"}});Ext.namespace("Puremvc.demo.view");Ext.define("Puremvc.demo.view.UserListMediator",{extend:"org.puremvc.js.multicore.patterns.mediator.Mediator",constructor:function(viewComponent){this.callParent([Puremvc.demo.view.UserListMediator.NAME,viewComponent]);
},getUserList:function(){return this.viewComponent;},onNew:function(){var user=new Puremvc.demo.model.vo.UserVO({uname:"",fname:"",lname:"",email:"",password:"",department:Puremvc.demo.model.DeptEnum.NONE_SELECTED});
this.sendNotification(Puremvc.demo.ApplicationFacade.NEW_USER,user);},onDelete:function(){var selectedUser=this.getUserList().selectedUser;
if(selectedUser==null){return;}this.sendNotification(Puremvc.demo.ApplicationFacade.DELETE_USER,this.getUserList().selectedUser);
},onSelect:function(){this.sendNotification(Puremvc.demo.ApplicationFacade.USER_SELECTED,this.getUserList().selectedUser);
},listNotificationInterests:function(){return[Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,Puremvc.demo.ApplicationFacade.USER_UPDATED,Puremvc.demo.ApplicationFacade.USER_ADDED,Puremvc.demo.ApplicationFacade.USER_DELETED];
},handleNotification:function(note){var userList=this.getUserList();var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
var allUsers=userProxy.getUsers();switch(note.getName()){case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:userList.deSelect();
break;case Puremvc.demo.ApplicationFacade.USER_UPDATED:userList.setUsers(allUsers);
userList.deSelect();break;case Puremvc.demo.ApplicationFacade.USER_ADDED:userList.setUsers(allUsers);
userList.deSelect();break;case Puremvc.demo.ApplicationFacade.USER_DELETED:userList.setUsers(allUsers);
userList.deSelect();break;}},onRegister:function(){this.callParent(arguments);this.initializeComponent();
},initializeComponent:function(){var userList=this.getUserList();userList.on(Puremvc.demo.view.components.UserList.NEW,this.onNew,this);
userList.on(Puremvc.demo.view.components.UserList.DELETE,this.onDelete,this);userList.on(Puremvc.demo.view.components.UserList.SELECT,this.onSelect,this);
var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);userList.setUsers(userProxy.getUsers());
userList.deSelect();},statics:{NAME:"UserListMediator"}});