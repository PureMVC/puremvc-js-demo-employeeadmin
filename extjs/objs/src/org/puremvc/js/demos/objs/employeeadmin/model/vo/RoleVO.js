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