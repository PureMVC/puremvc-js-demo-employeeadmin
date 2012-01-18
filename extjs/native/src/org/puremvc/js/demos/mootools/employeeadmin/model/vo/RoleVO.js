/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var RoleVO = function(	uname/*String*/,	roles/*Array*/ )
{
	/**
	 * Constructor
	 * Bindable
	 * @param uname optional
	 * @param roles optional
	 */
	this.initialize = function(	uname/*String*/,	roles/*Array*/ )
	{
		if( uname != null )
			this.uname = uname;

		if( roles != null )
			this.roles = roles;
	}

	this.uname/*String*/ = "";
	this.roles/*Array*/ = new Array();
}
RoleVO = new Class(new RoleVO());