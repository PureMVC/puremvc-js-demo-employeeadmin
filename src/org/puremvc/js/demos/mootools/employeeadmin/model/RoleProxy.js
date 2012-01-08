/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var RoleProxy = function()
{
	this.parent( RoleProxy.NAME, new Array() );
}

/* subclass Proxy */
RoleProxy.prototype = new Proxy();
RoleProxy.prototype.constructor = RoleProxy;

// The name this Proxy is registered and retrieved with
RoleProxy.NAME/*String*/ = "RoleProxy";

/**
 * @override
 * 
 * Define some data when Proxy is registered.
 */
RoleProxy.prototype.onRegister = function()
{

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

/**
 * Get the data property cast to the appropriate type
 */
RoleProxy.prototype.getRoles = function()/*Array*/
{
	return this.data;
}

// add an item to the data
RoleProxy.prototype.addItem = function( item/*Object*/ )
{
	this.getRoles().push( item );
}

// delete an item from the data 
RoleProxy.prototype.deleteItem = function( item/*Object*/ )
{
	var roles = this.getRoles();
	for( var i/*int*/=0; i<roles.length; i++)
	{
		if( roles[i].uname == item.uname )
		{
			roles.splice(i,1);
			break;
		}
	}	
}

// determine if the user has a given role
RoleProxy.prototype.doesUserHaveRole = function( user/*UserVO*/, role/*RoleEnum*/ )/*Boolean*/
{
	var roles = this.getRoles();
	var hasRole/*Boolean*/ = false;
	for( var i/*int*/=0; i<roles.length; i++)
	{ 
		if( roles[i].uname == user.uname )
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
RoleProxy.prototype.addRoleToUser = function( user/*UserVO*/, role/*RoleEnum*/ )
{
	var roles = this.getRoles();
	var result/*Boolean*/ = false;
	if ( !this.doesUserHaveRole(user, role) )
	{
		for( var i/*int*/=0; i<roles.length; i++)
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

	this.sendNotification( ApplicationFacade.ADD_ROLE_RESULT, result );
}

// remove a role from the user
RoleProxy.prototype.removeRoleFromUser = function( user/*UserVO*/, role/*RoleEnum*/ )
{
	var roles = this.getRoles();
	if( this.doesUserHaveRole( user, role ) )
	{
		for( var i/*int*/=0; i<roles.length; i++)
		{ 
			if( roles[i].uname == user.uname )
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
RoleProxy.prototype.getUserRoles = function( uname/*String*/ )/*Array*/
{
	var roles = this.getRoles();
	var userRoles/*Array*/ = new Array();
	for( var i/*int*/=0; i<roles.length; i++)
	{ 
		if( roles[i].uname == uname )
		{
			userRoles = roles[i].roles;
			break;
		}
	}

	return userRoles;
}