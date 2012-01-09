/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Defines <code>Mediator</code> names for the application.
 */
var MediatorNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.MediatorNames",{});

MediatorNames.USER_FORM_MEDIATOR = "userFormMediator";
MediatorNames.USER_LIST_MEDIATOR = "userListMediator";
MediatorNames.ROLE_PANEL_MEDIATOR = "rolePanelMediator";
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Defines <code>Notification</code> names for the application.
 */
var NotificationNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.NotificationNames",{});

NotificationNames.STARTUP = "startup";
NotificationNames.NEW_USER = "newUser"
NotificationNames.DELETE_USER = "deleteUser";
NotificationNames.CANCEL_SELECTED = "cancelSelected";
NotificationNames.USER_SELECTED = "userSelected";
NotificationNames.USER_ADDED = "userAdded";
NotificationNames.USER_UPDATED = "userUpdated";
NotificationNames.USER_DELETED = "userDeleted";
NotificationNames.ADD_ROLE = "addRole";
NotificationNames.ADD_ROLE_RESULT = "addRoleResult";
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Defines <code>Proxy</code> names for the application.
 */
var ProxyNames = Objs("org.puremvc.js.demos.objs.employeeadmin.abc.ProxyNames",{});

ProxyNames.ROLE_PROXY = "roleProxy";
ProxyNames.USER_PROXY = "userProxy";
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Command used to delete a user from the main users list.
 *
 * @see org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.model.RoleProxy RoleProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * 
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var DeleteUserCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.DeleteUserCommand",
	SimpleCommand,
{
	/**
	 * @override
	 */
	execute: function( note )
	{
		var user/*UserVO*/ = note.getBody();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );
	
		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		
		this.sendNotification( NotificationNames.USER_DELETED );
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Configure and initialize model for the application.
 *
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 *
 * @constructor
 */
var PrepModelCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.PrepModelCommand",
	SimpleCommand,
{	
	/**
	 * @override
	 */
	execute: function( note )
	{
		this.facade.registerProxy( new UserProxy( ProxyNames.USER_PROXY, this.generateUsers() ) );
		this.facade.registerProxy( new RoleProxy( ProxyNames.ROLE_PROXY , this.generateRoles() ) );
	},
	
	/**
	 * Generates and returns a dummy users list.
	 * 
	 * @return {Array}
	 * 		The generated dummy users list.	
	 */
	generateUsers: function()
	{
		var user/*UserVO*/;
		var users/*Array*/ = new Array();
		
		user = new UserVO();
		user.uname = "lstooge";
		user.fname = "Larry";
		user.lname = "Stooge";
		user.email = "larry@stooges.com";
		user.password = "ijk456";
		user.department = DeptEnum.ACCT;
		users.push(user);
		 
		user = new UserVO();
		user.uname = "cstooge"; 
		user.fname = "Curly";
		user.lname = "Stooge";
		user.email = "curly@stooges.com";
		user.password = "xyz987";
		user.department = DeptEnum.SALES;
		users.push(user);
		
		user = new UserVO();
		user.uname = "mstooge";
		user.fname = "Moe";
		user.lname = "Stooge";
		user.email = "moe@stooges.com";
		user.password = "abc123";
		user.department = DeptEnum.PLANT;
		users.push(user);
		
		return users
	},
	
	/**
	 * Generates and returns a dummy roles list.
	 * 
	 * @return {Array}
	 * 		The generated dummy roles list.	
	 */
	generateRoles: function()
	{
		var role/*RoleVO*/;
		var roles/*Array*/ = new Array();
		
		role = new RoleVO();
		role.uname = "lstooge";
		role.roles = [ RoleEnum.PAYROLL, RoleEnum.EMP_BENEFITS	];
		roles.push(role);
			
		role = new RoleVO();
		role.uname = "cstooge";
		role.roles = [ RoleEnum.ACCT_PAY, RoleEnum.ACCT_RCV, RoleEnum.GEN_LEDGER ];
		roles.push(role);
			
		role = new RoleVO();
		role.uname = "mstooge";
		role.roles = [ RoleEnum.INVENTORY, RoleEnum.PRODUCTION, RoleEnum.SALES, RoleEnum.SHIPPING ];
		roles.push(role);
		
		return roles
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Configure and initialize view for the application.
 *
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 *
 * @constructor
 */
var PrepViewCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.PrepViewCommand",
	SimpleCommand,
{	
	/**
	 * @override
	 */
	execute: function( note )
	{
		/*
		 * View Components initialization
		 */
		var userForm/*UserForm*/ = new UserForm();
		var userList/*UserList*/ = new UserList();
		var rolePanel/*RolePanel*/ = new RolePanel();
		
		/*
		 * Mediator initialization
		 */
		var userListMediator/*UserListMediator*/ = new UserListMediator( MediatorNames.USER_LIST_MEDIATOR, userList );
		var userFormMediator/*UserFormMediator*/ = new UserFormMediator( MediatorNames.USER_FORM_MEDIATOR, userForm );
		var rolePanelMediator/*RolePanelMediator*/ = new RolePanelMediator( MediatorNames.ROLE_PANEL_MEDIATOR, rolePanel );
	
		/*
		 * PureMVC mediators registration
		 */
		this.facade.registerMediator( userFormMediator );
		this.facade.registerMediator( userListMediator );
		this.facade.registerMediator( rolePanelMediator );
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Start the application.
 *
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 *
 * @constructor
 */
var StartupCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand",
	MacroCommand,
{
	/**
	 * @override
	 * 
	 * Add the Subcommands to startup the PureMVC apparatus.
	 * 
	 * Generally, it is best to prep the Model (mostly registering 
	 * proxies)followed by preparation of the View (mostly registering 
	 * Mediators).
	 * 
	 * @param {Notification} note
	 * 		The <code>Notification</code> object to be passed to each entry
	 * 		of <i>subCommands</i> list.
	 */
	initializeMacroCommand: function( note )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * An enumeration of department items.
 */
var DeptEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum",
{
	/**
	 * @construct
	 * Initialize a <code>DeptEnum</code> instance.
	 * 
	 * @param {String} value
	 * 		Value shared by each enum item.
	 * 
	 * @param {Number} ordinal
	 * 		Index of the item in the list.	
	 */
	initialize: function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	},
	
	/**
	 * The <code>DeptEnum</code> entry identifier.
	 * 
	 * @type {Number}
	 */
	ordinal: null,
	
	/**
	 * The <code>DeptEnum</code> entry value.
	 * 
	 * @type {String}
	 */
	value: null,
	
	/**
	 * Compare a <code>DeptEnum</code> object to the current one to check for their
	 * equality.
	 * 
	 * @param {DeptEnum} deptEnum
	 * 		The <code>DeptEnum</code> item to compare to the current.
	 * 
	 * @return {Boolean}
	 * 		The compared <code>DeptEnum</code> is equal to the current.
	 */
	equals: function( deptEnum )
	{
		return ( this.ordinal == deptEnum.ordinal && this.value == deptEnum.value );
	}
});

DeptEnum.NONE_SELECTED/*DeptEnum*/ 	= new DeptEnum( "Select a department", -1 );
DeptEnum.ACCT/*DeptEnum*/ 			= new DeptEnum( "Accounting", 0  );
DeptEnum.SALES/*DeptEnum*/ 			= new DeptEnum( "Sales"	, 1  );
DeptEnum.PLANT/*DeptEnum*/ 			= new DeptEnum( "Plant", 2  );
DeptEnum.SHIPPING/*DeptEnum*/ 		= new DeptEnum( "Shipping", 3  );
DeptEnum.QC/*DeptEnum*/ 			= new DeptEnum( "Quality Control", 4  );

/**
 * Returns the department list excluding the
 * <code>DeptEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list excluding the <code>DeptEnum.NONE_SELECTED</code>
 * 		item.
 */
DeptEnum.getList = function()
{
	return [
		DeptEnum.ACCT, 
		DeptEnum.SALES, 
		DeptEnum.PLANT
	];
}

/**
 * Returns the department list including the
 * <code>DeptEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list including the <code>DeptEnum.NONE_SELECTED</code>
 * 		item.
 */
DeptEnum.getComboList = function()
{
	var cList/*Array*/ = DeptEnum.getList();
	cList.unshift( DeptEnum.NONE_SELECTED );
	return cList;
}
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * An enumeration of role items.
 */
var RoleEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.RoleEnum",
{
	/**
	 * The <code>RoleEnum</code> entry identifier.
	 * 
	 * @type {Number}
	 */
	ordinal: null,
	
	
	/**
	 * The <code>RoleEnum</code> entry value.
	 * 
	 * @type {String}
	 */
	value: null,
	
	/**
	 * @construct
	 * Initialize a <code>RoleEnum</code> instance.
	 * 
	 * @param {String} value
	 * 		Value shared by each enum item.
	 * 
	 * @param {Number} ordinal
	 * 		Index of the item in the list.	
	 */
	initialize: function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	},
	
	/**
	 * Compare a <code>RoleEnum</code> object to the current one to check for their
	 * equality.
	 * 
	 * @param {RoleEnum} roleEnum
	 * 		The <code>RoleEnum</code> item to compare to the current.
	 * 
	 * @return {Boolean}
	 * 		The compared <code>RoleEnum</code> is equal to the current.
	 */
	equals: function( roleEnum/*RoleEnum*/ )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
});

RoleEnum.NONE_SELECTED/*RoleEnum*/ 	= new RoleEnum( "Select a role", -1 );
RoleEnum.ADMIN/*RoleEnum*/ 			= new RoleEnum( "Administrator", 0  );
RoleEnum.ACCT_PAY/*RoleEnum*/ 		= new RoleEnum( "Accounts Payable", 1  );
RoleEnum.ACCT_RCV/*RoleEnum*/ 		= new RoleEnum( "Accounts Receivable", 2  );
RoleEnum.EMP_BENEFITS/*RoleEnum*/ 	= new RoleEnum( "Employee Benefits", 3  );
RoleEnum.GEN_LEDGER/*RoleEnum*/ 	= new RoleEnum( "General Ledger", 4  );
RoleEnum.PAYROLL/*RoleEnum*/ 		= new RoleEnum( "Payroll", 5  );
RoleEnum.INVENTORY/*RoleEnum*/ 		= new RoleEnum( "Inventory", 6  );
RoleEnum.PRODUCTION/*RoleEnum*/ 	= new RoleEnum( "Production", 7  );
RoleEnum.QUALITY_CTL/*RoleEnum*/ 	= new RoleEnum( "Quality Control", 8  );
RoleEnum.SALES/*RoleEnum*/ 			= new RoleEnum( "Sales", 9  );
RoleEnum.ORDERS/*RoleEnum*/ 		= new RoleEnum( "Orders",10  );
RoleEnum.CUSTOMERS/*RoleEnum*/ 		= new RoleEnum( "Customers",11  );
RoleEnum.SHIPPING/*RoleEnum*/ 		= new RoleEnum( "Shipping",12  );
RoleEnum.RETURNS/*RoleEnum*/ 		= new RoleEnum( "Returns",13  );


/**
 * Returns the roles list excluding the <code>RoleEnum.NONE_SELECTED</code>
 * item used to fill the combo box.
 * 
 * @return {Array}
 * 		The roles list excluding the <code>RoleEnum.NONE_SELECTED</code>
 * 		item.
 */
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

/**
 * Returns the roles list including the
 * <code>RoleEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list including the <code>RoleEnum.NONE_SELECTED</code>
 * 		item.
 */
RoleEnum.getComboList = function()
{
	var cList/*Array*/ = RoleEnum.getList();
	cList.unshift( RoleEnum.NONE_SELECTED );
	return cList;
}

/**
 * Returns the <code>RoleEnum</code> with this ordinal value.
 * 
 * @param {Number} ordinal
 * 		The ordinal value to search for in the list.
 * 
 * @return {RoleEnum}
 * 		The <code>RoleEnum</code> with this ordinal value or <code>null</code>
 * 		if not found.
 */
RoleEnum.getItem = function( ordinal )
{
	var list/*Array*/ = RoleEnum.getList();
	for( var i/*Number*/=0; i<list.length; i++ )
		if( RoleEnum[list[i]].ordinal == ordinal )
			return RoleEnum[list[i]];
	
	return null;
}
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The value object in charge of transporting the data to describe each user
 * roles.
 */
var RoleVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.RoleVO",
{
	/**
	 * Unique name of the user to whom is associated the role.
	 * 
	 * @type {String}
	 */
	uname: "",
	
	/**
	 * The list of roles associated to the user.
	 * 
	 * @type {Array}
	 */	
	roles: []
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * The value object in charge of transporting the data to describe each user of
 * the application.
 * 
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum DeptEnum
 */
var UserVO = Objs("org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO",
{
	/** 
	 * Unique name of the user.
	 * 
	 * @type {String}
	 */
	uname: "",
	
	/** 
	 * First name of the user.
	 * 
	 * @type {String}
	 */
	fname: "",
	
	/**  		
	 * Last name of the user.
	 * 
	 * @type {String}
	 */
	lname: "",
	
	/** 		
	 * E-mail name of the user.
	 * 
	 * @type {String}
	 */
	email: "",
	
	/** 		
	 * Password name of the user.
	 * 
	 * @type {String}
	 */
	password: "",
	
	/**		
	 * The <code>DeptEnum</code> item associated to the user.
	 * 
	 * @type {DeptEnum}
	 */
	department: DeptEnum.NONE_SELECTED,
	
	/**
	 * Indicate if the data shared by the value object are valid.
	 * 
	 * @return {Boolean}
	 * 		The data shared by the value object are valid.
	 */
	getIsValid: function()
	{
		return 	this.uname != "" 
				&&
				this.password != ""
				&&
				this.department != DeptEnum.NONE_SELECTED
		;
	},
	
	/**
	 * Return the complete name for this user.
	 * 
	 * @return {Boolean}
	 * 		The complete name for this user.
	 */
	getGivenName: function()
	{
		return this.lname + ", " + this.fname;
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * PureMVC <code>Proxy</code> class object used to control the user roles list
 * of the application. 
 * 
 * @see org.puremvc.js.patterns.proxy.Proxy Proxy
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.RoleVO RoleVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.RoleEnum RoleEnum
 * @see org.puremvc.js.demos.objs.employeeadmin.ApplicationFacade ApplicationFacade
 * 
 * @extends org.puremvc.js.patterns.proxy.Proxy Proxy
 * 
 * @constructor
 */
var RoleProxy = Objs("org.puremvc.js.demos.objs.employeeadmin.model.RoleProxy",
	Proxy,
	{
	
		/**
		 * @override
		 *
		 * Initialize a <code>RoleProxy</code> instance.
		 * 
		 * @param {String} name
		 * 		Identifier of the <code>Proxy</code> object in the PureMVC framework.
		 * 
		 * @param {Array} roles	
		 * 		The list of user roles <code>RoleVO</code> object controlled by the
		 * 		<code>Proxy</code>.
		 */
		initialize: function( name, roles )
		{
			Proxy.prototype.initialize.call( this, name, roles );
		
			return this;
		},
		
		/**
		 * Get the role list.
		 * 
		 * @return {Array}
		 * 		The role list.
		 */
		getRoles: function()
		{
			return this.data;
		},
		
		/**
		 * Add a role to the list.
		 * 
		 * @param {RoleVO} role
		 * 		The role to add.
		 */ 
		addItem: function( role )
		{
			this.getRoles().push( role );
		},
		
		/**
		 * Remove a role from the list. 
		 * 
		 * @param {RoleVO} role
		 * 		The role to remove.
		 */ 
		deleteItem: function( item )
		{
			var roles = this.getRoles();
			for( var i/*Number*/=0; i<roles.length; i++)
			{
				if( roles[i].uname == item.uname )
				{
					roles.splice(i,1);
					break;
				}
			}	
		},
		
		/**
		 * Determine if the user has a given role.
		 * 
		 * @param {UserVO} user
		 * 		The user for whom to search for the role.
		 * 
		 * @param {RoleEnum} role
		 * 		The role to search for.
		 * 
		 * @return {Boolean}
		 * 		The user has the given role.
		 */ 
		doesUserHaveRole: function( user, role )
		{
			var roles/*Array*/ = this.getRoles();
			var hasRole/*Boolean*/ = false;
			for( var i/*Number*/=0; i<roles.length; i++)
			{ 
				if( roles[i].uname == user.uname )
				{
					var userRoles/*Array*/ = roles[i].roles;
					for( var j/*Number*/=0; j<userRoles.length; j++ )
					{
						var roleEnum/*RoleEnum*/ = userRoles[j];
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
		},
		
		/**
		 * Add a role to a user.
		 * 
		 * @param {UserVO} user
		 * 		The user to whom to add a role.
		 * 
		 * @param {RoleEnum} role
		 * 		The role to add.
		 */ 
		addRoleToUser: function( user, role )
		{
			var roles/*Array*/ = this.getRoles();
			var result/*Boolean*/ = false;
			if ( !this.doesUserHaveRole(user, role) )
			{
				for( var i/*Number*/=0; i<roles.length; i++)
				{ 
					if( roles[i].uname == user.uname )
					{
						var userRoles/*Array*/ = roles[i].roles;
						userRoles.push( role );
						result = true;
						break;
					}
				}
			}
		},
		
		/**
		 * Remove a role from a user.
		 * 
		 * @param {UserVO} user
		 * 		The user to whom remove the role.
		 * 
		 * @param {RoleEnum} role
		 * 		The role to remove.
		 */
		removeRoleFromUser: function( user, role )
		{
			var roles/*Array*/ = this.getRoles();
			if( this.doesUserHaveRole( user, role ) )
			{
				for( var i/*Number*/=0; i<roles.length; i++)
				{ 
					if( roles[i].uname == user.uname )
					{
						var userRoles/*Array*/ = roles[i].roles;
						for( var j/*Number*/=0; j<userRoles.length; j++)
						{
							var roleEnum/*RoleEnum*/ = userRoles[j];
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
		},
		
		/**
		 * Get a user's roles.
		 * 
		 * @param {String} uname
		 * 		The user unique name.
		 * 
		 * @return {Array}
		 * 		The user's role list.
		 */ 
		getUserRoles: function( uname )
		{
			var roles/*Array*/ = this.getRoles();
			var userRoles/*Array*/ = new Array();
			for( var i/*Number*/=0; i<roles.length; i++)
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
);
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * PureMVC <code>Proxy</code> class object used to control the user list of the
 * application. 
 * 
 * @see org.puremvc.js.patterns.proxy.Proxy Proxy
 * @see org.puremvc.js.demos.objs.employeeadmin.abc.ProxyNames ProxyNames
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum DeptEnum
 * 
 * @extends org.puremvc.js.patterns.proxy.Proxy Proxy
 * 
 * @constructor
 */
var UserProxy = Objs("org.puremvc.js.demos.objs.employeeadmin.model.UserProxy",
	Proxy,
	{
		
		/**
		 * @override
		 *
		 * Initialize a <code>UserProxy</code> instance.
		 * 
		 * @param {String} name
		 * 		Identifier of the <code>Proxy</code> object in the PureMVC framework.
		 * 
		 * @param {Array} users	
		 * 		The list of users controlled by the <code>Proxy</code>.
		 */
		initialize: function( name, users )
		{
			Proxy.prototype.initialize.call( this, name, users );
		},
		
		/**
		 * Return the users list controlled by the <code>Proxy</code>.
		 */
		getUsers: function()
		{
			return this.data;
		},
		
		/**
		 * Add a user to the list.
		 * 
		 * @param {UserVO} user
		 */ 
		addItem: function( user )
		{
			this.getUsers().push( user );
		},
		
		/**
		 * Return a user given its user name.
		 * 
		 * @param {String} uname
		 * 		The user name of the user to find.
		 * 
		 * @return {UserVO}
		 * 		The user with the given user name or null if none exists with
		 * 		this user name.
		 */
		getUser: function( uname )
		{
			var users/*Array*/ = this.getUsers();
			for( var i/*Number*/=0; i<users.length; i++ )
				if( users[i].uname == uname )
					return users[i];
					
			return null; 
		},
		
		/**
		 * Update a user informations.
		 * 
		 * @param {UserVO} user
		 * 		The user to update.
		 */ 
		updateItem: function( user )
		{
			var users/*Array*/ = this.getUsers();
			for( var i/*Number*/=0; i<users.length; i++ )
				if( users[i].uname == user.uname )
					users[i] = user;
		},
		
		/**
		 * Remove a user from the list.
		 * 
		 * @param {UserVO} user
		 * 		The user to remove.
		 */ 
		deleteItem: function( user )
		{
			var users/*Array*/ = this.getUsers();
			for( var i/*Number*/=0; i<users.length; i++ )
				if( users[i].uname == user.uname )
					users.splice(i,1);
		}
	}
);
/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * A base class used for UI components of the application.
 * 
 * <P>
 * It mainly adds a basic UiComponent implementation to make UI components
 * listenable from the <code>Mediator</code>s. Here to simplify the demo we
 * don't use a real <code>Event</code> class. Implementers and listeners are
 * responsible for the anonymous events object they dispatch and receive.
 */
var UiComponent = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent",
{
	/**
	 * @construct
	 * Initialize a <code>UiComponent</code> instance.
	 */
	initialize: function()
	{
		this.listenerMap = new Object();
	},
	
	/**
	 * A map of <code>UiComponent.listenerDescriptor</code> objects.
	 * 
	 * @type {Object}
	 * @private
	 */
	listenerMap: null,
	
	/**
	* Dispatches an event into the event flow.
	* 
	* @param {String} type
	* 		The type of the event to dispatch.
	* 
	* @param {Object} properties
	* 		An optional anonymous object to send to listeners of the event when it
	* 		is dispatched.
	*/
	dispatchEvent: function( type, properties )
	{
		if( typeof type == 'undefined' )
			return;
			
		if( typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == 'undefined' )
			return;
	
		var queue/*Array*/ = this.listenerMap[UiComponent.QUEUE_PATTERN + type].slice(0);
		
		var props/*Object*/ = properties || {};
		var len/*Number*/ = queue.length;
		for(var i/*Number*/=0; i<len; i++)
		{
			var listenerDescriptor/*UiComponent.ListenerDescriptor*/ = queue[i];
	
			if( typeof listenerDescriptor.listener == 'function' )
			{
				if( typeof listenerDescriptor.context != "undefined" )
					listenerDescriptor.listener.call( listenerDescriptor.context, props );
				else
					listenerDescriptor.listener.call( this, event, props );
			}
		}
	},
	
	/**
	* Add an event listener so that the listener receives notification of an event.
	 *  
	 * @param {String} type
	 * 		Type of the event to add.
	 * 
	 * @param {Function} listener
	 * 		The listener method of the event to add.
	 * 
	 * @param {Object} context
	 * 		The context attached for the listener method of the event to remove.
	 */
	addEventListener: function
	(
		type/*String*/,
		listener/*Function*/,
		context/*Object*/
	)
	{
		if( typeof type == "undefined" )
			return;
	
		if( typeof listener == "undefined" )
			return;
			
		var newListener/*UiComponent.ListenerDescriptor*/ = new UiComponent.ListenerDescriptor( listener, context );
	
		var queue/*Object*/;
		if( typeof this.listenerMap[ UiComponent.QUEUE_PATTERN + type ] == "undefined" )
			queue = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ] = new Array();
		else
			queue = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ];
	
		var len/*Number*/ = queue.length;
		for(var i/*Number*/=0; i<len; i++ )
		{
			var listenerDescriptor/*UiComponent.ListenerDescriptor*/ = queue[i];
			if( listenerDescriptor.equals( newListener ) )
				return;
		}
	
		queue.push(newListener);
	},
	
	/**
	 * Remove an event listener so that the listener stops receiving notification
	 * of an event.
	 *  
	 * @param {String} type
	 * 		Type of the event to remove.
	 * 
	 * @param {Function} listener
	 * 		The listener method of the event to remove.
	 * 
	 * @param {Object} context
	 * 		The context attached for the listener method of the event to remove.
	 */
	removeEventListener: function
	(
		type/*String*/,
		listener/*Function*/,
		context/*Object*/
	)
	{
		if( typeof type == "undefined" )
			return;
	
		if( typeof listener == "undefined" )
			return;
	
		if( typeof this.listenerMap[UiComponent.QUEUE_PATTERN + type] == "undefined" )
			return;
			
		var queue/*Object*/ = this.listenerMap[ UiComponent.QUEUE_PATTERN + type ];
		var len/*Number*/ = queue.length;
		for(var i/*Number*/=0; i<len; i++)
			if( UiComponent.ListenerDescriptor.equals( new UiComponent.ListenerDescriptor( listener, context ) ) )
			{
				queue.splice(i,1);
				return;
			}
	}
});

/**
 * @class
 * @private
 * The event object dispatched by the <code>UiComponent</code> class to its
 * event listeners.
 */
UiComponent.Event = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event",
{
	/**
	 * Type of the dispatched event.
	 * 
	 * @type {String}
	 */
	type: null,
	
	/**
	 * Properties that follow the dispatched event.
	 * 
	 * @type {Object}	
	 */
	properties: null

});

/**
 * @private
 * 
 * A descriptor object used by the <code>UiComponent.listenerMap</code>
 * to identify each event listener.
 * 
 * <P>
 * It is intentionally not declared on prototype as it built a kind of inner
 * class for JavaScript.
 */
UiComponent.ListenerDescriptor = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent.Event",
{
	/**
	 * @construct
	 * Initialize a <code>UiComponent.ListenerDescriptor</code> instance.
	 * 
	 * @param {Function} listener
	 * 		The listener method to call.
	 * 
	 * @param {Function} listener
	 * 		The listener context on which to call the method.
	 */	
	initialize: function( listener, context )
	{
		this.listener = listener;
		this.context = context;
	}
});

/* 
 * Private statics
 */
	
/**
 * @private
 * 
 * A prefix used on map item names to prevent name conflicts.
 * 
 * @type {String}
 * @constant
 */
UiComponent.QUEUE_PATTERN = '@_@';

/**
 * @private
 * 
 * Compare two <code>UiComponent.ListenerDescriptor</code>s to determine if
 * they target the exact same event listener.
 * 
 * @param {UiComponent.ListenerDescriptor} compared
 * 		The descriptor that will be compared to the current.
 * 
 * @return {Boolean}
 * 		The two compared listeners are equals.
 */
UiComponent.equals = function( compared )
{
	if( compared.listener == this.listener )
	{
		if( typeof compared.context != "undefined" )
		{
			if( compared.context == null && this.context == null )
				return true;
				
			if( compared.context == this.context )
				return true;
		}
	}

	return false;
}
/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * The UI component in charge of the <em>role panel</em>.
 * 
 * @extends org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent UiComponent
 */
var RolePanel = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePanel",
	UiComponent,
{
	/** 
	 * Currently selected user.
	 * 
	 * @private
	 * @type {UserVO}
	 */
	user: null,
	
	/**
	 * The user roles list.
	 * 
	 * @private
	 * @type {Array}
	 */
	userRoles: null,

	/**
	 * Currently selected role.
	 * 
	 * @private
	 * @type {UserRole}
	 */
	selectedRole: null,

	/**
	 * The add or remove role mode.
	 */
	mode: null,
			
	/**
	 * The role panel HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	rolePanel: null,
			
	/**
	 * The full role list HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	roleList: null,
	
	/**
	 * The user role datagrid HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	userRoleList: null,
	
	/**
	 * The add role button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	addRoleButton: null,
	
	/**
	 * The remove role button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	removeRoleButton: null,

	/**
	 * @construct
	 * @override
	 * 
	 * Initialize a <code>UserList</code> instance.
	 */
	initialize: function()
	{
		RolePanel.$super.initialize.call( this );
		
		this.initializeChildren();
		this.configureListeners();
		
		this.fillRoleList();
		this.setEnabled(false);
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren: function()
    {
		this.rolePanel = $(".role-panel");
		
		this.userRoleList = this.rolePanel.find("#user-role-list");
		this.userRoleList.jqGrid
		(
			{
				datatype: "local",
				width: 280,
				height: 170,
				colNames:['Roles'],
			   	colModel:
				[
			   		{name:'value', index:'value' }					
			   	]
			}
		);

		this.roleList = this.rolePanel.find(".role-list");
		this.addRoleButton = this.rolePanel.find(".add-role-button").button();
		this.removeRoleButton = this.rolePanel.find(".remove-role-button").button();
    },

    /**
     * Configure event listeners registration.
     */
    configureListeners: function()
    {
		var that/*RolePanel*/ = this; //Needed to delegate events to this instance.
		this.addRoleButton.click( function(evt){ that.addRoleButton_clickHandler() } );
		this.removeRoleButton.click( function(evt){ that.removeRoleButton_clickHandler() } );
		this.roleList.change( function(evt){ that.roleList_changeHandler() } );
		this.userRoleList.jqGrid( 'setGridParam', { onSelectRow: function( id ){ that.userRoleList_changeHandler( id ); } } );
    },

	/**
	 * Add items from <code>RoleEnum</code> to the <code>roleList</code>
	 * component.
	 */
	fillRoleList: function()
	{
		var roleEnumList/*Array*/ = RoleEnum.getComboList();

		/*First clear all*/
		this.roleList.empty();

		var htmlList/*String*/ = "";
		for(var i/*Number*/=0; i<roleEnumList.length; i++)
		{		
			var role/*RoleVO*/ = roleEnumList[i];
			
			/*
			 * An item not having a value in jQuery will be excluded from the
			 * pop-up menu.
			 */ 
			var valueAttr/*String*/ = 'value="' + role.ordinal + '"';
			var selectedAttr/*String*/ = i == 0 ? "selected" : "";
			htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + role.value + '</option>';
		}
	
		this.roleList.html(htmlList);
	},

	/**
	 * Set the displayed user roles list.
	 * 
	 * @param {Array} userRoles
	 * 		The role list associated to the currently selected user.
	 */
	setUserRoles: function( userRoles )
	{
		// First clear all
		this.userRoleList.jqGrid( 'clearGridData' );

		if( !userRoles )
			return;
			
		this.userRoles = userRoles;

		// Fill the data-grid
		for(var i/*Number*/=0; i<userRoles.length; i++)
		{
			var role/*RoleVO*/ = userRoles[i];
			var rowData/*Object*/ = role;

			this.userRoleList.jqGrid( 'addRowData', i+1, rowData );
		}	
	},
	
	/**
	 * Get the selected user for whom roles list is displayed.
	 * 
	 * @return {User}
	 * 		The selected user for whom roles list is displayed.
	 */
	getUser: function()
	{
		return this.user;
	},
	
	/**
	 * Get the selected role in the remove/add combobox if any.
	 * 
	 * @return {UserRole}
	 * 		The selected role in the remove/add combobox if any.
	 */
	getSelectedRole: function()
	{
		return this.selectedRole;
	},

	/**
	 * Enable or disable the form.
	 * 
	 * @param {Boolean} isEnabled
	 * 		When true enable the form and when false disable it. 
	 */
	setEnabled: function( isEnabled )
	{
		if( isEnabled )
		{
			this.userRoleList.removeAttr("disabled");
			this.roleList.removeAttr("disabled");
			this.addRoleButton.button( "enable" );
			this.removeRoleButton.button( "enable" );
		}
		else
		{
			this.userRoleList.attr("disabled", "disabled");
			this.roleList.attr("disabled", "disabled");
			this.addRoleButton.button( "disable" );
			this.removeRoleButton.button( "disable" );
		}

		if( !isEnabled )
			this.roleList.prop("selectedIndex",0);
	},

	/**
	 * Enable or disable the form.
	 *
	 * @param {String} mode
	 *		The Add/Remove role mode of the form.
	 */
	setMode: function( mode )
	{
		switch( mode )
		{
			case RolePanel.ADD_MODE:
				this.addRoleButton.button("enable");
				this.removeRoleButton.button("disable");
			break;
			
			case RolePanel.REMOVE_MODE:
				this.addRoleButton.button("disable");
				this.removeRoleButton.button("enable");
				this.roleList.selectedIndex = 0;
			break;

			default:
				this.addRoleButton.button("disable");
				this.removeRoleButton.button("disable");
		}
	},

	/**
	 * Clear the panel from all its displayed data.
	 */
	clearForm: function()
	{
		this.user = null;
		this.setUserRoles(null);
		this.roleList.prop("selectedIndex",0);
		this.userRoleList.jqGrid('resetSelection');
	},

	/**
	 * Add button onclick event listener.
	 */
	addRoleButton_clickHandler: function()
	{
		this.dispatchEvent( RolePanel.ADD );
	},

	/**
	 * Remove button onclick event listener.
	 */
	removeRoleButton_clickHandler: function()
	{
		this.dispatchEvent( RolePanel.REMOVE );
	},

	/**
	 * Select role to remove.
	 * 
	 * @param {String} id
	 * 		The id of the selected row.
	 */
	userRoleList_changeHandler: function( id )
	{
		var index/*Number*/ = this.userRoleList.jqGrid( 'getInd', id );
		this.selectedRole = this.userRoles[index-1];
		this.setMode( RolePanel.REMOVE_MODE );
	},

	/**
	 * Select role to add.
	 */
	roleList_changeHandler: function()
	{
		this.userRoleList.jqGrid( 'resetSelection' );

		var roleEnumList/*Array*/ = RoleEnum.getComboList();
		this.selectedRole = roleEnumList[this.roleList.prop("selectedIndex")];
		
		var alreadyInList/*Boolean*/ = false;
		for(var i/*Number*/=0; i<this.userRoles.length; i++)
		{
			var role/*RoleVO*/ = this.userRoles[i];
			if( role.equals(this.selectedRole) )
			{
				alreadyInList = true;
				break;
			}
		}	
		
		if( this.selectedRole == RoleEnum.NONE_SELECTED || alreadyInList )
			this.setMode( null );
		else
			this.setMode( RolePanel.ADD_MODE );
	}
});

/*
 * Event names
 */
RolePanel.ADD/*String*/ 			= "add";
RolePanel.REMOVE/*String*/ 			= "remove";

/*
 * View states
 */
RolePanel.ADD_MODE/*String*/ 		= "addMode";
RolePanel.REMOVE_MODE/*String*/ 	= "removeMode";
/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * The UI component in charge of the <em>user form</em>.
 * 
 * @extends org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent UiComponent
 */
var UserForm = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm",
	UiComponent,
{
	
	/**
	 * The user form panel HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	userFormPanel: null,
	
	/**
	 * The unique name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	uname: null,
	
	/**
	 * The first name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	fname: null,
	
	/**
	 * The long name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	lname: null,
	
	/**
	 * The email field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	email: null,
	
	/**
	 * The password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	password: null,
	
	/**
	 * The confirm password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	confirm: null,
	
	/**
	 * The department field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	department: null,
	
	/**
	 * The submit button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	submitButton: null,
	
	/**
	 * The selected user.
	 * 
	 * @private
	 * @type {UserVO}
	 */
	user: null,
	
	/**
	 * The roles list for the selected user.
	 * 
	 * @private
	 * @type {Array}
	 */
	userRoles: null,
	
	/**
	 * @private
	 * @type {String}
	 */
	mode: null,
	
	/**
	 * An array used to compare currently selected items in the role list to those
	 * lastly inserted to know which one was the last changed by the user. 
	 * 
	 * @private
	 * @type {Array}
	 */
	roleListComparer: null,
	
	/**
	 * @construct
	 * @override
	 *
	 * Initialize a <code>UserForm</code> instance.
	 */
	initialize: function()
	{
		UserForm.$super.initialize.call( this );
		
		this.initializeChildren();
		this.configureListeners();

		//Needed to erase prefilled form informations.
		this.clearForm();
		this.setEnabled(false);
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren: function()
    {
		/*
		 * We use JQuery to initialize reference to UI components
		 */
		this.userFormPanel = $(".user-form-panel");
	
		this.uname = this.userFormPanel.find(".uname");
		this.fname = this.userFormPanel.find(".fname");
		this.lname = this.userFormPanel.find(".lname");
		this.email = this.userFormPanel.find(".email");
		this.password = this.userFormPanel.find(".password");
		this.confirm = this.userFormPanel.find(".confirm");
		this.department = this.userFormPanel.find(".department");
	
		this.submitButton = this.userFormPanel.find(".submit-button").button();
		this.cancelButton = this.userFormPanel.find(".cancel-button").button();	
    },
	
    /**
     * Configure event listeners registration.
     */
	configureListeners: function()
	{
		var that/*UserForm*/ = this; //Needed for closures to use "this" reference.
		this.uname.focus( function(evt){ that.field_focusHandler(evt) } );
		this.password.focus( function(evt){ that.field_focusHandler(evt) } );
		this.confirm.focus( function(evt){ that.field_focusHandler(evt) } );
		this.department.focus( function(evt){ that.field_focusHandler(evt) } );
		this.submitButton.click( function(evt){ that.submit_clickHandler(evt) } );
		this.cancelButton.click( function(evt){ that.cancel_clickHandler(evt) } );
	},
	
	/**
	 * Add items from <code>DeptEnum</code> to the corresponding list UI
	 * component.
	 * 
	 * @param {Array} deptEnumList
	 *		List of <code>DeptEnum</code> items or an empty array to empty
	 *		the list UI component content. 
	 */
	fillList: function( deptEnumList )
	{
		var htmlList/*String*/ = "";
		for(var i/*Number*/=0; i<deptEnumList.length; i++)
		{		
			var deptEnum/*DeptEnum*/ = deptEnumList[i];
			
			/*
			 * An item not having a value in jQuery will be excluded from the
			 * pop-up menu.
			 */ 
			var valueAttr = 'value="' + deptEnum.ordinal + '"';
			
			var selectedAttr/*String*/ = "";
			if( this.user && deptEnum.equals(this.user.department) )
				selectedAttr = "selected";
				
			if( !this.user && deptEnum.equals(DeptEnum.NONE_SELECTED) )
				selectedAttr = "selected";
								
			htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + deptEnum.value + '</option>';
		}
	
		this.department.html(htmlList);
	},
	
	/**
	 * Give focus to the form component.
	 */
	setFocus: function()
	{
		this.fname.focus();
	},
	
	/**
	 * Set the user used to populate the form.
	 * 
	 * @param {UserVO} user
	 * 		The currently selected user.
	 */
	setUser: function( user )
	{
		this.user = user;
		
		if( !user )
			this.clearForm();
		else
		{
			this.uname.val(user.uname);
			this.fname.val(user.fname);
			this.lname.val(user.lname);
			this.email.val(user.email);
			this.password.val(user.password);
			this.confirm.val(user.password);

			this.fillList( DeptEnum.getComboList() );
		}
	},
	
	getUser: function()/*UserVO*/
	{
		this.updateUser();
		return this.user;
	},
	
	/**
	 * Update user attributes with form fields value.
	 * 
	 * @param {UserVO} user
	 * 		The currently selected user.
	 * 
	 * @param {Array} userRoles
	 * 		The roles list for the currently selected user.
	 */
	updateUser: function()
	{
		this.user.uname = this.uname.val();
		this.user.fname = this.fname.val();
		this.user.lname = this.lname.val();
		this.user.email = this.email.val();
		this.user.password = this.password.val();
	
		var selected/*Number*/ = parseInt(this.department.val())+1;
		var deptEnumList/*Array*/ = DeptEnum.getComboList();
		this.user.department = deptEnumList[selected];
	},
	
	/**
	 * Clear the whole form.
	 */
	clearForm: function()
	{
		this.uname.val("");
		this.fname.val("");
		this.lname.val("");
		this.email.val("");
		this.password.val("");
		this.confirm.val("");
		this.fillList([]);
		this.setFieldError( 'uname', false );
		this.setFieldError( 'password', false );
		this.setFieldError( 'confirm', false );
		this.setFieldError( 'department', false );
	},

	/**
	 * Enable or disable the form.
	 * 
	 * @param {Boolean} isEnabled
	 * 		The form must be enabled.
	 */
	setEnabled: function( isEnabled )
	{
		if( isEnabled )
		{
			this.fname.removeAttr("disabled");
			this.lname.removeAttr("disabled");
			this.email.removeAttr("disabled");
			this.password.removeAttr("disabled");
			this.confirm.removeAttr("disabled");
			this.department.removeAttr("disabled");
			this.submitButton.button("enable");
			this.cancelButton.button("enable");
		
			if( this.mode == UserForm.MODE_EDIT )
				this.uname.attr( "disabled", "disabled" );
			else
				this.uname.removeAttr("disabled");
		}
		else
		{
			this.uname.attr( "disabled", "disabled" );
			this.fname.attr( "disabled", "disabled" );
			this.lname.attr( "disabled", "disabled" );
			this.email.attr( "disabled", "disabled" );
			this.password.attr( "disabled", "disabled" );
			this.confirm.attr( "disabled", "disabled" );
			this.department.attr( "disabled", "disabled" );
			this.submitButton.button( "disable" );
			this.cancelButton.button( "disable" );
		}		

	},

	/**
	 * Set the form mode to ADD or EDIT.
	 * 
	 * @param {String} mode
	 * 		<code>UserForm.MODE_ADD</code> or <code>UserForm.MODE_EDIT</code>
	 */
	setMode: function( mode )
	{
		this.mode = mode;
	
		switch(mode)
		{
			case UserForm.MODE_ADD:
				this.submitButton.find(".ui-button-text").text("Add");
			break;
		
			case UserForm.MODE_EDIT:
				this.submitButton.find(".ui-button-text").text("Save");
			break;
		}
	},
	
	/**
	 * Submit the add or update.
	 */
	submit_clickHandler: function()
	{
		this.updateUser();
		
		if( this.getErrors() )
			return;
	
		if( this.user.getIsValid() )
		{
			if( this.mode == UserForm.MODE_ADD )
				this.dispatchEvent( UserForm.ADD );
			else
				this.dispatchEvent( UserForm.UPDATE );
		}
	},
	
	/**
	 * Cancel the add or update
	 */
	cancel_clickHandler: function()
	{
		this.dispatchEvent( UserForm.CANCEL );
	},
	
	/**
	 * Handle focus event on all the required form fields.
	 */
	field_focusHandler: function( evt )
	{
		this.setFieldError( $(evt.target).attr("class"), false );
	},
	
	/**
	 * Display errors associated with form fields and return if at least one
	 * field is in error.
	 * 
	 * @return {Boolean}
	 * 		The form contains errors.
	 */
	getErrors: function()
	{
		var error/*Boolean*/ = false;

		if( this.uname.val() == "" )
			this.setFieldError( 'uname', error = true );
		else
			this.setFieldError( 'uname', false );
	
		if( this.password.val() == "" )
			this.setFieldError( 'password', error = true );
		else
			this.setFieldError( 'password', false );
	
		if( this.password.val() != "" && this.confirm.val() != this.password.val() )
			this.setFieldError( 'confirm', error = true );
		else
			this.setFieldError( 'confirm', false );
	
		var selected/*Number*/ = parseInt(this.department.val())+1;
		var deptEnumList/*Array*/ = DeptEnum.getComboList();
		var department/*DeptEnum*/ = deptEnumList[selected];
	
		if( DeptEnum.NONE_SELECTED.equals( department ) )
			this.setFieldError( 'department', error = true );
		else
			this.setFieldError( 'department', false );
	
		return error;
	},
	
	/**
	 * Set or unset the error state on the uname field.
	 * 
	 * @param {String} fieldName
	 * 		Name of the field to mark as (or not mark as) containing an error.
	 *
	 * @param {Boolean} error
	 * 		The field must be marked as containing an error.
	 */
	setFieldError: function( fieldName, error )
	{
		var label/*HTMLElement*/ = this.userFormPanel.find( 'label[for="' + fieldName + '"]' );
		var field/*HTMLElement*/ = this.userFormPanel.find( '.' + fieldName );
	
		if( error )
			field.addClass( 'fieldError' );
		else
			field.removeClass( 'fieldError' );
	}
});

/*
 * Event names
 */
UserForm.ADD/*String*/		= "add";
UserForm.UPDATE/*String*/	= "update";
UserForm.CANCEL/*String*/		= "cancel";

UserForm.MODE_ADD/*String*/		= "modeAdd";
UserForm.MODE_EDIT/*String*/	= "modeEdit";
/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * The UI component in charge of the <em>User List</em>.
 * 
 * @extends org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent UiComponent
 */
var UserList = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserList",
	UiComponent,
{

	/**
	 * The user list panel HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	userListPanel: null,
	
	/**
	 * The user list HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	userList: null,
	
	/**
	 * The "new" button HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	newButton: null,

	/**
	 * The current selected user.
	 * 
	 * @type {String}
	 * @private
	 */
	selectedUser: null,
	
	/**
	 * The user list of the application.
	 * 
	 * @type {Array}
	 * @private
	 */
	users: null,
	
	/**
	 * @construct
	 * @override
	 * Initialize a <code>UserList</code> instance.
	 */
	initialize: function()
	{
		UserList.$super.initialize.call( this );
		
		this.initializeChildren();
		this.configureListeners();
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren: function()
    {
		this.userListPanel = $(".user-list-panel");

		this.userList = this.userListPanel.find("#user-list");
		this.userList.jqGrid
		(
			{
				datatype: "local",
				width: 630,
				height: 160,
			   	colNames:['User Name', 'First Name', 'Last Name', 'Email', 'Department'],
			   	colModel:
				[
			   		{name:'uname', index:'uname', width:125 },
			   		{name:'fname', index:'fname', width:125 },
			   		{name:'lname', index:'lname', width:125 },
			   		{name:'email', index:'email', width:130 },
			   		{name:'department', index:'department', width:125}
			   	]
			}
		);

		this.newButton = this.userListPanel.find(".new-button").button();
		this.deleteButton = this.userListPanel.find(".delete-button").button();	
		this.deleteButton.button("disable");
    },

    /**
     * Configure event listeners registration.
     */
    configureListeners: function()
    {		
		var that/*UserList*/ = this; //Needed to delegate events to this instance.
		
		this.userList.jqGrid( 'setGridParam', { onSelectRow: function( id ){ that.userList_selectHandler( id ); } } );
		this.newButton.click( function(evt){ that.newButton_clickHandler(evt) } );
		this.deleteButton.click( function(evt){ that.deleteButton_clickHandler(evt) } );
    },

	/**
	 * Add users from a list to the <SELECT> component.
	 * 
	 * @param {Array} userList
	 * 		The user list to set.
	 */
	setUsers: function( userList )
	{
		this.users = userList;
		
		// First clear all
		this.userList.jqGrid( 'clearGridData' );

		// Fill the data-grid
		for(var i/*Number*/=0; i<userList.length; i++)
		{
			var user/*UserVO*/ = userList[i];
			var rowData/*Object*/ = 
			{
				uname: user.uname,
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				department: user.department.value
			};

			this.userList.jqGrid( 'addRowData', i+1, rowData );
		}
	},
	
	/**
	 * Return current selected user in user list.
	 * 
	 * <p>Note that jQgrid cannot embed any external data to transport the
	 * UserVo. So it is best to return uname.
	 * 
	 * @return {String}
	 * 		The user name selected in the user list.
	 */
	getSelectedUser: function()
	{
		return this.selectedUser;
	},
	
	/**
	 * List row selection event listener.
	 * 
	 * @param {String} id
	 * 		The id of the selected row.
	 */
	userList_selectHandler: function( id )
	{
		var rowData/*Object*/ = this.userList.jqGrid( 'getRowData', id );

		var uname/*String*/;
		for( var i/*Number*/=0; i<this.users.length; i++ )
		{
			if( this.users[i].uname == rowData.uname )
			{
				uname = rowData.uname;
				break;
			}	
		}	

		this.selectedUser = uname;
		this.dispatchEvent( UserList.SELECT );
		
		this.deleteButton.button("enable");
	},
	
	/**
	 * New button click event listener. 
	 */
	newButton_clickHandler: function()
	{
		this.deSelect();
		this.dispatchEvent( UserList.NEW );
	},

	/**
	 * New button click event listener. 
	 */
	deleteButton_clickHandler: function()
	{
		this.dispatchEvent( UserList.DELETE );
	},
	
	/**
	 * Remove selection in the user list.
	 */
	deSelect: function()
	{
		this.userList.jqGrid( 'resetSelection' );
		this.selectedUser = null;

		this.deleteButton.button("disable");
	}
});

/*
 * Events type
 */
UserList.NEW/*String*/ 		= "new";
UserList.DELETE/*String*/ 	= "delete";
UserList.SELECT/*String*/ 	= "select";
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Role panel component <code>Mediator</code>.
 *
 * @see org.puremvc.js.patterns.mediator.Mediator Mediator
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum DeptEnum
 * @see org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm UserForm
 *
 * @extends org.puremvc.js.patterns.mediator.Mediator Mediator
 */
var RolePanelMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.RolePaneMediator",
	Mediator,
{
	/**
	 * A shortcut reference to the <code>RoleProxy</code>.
	 *
	 * @private
	 * @type {RoleProxy}
	 */
	roleProxy: null,

	/**
	 * @construct
	 * @override
	 * 
	 * Initialize a <code>RolePanelMediator</code> instance.
	 * 
	 * @param {String} name
	 * 		Name for this <code>Mediator</code>.
	 *
	 * @param {RolePanel} viewComponent
	 * 		The <code>UserForm</code> view Component this <code>Mediator</code>
	 * 		manage.
	 */
	initialize: function( name, viewComponent )
	{
		RolePanelMediator.$super.initialize.call( this, RolePanelMediator.NAME, viewComponent );

		var rolePanel/*RolePanel*/ = this.getRolePanel();
		rolePanel.addEventListener( RolePanel.ADD, this.onAddRole, this );
		rolePanel.addEventListener( RolePanel.REMOVE, this.onRemoveRole, this );

		this.roleProxy = this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );
	},

	/**
	 * @private
	 * 
	 * The <code>RolePanel</code> view component this <code>Mediator</code> manage.
	 * 
	 * @return {RolePanel}
	 */
	getRolePanel: function()
	{
		return this.viewComponent;
	},

	/**
	 * Called when a role is added to the selected user's role list.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onAddRole: function( event )
	{
		this.roleProxy.addRoleToUser( this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole() );

		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	},

	/**
	 * Called when a role is removed from the selected user's role list.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onRemoveRole: function( event )
	{
		this.roleProxy.removeRoleFromUser( this.getRolePanel().getUser(), this.getRolePanel().getSelectedRole() );
	
		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	},

	/**
	 * Force the user role list to update its display.
	 */
	updateUserRoleList: function()
	{
		var userName/*String*/ = this.getRolePanel().user.uname;
		var userRoles/*Array*/ = this.roleProxy.getUserRoles( userName );
		this.getRolePanel().setUserRoles( userRoles );
	},

	/**
	 * @override
	 */
	listNotificationInterests: function()
	{
		return [
			NotificationNames.NEW_USER,
			NotificationNames.USER_ADDED,
			NotificationNames.USER_UPDATED,
			NotificationNames.USER_DELETED,
			NotificationNames.CANCEL_SELECTED,
			NotificationNames.USER_SELECTED,
			NotificationNames.ADD_ROLE_RESULT
		];
	},

	/**
	 * @override
	 */
	handleNotification: function( note )
	{
		var rolePanel/*RolePanel*/ = this.getRolePanel();

		switch( note.getName() )
		{
			case NotificationNames.NEW_USER:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_ADDED:
				rolePanel.user = note.getBody();
				
				var roleVO/*RoleVO*/ = new RoleVO ();
				roleVO.uname = rolePanel.user.uname;
				
				this.roleProxy.addItem( roleVO );
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_UPDATED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_DELETED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.CANCEL_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case NotificationNames.USER_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(true);
				rolePanel.setMode(null);

				rolePanel.user = note.getBody();
				this.updateUserRoleList();
			break;

			case NotificationNames.ADD_ROLE_RESULT:
				this.updateUserRoleList();
			break;
		}
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * User form component <code>Mediator</code>.
 *
 * @see org.puremvc.js.patterns.mediator.Mediator Mediator
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum DeptEnum
 * @see org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm UserForm
 *
 * @extends org.puremvc.js.patterns.mediator.Mediator Mediator
 */
var UserFormMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.UserFormMediator",
	Mediator,
	{	

	/**
	 * @construct
	 * @override
	 *
	 * Initialize a <code>UserFormMediator</code> instance.
	 * 
	 * @param {String} name
	 * 		Name for this <code>Mediator</code>.
	 *
	 * @param {UserForm} viewComponent
	 * 		The <code>UserForm</code> view Component this <code>Mediator</code>
	 * 		manage.
	 */
	initialize: function( name, viewComponent )
	{
		UserFormMediator.$super.initialize.call( this, name, viewComponent );
	
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.addEventListener( UserForm.ADD, this.onAdd, this );
		userForm.addEventListener( UserForm.UPDATE, this.onUpdate, this );
		userForm.addEventListener( UserForm.CANCEL, this.onCancel, this );
		
		this.userProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
	},
	
	/**
	 * @private
	 *
	 * A shortcut to the application <code>UserProxy</code> instance.
	 * 
	 * @type {UserProxy}
	 */
	userProxy: null,

	/**
	 * @private
	 * 
	 * The <code>UserForm</code> view component this <code>Mediator</code> manage.
	 * 
	 * @return {UserForm}
	 */
	getUserForm : function()
	{
		return this.viewComponent;
	},

	/**
	 * @private
	 * 
	 * Called when a user is added using the form.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onAdd: function( event )
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.addItem( user );
		this.sendNotification( NotificationNames.USER_ADDED, user );
		
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},

	/**
	 * @private
	 * 
	 * Called when a user is updated using the form.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onUpdate: function()
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.updateItem( user );
		this.sendNotification(  NotificationNames.USER_UPDATED, user );
		
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},

	/**
	 * @private
	 * 
	 * Called when modifications made to a user in the form are canceled.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onCancel: function()
	{
		this.sendNotification(  NotificationNames.CANCEL_SELECTED );
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},
	
	/**
	 * @override
	 */
	listNotificationInterests: function()
	{
		return [
			NotificationNames.NEW_USER,
			NotificationNames.USER_DELETED,
			NotificationNames.USER_SELECTED
		];
	},
	
	/**
	 * @override
	 */
	handleNotification: function( note )
	{
		var userForm/*UserForm*/ = this.getUserForm();
		
		var user/*UserVO*/;
		switch ( note.getName() )
		{
			case NotificationNames.NEW_USER:
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_ADD );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
			
			case NotificationNames.USER_DELETED:
				userForm.clearForm();
				userForm.setEnabled(false);
			break;
	
			case NotificationNames.USER_SELECTED:
				user = note.getBody();
	
				userForm.clearForm();
				userForm.setUser( user );
	
				userForm.setMode( UserForm.MODE_EDIT );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
		}
	}
});

/*
 * Constants
 */
UserFormMediator.ADD/*String*/			= "add";
UserFormMediator.UPDATE/*String*/		= "update";
UserFormMediator.CANCEL/*String*/		= "cancel";

UserFormMediator.MODE_ADD/*String*/		= "modeAdd";
UserFormMediator.MODE_EDIT/*String*/	= "modeEdit";
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * User list component <code>Mediator</code>.
 * 
 * @see org.puremvc.js.patterns.mediator.Mediator Mediator
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.view.components.UserList UserList
 *
 * @extends org.puremvc.js.patterns.mediator.Mediator Mediator
 */
var UserListMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.UserListMediator",
	Mediator,
{

	/**
	 * The <code>UserList</code> UI component this <code>Mediator</code>
	 * manage.
	 * 
	 * @type {UserList}
	 */
	userList: null,
	
	/**
	 * @construct
	 * @override
	 *
	 * Initialize a <code>UserListMediator</code> instance.
	 * 
	 * @param {String} name
	 * 		Name for this <code>Mediator</code>.
	 *
	 * @param {UserList} viewComponent
	 * 		The <code>UserList</code> UI Component this <code>Mediator</code>
	 * 		manage.
	 */
	initialize: function( name, viewComponent )
	{
		UserListMediator.$super.initialize.call( this, name, viewComponent );
		
		var userList/*UserList*/ = this.getUserList();
		userList.addEventListener( UserList.NEW, this.onNew, this );
		userList.addEventListener( UserList.DELETE, this.onDelete, this );
		userList.addEventListener( UserList.SELECT, this.onSelect, this );
		
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		userList.setUsers(userProxy.getUsers());
	},

	/**
	 * @private
	 * 
	 * Return the <code>UserList</code> UI component this
	 * <code>Mediator</code> manage.
	 * 
	 * @return {UserList}
	 * 		The <code>UserList</code> UI component this
	 * 		<code>Mediator</code> manage.
	 */
	getUserList: function()
	{
		return this.viewComponent;
	},
	
	/**
	 * @override
	 */
	listNotificationInterests: function()
	{
		return [
			NotificationNames.CANCEL_SELECTED,
			NotificationNames.USER_UPDATED,
			NotificationNames.USER_ADDED,
			NotificationNames.USER_DELETED
		];
	},
	
	/**
	 * @override
	 */
	handleNotification: function( note )
	{
		var userList/*UserList*/ = this.getUserList();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );

		switch( note.getName() )
		{
			case NotificationNames.CANCEL_SELECTED:
				userList.deSelect();
			break;
	
			case NotificationNames.USER_UPDATED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
				
			case NotificationNames.USER_ADDED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
				
			case NotificationNames.USER_DELETED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
		}
	},
	
	/**
	 * Called when to add a new user to the list.
	 * 
	 * @private
	 */
	onNew: function()
	{
		var user/*UserVO*/ = new UserVO();
		this.sendNotification( NotificationNames.NEW_USER, user );
	},
	
	onDelete: function()
	{
		var uname/*String*/ = this.getUserList().getSelectedUser();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		var selectedUser/*UserVO*/ = userProxy.getUser( uname );

		this.sendNotification( NotificationNames.DELETE_USER, selectedUser );
	},

	/**
	 * @private
	 * 
	 * Called when a user is selected in the user list.
	 * 
	 * @param {String} selectedUserName
	 * 		User name of the user selected in the list.
	 */
	onSelect: function( selectedUserName )
	{
		var uname/*String*/ = this.getUserList().getSelectedUser();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		var selectedUser/*UserVO*/ = userProxy.getUser( uname );

		this.sendNotification( NotificationNames.USER_SELECTED, selectedUser );
	}
});
/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * PureMVC <code>Facade</code> for this application.
 * 
 * @see org.puremvc.js.patterns.facade.Facade Facade
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand StartupCommand
 * @see org.puremvc.js.demos.objs.employeeadmin.controller.DeleteUserCommand DeleteUserCommand
 * @see org.puremvc.js.demos.objs.employeeadmin.controller.AddRoleResultCommand AddRoleResultCommand
 * 
 * @extends org.puremvc.js.patterns.facade.Facade Facade
 */
var ApplicationFacade = Objs("org.puremvc.js.demos.objs.employeeadmin.ApplicationFacade",
	Facade,
	{
		
		/**
		 * Start the application
		 * 
		 * @param {HTMLElement} app
		 * 		The HTML root node element of the application.
		 */
		startup: function( app )
		{
			this.sendNotification( NotificationNames.STARTUP, app );
		},
		
		/**
		 * The <code>Model</code> <code>View</code> and
		 * <code>Controller</code> are initialized in a deliberate
		 * order to ensure internal dependencies are satisfied before
		 * operations are performed.
		 * 
		 * <P>
		 * <code>initializeController()</code> should be overridden
		 * for the specific purpose of registering your commands. Any attempt to
		 * register <code>Mediator</code>s here will result in an error.
		 * being thrown because the View has not yet been initialized.</p>
		 * <p>calling <code>this.parent()</code> is also required.
		 * 
		 * @override
		 */
		initializeController: function()
		{
			ApplicationFacade.$super.initializeController.call( this );
		
			this.registerCommand( NotificationNames.STARTUP, StartupCommand );
			this.registerCommand( NotificationNames.DELETE_USER, DeleteUserCommand );
		}
	}
);

/**
 * Singleton implementation for the <code>ApplicationFacade</code>.
 *
 * @return {ApplicationFacade}
 * 		The <code>Facade</code> subclass instance used throughout the
 * 		application.
 */
ApplicationFacade.getInstance = function()
{
	if( !Facade.instance ) 
		Facade.instance = new ApplicationFacade();
	
	return Facade.instance;
}
