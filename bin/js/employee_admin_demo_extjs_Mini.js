Ext.ns("Puremvc.demo");Puremvc.demo.ApplicationFacade=Ext.extend(Puremvc.patterns.Facade,{constructor:function(){Puremvc.demo.ApplicationFacade.superclass.constructor.call(this);
},startup:function(viewComponent){this.sendNotification(Puremvc.demo.ApplicationFacade.STARTUP,viewComponent);
},initializeController:function(){Puremvc.demo.ApplicationFacade.superclass.initializeController.call(this);
this.registerCommand(Puremvc.demo.ApplicationFacade.STARTUP,Puremvc.demo.controller.StartupCommand);
}});Ext.apply(Puremvc.demo.ApplicationFacade,{STARTUP:"Startup",NEW_USER:"newUser",DELETE_USER:"deleteUser",CANCEL_SELECTED:"cancelSelected",USER_SELECTED:"userSelected",USER_ADDED:"userAdded",USER_UPDATED:"userUpdated",USER_DELETED:"userDeleted",ADD_ROLE:"addRole",ADD_ROLE_RESULT:"addRoleResult",getInstance:function(){if(Puremvc.patterns.Facade._instance==undefined){Puremvc.patterns.Facade._instance=new Puremvc.demo.ApplicationFacade();
}return Puremvc.patterns.Facade._instance;}});Ext.namespace("Puremvc.demo.common");
Puremvc.demo.common.Util={alert:function(message,title){Ext.Msg.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO});
}};Ext.ns("Puremvc.demo.controller");Puremvc.demo.controller.AddRoleResultCommand=Ext.extend(Puremvc.patterns.AsyncCommand,{execute:function(notification){var result=notification.getBody();
if(result===false){Puremvc.demo.common.Util.alert("Role already exists for this user!","Add User Role");
}this.commandComplete();}});Ext.ns("Puremvc.demo.controller");Puremvc.demo.controller.DeleteUserCommand=Ext.extend(Puremvc.patterns.AsyncCommand,{execute:function(notification){var user=notification.getBody();
var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);userProxy.deleteItem(user);
var roleProxy=this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);roleProxy.deleteItem(user);
this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);this.commandComplete();
}});Ext.namespace("Puremvc.demo.controller");Puremvc.demo.controller.PrepControllerCommand=Ext.extend(Puremvc.patterns.AsyncCommand,{constructor:function(){Puremvc.demo.controller.PrepControllerCommand.superclass.constructor.call(this);
},execute:function(notification){this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT,Puremvc.demo.controller.AddRoleResultCommand);
this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER,Puremvc.demo.controller.DeleteUserCommand);
this.commandComplete();}});Ext.ns("Puremvc.demo.controller");Puremvc.demo.controller.PrepModelCommand=Ext.extend(Puremvc.patterns.AsyncCommand,{execute:function(notification){this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());this.commandComplete();
}});Ext.ns("Puremvc.demo.controller");Puremvc.demo.controller.PrepViewCommand=Ext.extend(Puremvc.patterns.AsyncCommand,{execute:function(notification){var app=new Puremvc.demo.view.components.Application({});
this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));this.commandComplete();
}});Ext.ns("Puremvc.demo.controller");Puremvc.demo.controller.StartupCommand=Ext.extend(Puremvc.patterns.AsyncMacroCommand,{initializeAsyncMacroCommand:function(note){this.addSubCommand(Puremvc.demo.controller.PrepControllerCommand);
this.addSubCommand(Puremvc.demo.controller.PrepModelCommand);this.addSubCommand(Puremvc.demo.controller.PrepViewCommand);
}});Ext.ns("Puremvc.demo.model.vo");Puremvc.demo.model.vo.RoleVO=Ext.extend(Object,{constructor:function(uname,roles){Puremvc.demo.model.vo.RoleVO.superclass.constructor.call(this);
this.uname="";this.roles=[];if(uname!=null){this.uname=uname;}if(roles!=null){this.roles=roles;
}}});Ext.ns("Puremvc.demo.model.vo");Puremvc.demo.model.vo.UserVO=Ext.extend(Object,{constructor:function(uname,fname,lname,email,password,department){Puremvc.demo.model.vo.UserVO.superclass.constructor.call(this);
this.uname="";this.fname="";this.lname="";this.email="";this.password="";this.department=Puremvc.demo.model.DeptEnum.NONE_SELECTED;
if(uname!=null){this.uname=uname;}if(fname!=null){this.fname=fname;}if(lname!=null){this.lname=lname;
}if(email!=null){this.email=email;}if(password!=null){this.password=password;}if(department!=null){this.department=department;
}},getIsValid:function(){var retVal=(this.uname!=""&&this.password!=""&&this.department!=Puremvc.demo.model.DeptEnum.NONE_SELECTED);
return retVal;},getGivenName:function(){var retVal=String.format("{0}, {1}",this.lname,this.fname);
return retVal;}});Ext.ns("Puremvc.demo.model");Puremvc.demo.model.DeptEnum=Ext.extend(Object,{constructor:function(value,ordinal){Puremvc.demo.model.DeptEnum.superclass.constructor.call(this);
this.value=value;this.ordinal=ordinal;},equals:function(roleEnum){return(this.ordinal==roleEnum.ordinal&&this.value==roleEnum.value);
}});Ext.apply(Puremvc.demo.model.DeptEnum,{NONE_SELECTED:new Puremvc.demo.model.DeptEnum("--None Selected--",-1),ACCT:new Puremvc.demo.model.DeptEnum("Accounting",0),SALES:new Puremvc.demo.model.DeptEnum("Sales",1),PLANT:new Puremvc.demo.model.DeptEnum("Plant",2),SHIPPING:new Puremvc.demo.model.DeptEnum("Shipping",3),QC:new Puremvc.demo.model.DeptEnum("Quality Control",4),getList:function(){return[Puremvc.demo.model.DeptEnum.ACCT,Puremvc.demo.model.DeptEnum.SALES,Puremvc.demo.model.DeptEnum.PLANT];
},getComboList:function(){var cList=Puremvc.demo.model.DeptEnum.getList();cList.unshift(Puremvc.demo.model.DeptEnum.NONE_SELECTED);
return cList;}});Ext.ns("Puremvc.demo.model");Puremvc.demo.model.RoleEnum=Ext.extend(Object,{constructor:function(value,ordinal){Puremvc.demo.model.RoleEnum.superclass.constructor.call(this);
this.value=value;this.ordinal=ordinal;},equals:function(roleEnum){return(this.ordinal==roleEnum.ordinal&&this.value==roleEnum.value);
}});Ext.apply(Puremvc.demo.model.RoleEnum,{NONE_SELECTED:new Puremvc.demo.model.RoleEnum("--None Selected--",-1),ADMIN:new Puremvc.demo.model.RoleEnum("Administrator",0),ACCT_PAY:new Puremvc.demo.model.RoleEnum("Accounts Payable",1),ACCT_RCV:new Puremvc.demo.model.RoleEnum("Accounts Receivable",2),EMP_BENEFITS:new Puremvc.demo.model.RoleEnum("Employee Benefits",3),GEN_LEDGER:new Puremvc.demo.model.RoleEnum("General Ledger",4),PAYROLL:new Puremvc.demo.model.RoleEnum("Payroll",5),INVENTORY:new Puremvc.demo.model.RoleEnum("Inventory",6),PRODUCTION:new Puremvc.demo.model.RoleEnum("Production",7),QUALITY_CTL:new Puremvc.demo.model.RoleEnum("Quality Control",8),SALES:new Puremvc.demo.model.RoleEnum("Sales",9),ORDERS:new Puremvc.demo.model.RoleEnum("Orders",10),CUSTOMERS:new Puremvc.demo.model.RoleEnum("Customers",11),SHIPPING:new Puremvc.demo.model.RoleEnum("Shipping",12),RETURNS:new Puremvc.demo.model.RoleEnum("Returns",13),getList:function(){return[Puremvc.demo.model.RoleEnum.ADMIN,Puremvc.demo.model.RoleEnum.ACCT_PAY,Puremvc.demo.model.RoleEnum.ACCT_RCV,Puremvc.demo.model.RoleEnum.EMP_BENEFITS,Puremvc.demo.model.RoleEnum.GEN_LEDGER,Puremvc.demo.model.RoleEnum.PAYROLL,Puremvc.demo.model.RoleEnum.INVENTORY,Puremvc.demo.model.RoleEnum.PRODUCTION,Puremvc.demo.model.RoleEnum.QUALITY_CTL,Puremvc.demo.model.RoleEnum.SALES,Puremvc.demo.model.RoleEnum.ORDERS,Puremvc.demo.model.RoleEnum.CUSTOMERS,Puremvc.demo.model.RoleEnum.SHIPPING,Puremvc.demo.model.RoleEnum.RETURNS];
},getComboList:function(){var cList=Puremvc.demo.model.RoleEnum.getList();cList.unshift(Puremvc.demo.model.RoleEnum.NONE_SELECTED);
return cList;}});Ext.ns("Puremvc.demo.model");Puremvc.demo.model.RoleProxy=Ext.extend(Puremvc.patterns.Proxy,{constructor:function(){Puremvc.demo.model.RoleProxy.superclass.constructor.call(this,Puremvc.demo.model.RoleProxy.NAME,[]);
this.addItem(new Puremvc.demo.model.vo.RoleVO("lstooge",[Puremvc.demo.model.RoleEnum.PAYROLL,Puremvc.demo.model.RoleEnum.EMP_BENEFITS]));
this.addItem(new Puremvc.demo.model.vo.RoleVO("cstooge",[Puremvc.demo.model.RoleEnum.ACCT_PAY,Puremvc.demo.model.RoleEnum.ACCT_RCV,Puremvc.demo.model.RoleEnum.GEN_LEDGER]));
this.addItem(new Puremvc.demo.model.vo.RoleVO("mstooge",[Puremvc.demo.model.RoleEnum.INVENTORY,Puremvc.demo.model.RoleEnum.PRODUCTION,Puremvc.demo.model.RoleEnum.SALES,Puremvc.demo.model.RoleEnum.SHIPPING]));
},getRoles:function(){return this.data;},addItem:function(item){this.getRoles().push(item);
},deleteItem:function(item){var roles=this.getRoles();for(var i=0;i<roles.length;
i++){if(roles[i].uname==item.uname){roles.splice(i,1);break;}}},doesUserHaveRole:function(user,role){var roles=this.getRoles();
var hasRole=false;for(var i=0;i<roles.length;i++){if(roles[i].uname==user.uname){var userRoles=roles[i].roles;
for(var j=0;j<userRoles.length;j++){var roleEnum=userRoles[j];if(roleEnum.equals(role)){hasRole=true;
break;}}break;}}return hasRole;},addRoleToUser:function(user,role){var roles=this.getRoles();
var result=false;if(!this.doesUserHaveRole(user,role)){for(var i=0;i<roles.length;
i++){if(roles[i].uname==user.uname){var userRoles=roles[i].roles;userRoles.push(role);
result=true;break;}}}this.sendNotification(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT,result);
},removeRoleFromUser:function(user,role){var roles=this.getRoles();if(this.doesUserHaveRole(user,role)){for(var i=0;
i<roles.length;i++){if(roles[i].uname==user.uname){var userRoles=roles[i].roles;for(var j=0;
j<userRoles.length;j++){var roleEnum=userRoles[j];if(roleEnum.equals(role)){userRoles.splice(j,1);
break;}}break;}}}},getUserRoles:function(uname){var roles=this.getRoles();var userRoles=new Array();
for(var i=0;i<roles.length;i++){if(roles[i].uname==uname){userRoles=roles[i].roles;
break;}}return userRoles;}});Ext.apply(Puremvc.demo.model.RoleProxy,{NAME:"RoleProxy"});
Ext.ns("Puremvc.demo.model");Puremvc.demo.model.UserProxy=Ext.extend(Puremvc.patterns.Proxy,{constructor:function(){Puremvc.demo.model.UserProxy.superclass.constructor.call(this,Puremvc.demo.model.UserProxy.NAME,[]);
this.addItem(new Puremvc.demo.model.vo.UserVO("lstooge","Larry","Stooge","larry@stooges.com","ijk456",Puremvc.demo.model.DeptEnum.ACCT));
this.addItem(new Puremvc.demo.model.vo.UserVO("cstooge","Curly","Stooge","curly@stooges.com","xyz987",Puremvc.demo.model.DeptEnum.SALES));
this.addItem(new Puremvc.demo.model.vo.UserVO("mstooge","Moe","Stooge","moe@stooges.com","abc123",Puremvc.demo.model.DeptEnum.PLANT));
},getUsers:function(){return this.data;},addItem:function(item){this.getUsers().push(item);
},updateItem:function(item){var user=item;var users=this.getUsers();for(var i=0;i<users.length;
i++){if(users[i].uname==user.uname){users[i]=user;}}},deleteItem:function(item){var user=item;
var users=this.getUsers();for(var i=0;i<users.length;i++){if(users[i].uname==user.uname){users.splice(i,1);
}}}});Ext.apply(Puremvc.demo.model.UserProxy,{NAME:"UserProxy"});Ext.ns("Puremvc.demo.view.components");
Puremvc.demo.view.components.Application=Ext.extend(Ext.Viewport,{constructor:function(config){config=Ext.apply({id:"applicationViewport",layout:"fit",defaults:{border:false,frame:true},items:[{xtype:"panel",id:"viewPortCenterRegion",region:"center",layout:"vbox",layoutConfig:{align:"center",pack:"start"},hideBorders:true,defaults:{frame:false},items:[{xtype:"panel",layout:"fit",items:[{xtype:"label",html:'<span class="application-name">Employee Admin</span>&nbsp;<span class="application-category">PureMVC JavaScript/ExtJS Demo</span>',flex:1}]},{xtype:"x-demo-user-list-panel",id:"userList",width:650,height:250,flex:1},{xtype:"panel",id:"userInformationPanel",layout:"hbox",width:650,height:300,flex:1,layoutConfig:{align:"stretchmax",pack:"start"},defaults:{frame:true},items:[{xtype:"x-demo-user-form-panel",id:"userForm",width:300,flex:1},{xtype:"x-demo-role-list-panel",id:"rolePanel",width:350,flex:1}]}]}]},config);
Puremvc.demo.view.components.Application.superclass.constructor.call(this,config);
}});Ext.ns("Puremvc.demo.view.components");Puremvc.demo.view.components.RolePanel=Ext.extend(Ext.form.FormPanel,{user:null,selectedRole:null,mode:null,constructor:function(config){Puremvc.demo.view.components.RolePanel.superclass.constructor.call(this,config);
this.user=null;this.selectedRole=null;this.mode=null;},initComponent:function(){var config={title:"User Roles",fbar:{buttonAlign:"right",items:[{xtype:"combo",id:"roleList",valueField:"ordinal",displayField:"value",typeAhead:true,mode:"local",forceSelection:true,triggerAction:"all",selectOnFocus:true,hiddenName:"roleListField",hiddenId:"roleListHidden",width:135,store:new Ext.data.ArrayStore({autoDestroy:true,storeId:"rolesStore",idIndex:1,fields:[{name:"value",type:"string"},{name:"ordinal",type:"int"},{name:"associatedValue",type:"auto"}]}),listeners:{"select":{fn:this.roleList_changeHandler,scope:this}}},{xtype:"tbbutton",id:"addRoleButton",text:"Add",listeners:{"click":{fn:this.addRoleButton_clickHandler,scope:this}}},{xtype:"tbspacer"},{xtype:"tbbutton",id:"removeRoleButton",text:"Remove",listeners:{"click":{fn:this.removeRoleButton_clickHandler,scope:this}}}]},items:[{xtype:"listview",id:"userRoleList",multiSelect:false,singleSelect:true,hideHeaders:true,frame:false,store:new Ext.data.Store({autoDestroy:true,storeId:"userRolesStore",idIndex:1,fields:[{name:"value",type:"string"},{name:"ordinal",type:"int"},{name:"associatedValue",type:"auto"}]}),columns:[{dataIndex:"value"}],listeners:{"selectionchange":{fn:this.userRoleList_changeHandler,scope:this}}}]};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);Puremvc.demo.view.components.RolePanel.superclass.initComponent.call(this);
this.addEvents(Puremvc.demo.view.components.RolePanel.ADD,Puremvc.demo.view.components.RolePanel.REMOVE);
this.fillRoleList();this.setEnabled(false);},fillRoleList:function(){var roleEnumList=Puremvc.demo.model.RoleEnum.getComboList();
var roleListCombo=this.getFooterToolbar().get("roleList");var store=roleListCombo.getStore();
store.removeAll(true);for(var i=0;i<roleEnumList.length;i++){var role=roleEnumList[i];
role["associatedValue"]=role;var roleRecord=new Puremvc.demo.view.components.RolePanel.RoleEnumRecordType(role,role.ordinal);
store.add(roleRecord);}},setUserRoles:function(userRoles){userRoles=userRoles||[];
var roleList=this.get("userRoleList");var store=roleList.getStore();store.removeAll(false);
for(var i=0;i<userRoles.length;i++){var role=userRoles[i];role["associatedValue"]=role;
var roleRecord=new Puremvc.demo.view.components.RolePanel.RoleEnumRecordType(role,role.ordinal);
store.add(roleRecord);}},getSelectedRole:function(){var roleListCombo=this.getFooterToolbar().get("roleList");
var store=roleListCombo.getStore();var value=roleListCombo.getValue();var selectedRecord=store.getById(value);
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedRoleValue:function(value){var roleListCombo=this.getFooterToolbar().get("roleList");
roleListCombo.setValue(value);},getSelectedUserRole:function(){var userRoleListView=this.get("userRoleList");
var selectedRecords=userRoleListView.getSelectedRecords();var selectedRecord=(selectedRecords.length>0)?selectedRecords[0]:null;
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedUserRoleValue:function(value){var userRoleListView=this.get("userRoleList");
if(value==-1){userRoleListView.clearSelections();}else{userRoleListView.select(value,false);
}},setEnabled:function(isEnabled){var flag=!isEnabled;var controls=["addRoleButton","removeRoleButton","roleList"];
for(var i=0;i<controls.length;++i){var control=this.getFooterToolbar().get(controls[i]);
control.setDisabled(flag);}var userRoleList=this.get("userRoleList");userRoleList.setDisabled(flag);
if(flag){this.setSelectedRoleValue(-1);}},setMode:function(mode){var fbar=this.getFooterToolbar();
var addRoleButton=fbar.get("addRoleButton");var removeRoleButton=fbar.get("removeRoleButton");
switch(mode){case Puremvc.demo.view.components.RolePanel.ADD_MODE:addRoleButton.enable();
removeRoleButton.disable();break;case Puremvc.demo.view.components.RolePanel.REMOVE_MODE:addRoleButton.disable();
removeRoleButton.enable();this.setSelectedRoleValue(-1);break;default:addRoleButton.disable();
removeRoleButton.disable();}},clearForm:function(){this.user=null;this.setUserRoles();
this.setSelectedRoleValue(-1);},addRoleButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.RolePanel.ADD,this);
},removeRoleButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.RolePanel.REMOVE,this);
},userRoleList_changeHandler:function(){this.setSelectedRoleValue(-1);this.selectedRole=this.getSelectedUserRole();
this.setMode(Puremvc.demo.view.components.RolePanel.REMOVE_MODE);},roleList_changeHandler:function(){this.setSelectedUserRoleValue(-1);
this.selectedRole=this.getSelectedRole();if(this.selectedRole==Puremvc.demo.model.RoleEnum.NONE_SELECTED){this.setMode(null);
}else{this.setMode(Puremvc.demo.view.components.RolePanel.ADD_MODE);}}});Ext.apply(Puremvc.demo.view.components.RolePanel,{ADD:"add",REMOVE:"remove",ADD_MODE:"addMode",REMOVE_MODE:"removeMode",RoleEnumRecordType:Ext.data.Record.create([{name:"value",allowBlank:false,type:"string"},{name:"ordinal",allowBlank:false,type:"int"},{name:"associatedValue",type:"auto"}])});
Ext.reg("x-demo-role-list-panel",Puremvc.demo.view.components.RolePanel);Ext.ns("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserForm=Ext.extend(Ext.form.FormPanel,{user:null,mode:null,constructor:function(config){Puremvc.demo.view.components.UserForm.superclass.constructor.call(this,config);
this.user=null;this.mode=null;},initComponent:function(){var config={title:"User Profile",buttons:[{xtype:"tbbutton",id:"submitButton",text:"Add User",handler:this.submit_clickHandler.createDelegate(this)},{xtype:"tbbutton",id:"cancelButton",text:"Cancel",handler:this.cancel_clickHandler.createDelegate(this)}],defaults:{width:135},items:[{xtype:"textfield",id:"fname",fieldLabel:"First Name",msgTarget:"side"},{xtype:"textfield",id:"lname",fieldLabel:"Last Name",msgTarget:"side"},{xtype:"textfield",id:"email",fieldLabel:"Email",msgTarget:"side",vtype:"email"},{xtype:"textfield",id:"uname",fieldLabel:"User Name",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},itemCls:"required"},{xtype:"textfield",id:"password",fieldLabel:"Password",inputType:"password",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},itemCls:"required"},{xtype:"textfield",id:"confirm",fieldLabel:"Confirm Password",inputType:"password",msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},itemCls:"required"},{xtype:"combo",id:"department",fieldLabel:"Department",valueField:"ordinal",displayField:"value",typeAhead:true,mode:"local",forceSelection:true,triggerAction:"all",selectOnFocus:true,msgTarget:"side",listeners:{"focus":{fn:this.field_focusHandler,scope:this}},store:new Ext.data.Store({autoDestroy:true,storeId:"deptStore",idIndex:1,fields:[{name:"value",type:"string"},{name:"ordinal",type:"int"},{name:"associatedValue",type:"auto"}]}),itemCls:"required"}]};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);Puremvc.demo.view.components.UserForm.superclass.initComponent.call(this);
this.addEvents(Puremvc.demo.view.components.UserForm.ADD,Puremvc.demo.view.components.UserForm.UPDATE,Puremvc.demo.view.components.UserForm.CANCEL);
this.fillList();this.clearForm();this.setEnabled(false);},getSelectedDept:function(){var deptListCombo=this.getForm().findField("department");
var store=deptListCombo.getStore();var value=deptListCombo.getValue();var selectedRecord=store.getById(value);
var retVal=(selectedRecord!=null)?selectedRecord.get("associatedValue"):null;return retVal;
},setSelectedDeptValue:function(value){var deptListCombo=this.getForm().findField("department");
deptListCombo.setValue(value);},fillList:function(){var deptEnumList=Puremvc.demo.model.DeptEnum.getComboList();
var deptListCombo=this.getForm().findField("department");var store=deptListCombo.getStore();
store.removeAll(true);for(var i=0;i<deptEnumList.length;i++){var dept=deptEnumList[i];
dept["associatedValue"]=dept;var deptRecord=new Puremvc.demo.view.components.UserForm.DeptEnumRecordType(dept,dept.ordinal);
store.add(deptRecord);}},setFocus:function(){var firstNameField=this.getForm().findField("fname");
firstNameField.focus();},setUser:function(user){this.user=user;if(user==null){this.clearForm();
}else{var form=this.getForm();form.findField("uname").setValue(user.uname);form.findField("fname").setValue(user.fname);
form.findField("lname").setValue(user.lname);form.findField("email").setValue(user.email);
form.findField("password").setValue(user.password);form.findField("confirm").setValue(user.password);
this.setSelectedDeptValue(user.department.ordinal);}},getUser:function(){this.updateUser();
return this.user;},updateUser:function(){var form=this.getForm();this.user.uname=form.findField("uname").getValue();
this.user.fname=form.findField("fname").getValue();this.user.lname=form.findField("lname").getValue();
this.user.email=form.findField("email").getValue();this.user.password=form.findField("password").getValue();
this.user.department=this.getSelectedDept();},clearForm:function(){var form=this.getForm();
form.reset();form.findField("department").setValue(-1);form.clearInvalid();},setEnabled:function(isEnabled){var flag=!isEnabled;
var form=this.getForm();var controls=["fname","lname","email","password","confirm","department"];
var control=null;for(var i=0;i<controls.length;++i){control=form.findField(controls[i]);
control.setDisabled(flag);}controls=["submitButton","cancelButton"];for(var j=0;j<controls.length;
++j){control=this.getFooterToolbar().get(controls[j]);control.setDisabled(flag);}form.findField("uname").setDisabled(!(isEnabled&&this.mode==Puremvc.demo.view.components.UserForm.MODE_ADD));
},setMode:function(mode){this.mode=mode;var submitButton=this.getFooterToolbar().get("submitButton");
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
}}});Ext.apply(Puremvc.demo.view.components.UserForm,{ADD:"add",UPDATE:"update",CANCEL:"cancel",MODE_ADD:"modeAdd",MODE_EDIT:"modeEdit",DeptEnumRecordType:Ext.data.Record.create([{name:"value",allowBlank:false,type:"string"},{name:"ordinal",allowBlank:false,type:"int"},{name:"associatedValue",type:"auto"}])});
Ext.reg("x-demo-user-form-panel",Puremvc.demo.view.components.UserForm);Ext.ns("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserList=Ext.extend(Ext.grid.GridPanel,{selectedUser:null,constructor:function(config){Puremvc.demo.view.components.UserList.superclass.constructor.call(this,config);
this.selectedUser=null;},initComponent:function(){var config={title:"Users",frame:true,stripeRows:true,buttons:[{xtype:"tbbutton",id:"deleteButton",text:"Delete",listeners:{"click":{fn:this.deleteButton_clickHandler,scope:this}}},{xtype:"tbbutton",id:"newButton",text:"Add",listeners:{"click":{fn:this.newButton_clickHandler,scope:this}}}],columnModel:this.colModel,selModel:new Ext.grid.RowSelectionModel({singleSelect:true,listeners:{"rowselect":{fn:this.userList_changeHandler,scope:this}}}),store:new Ext.data.Store({autoDestroy:true,storeId:"userStore",idIndex:0,fields:[{name:"uname",type:"string"},{name:"fname",type:"string"},{name:"lname",type:"string"},{name:"email",type:"string"},{name:"password",type:"string"},{name:"department",type:"auto"}]}),view:new Ext.grid.GridView({forceFit:true})};
Ext.apply(this,config);this.initialConfig=Ext.apply({},config);Puremvc.demo.view.components.UserList.superclass.initComponent.call(this);
this.addEvents(Puremvc.demo.view.components.UserList.NEW,Puremvc.demo.view.components.UserList.DELETE,Puremvc.demo.view.components.UserList.SELECT);
},colModel:new Ext.grid.ColumnModel({columns:[{header:"User Name",dataIndex:"uname"},{header:"First Name",dataIndex:"fname"},{header:"Last Name",dataIndex:"lname"},{header:"Email",dataIndex:"email",width:122},{header:"Password",dataIndex:"password"},{header:"Department",dataIndex:"department",renderer:function(data,metaData,record,rowIndex,colIndex,store){var retVal=(data.value!=Puremvc.demo.model.DeptEnum.NONE_SELECTED?data.value:"");
return retVal;}}],defaults:{width:100,resizable:true,sortable:true}}),setUsers:function(userList){var store=this.getStore();
store.removeAll(true);for(var i=0;i<userList.length;i++){var user=userList[i];var userRecord=new Puremvc.demo.view.components.UserList.UserRecordType(user,user.uname);
store.add(userRecord);}},userList_changeHandler:function(sm,rowIndex,record){this.selectedUser=new Puremvc.demo.model.vo.UserVO(record.get("uname"),record.get("fname"),record.get("lname"),record.get("email"),record.get("password"),record.get("department"));
var deleteButton=this.getFooterToolbar().get("deleteButton");deleteButton.enable();
this.fireEvent(Puremvc.demo.view.components.UserList.SELECT,this);},newButton_clickHandler:function(){this.deSelect();
this.fireEvent(Puremvc.demo.view.components.UserList.NEW,this);},deleteButton_clickHandler:function(){this.fireEvent(Puremvc.demo.view.components.UserList.DELETE,this);
},deSelect:function(){var sm=this.getSelectionModel();sm.clearSelections();this.selectedUser=null;
var deleteButton=this.getFooterToolbar().get("deleteButton");deleteButton.disable();
}});Ext.apply(Puremvc.demo.view.components.UserList,{NEW:"new",DELETE:"delete",SELECT:"select",UserRecordType:Ext.data.Record.create([{name:"uname",allowBlank:false,type:"string"},{name:"fname",allowBlank:false,type:"string"},{name:"lname",allowBlank:false,type:"string"},{name:"email",allowBlank:true,type:"string"},{name:"password",allowBlank:false,type:"string"},{name:"department",type:"auto"}])});
Ext.reg("x-demo-user-list-panel",Puremvc.demo.view.components.UserList);Ext.namespace("Puremvc.demo.view");
Puremvc.demo.view.ApplicationMediator=Ext.extend(Puremvc.patterns.Mediator,{app:null,constructor:function(viewComponent){Puremvc.demo.view.ApplicationMediator.superclass.constructor.call(this,Puremvc.demo.view.ApplicationMediator.NAME,viewComponent);
this.app=this.getViewComponent();},listNotificationInterests:function(){return[];
},handleNotification:function(notification){switch(notification.getName()){default:break;
}},onRegister:function(){Puremvc.demo.view.ApplicationMediator.superclass.onRegister.call(this);
var child=this.app.findById("userForm");this.facade.registerMediator(new Puremvc.demo.view.UserFormMediator(child));
child=this.app.findById("userList");this.facade.registerMediator(new Puremvc.demo.view.UserListMediator(child));
child=this.app.findById("rolePanel");this.facade.registerMediator(new Puremvc.demo.view.RolePanelMediator(child));
this.initializeComponent();},initializeComponent:function(){}});Ext.apply(Puremvc.demo.view.ApplicationMediator,{NAME:"ApplicationMediator"});
Ext.ns("Puremvc.demo.view");Puremvc.demo.view.RolePanelMediator=Ext.extend(Puremvc.patterns.Mediator,{constructor:function(viewComponent){Puremvc.demo.view.RolePanelMediator.superclass.constructor.call(this,Puremvc.demo.view.RolePanelMediator.NAME,viewComponent);
},getRolePanel:function(){return this.viewComponent;},onAddRole:function(){var rolePanel=this.getRolePanel();
this.roleProxy.addRoleToUser(rolePanel.user,rolePanel.selectedRole);rolePanel.setMode(null);
},onRemoveRole:function(){var rolePanel=this.getRolePanel();this.roleProxy.removeRoleFromUser(rolePanel.user,rolePanel.selectedRole);
this.updateUserRoleList();rolePanel.setMode(null);},updateUserRoleList:function(){var rolePanel=this.getRolePanel();
var userName=rolePanel.user.uname;var userRoles=this.roleProxy.getUserRoles(userName);
rolePanel.setUserRoles(userRoles);},listNotificationInterests:function(){return[Puremvc.demo.ApplicationFacade.NEW_USER,Puremvc.demo.ApplicationFacade.USER_ADDED,Puremvc.demo.ApplicationFacade.USER_UPDATED,Puremvc.demo.ApplicationFacade.USER_DELETED,Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,Puremvc.demo.ApplicationFacade.USER_SELECTED,Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT];
},handleNotification:function(note){var rolePanel=this.getRolePanel();switch(note.getName()){case Puremvc.demo.ApplicationFacade.NEW_USER:rolePanel.clearForm();
rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_ADDED:rolePanel.user=note.getBody();
var roleVO=new Puremvc.demo.model.vo.RoleVO(rolePanel.user.uname);this.roleProxy.addItem(roleVO);
rolePanel.clearForm();rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_UPDATED:rolePanel.clearForm();
rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_DELETED:rolePanel.clearForm();
rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:rolePanel.clearForm();
rolePanel.setEnabled(false);break;case Puremvc.demo.ApplicationFacade.USER_SELECTED:rolePanel.clearForm();
rolePanel.setEnabled(true);rolePanel.setMode(null);rolePanel.user=note.getBody();
this.updateUserRoleList();break;case Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT:this.updateUserRoleList();
break;}},onRegister:function(){Puremvc.demo.view.RolePanelMediator.superclass.onRegister.call(this);
this.initializeComponent();},initializeComponent:function(){var rolePanel=this.getRolePanel();
rolePanel.on(Puremvc.demo.view.components.RolePanel.ADD,this.onAddRole,this);rolePanel.on(Puremvc.demo.view.components.RolePanel.REMOVE,this.onRemoveRole,this);
this.roleProxy=this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);}});Ext.apply(Puremvc.demo.view.RolePanelMediator,{NAME:"RolePanelMediator"});
Ext.ns("Puremvc.demo.view");Puremvc.demo.view.UserFormMediator=Ext.extend(Puremvc.patterns.Mediator,{constructor:function(viewComponent){Puremvc.demo.view.UserFormMediator.superclass.constructor.call(this,Puremvc.demo.view.UserFormMediator.NAME,viewComponent);
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
userForm.setEnabled(true);userForm.setFocus();break;}},onRegister:function(){Puremvc.demo.view.UserFormMediator.superclass.onRegister.call(this);
this.initializeComponent();},initializeComponent:function(){var userForm=this.getUserForm();
userForm.on(Puremvc.demo.view.components.UserForm.ADD,this.onAdd,this);userForm.on(Puremvc.demo.view.components.UserForm.UPDATE,this.onUpdate,this);
userForm.on(Puremvc.demo.view.components.UserForm.CANCEL,this.onCancel,this);this.userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
}});Ext.apply(Puremvc.demo.view.UserFormMediator,{NAME:"UserFormMediator"});Ext.ns("Puremvc.demo.view");
Puremvc.demo.view.UserListMediator=Ext.extend(Puremvc.patterns.Mediator,{constructor:function(viewComponent){Puremvc.demo.view.UserListMediator.superclass.constructor.call(this,Puremvc.demo.view.UserListMediator.NAME,viewComponent);
},getUserList:function(){return this.viewComponent;},onNew:function(){var user=new Puremvc.demo.model.vo.UserVO();
this.sendNotification(Puremvc.demo.ApplicationFacade.NEW_USER,user);},onDelete:function(){var selectedUser=this.getUserList().selectedUser;
if(selectedUser==null){return;}this.sendNotification(Puremvc.demo.ApplicationFacade.DELETE_USER,this.getUserList().selectedUser);
},onSelect:function(){this.sendNotification(Puremvc.demo.ApplicationFacade.USER_SELECTED,this.getUserList().selectedUser);
},listNotificationInterests:function(){return[Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,Puremvc.demo.ApplicationFacade.USER_UPDATED,Puremvc.demo.ApplicationFacade.USER_ADDED,Puremvc.demo.ApplicationFacade.USER_DELETED];
},handleNotification:function(note){var userList=this.getUserList();var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
switch(note.getName()){case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:userList.deSelect();
break;case Puremvc.demo.ApplicationFacade.USER_UPDATED:userList.setUsers(userProxy.getUsers());
userList.deSelect();break;case Puremvc.demo.ApplicationFacade.USER_ADDED:userList.setUsers(userProxy.getUsers());
userList.deSelect();break;case Puremvc.demo.ApplicationFacade.USER_DELETED:userList.setUsers(userProxy.getUsers());
userList.deSelect();break;}},onRegister:function(){Puremvc.demo.view.UserListMediator.superclass.onRegister.call(this);
this.initializeComponent();},initializeComponent:function(){var userList=this.getUserList();
userList.on(Puremvc.demo.view.components.UserList.NEW,this.onNew,this);userList.on(Puremvc.demo.view.components.UserList.DELETE,this.onDelete,this);
userList.on(Puremvc.demo.view.components.UserList.SELECT,this.onSelect,this);var userProxy=this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
userList.setUsers(userProxy.getUsers());userList.deSelect();}});Ext.apply(Puremvc.demo.view.UserListMediator,{NAME:"UserListMediator"});