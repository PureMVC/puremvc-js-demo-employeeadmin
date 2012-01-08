/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var DeleteUserCommand = function(){}

/* subclass SimpleCommand */
DeleteUserCommand.prototype = new SimpleCommand();
DeleteUserCommand.prototype.constructor = DeleteUserCommand;

DeleteUserCommand.prototype.execute = function( notification/*INotification*/ )
{
	var user/*UserVO*/ = notification.getBody();
	var userProxy/*UserProxy*/ = this.facade.retrieveProxy( UserProxy.NAME );
	var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy( RoleProxy.NAME );

	userProxy.deleteItem( user );        
	roleProxy.deleteItem( user );
	this.sendNotification( ApplicationFacade.USER_DELETED );
}