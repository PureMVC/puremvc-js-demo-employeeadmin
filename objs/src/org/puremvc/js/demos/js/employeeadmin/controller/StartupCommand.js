/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_controller_StartupCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.StartupCommand",StartupCommand);

	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var UserFormMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.UserFormMediator");
	var UserListMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.UserListMediator");
	var RolePanelMediator = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.RolePanelMediator");

	/**
	 * Constructor
	 */
	function StartupCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}

	/**
	 * <code>StartupCommand</code> extends <code>SimpleCommand</code>
	 */
	Objs.extend(StartupCommand,SimpleCommand);

	/**
	 * <code>StartupCommand</code> implements <code>ICommand</code>
	 */
	Objs.implement(StartupCommand,ICommand);

	var o = StartupCommand.prototype;

	/**
	 * Register the Proxies and Mediators.
	 * 
	 * Get the View Components for the Mediators from the app,
	 * which passed a reference to itself on the notification.
	 */
	o.execute = function( note/*INotification*/ )
	{
		this._facade.registerProxy( new UserProxy() );
		this._facade.registerProxy( new RoleProxy() );

		var app/*EmployeeAdmin*/ = note.getBody();
		this._facade.registerMediator( new UserFormMediator( app.userForm ) );
		this._facade.registerMediator( new UserListMediator( app.userList ) );
		this._facade.registerMediator( new RolePanelMediator( app.rolePanel ) );
	}
}