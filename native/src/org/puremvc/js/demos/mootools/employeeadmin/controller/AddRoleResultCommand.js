/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var AddRoleResultCommand = function(){}

/* subclass SimpleCommand */
AddRoleResultCommand.prototype = new SimpleCommand();

AddRoleResultCommand.prototype.execute = function( notification/*Notification*/ )
{
	var result/*Boolean*/ = notification.getBody();
	if( result == false )
		alert("Role already exists for this user!\nAdd User Role");
}