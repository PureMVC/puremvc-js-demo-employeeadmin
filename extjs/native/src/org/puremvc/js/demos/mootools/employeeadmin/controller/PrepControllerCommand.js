/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var PrepControllerCommand = function(){}

/* subclass SimpleCommand */
PrepControllerCommand.prototype = new SimpleCommand();
PrepControllerCommand.prototype.constructor = PrepControllerCommand;

PrepViewCommand.prototype.execute = function( note/*Notification*/ )
{
	this.facade.registerCommand( ApplicationFacade.DELETE_USER, DeleteUserCommand );
	this.facade.registerCommand( ApplicationFacade.ADD_ROLE_RESULT, AddRoleResultCommand );
}