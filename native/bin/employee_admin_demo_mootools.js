var UIComponent = function(element , properties )
{
    this.initialized = false;
    this.element = null;
    this.initialize = function(element , properties )
    {
		this.element = $(element);
		if (!this.element)
			this.element = new Element(element, properties);
		else
			this.element.setProperties(properties);
		var e = this.element;
		for (var key in e)
		{
			var type = null;
			try
			{
				type = typeof e[key];
			}
			catch(e){}
			if (type == "function" && !this[key])
			{
				try
				{
					this[key] = e[key].bind(e);
				}
				catch(e){}
			}
		}
    };
    this.initializeChildren = function(){};
    this.childrenInitialized = function(){};
    this.initializationComplete = function()
    {
		this.initialized = true;
    };
    this.addChild = function(child  )
    {
		this.grab(child.element);
		child.initializeChildren();
		child.childrenInitialized();
		child.initializationComplete();
		child.fireEvent("added");
		return this;
    };
};
UIComponent = new Class(new UIComponent());


var ApplicationFacade = function()
{
	this.Extends = new Class(new Facade());
	this.startup = function( app )
	{
		this.sendNotification( ApplicationFacade.STARTUP, app );	
	}
	this.initializeController = function() 
	{
		this.parent();
		this.registerCommand( ApplicationFacade.STARTUP, StartupCommand );
		this.registerCommand( ApplicationFacade.DELETE_USER, DeleteUserCommand );
		this.registerCommand( ApplicationFacade.ADD_ROLE_RESULT, AddRoleResultCommand );
	}
}
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
	if (Facade.instance == undefined)
	{
		var classFactory = new Class(new ApplicationFacade());
		Facade.instance = new classFactory();
	}
	return Facade.instance;
};


var AddRoleResultCommand = function()
{
    this.Extends = SimpleCommand;
	this.execute = function( notification )
	{
		var result = notification.getBody();
		if( result == false )
			alert("Role already exists for this user!\nAdd User Role");
	}
}
AddRoleResultCommand = new Class(new AddRoleResultCommand());


var DeleteUserCommand = function()
{
    this.Extends = SimpleCommand;
	this.execute = function( notification )
	{
		var user = notification.getBody();
		var userProxy = this.facade.retrieveProxy( UserProxy.NAME );
		var roleProxy = this.facade.retrieveProxy( RoleProxy.NAME );
		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		this.sendNotification( ApplicationFacade.USER_DELETED );
	}
}
DeleteUserCommand = new Class(new DeleteUserCommand());


var PrepModelCommand = function()
{
    this.Extends = SimpleCommand;
	this.execute = function( note )
	{
		this.facade.registerProxy( new UserProxy() );
		this.facade.registerProxy( new RoleProxy() );
	}
}
PrepModelCommand = new Class(new PrepModelCommand());


var PrepViewCommand = function()
{
    this.Extends = SimpleCommand;
	this.execute = function( note )
	{
		var app = note.getBody();
		this.facade.registerMediator( new UserFormMediator( app.userForm ) );
		this.facade.registerMediator( new UserListMediator( app.userList ) );
		this.facade.registerMediator( new RolePanelMediator( app.rolePanel ) );
	}
}
PrepViewCommand = new Class(new PrepViewCommand());


var StartupCommand = function()
{
    this.Extends = MacroCommand;
	this.initializeMacroCommand = function( note )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
	}
}
StartupCommand = new Class(new StartupCommand());


var DeptEnum = function( value, ordinal )
{
	this.initialize = function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	}
	this.ordinal = null;
	this.value = null;
	this.equals = function( roleEnum )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
}
DeptEnum = new Class(new DeptEnum());
DeptEnum.NONE_SELECTED 	= new DeptEnum( "--None Selected--"	, -1 );
DeptEnum.ACCT 			= new DeptEnum( "Accounting"		, 0  );
DeptEnum.SALES 			= new DeptEnum( "Sales"				, 1  );
DeptEnum.PLANT 			= new DeptEnum( "Plant"				, 2  );
DeptEnum.SHIPPING 		= new DeptEnum( "Shipping"			, 3  );
DeptEnum.QC 			= new DeptEnum( "Quality Control"	, 4  );
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



var RoleEnum = function( value, ordinal )
{
	this.initialize = function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	}
	this.ordinal = null;
	this.value = null;
	this.equals = function( roleEnum )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
}
RoleEnum = new Class(new RoleEnum());
RoleEnum.NONE_SELECTED 	= new RoleEnum( "--None Selected--"		, -1 );
RoleEnum.ADMIN 			= new RoleEnum( "Administrator"			, 0  );
RoleEnum.ACCT_PAY 		= new RoleEnum( "Accounts Payable"		, 1  );
RoleEnum.ACCT_RCV 		= new RoleEnum( "Accounts Receivable"	, 2  );
RoleEnum.EMP_BENEFITS 	= new RoleEnum( "Employee Benefits"		, 3  );
RoleEnum.GEN_LEDGER 	= new RoleEnum( "General Ledger"		, 4  );
RoleEnum.PAYROLL 		= new RoleEnum( "Payroll"				, 5  );
RoleEnum.INVENTORY 		= new RoleEnum( "Inventory"				, 6  );
RoleEnum.PRODUCTION 	= new RoleEnum( "Production"			, 7  );
RoleEnum.QUALITY_CTL 	= new RoleEnum( "Quality Control" 		, 8  );
RoleEnum.SALES 			= new RoleEnum( "Sales"					, 9  );
RoleEnum.ORDERS 		= new RoleEnum( "Orders"				,10  );
RoleEnum.CUSTOMERS 		= new RoleEnum( "Customers"				,11  );
RoleEnum.SHIPPING 		= new RoleEnum( "Shipping"				,12  );
RoleEnum.RETURNS 		= new RoleEnum( "Returns"				,13  );
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


var RoleProxy = function()
{
    this.Extends = Proxy;
	this.initialize = function()
	{
		this.parent( RoleProxy.NAME, new Array() );
		this.addItem
		(
			new RoleVO
			(
				"lstooge",
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
				"cstooge",
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
				"mstooge",
				[
					RoleEnum.INVENTORY,
					RoleEnum.PRODUCTION,
					RoleEnum.SALES,
					RoleEnum.SHIPPING
				]
			)
		);
	}
	this.getRoles = function()
	{
		return this.data;
	}
	this.addItem = function( item )
	{
		this.getRoles().push( item );
	}
	this.deleteItem = function( item )
	{
		var roles = this.getRoles();
		for( var i=0; i<roles.length; i++)
		{
			if( roles[i].uname == item.uname )
			{
				roles.splice(i,1);
				break;
			}
		}	
	}
	this.doesUserHaveRole = function( user, role )
	{
		var roles = this.getRoles();
		var hasRole = false;
		for( var i=0; i<roles.length; i++)
		{ 
			if( roles[i].uname == user.uname )
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
	this.addRoleToUser = function( user, role )
	{
		var roles = this.getRoles();
		var result = false;
		if ( !this.doesUserHaveRole(user, role) )
		{
			for( var i=0; i<roles.length; i++)
			{ 
				if( roles[i].uname == user.uname )
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
	this.removeRoleFromUser = function( user, role )
	{
		var roles = this.getRoles();
		if( this.doesUserHaveRole( user, role ) )
		{
			for( var i=0; i<roles.length; i++)
			{ 
				if( roles[i].uname == user.uname )
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
	this.getUserRoles = function( uname )
	{
		var roles = this.getRoles();
		var userRoles = new Array();
		for( var i=0; i<roles.length; i++)
		{ 
			if( roles[i].uname == uname )
			{
				userRoles = roles[i].roles;
				break;
			}
		}
		return userRoles;
	}
}
RoleProxy = new Class(new RoleProxy());
RoleProxy.NAME = "RoleProxy";


var UserProxy = function()
{
    this.Extends = Proxy;
	this.initialize = function()
	{
		this.parent( UserProxy.NAME, new Array() );
		this.addItem( new UserVO("lstooge","Larry", 'Stooge', "larry@stooges.com", "ijk456" ,DeptEnum.ACCT) );
		this.addItem( new UserVO("cstooge","Curly", 'Stooge', "curly@stooges.com", "xyz987" ,DeptEnum.SALES) );
		this.addItem( new UserVO("mstooge","Moe", 'Stooge', "moe@stooges.com", "abc123" ,DeptEnum.PLANT) );
	}
	this.getUsers = function()
	{
		return this.data;
	}
	this.addItem = function( item )
	{
		this.getUsers().push( item );
	}
	this.updateItem = function( item )
	{
		var user = item;
		var users = this.getUsers();
		for( var i=0; i<users.length; i++ )
			if( users[i].uname == user.uname )
				users[i] = user;
	}
	this.deleteItem = function( item )
	{
		var user = item;
		var users = this.getUsers();
		for( var i=0; i<users.length; i++ )
			if( users[i].uname == user.uname )
				users.splice(i,1);
	}
}
UserProxy = new Class(new UserProxy());
UserProxy.NAME = "UserProxy";


var RoleVO = function(	uname,	roles )
{
	this.initialize = function(	uname,	roles )
	{
		if( uname != null )
			this.uname = uname;
		if( roles != null )
			this.roles = roles;
	}
	this.uname = "";
	this.roles = new Array();
}
RoleVO = new Class(new RoleVO());


var UserVO = function
(
	uname,
	fname,
	lname,
	email,
	password,
	department
)
{
	this.initialize = function
	(
		uname,
		fname,
		lname,
		email,
		password,
		department
	)
	{
		if( uname != null )
			this.uname = uname;
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
	this.uname = "";
	this.fname = "";
	this.lname = "";
	this.email = "";
	this.password = "";
	this.department = DeptEnum.NONE_SELECTED;
	this.getIsValid = function()
	{
		return this.uname != "" && this.password != "" && this.department != DeptEnum.NONE_SELECTED;
	}
	this.getGivenName = function()
	{
		return this.lname + ", " + this.fname;
	}
}
UserVO = new Class(new UserVO());


var Application = function()
{
    this.Extends = UIComponent;
	this.userForm = null;
	this.userList = null;
	this.rolePanel = null;
    this.facade = null;
    this.initialize = function()
    {
		this.facade = ApplicationFacade.getInstance();
		this.parent("application-div");
    }
    this.initializeChildren = function()
    {
		this.userList = new UserList();
		this.addChild( this.userList );
		this.userForm = new UserForm();
		this.addChild( this.userForm );
		this.rolePanel = new RolePanel();
		this.addChild( this.rolePanel );
    }
    this.initializationComplete = function()
    {
		this.facade.startup(this);
    }
}
Application = new Class(new Application());




var RolePanel = function()
{
    this.Extends = UIComponent;
	this.addRoleButton = null;
	this.removeRoleButton = null;
	this.roleList = null;
	this.userRoleList = null;
	this.user = null;
	this.selectedRole = null;
	this.mode = null;
	this.initialize = function()
	{
		this.parent("role-list-panel");
		this.addRoleButton_clickHandler = this.addRoleButton_clickHandler.bindWithEvent(this);
		this.removeRoleButton_clickHandler = this.removeRoleButton_clickHandler.bindWithEvent(this);
		this.roleList_changeHandler = this.roleList_changeHandler.bindWithEvent(this);
		this.userRoleList_changeHandler = this.userRoleList_changeHandler.bindWithEvent(this);
	}
    this.initializeChildren = function()
    {
		this.userRoleList = $("user-role-list");
		this.roleList = $("role-list");
		this.addRoleButton = $("add-role-button");
		this.removeRoleButton = $("remove-role-button");
    }
    this.childrenInitialized = function()
    {
		this.addRoleButton.addEvent( "click", this.addRoleButton_clickHandler );
		this.removeRoleButton.addEvent( "click", this.removeRoleButton_clickHandler );
		this.roleList.addEvent( "change", this.roleList_changeHandler );
		this.userRoleList.addEvent( "change", this.userRoleList_changeHandler );
    }
	this.initializationComplete = function()
	{
		this.fillRoleList();
		this.setEnabled(false);
	}
	this.fillRoleList = function( userRoles )
	{
		var roleEnumList = RoleEnum.getComboList();
		while( this.roleList.firstChild )
			this.roleList.removeChild( this.roleList.firstChild );
		for(var i=0; i<roleEnumList.length; i++)
		{
			var role = roleEnumList[i];
			var option = this.roleList.appendChild( document.createElement("OPTION") );
			option.associatedValue = role;
			option.text = role.value;
		}
	}
	this.setUserRoles = function( userRoles )
	{
		while( this.userRoleList.firstChild )
			this.userRoleList.removeChild( this.userRoleList.firstChild );
		if( userRoles == null )
			return;
		for( var i=0; i<userRoles.length; i++ )
		{
			var role = userRoles[i];
			var option = this.userRoleList.appendChild( document.createElement("OPTION") );
			option.associatedValue = role;
			option.text = role.value;
		}
	}
	this.setEnabled = function( isEnabled )
	{
		this.addRoleButton.disabled =
		this.removeRoleButton.disabled =
			!isEnabled;
		this.userRoleList.disabled =
		this.roleList.disabled =
			!isEnabled;
		if( !isEnabled )
			this.roleList.selectedIndex = -1;
	}
	this.setMode = function( mode )
	{
		switch( mode )
		{
			case RolePanel.ADD_MODE:
				this.addRoleButton.disabled = false;
				this.removeRoleButton.disabled = true;
			break;
			case RolePanel.REMOVE_MODE:
				this.addRoleButton.disabled = true;
				this.removeRoleButton.disabled = false;
				this.roleList.selectedIndex = 0;
			break;
			default:
				this.addRoleButton.disabled = true;
				this.removeRoleButton.disabled = true;
		}
	}
	this.clearForm = function()
	{
		this.user = null;
		this.setUserRoles(null);
		this.roleList.selectedIndex = 0;
	}
	this.addRoleButton_clickHandler = function()
	{
		this.fireEvent( RolePanel.ADD );
	}
	this.removeRoleButton_clickHandler = function()
	{
		this.fireEvent( RolePanel.REMOVE );
	}
	this.userRoleList_changeHandler = function()
	{
		this.roleList.selectedIndex = -1;
		this.selectedRole = this.userRoleList.options[ this.userRoleList.selectedIndex ].associatedValue;
		this.setMode( RolePanel.REMOVE_MODE );
	}
	this.roleList_changeHandler = function()
	{
		this.userRoleList.selectedIndex = -1;
		this.selectedRole = this.roleList[this.roleList.selectedIndex].associatedValue;
		if( this.selectedRole == RoleEnum.NONE_SELECTED )
			this.setMode( null );
		else
			this.setMode( RolePanel.ADD_MODE );
	}
}
RolePanel = new Class(new RolePanel());
RolePanel.REMOVE = "remove";
RolePanel.ADD_MODE = "addMode";
RolePanel.REMOVE_MODE = "removeMode";


var UserForm = function()
{
    this.Extends = UIComponent;
	this.uname = null;
	this.fname = null;
	this.lname = null;
	this.email = null;
	this.password = null;
	this.confirm = null;
	this.department = null;
	this.submitButton = null;
	this.cancelButton = null;
	this.user = null;
	this.mode = null;
	this.initialize = function()
	{
		this.parent("user-form-panel");
		this.submit_clickHandler = this.submit_clickHandler.bindWithEvent(this);
		this.cancel_clickHandler = this.cancel_clickHandler.bindWithEvent(this);
		this.field_focusHandler = this.field_focusHandler.bindWithEvent(this);
	}
    this.initializeChildren = function()
    {
		this.uname = $("uname");
		this.fname = $("fname");
		this.lname = $("lname");
		this.email = $("email");
		this.password = $("password");
		this.confirm = $("confirm");
		this.department = $("department");
		this.submitButton = $("submit-button");
		this.cancelButton = $("cancel-button");
    }
    this.childrenInitialized = function()
    {
		this.uname.addEvent( "focus", this.field_focusHandler );
		this.password.addEvent( "focus", this.field_focusHandler );
		this.confirm.addEvent( "focus", this.field_focusHandler );
		this.department.addEvent( "focus", this.field_focusHandler );
		this.submitButton.addEvent( "click", this.submit_clickHandler );
		this.cancelButton.addEvent( "click", this.cancel_clickHandler );
    }
	this.initializationComplete = function()
	{
		this.fillList();
		this.clearForm();
		this.setEnabled(false);
	}
	this.fillList = function()
	{
		var deptEnumList = DeptEnum.getComboList();
		while(this.department.firstChild)
			this.department.removeChild(this.department.firstChild);
		for(var i=0; i<deptEnumList.length; i++)
		{
			var option = this.department.appendChild(document.createElement("option"));
			option.value = deptEnumList[i].ordinal;
			option.text = deptEnumList[i].value;
		}
	}
	this.setFocus = function()
	{
		this.fname.focus();
	}
	this.setUser = function( user )
	{
		this.user = user;
		if(user == null)
			this.clearForm();
		else
		{
			this.uname.value = user.uname;
			this.fname.value = user.fname;
			this.lname.value = user.lname;
			this.email.value = user.email;
			this.password.value = user.password;
			this.confirm.value = user.password;
			for(var i=0; i<this.department.options.length; i++)
				if(this.department.options[i].value == user.department.ordinal)
					this.department.selectedIndex = i;
		}
	}
	this.getUser = function()
	{
		this.updateUser();
		return this.user;
	}
	this.updateUser = function()
	{
		this.user.uname = this.uname.value;
		this.user.fname = this.fname.value;
		this.user.lname = this.lname.value;
		this.user.email = this.email.value;
		this.user.password = this.password.value;
		var selected = this.department.selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		this.user.department = deptEnumList[selected];
	}
	this.clearForm = function()
	{
		this.uname.value = "";
		this.fname.value = "";
		this.lname.value = "";
		this.email.value = "";
		this.password.value = "";
		this.confirm.value = "";	
		this.department.selectedIndex = 0;
		this.setFieldError( 'uname', false );
		this.setFieldError( 'password', false );
		this.setFieldError( 'confirm', false );
		this.setFieldError( 'department', false );
	}
	this.setEnabled = function( isEnabled )
	{
		this.fname.disabled =
		this.lname.disabled =
		this.email.disabled =
		this.password.disabled =
		this.confirm.disabled =
		this.department.disabled =
		this.submitButton.disabled =
		this.cancelButton.disabled =
			!isEnabled;
		this.uname.disabled = !(isEnabled && this.mode == UserForm.MODE_ADD);
	}
	this.setMode = function( mode )
	{
		this.mode = mode;
		switch(mode)
		{
			case UserForm.MODE_ADD:
				this.submitButton.removeChild(this.submitButton.firstChild);
				this.submitButton.appendChild(document.createTextNode("Add User"));
			break;
			case UserForm.MODE_EDIT:
				this.submitButton.removeChild(this.submitButton.firstChild);
				this.submitButton.appendChild(document.createTextNode("Update Profile"));
				this.uname.disabled = true;
			break;
		}
	}
	this.submit_clickHandler = function()
	{
		if( this.getErrors() )
			return;
		this.updateUser();
		if( this.user.getIsValid() )
		{
			if( this.mode == UserForm.MODE_ADD )
				this.fireEvent( UserForm.ADD );
			else
				this.fireEvent( UserForm.UPDATE );
		}
	}
	this.getErrors = function()
	{
		var error = false;
		if( this.uname.value == "" )
			this.setFieldError( 'uname', error = true );
		else
			this.setFieldError( 'uname', false );
		if( this.password.value == "" )
			this.setFieldError( 'password', error = true );
		else
			this.setFieldError( 'password', false );
		if( this.password.value != "" && this.confirm.value != this.password.value )
			this.setFieldError( 'confirm', error = true );
		else
			this.setFieldError( 'confirm', false );
		var selected = this.department.selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		var department = deptEnumList[selected];
		if( department == DeptEnum.NONE_SELECTED )
			this.setFieldError( 'department', error = true );
		else
			this.setFieldError( 'department', false );
		return error;
	}
	this.cancel_clickHandler = function()
	{
		this.fireEvent( UserForm.CANCEL );
	}
	this.field_focusHandler = function( evt )
	{
		this.setFieldError( evt.target.id, false );
	}
	this.setFieldError = function( fieldName, error )
	{
		var label = this.getElements( 'label[for=' + fieldName + ']' )[0];
		var field = this.getElement( '#' + fieldName );
		if( error )
		{
			label.addClass( 'fieldError' );
			field.addClass( 'fieldError' );
		}
		else
		{
			label.removeClass( 'fieldError' );
			field.removeClass( 'fieldError' );
		}
	}
}
UserForm = new Class(new UserForm());
UserForm.ADD			= "add";
UserForm.UPDATE		= "update";
UserForm.CANCEL		= "cancel";
UserForm.MODE_ADD		= "modeAdd";
UserForm.MODE_EDIT	= "modeEdit";


var UserList = function()
{
    this.Extends = UIComponent;
	this.userList = null;
	this.newButton = null;
	this.deleteButton = null;
	this.selectedUser = null;
	this.users = null;
	this.initialize = function()
	{
		this.parent("user-list-panel");
		this.userList_changeHandler = this.userList_changeHandler.bindWithEvent(this);
		this.newButton_clickHandler = this.newButton_clickHandler.bindWithEvent(this);
		this.deleteButton_changeHandler = this.deleteButton_changeHandler.bindWithEvent(this);
	}
    this.initializeChildren = function()
    {
		var columnModel =
		[
			{
				header:"User Name",
				dataIndex:"uname",
				dataType:"string",
				width:100
			},
			{
				header:"First Name",
				dataIndex:"fname",
				dataType:"string",
				width:100
			},
			{
				header:"Last Name",
				dataIndex:"lname",
				dataType:"string",
				width:100
			},
			{
				header:"Email",
				dataIndex:"email",
				dataType:"string",
				width:122
			},
			{
				header:"Password",
				dataIndex:"password",
				dataType:"string",
				width:100
			},
			{
				header:"Department",
				dataIndex:"department",
				dataType:"string",
				width:100,
				labelFunction : function( data, row )
				{
					var user = data;
					return (user.department != DeptEnum.NONE_SELECTED ? user.department.value : "");
				}
			}
		];
		this.userList = new omniGrid
		(
			"user-list",
			{
				columnModel: columnModel,
				pagination:false,
				serverSort:false,
				showHeader: true,
				alternaterows: true,
				showHeader:true,
				sortHeader:true,
				resizeColumns:true,
				multipleSelection:false,
				width:630,
				height:190
			}
		);
		this.newButton = $("new-button");
		this.deleteButton = $("delete-button");
    };
    this.childrenInitialized = function()
    {
		this.userList.addEvent( "click", this.userList_changeHandler );
		this.newButton.addEvent( "click", this.newButton_clickHandler );
		this.deleteButton.addEvent( "click", this.deleteButton_changeHandler );
    };
	this.initializationComplete = function()
	{
		this.deSelect();
	}
	this.setUsers = function( userList )
	{
		this.users = userList;
		this.refresh();
	}
	this.refresh = function()
	{
		this.userList.removeAll();
		this.userList.setData
		(
			{
				data:this.users
			} 
		);
	}
	this.userList_changeHandler = function( evt )
	{
		this.selectedUser = evt.target.getDataByRow(evt.row);
		this.deleteButton.disabled = false;
		this.fireEvent( UserList.SELECT );
	}
	this.newButton_clickHandler = function()
	{
		this.deSelect();
		this.fireEvent( UserList.NEW );
	}
	this.deleteButton_changeHandler = function()
	{
		this.fireEvent( UserList.DELETE );
	}
	this.deSelect = function()
	{
		this.userList.unselectAll();
		this.selectedUser = null;
		this.deleteButton.disabled = true;
	}
}
UserList = new Class(new UserList());
UserList.NEW 		= "new";
UserList.DELETE 	= "delete";
UserList.SELECT 	= "select";


var RolePanelMediator = function( viewComponent )
{
	this.Extends = Mediator;
	this.roleProxy = null;		
	this.initialize = function( viewComponent )
	{
		this.parent( RolePanelMediator.NAME, viewComponent );
		this.onAddRole = this.onAddRole.bindWithEvent(this);
		this.onRemoveRole = this.onRemoveRole.bindWithEvent(this);
		var rolePanel = this.getRolePanel();
		rolePanel.addEvent( RolePanel.ADD, this.onAddRole );
		rolePanel.addEvent( RolePanel.REMOVE, this.onRemoveRole );
		this.roleProxy = this.facade.retrieveProxy( RoleProxy.NAME );
	}
	this.getRolePanel = function()
	{
		return this.viewComponent;
	}
	this.onAddRole = function()
	{
		this.roleProxy.addRoleToUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
		this.getRolePanel().setMode(null);
	}
	this.onRemoveRole = function()
	{
		this.roleProxy.removeRoleFromUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	}
	this.updateUserRoleList = function()
	{
		var userName = this.getRolePanel().user.uname;
		var userRoles = this.roleProxy.getUserRoles( userName );
		this.getRolePanel().setUserRoles( userRoles );
	}
	this.listNotificationInterests = function()
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
	this.handleNotification = function( note )
	{
		var rolePanel = this.getRolePanel();
		switch( note.getName() )
		{
			case ApplicationFacade.NEW_USER:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_ADDED:
				rolePanel.user = note.getBody();
				var roleVO = new RoleVO ( rolePanel.user.uname );
				this.roleProxy.addItem( roleVO );
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_UPDATED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_DELETED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.CANCEL_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;
			case ApplicationFacade.USER_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(true);
				rolePanel.setMode(null);
				rolePanel.user = note.getBody();
				this.updateUserRoleList();
			break;
			case ApplicationFacade.ADD_ROLE_RESULT:
				this.updateUserRoleList();
			break;
		}
	}
}
RolePanelMediator = new Class(new RolePanelMediator());
RolePanelMediator.NAME = "RolePanelMediator";


var UserFormMediator = function( viewComponent )
{
	this.Extends = Mediator;
	this.initialize = function( viewComponent )
	{
		this.parent( UserFormMediator.NAME, viewComponent );
		this.onAdd = this.onAdd.bindWithEvent(this);
		this.onUpdate = this.onUpdate.bindWithEvent(this);
		this.onCancel = this.onCancel.bindWithEvent(this);
		var userForm = this.getUserForm();
		userForm.addEvent( UserForm.ADD, this.onAdd );
		userForm.addEvent( UserForm.UPDATE, this.onUpdate );
		userForm.addEvent( UserForm.CANCEL, this.onCancel );
		this.userProxy = this.facade.retrieveProxy( UserProxy.NAME );
	}
	this.userProxy = null;
	this.getUserForm  = function()
	{
		return this.viewComponent;
	}
	this.onAdd = function()
	{
		var user = this.getUserForm().getUser();
		this.userProxy.addItem( user );
		this.sendNotification( ApplicationFacade.USER_ADDED, user );
		var userForm = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	this.onUpdate = function()
	{
		var user = this.getUserForm().getUser();
		this.userProxy.updateItem( user );
		this.sendNotification(  ApplicationFacade.USER_UPDATED, user );
		var userForm = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	this.onCancel = function()
	{
		this.sendNotification(  ApplicationFacade.CANCEL_SELECTED );
		var userForm = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}
	this.listNotificationInterests = function()
	{
		return [
			ApplicationFacade.NEW_USER,
			ApplicationFacade.USER_DELETED,
			ApplicationFacade.USER_SELECTED
		];
	}
	this.handleNotification = function( note )
	{
		var userForm = this.getUserForm();
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
				userForm.clearForm();
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_EDIT );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
		}
	}
}
UserFormMediator = new Class(new UserFormMediator());
UserFormMediator.NAME = "UserFormMediator";


var UserListMediator = function( viewComponent )
{
	this.Extends = Mediator;
	this.initialize = function( viewComponent )
	{
		this.parent( UserListMediator.NAME, viewComponent );
		this.onNew = this.onNew.bindWithEvent(this);
		this.onDelete = this.onDelete.bindWithEvent(this);
		this.onSelect = this.onSelect.bindWithEvent(this);
		var userList = this.getUserList();
		userList.addEvent( UserList.NEW, this.onNew );
		userList.addEvent( UserList.DELETE, this.onDelete );
		userList.addEvent( UserList.SELECT, this.onSelect );
		var userProxy = this.facade.retrieveProxy( UserProxy.NAME );
		userList.setUsers(userProxy.getUsers());
	}
	this.getUserList = function()
	{
		return this.viewComponent;
	}
	this.onNew = function()
	{
		var user = new UserVO();
		this.sendNotification( ApplicationFacade.NEW_USER, user );
	}
	this.onDelete = function()
	{
		var selectedUser = this.getUserList().selectedUser ;
		if(selectedUser == null)
			return;
		this.sendNotification
		(
			ApplicationFacade.DELETE_USER,
			this.getUserList().selectedUser 
		);
	}
	this.onSelect = function()
	{
		this.sendNotification
		(
			ApplicationFacade.USER_SELECTED,
			this.getUserList().selectedUser
		);
	}
	this.listNotificationInterests = function()
	{
		return [
			ApplicationFacade.CANCEL_SELECTED,
			ApplicationFacade.USER_UPDATED,
			ApplicationFacade.USER_ADDED,
			ApplicationFacade.USER_DELETED
		];
	}
	this.handleNotification = function( note )
	{
		var userList = this.getUserList();
		var userProxy = this.facade.retrieveProxy( UserProxy.NAME );
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
UserListMediator = new Class(new UserListMediator());

