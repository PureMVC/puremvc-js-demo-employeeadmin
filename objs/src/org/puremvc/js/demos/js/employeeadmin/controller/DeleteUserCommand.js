/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_controller_DeleteUserCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.DeleteUserCommand",DeleteUserCommand);

	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");

	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");

	/**
	 * Constructor
	 */
	function DeleteUserCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}

	/**
	 * <code>DeleteUserCommand</code> extends <code>SimpleCommand</code>
	 */
	Objs.extend(DeleteUserCommand,SimpleCommand);

	/**
	 * <code>DeleteUserCommand</code> implements <code>ICommand</code>
	 */
	Objs.implement(DeleteUserCommand,ICommand);

	var o = DeleteUserCommand.prototype;

	o.execute = function( notification/*INotification*/ )
	{
		var user/*UserVO*/ = notification.getBody();
		var userProxy/*UserProxy*/ = this._facade.retrieveProxy( UserProxy.NAME );
		var roleProxy/*RoleProxy*/ = this._facade.retrieveProxy( RoleProxy.NAME );

		userProxy.deleteItem( user );        
		roleProxy.deleteItem( user );
		this.sendNotification( ApplicationFacade.USER_DELETED );
	}
}