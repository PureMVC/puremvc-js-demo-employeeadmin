/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

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

	/**
	 * Constructor
	 */
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

	/**
	 * <code>RoleProxy</code> extends <code>Proxy</code>
	 */
	Objs.extend(RoleProxy,Proxy);

	/**
	 * <code>RoleProxy</code> implements <code>IProxy</code>
	 */
	Objs.implement(RoleProxy,IProxy);

	RoleProxy.NAME/*String*/ = 'RoleProxy';

	var o = RoleProxy.prototype;

	/**
	 * Get the data property cast to the appropriate type
	 */
	o.getRoles = function()/*Array*/
	{
		return this._data;
	}

	// add an item to the data
	o.addItem = function( item/*Object*/ )
	{
		this.getRoles().push( item );
	}

	// delete an item from the data 
	o.deleteItem = function( item/*Object*/ )
	{
		var roles = this.getRoles();
		for( var i/*int*/=0; i<roles.length; i++)
		{
			if( roles[i].username == item.username )
			{
				roles.splice(i,1);
				break;
			}
		}	
	}

	// determine if the user has a given role
	o.doesUserHaveRole = function( user/*UserVO*/, role/*RoleEnum*/ )/*Boolean*/
	{
		var roles = this.getRoles();
		var hasRole/*Boolean*/ = false;
		for( var i/*int*/=0; i<roles.length; i++)
		{ 
			if( roles[i].username == user.username )
			{
				var userRoles/*Array*/ = roles[i].roles;
				for( var j/*int*/=0; j<userRoles.length; j++ )
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
	}

	// add a role to this user
	o.addRoleToUser = function( user/*UserVO*/, role/*RoleEnum*/ )
	{
		var roles = this.getRoles();
		var result/*Boolean*/ = false;
		if ( !this.doesUserHaveRole(user, role) )
		{
			for( var i/*int*/=0; i<roles.length; i++)
			{ 
				if( roles[i].username == user.username )
				{
					var userRoles/*Array*/ = roles[i].roles;
					userRoles.push( role );
					result = true;
					break;
				}
			}
		}

		this.sendNotification( ApplicationFacade.ADD_ROLE_RESULT, result );
	}

	// remove a role from the user
	o.removeRoleFromUser = function( user/*UserVO*/, role/*RoleEnum*/ )
	{
		var roles = this.getRoles();
		if( this.doesUserHaveRole( user, role ) )
		{
			for( var i/*int*/=0; i<roles.length; i++)
			{ 
				if( roles[i].username == user.username )
				{
					var userRoles/*Array*/ = roles[i].roles;
					for( var j/*int*/=0; j<userRoles.length; j++)
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
	}

	// get a user's roles
	o.getUserRoles = function( username/*String*/ )/*Array*/
	{
		var roles = this.getRoles();
		var userRoles/*Array*/ = new Array();
		for( var i/*int*/=0; i<roles.length; i++)
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