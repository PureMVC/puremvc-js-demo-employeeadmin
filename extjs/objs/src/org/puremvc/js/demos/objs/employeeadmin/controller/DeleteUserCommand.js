/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Command used to delete a user from the main users list.
 *
 * @requires org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 * @requires org.puremvc.js.patterns.observer.Notification Notification
 * @requires org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @requires org.puremvc.js.demos.objs.employeeadmin.model.RoleProxy RoleProxy
 * @requires org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * 
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var DeleteUserCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.DeleteUserCommand",
	SimpleCommand,
{
	/**
	 * @override
	 */
	execute: function( note )
	{
		var user/*UserVO*/ = note.getBody();
		var userProxy/*UserProxy*/ = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
		var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy( ProxyNames.ROLE_PROXY );
	
		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		
		this.sendNotification( NotificationNames.USER_DELETED );
	}
});