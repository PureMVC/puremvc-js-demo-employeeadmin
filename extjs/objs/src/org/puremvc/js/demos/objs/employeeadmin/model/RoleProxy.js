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
		 * @param {RoleVO} item
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