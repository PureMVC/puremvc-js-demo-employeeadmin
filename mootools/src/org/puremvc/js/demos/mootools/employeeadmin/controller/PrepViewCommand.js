/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var PrepViewCommand = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = SimpleCommand;

	this.execute = function( note/*INotification*/ )
	{
		var app/*Application*/ = note.getBody();

		this.facade.registerMediator( new UserFormMediator( app.userForm ) );
		this.facade.registerMediator( new UserListMediator( app.userList ) );
		this.facade.registerMediator( new RolePanelMediator( app.rolePanel ) );
	}
}
PrepViewCommand = new Class(new PrepViewCommand());