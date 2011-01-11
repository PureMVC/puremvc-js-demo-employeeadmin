/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var AddRoleResultCommand = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = SimpleCommand;

	this.execute = function( notification/*INotification*/ )
	{
		var result/*Boolean*/ = notification.getBody();
		if( result == false )
			alert("Role already exists for this user!\nAdd User Role");
	}
}
AddRoleResultCommand = new Class(new AddRoleResultCommand());