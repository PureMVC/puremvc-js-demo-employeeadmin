/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var PrepViewCommand = function(){}

/* subclass SimpleCommand */
PrepViewCommand.prototype = new SimpleCommand();
PrepViewCommand.prototype.constructor = PrepViewCommand;

PrepViewCommand.prototype.execute = function( note/*Notification*/ )
{
	var app/*Application*/ = note.getBody();

	this.facade.registerMediator( new UserFormMediator( app.userForm ) );
	this.facade.registerMediator( new UserListMediator( app.userList ) );
	this.facade.registerMediator( new RolePanelMediator( app.rolePanel ) );
}