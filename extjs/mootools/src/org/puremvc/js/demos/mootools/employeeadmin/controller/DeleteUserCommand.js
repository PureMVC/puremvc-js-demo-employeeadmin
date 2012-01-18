/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var DeleteUserCommand = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = SimpleCommand;

	this.execute = function( notification/*INotification*/ )
	{
		var user/*UserVO*/ = notification.getBody();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( UserProxy.NAME );
		var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy( RoleProxy.NAME );

		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		this.sendNotification( ApplicationFacade.USER_DELETED );
	}
}
DeleteUserCommand = new Class(new DeleteUserCommand());