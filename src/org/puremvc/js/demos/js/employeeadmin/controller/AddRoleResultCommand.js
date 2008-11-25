/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_controller_AddRoleResultCommand()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.controller.AddRoleResultCommand",AddRoleResultCommand);

	var ICommand = Objs.load("org.puremvc.js.interfaces.ICommand");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var SimpleCommand = Objs.load("org.puremvc.js.patterns.command.SimpleCommand");

	/**
	 * Constructor
	 */
	function AddRoleResultCommand()
	{
		SimpleCommand.apply(this,arguments);
		if(Objs.extending) return;
	}

	/**
	 * <code>AddRoleResultCommand</code> extends <code>SimpleCommand</code>
	 */
	Objs.extend(AddRoleResultCommand,SimpleCommand);

	/**
	 * <code>AddRoleResultCommand</code> implements <code>ICommand</code>
	 */
	Objs.implement(AddRoleResultCommand,ICommand);

	var o = AddRoleResultCommand.prototype;

	o.execute = function( notification/*INotification*/ )
	{
		var result/*Boolean*/ = notification.getBody();
		if( result == false )
			alert('Role already exists for this user!\nAdd User Role');
	}
}