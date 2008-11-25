
function class_net_tekool_events_EventDispatcher()
{
	Objs.register("net.tekool.events.EventDispatcher",EventDispatcher);
	function EventDispatcher()
	{
		if(Objs.extending) return;
		this.__listenerMap = new Object();
	}
	EventDispatcher.QUEUE_PATTERN = '@_@';
	var o = EventDispatcher.prototype;
	o.__listenerMap = null;
	o.dispatchEvent = function(event)
	{
		if(typeof event == 'undefined')
			return;
		if(typeof event.type == 'undefined')
			return;
		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + event.type].slice(0);}
		catch(e){return};
		var len = queue.length;
		for(var i=0; i<len; i++)
		{
			var listener = queue[i];
			if(typeof event.target == 'undefined')
				event.target = this;
			if(typeof listener == 'function')
				listener.call(this,event);
			else
			{
				if(typeof listener.handleEvent != 'undefined')
					listener.handleEvent.call(listener,event);
				var handler = listener[event.type + 'Handler'];
				if(typeof handler != 'undefined')
					handler.call(listener,event);
			}
		}
	}
	o.addEventListener = function(type, listener)
	{
		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
		if(typeof queue == 'undefined')
			queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type] = new Array();
		var len = queue.length;
		for(var i=0; i<len; i++)
			if(queue[i] == listener)
				return;
		queue.push(listener);
	}
	o.removeEventListener = function(type, listener)
	{
		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
		if(typeof queue == 'undefined')
			return;
		var len = queue.length;
		for(var i=0; i<len; i++)
			if(queue[i] == listener)
			{
				queue.splice(i,1);
				return;
			}
	}
}


function class_net_tekool_events_EventS()
{
	Objs.register("net.tekool.events.EventS",EventS);
	function EventS
	(
		type,
		target
	)
	{
		if(Objs.extending) return;
		this.type = type;
		this.target = target;
	}
	EventS.prototype.type = null;
	EventS.prototype.target = null;
	EventS.prototype.toString = function()
	{
		return '[EventS] '
		+	'{ type:"' + (this.type || '') + '"'
		+	', target:' + (this.target || '')
		+	'}';
	}
}


function class_net_tekool_utils_Relegate()
{
	Objs.register("net.tekool.utils.Relegate",Relegate);
	function Relegate(){}
	Relegate.create = function(t,f)
	{
		var a = new Array();
		for(var i=2; i<arguments.length; i++)
			a.push(arguments[i]);
		return function()
		{
			var b = new Array();
			for(var i=0; i<arguments.length; i++)
				b.push(arguments[i]);
			return f.apply
			(
				t,
				b.concat(a)
			);
		};
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_ApplicationFacade()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade",ApplicationFacade);
	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var Facade = Objs.load("org.puremvc.js.patterns.facade.Facade");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var StartupCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.StartupCommand");
	var DeleteUserCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.DeleteUserCommand");
	var AddRoleResultCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.AddRoleResultCommand");
	function ApplicationFacade()
	{
		Facade.apply(this,arguments);
		if(Objs.extending) return;
	}
	Objs.extend(ApplicationFacade,Facade);
	Objs.implement(ApplicationFacade,IFacade);
	var o = ApplicationFacade.prototype;
	ApplicationFacade.STARTUP				= "startup";
	ApplicationFacade.NEW_USER			= "newUser";
	ApplicationFacade.DELETE_USER			= "deleteUser";
	ApplicationFacade.CANCEL_SELECTED		= "cancelSelected";
	ApplicationFacade.USER_SELECTED		= "userSelected";
	ApplicationFacade.USER_ADDED			= "userAdded";
	ApplicationFacade.USER_UPDATED		= "userUpdated";
	ApplicationFacade.USER_DELETED		= "userDeleted";
	ApplicationFacade.ADD_ROLE			= "addRole";
	ApplicationFacade.ADD_ROLE_RESULT		= "addRoleResult";
	ApplicationFacade.getInstance = function()
	{
		if( !(Facade._instance instanceof  ApplicationFacade))
			Facade._instance = new ApplicationFacade();
		return Facade._instance;
	}
	o.startup = function(app)
	{
		this.sendNotification( ApplicationFacade.STARTUP, app );    
	}
	o._initializeController = function() 
	{
		Facade.prototype._initializeController.call(this);
		this.registerCommand( ApplicationFacade.STARTUP, StartupCommand );
		this.registerCommand( ApplicationFacade.DELETE_USER, DeleteUserCommand );
		this.registerCommand( ApplicationFacade.ADD_ROLE_RESULT, AddRoleResultCommand );
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_controller_AddRoleResultCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.AddRoleResultCommand",AddRoleResultCommand);
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");
	function AddRoleResultCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}
	Objs.extend(AddRoleResultCommand,SimpleCommand);
	Objs.implement(AddRoleResultCommand,ICommand);
	var o = AddRoleResultCommand.prototype;
	o.execute = function( notification )
	{
		var result = notification.getBody();
		if( result == false )
			alert('Role already exists for this user!\nAdd User Role');
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_controller_DeleteUserCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.DeleteUserCommand",DeleteUserCommand);
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	function DeleteUserCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}
	Objs.extend(DeleteUserCommand,SimpleCommand);
	Objs.implement(DeleteUserCommand,ICommand);
	var o = DeleteUserCommand.prototype;
	o.execute = function( notification )
	{
		var user = notification.getBody();
		var userProxy = this._facade.retrieveProxy( UserProxy.NAME );
		var roleProxy = this._facade.retrieveProxy( RoleProxy.NAME );
		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		this.sendNotification( ApplicationFacade.USER_DELETED );
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_controller_StartupCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.StartupCommand",StartupCommand);
	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var UserFormMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.UserFormMediator");
	var UserListMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.UserListMediator");
	var RolePanelMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.RolePanelMediator");
	function StartupCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}
	Objs.extend(StartupCommand,SimpleCommand);
	Objs.implement(StartupCommand,ICommand);
	var o = StartupCommand.prototype;
	o.execute = function( note )
	{
		this._facade.registerProxy( new UserProxy() );
		this._facade.registerProxy( new RoleProxy() );
		var app = note.getBody();
		this._facade.registerMediator( new UserFormMediator( app.userForm ) );
		this._facade.registerMediator( new UserListMediator( app.userList ) );
		this._facade.registerMediator( new RolePanelMediator( app.rolePanel ) );
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_model_enum_DeptEnum()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum",DeptEnum);
	var o = DeptEnum.prototype;
	function DeptEnum( value, ordinal )
	{
		if(Objs.extending) return;
		this.value = value;
		this.ordinal = ordinal;
	}
	o.ordinal = null;
	o.value = null;
	DeptEnum.getList = function()
	{
		return [
			DeptEnum.ACCT, 
			DeptEnum.SALES, 
			DeptEnum.PLANT
		];
	}
	DeptEnum.getComboList = function()
	{
		var cList = DeptEnum.getList();
		cList.unshift( DeptEnum.NONE_SELECTED );
		return cList;
	}
	o.equals = function( roleEnum )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
	DeptEnum.NONE_SELECTED 	= new DeptEnum( '--None Selected--'	, -1 );
	DeptEnum.ACCT 			= new DeptEnum( 'Accounting'		, 0 );
	DeptEnum.SALES 			= new DeptEnum( 'Sales'				, 1 );
	DeptEnum.PLANT 			= new DeptEnum( 'Plant'				, 2 );
	DeptEnum.SHIPPING 		= new DeptEnum( 'Shipping'			, 3 );
	DeptEnum.QC 			= new DeptEnum( 'Quality Control'	, 4 );
}


function class_org_puremvc_js_demos_js_employeeadmin_model_enum_RoleEnum()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum",RoleEnum);
	function RoleEnum( value, ordinal )
	{
		if(Objs.extending) return;
		this.value = value;
		this.ordinal = ordinal;
	}
	var o = RoleEnum.prototype;
	o.ordinal = null;
	o.value = null;
	RoleEnum.getList = function()
	{
		return [
			RoleEnum.ADMIN, 
			RoleEnum.ACCT_PAY, 
			RoleEnum.ACCT_RCV, 
			RoleEnum.EMP_BENEFITS, 
			RoleEnum.GEN_LEDGER, 
			RoleEnum.PAYROLL,
			RoleEnum.INVENTORY,
			RoleEnum.PRODUCTION,
			RoleEnum.QUALITY_CTL,
			RoleEnum.SALES,
			RoleEnum.ORDERS,
			RoleEnum.CUSTOMERS,
			RoleEnum.SHIPPING,
			RoleEnum.RETURNS
		];
	}
	RoleEnum.getComboList = function()
	{
		var cList = RoleEnum.getList();
		cList.unshift( RoleEnum.NONE_SELECTED );
		return cList;
	}
	o.equals = function( roleEnum )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
	RoleEnum.NONE_SELECTED 	= new RoleEnum( '--None Selected--'		, -1 );
	RoleEnum.ADMIN 			= new RoleEnum( 'Administrator'			, 0 );
	RoleEnum.ACCT_PAY 		= new RoleEnum( 'Accounts Payable'		, 1 );
	RoleEnum.ACCT_RCV 		= new RoleEnum( 'Accounts Receivable'	, 2 );
	RoleEnum.EMP_BENEFITS 	= new RoleEnum( 'Employee Benefits'		, 3 );
	RoleEnum.GEN_LEDGER 	= new RoleEnum( 'General Ledger'		, 4 );
	RoleEnum.PAYROLL 		= new RoleEnum( 'Payroll'				, 5 );
	RoleEnum.INVENTORY 		= new RoleEnum( 'Inventory'				, 6 );
	RoleEnum.PRODUCTION 	= new RoleEnum( 'Production'			, 7 );
	RoleEnum.QUALITY_CTL 	= new RoleEnum( 'Quality Control' 		, 8 );
	RoleEnum.SALES 			= new RoleEnum( 'Sales'					, 9 );
	RoleEnum.ORDERS 		= new RoleEnum( 'Orders'				,10 );
	RoleEnum.CUSTOMERS 		= new RoleEnum( 'Customers'				,11 );
	RoleEnum.SHIPPING 		= new RoleEnum( 'Shipping'				,12 );
	RoleEnum.RETURNS 		= new RoleEnum( 'Returns'				,13 );
}


function class_org_puremvc_js_demos_js_employeeadmin_model_RoleProxy()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy",RoleProxy);
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var Proxy = Objs.load("org.puremvc.js.patterns.proxy.Proxy");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var RoleVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var RoleEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	function RoleProxy()
	{
		Proxy.apply(this, [ RoleProxy.NAME, new Array()] );
		if(Objs.extending) return;
		this.addItem
		(
			new RoleVO
			(
				'lstooge',
				[
					RoleEnum.PAYROLL,
					RoleEnum.EMP_BENEFITS
				]
			)
		);
		this.addItem
		(
			new RoleVO
			(
				'cstooge',
				[
					RoleEnum.ACCT_PAY,
					RoleEnum.ACCT_RCV,
					RoleEnum.GEN_LEDGER
				]
			)
		);
		this.addItem
		(
			new RoleVO
			(
				'mstooge',
				[
					RoleEnum.INVENTORY,
					RoleEnum.PRODUCTION,
					RoleEnum.SALES,
					RoleEnum.SHIPPING
				]
			)
		);
	}
	Objs.extend(RoleProxy,Proxy);
	Objs.implement(RoleProxy,IProxy);
	RoleProxy.NAME = 'RoleProxy';
	var o = RoleProxy.prototype;
	o.getRoles = function()
	{
		return this._data;
	}
	o.addItem = function( item )
	{
		this.getRoles().push( item );
	}
	o.deleteItem = function( item )
	{
		var roles = this.getRoles();
		for( var i=0; i<roles.length; i++)
		{
			if( roles[i].username == item.username )
			{
				roles.splice(i,1);
				break;
			}
		}	
	}
	o.doesUserHaveRole = function( user, role )
	{
		var roles = this.getRoles();
		var hasRole = false;
		for( var i=0; i<roles.length; i++)
		{ 
			if( roles[i].username == user.username )
			{
				var userRoles = roles[i].roles;
				for( var j=0; j<userRoles.length; j++ )
				{
					var roleEnum = userRoles[j];
					if( roleEnum.equals( role ) )
					{
						hasRole = true;
						break;
					} 
				}
				break;
			}
		}
		return hasRole;
	}
	o.addRoleToUser = function( user, role )
	{
		var roles = this.getRoles();
		var result = false;
		if ( !this.doesUserHaveRole(user, role) )
		{
			for( var i=0; i<roles.length; i++)
			{ 
				if( roles[i].username == user.username )
				{
					var userRoles = roles[i].roles;
					userRoles.push( role );
					result = true;
					break;
				}
			}
		}
		this.sendNotification( ApplicationFacade.ADD_ROLE_RESULT, result );
	}
	o.removeRoleFromUser = function( user, role )
	{
		var roles = this.getRoles();
		if( this.doesUserHaveRole( user, role ) )
		{
			for( var i=0; i<roles.length; i++)
			{ 
				if( roles[i].username == user.username )
				{
					var userRoles = roles[i].roles;
					for( var j=0; j<userRoles.length; j++)
					{
						var roleEnum = userRoles[j];
						if( roleEnum.equals( role ) )
						{
							userRoles.splice(j,1);
							break;
						}
					}
					break;
				}
			}
		}
	}
	o.getUserRoles = function( username )
	{
		var roles = this.getRoles();
		var userRoles = new Array();
		for( var i=0; i<roles.length; i++)
		{ 
			if( roles[i].username == username )
			{
				userRoles = roles[i].roles;
				break;
			}
		}
		return userRoles;
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_model_UserProxy()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.UserProxy",UserProxy);
	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var Proxy = Objs.load("org.puremvc.js.patterns.proxy.Proxy");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	function UserProxy()
	{
		Proxy.apply(this, [UserProxy.NAME, new Array()] );
		if(Objs.extending) return;
		this.addItem( new UserVO('lstooge','Larry', 'Stooge', "larry@stooges.com", 'ijk456',DeptEnum.ACCT) );
		this.addItem( new UserVO('cstooge','Curly', 'Stooge', "curly@stooges.com", 'xyz987',DeptEnum.SALES) );
		this.addItem( new UserVO('mstooge','Moe', 'Stooge', "moe@stooges.com", 'abc123',DeptEnum.PLANT) );
	}
	Objs.extend(UserProxy,Proxy);
	Objs.implement(UserProxy,IProxy);
	var o = UserProxy.prototype;
	UserProxy.NAME = 'UserProxy';
	o.getUsers = function()
	{
		return this._data;
	}
	o.addItem = function( item )
	{
		this.getUsers().push( item );
	}
	o.updateItem = function( item )
	{
		var user = item;
		var users = this.getUsers();
		for( var i=0; i<users.length; i++ )
			if( users[i].username == user.username )
				users[i] = user;
	}
	o.deleteItem = function( item )
	{
		var user = item;
		var users = this.getUsers();
		for( var i=0; i<users.length; i++ )
			if( users[i].username == user.username )
				users.splice(i,1);
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_model_vo_RoleVO()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO",RoleVO);
	var o = RoleVO.prototype;
	function RoleVO
	(
		username,
		roles
	)
	{
		if(Objs.extending) return;
		if( username != null )
			this.username = username;
		if( roles != null )
			this.roles = roles;
	}
	o.username = '';
	o.roles = new Array();
}


function class_org_puremvc_js_demos_js_employeeadmin_model_vo_UserVO()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO",UserVO);
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	function UserVO
	(
		uname,
		fname,
		lname,
		email,
		password,
		department
	)
	{
		if(Objs.extending) return;
		if( uname != null )
			this.username = uname;
		if( fname != null )
			this.fname = fname;
		if( lname != null )
			this.lname = lname;
		if( email != null )
			this.email = email;
		if( password != null )
			this.password = password;
		if( department != null )
			this.department = department;
	}
	var o = UserVO.prototype;
	o.username = '';
	o.fname = '';
	o.lname = '';
	o.email = '';
	o.password = '';
	o.department = DeptEnum.NONE_SELECTED;
	o.getIsValid = function()
	{
		return true;//TODO 
		return this.username != '' && this.password != '' && this.department != DeptEnum.NONE_SELECTED;
	}
	o.getGivenName = function()
	{
		return this.lname + ', ' + this.fname;
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_components_RolePanel()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.RolePanel",RolePanel);
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var RoleVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO");
	var RoleEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");
	RolePanel.ADD = 'add';
	RolePanel.REMOVE = 'remove';
	function RolePanel(userFormDiv)
	{
		if(Objs.extending) return;
		this.__userFormDiv = userFormDiv;
		this.__eventDispatcher = new EventDispatcher();
		this.roleList = document.getElementById('roleList');
		document.getElementById('addRoleButton').onclick = Relegate.create(this,this.__onAdd);
		document.getElementById('removeRoleButton').onclick = Relegate.create(this,this.__onRemove);
		document.getElementById('fullRoleList').onchange = Relegate.create(this,this.__selectRoleToAdd);
		document.getElementById('roleList').onchange = Relegate.create(this,this.__selectRoleToRemove);
		this.fillFullRoleList();
		this.setEnabled(false);
	}
	var o = RolePanel.prototype;
	o.user = null;
	o.selectedRole = null
	o.setUserRoles = function(userRoles)
	{
		while(this.roleList.firstChild)
			this.roleList.removeChild(this.roleList.firstChild);
		if(userRoles == null)
			return;
		for(var i=0; i<userRoles.length; i++)
		{
			var role = userRoles[i];
			var option = this.roleList.appendChild(document.createElement('OPTION'));
			option.associatedValue = role;
			option.text = role.value;
		}
	}
	o.__onAdd = function()
	{
		this.dispatchEvent( new EventS( RolePanel.ADD, true ) );
	}
	o.__onRemove = function()
	{
		this.dispatchEvent( new EventS( RolePanel.REMOVE, true ) );
	}
	o.fillFullRoleList = function(userRoles)
	{
		var fullRoleEnumList = RoleEnum.getComboList();
		var fullRoleList = document.getElementById('fullRoleList');
		while(fullRoleList.firstChild)
			fullRoleList.removeChild(this.roleList.firstChild);
		for(var i=0; i<fullRoleEnumList.length; i++)
		{
			var role = fullRoleEnumList[i];
			var option = fullRoleList.appendChild(document.createElement('OPTION'));
			option.associatedValue = role;
			option.text = role.value;
		}
	}
	o.setEnabled = function(isEnabled)
	{
		document.getElementById('addRoleButton').disabled = true;
		document.getElementById('removeRoleButton').disabled = true;
		document.getElementById('roleList').disabled =
		document.getElementById('fullRoleList').disabled =
			!isEnabled;
		document.getElementById('fullRoleList').selectedIndex = -1;
	}
	o.roleList = null;
	o.__selectRoleToRemove = function()
	{
		var fullRoleList = document.getElementById('fullRoleList');
		fullRoleList.selectedIndex = RoleEnum.NONE_SELECTED.ordinal;
		this.selectedRole = this.roleList.options[this.roleList.selectedIndex].associatedValue;
		document.getElementById('addRoleButton').disabled = true;
		document.getElementById('removeRoleButton').disabled =	false;
	}
	o.__selectRoleToAdd = function()
	{
		this.roleList.selectedIndex = -1;
		var fullRoleList = document.getElementById('fullRoleList');
		this.selectedRole = fullRoleList[fullRoleList.selectedIndex].associatedValue;
		document.getElementById('addRoleButton').disabled = this.selectedRole == RoleEnum.NONE_SELECTED;
		document.getElementById('removeRoleButton').disabled = true;
	}
	o.dispatchEvent = function(event)
	{
		event.target = this;
		this.__eventDispatcher.dispatchEvent(event);
	}
	o.addEventListener = function(type, listener)
	{
		this.__eventDispatcher.addEventListener(type, listener);
	}
	o.removeEventListener = function(type, listener)
	{
		this.__eventDispatcher.removeEventListener(type, listener);
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_components_UserForm()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.UserForm",UserForm);
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");
	function UserForm(userFormDiv)
	{
		if(Objs.extending) return;
		this.__userFormDiv = userFormDiv;
		this.__eventDispatcher = new EventDispatcher();
		document.getElementById('submitButton').onclick = Relegate.create(this,this.__submit);
		document.getElementById('cancelButton').onclick = Relegate.create(this,this.__cancel);
		this.__fillList();
		this.clearForm();
		this.setEnabled(false);
	}
	var o = UserForm.prototype;
	UserForm.ADD			= "add";
	UserForm.UPDATE		= "update";
	UserForm.CANCEL		= "cancel";
	UserForm.MODE_ADD		= "modeAdd";
	UserForm.MODE_EDIT	= "modeEdit";
	o.__user = null;
	o.__userFormDiv = null;
	o.__eventDispatcher = null;
	o.__mode = null;
	o.__fillList = function()
	{
		var select = document.getElementById('department');
		var deptEnumList = DeptEnum.getComboList();
		while(select.firstChild)
			select.removeChild(select.firstChild);
		for(var i=0; i<deptEnumList.length; i++)
		{
			var option = select.appendChild(document.createElement('OPTION'));
			option.value = deptEnumList[i].ordinal;
			option.text = deptEnumList[i].value;
		}
	}
	o.setFocus = function()
	{
		var firstname = document.getElementById('firstname');
		firstname.focus();
	}
	o.setUser = function(user)
	{
		this.__user = user;
		var select = document.getElementById('department');
		if(user == null)
			this.clearForm();
		else
		{
			document.getElementById('username').value = user.username;
			document.getElementById('firstname').value = user.fname;
			document.getElementById('lastname').value = user.lname;
			document.getElementById('email').value = user.email;
			document.getElementById('password').value = user.password;
			document.getElementById('confirm').value = user.password;
			for(var i=0; i<select.options.length; i++)
				if(select.options[i].value == user.department.ordinal)
					select.selectedIndex = i;
		}
	}
	o.getUser = function()
	{
		this.__updateUser();
		return this.__user;
	}
	o.__updateUser = function()
	{
		this.__user.username = document.getElementById('username').value;
		this.__user.fname = document.getElementById('firstname').value;
		this.__user.lname = document.getElementById('lastname').value;
		this.__user.email = document.getElementById('email').value;
		this.__user.password = document.getElementById('password').value;
		this.__user.password = document.getElementById('confirm').value;
		var selected = document.getElementById('department').selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		this.__user.department = deptEnumList[selected];
	}
	o.clearForm = function()
	{
		document.getElementById('username').value = "";
		document.getElementById('firstname').value = "";
		document.getElementById('lastname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";
		document.getElementById('confirm').value = "";	
		document.getElementById('department').selectedIndex = 0;
	}
	o.setEnabled = function(isEnabled)
	{
		document.getElementById('username').disabled =
		document.getElementById('firstname').disabled =
		document.getElementById('lastname').disabled =
		document.getElementById('email').disabled =
		document.getElementById('password').disabled =
		document.getElementById('confirm').disabled =
		document.getElementById('department').disabled =
		document.getElementById('submitButton').disabled =
		document.getElementById('cancelButton').disabled =
			!isEnabled;
	}
	o.setMode = function(mode)
	{
		this.__mode = mode;
		var submitButton = document.getElementById('submitButton');
		switch(mode)
		{
			case UserForm.MODE_ADD:
				submitButton.removeChild(submitButton.firstChild);
				submitButton.appendChild(document.createTextNode("Add User"));
			break;
			case UserForm.MODE_EDIT:
				submitButton.removeChild(submitButton.firstChild);
				submitButton.appendChild(document.createTextNode("Update User"));
			break;
		}
	}
	o.__submit = function()
	{
		this.__updateUser();
		if( this.__user.getIsValid() )
		{
			if( this.__mode == UserForm.MODE_ADD )
				this.dispatchEvent( new EventS( UserForm.ADD) );
			else
				this.dispatchEvent( new EventS( UserForm.UPDATE) );
		}
	}
	o.__cancel = function()
	{
		this.dispatchEvent( new EventS( UserForm.CANCEL ) );
	}
	o.__enableSubmit = function
	(
		u,
		p,
		c,
		d
	)
	{
		return ( u != '' && p != '' && p == c && d != DeptEnum.NONE_SELECTED );
	}
	o.dispatchEvent = function(event)
	{
		event.target = this;
		this.__eventDispatcher.dispatchEvent(event);
	}
	o.addEventListener = function(type, listener)
	{
		this.__eventDispatcher.addEventListener(type, listener);
	}
	o.removeEventListener = function(type, listener)
	{
		this.__eventDispatcher.removeEventListener(type, listener);
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_components_UserList()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.UserList",UserList);
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	function UserList(userListPanel)
	{
		if(Objs.extending) return;
		this.__userListPanel = userListPanel;
		this.__eventDispatcher = new EventDispatcher();
		document.getElementById('userList').onchange = Relegate.create(this, this.__onSelect);
		document.getElementById('newButton').onclick = Relegate.create(this,this.__onNew);
		document.getElementById('deleteButton').onclick = Relegate.create(this,this.__onDelete);
		this.deSelect();
	}
	var o = UserList.prototype;
	UserList.NEW 		= 'new';
	UserList.DELETE 	= 'delete';
	UserList.SELECT 	= 'select';
	o.selectedUser = null;
	o.__users = null;
	o.__userListPanel = null;
	o.__eventDispatcher = null;
	o.setUsers = function(userList)
	{
		this.__users = userList;
		this.refresh();
	}
	o.refresh = function()
	{
		var select = document.getElementById('userList');
		while(select.firstChild)
			select.removeChild(select.firstChild);
		for(var i=0; i<this.__users.length; i++)
		{
			var user = this.__users[i];
			var option = select.appendChild(document.createElement('OPTION'));
			option.associatedValue = user;
			option.text = ""
				+ user.username			+ " - "
				+ user.fname			+ " - "
				+ user.lname			+ " - "
				+ user.email			+ " - "
				+ user.password			+ 
				 (user.department != DeptEnum.NONE_SELECTED ? (" - " + user.department.value) : "")
			;
		}
	}
	o.__onSelect = function()
	{
		var select = document.getElementById('userList');
		this.selectedUser = select.options[select.selectedIndex].associatedValue;
		document.getElementById('deleteButton').disabled = false;
		this.dispatchEvent( new EventS( UserList.SELECT,this ) );
	}
	o.__onNew = function()
	{
		this.deSelect();
		this.dispatchEvent( new EventS( UserList.NEW,this ) );
	}
	o.__onDelete = function()
	{
		this.dispatchEvent( new EventS( UserList.DELETE,this ) );
	}
	o.deSelect = function()
	{
		document.getElementById('userList').selectedIndex = -1;
		this.selectedUser = null;
		document.getElementById('deleteButton').disabled = true;
	}
	o.dispatchEvent = function(event)
	{
		event.target = this;
		this.__eventDispatcher.dispatchEvent(event);
	}
	o.addEventListener = function(type, listener)
	{
		this.__eventDispatcher.addEventListener(type, listener);
	}
	o.removeEventListener = function(type, listener)
	{
		this.__eventDispatcher.removeEventListener(type, listener);
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_RolePanelMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.RolePanelMediator",RolePanelMediator);
	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var RoleVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO");
	var RoleEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum");
	var RolePanel = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.RolePanel");
	function RolePanelMediator( viewComponent )
	{
		Mediator.apply(this, [RolePanelMediator.NAME, viewComponent] );
		if(Objs.extending) return;
		var rolePanel = this._getRolePanel();
		rolePanel.addEventListener( RolePanel.ADD, Relegate.create(this,this._onAddRole) );
		rolePanel.addEventListener( RolePanel.REMOVE, Relegate.create(this,this._onRemoveRole) );
		this._roleProxy = this._facade.retrieveProxy( RoleProxy.NAME );
	}
	Objs.extend(RolePanelMediator,Mediator);
	Objs.implement(RolePanelMediator,IMediator);
	var o = RolePanelMediator.prototype;
	RolePanelMediator.NAME = 'RolePanelMediator';
	o._roleProxy = null;		
	o._getRolePanel = function()
	{
		return this._viewComponent;
	}
	o._onAddRole = function( event )
	{
		this._roleProxy.addRoleToUser( this._getRolePanel().user, this._getRolePanel().selectedRole );
	}
	o._onRemoveRole = function( event )
	{
		this._roleProxy.removeRoleFromUser( this._getRolePanel().user, this._getRolePanel().selectedRole );
		this.__updateUserRoleList();
	}
	o.__updateUserRoleList = function()
	{
		this._getRolePanel().setUserRoles( this._roleProxy.getUserRoles( this._getRolePanel().user.username ) );
	}
	o.listNotificationInterests = function()
	{
		return [
			ApplicationFacade.NEW_USER,
			ApplicationFacade.USER_ADDED,
			ApplicationFacade.USER_UPDATED,
			ApplicationFacade.USER_DELETED,
			ApplicationFacade.CANCEL_SELECTED,
			ApplicationFacade.USER_SELECTED,
			ApplicationFacade.ADD_ROLE_RESULT
		];
	}
	o.handleNotification = function( note )
	{
		var rolePanel = this._getRolePanel();
		switch( note.getName() )
		{
			case ApplicationFacade.NEW_USER:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_ADDED:
				rolePanel.user = note.getBody();
				var roleVO = new RoleVO ( rolePanel.user.username );
				this._roleProxy.addItem( roleVO );
				this._clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_UPDATED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_DELETED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.CANCEL_SELECTED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_SELECTED:
				rolePanel.user = note.getBody();
				this.__updateUserRoleList();
				rolePanel.setEnabled(true);
			break;
			case ApplicationFacade.ADD_ROLE_RESULT:
				this.__updateUserRoleList();
			break;
		}
	}
	o._clearForm = function()
	{
		var rolePanel = this._getRolePanel();
		rolePanel.user = null;
		rolePanel.setUserRoles(null);
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_UserFormMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.UserFormMediator",UserFormMediator);
	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	var UserForm = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.UserForm");
	function UserFormMediator( viewComponent )
	{
		Mediator.apply(this, [UserFormMediator.NAME, viewComponent] );
		if(Objs.extending) return;
		var userForm = this._getUserForm();
		userForm.addEventListener( UserForm.ADD, Relegate.create(this,this._onAdd) );
		userForm.addEventListener( UserForm.UPDATE, Relegate.create(this,this._onUpdate) );
		userForm.addEventListener( UserForm.CANCEL, Relegate.create(this,this._onCancel) );
		this._userProxy = this._facade.retrieveProxy( UserProxy.NAME );
	}
	Objs.extend(UserFormMediator,Mediator);
	Objs.implement(UserFormMediator,IMediator);
	var o = UserFormMediator.prototype;
	o._userProxy = null;
	UserFormMediator.NAME = 'UserFormMediator';
	o._getUserForm  = function()
	{
		return this._viewComponent;
	}
	o._onAdd = function( event )
	{
		var user = this._getUserForm().getUser();
		this._userProxy.addItem( user );
		this.sendNotification( ApplicationFacade.USER_ADDED, user );
		var userForm = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	o._onUpdate = function( event )
	{
		var user = this._getUserForm().getUser();
		this._userProxy.updateItem( user );
		this.sendNotification(  ApplicationFacade.USER_UPDATED, user );
		var userForm = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	o._onCancel = function( event )
	{
		this.sendNotification(  ApplicationFacade.CANCEL_SELECTED );
		var userForm = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	o.listNotificationInterests = function()
	{
		return [
			ApplicationFacade.NEW_USER,
			ApplicationFacade.USER_DELETED,
			ApplicationFacade.USER_SELECTED
		];
	}
	o.handleNotification = function( note )
	{
		var userForm = this._getUserForm();
		switch ( note.getName() )
		{
			case ApplicationFacade.NEW_USER:
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_ADD );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
			case ApplicationFacade.USER_DELETED:
				userForm.clearForm();
				userForm.setEnabled(false);
			break;
			case ApplicationFacade.USER_SELECTED:
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_EDIT );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
		}
	}
}


function class_org_puremvc_js_demos_js_employeeadmin_view_UserListMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.UserListMediator",UserListMediator);
	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var UserList = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.UserList");
	function UserListMediator( viewComponent )
	{
		Mediator.apply(this, [UserListMediator.NAME, viewComponent] );
		if(Objs.extending) return;
		var userList = this._getUserList();
		userList.addEventListener( UserList.NEW, Relegate.create(this,this._onNew) );
		userList.addEventListener( UserList.DELETE, Relegate.create(this,this._onDelete) );
		userList.addEventListener( UserList.SELECT, Relegate.create(this,this._onSelect) );
		var userProxy = this._facade.retrieveProxy( UserProxy.NAME );
		userList.setUsers(userProxy.getUsers());
	}
	Objs.extend(UserListMediator,Mediator);
	Objs.implement(UserListMediator,IMediator);
	var o = UserListMediator.prototype;
	o._getUserList = function()
	{
		return this._viewComponent;
	}
	o._onNew = function( event )
	{
		var user = new UserVO();
		this.sendNotification( ApplicationFacade.NEW_USER, user );
	}
	o._onDelete = function( event )
	{
		var selectedUser = this._getUserList().selectedUser ;
		if(selectedUser == null)
			return;
		this.sendNotification
		(
			ApplicationFacade.DELETE_USER,
			this._getUserList().selectedUser 
		);
	}
	o._onSelect = function( event )
	{
		this.sendNotification
		(
			ApplicationFacade.USER_SELECTED,
			this._getUserList().selectedUser
		);
	}
	o.listNotificationInterests = function()
	{
		return [
			ApplicationFacade.CANCEL_SELECTED,
			ApplicationFacade.USER_UPDATED,
			ApplicationFacade.USER_ADDED,
			ApplicationFacade.USER_DELETED
		];
	}
	o.handleNotification = function( note )
	{
		var userList = this._getUserList();
		var userProxy = this._facade.retrieveProxy( UserProxy.NAME );
		switch( note.getName() )
		{
			case ApplicationFacade.CANCEL_SELECTED:
				userList.deSelect();
			break;
			case ApplicationFacade.USER_UPDATED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
			case ApplicationFacade.USER_ADDED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
			case ApplicationFacade.USER_DELETED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
		}
	}
}

