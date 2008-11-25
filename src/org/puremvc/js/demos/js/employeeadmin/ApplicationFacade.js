/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_ApplicationFacade()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade",ApplicationFacade);

	var IFacade = Objs.load("org.puremvc.js.interfaces.IFacade");
	var Facade = Objs.load("org.puremvc.js.patterns.facade.Facade");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");

	var StartupCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.StartupCommand");
	var DeleteUserCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.DeleteUserCommand");
	var AddRoleResultCommand = Objs.load("org.puremvc.js.demos.js.employeeadmin.controller.AddRoleResultCommand");

	/**
	* Constructor
	*/
	function ApplicationFacade()
	{
		Facade.apply(this,arguments);

		if(Objs.extending) return;
	}

	/**
	 * <code>ApplicationFacade</code> extends <code>Facade</code>
	 */
	Objs.extend(ApplicationFacade,Facade);

	/**
	 * <code>ApplicationFacade</code> implements <code>IFacade</code>
	 */
	Objs.implement(ApplicationFacade,IFacade);

	var o = ApplicationFacade.prototype;

	// Notification name constants
	ApplicationFacade.STARTUP/*String*/				= "startup";

	ApplicationFacade.NEW_USER/*String*/			= "newUser";
	ApplicationFacade.DELETE_USER/*String*/			= "deleteUser";
	ApplicationFacade.CANCEL_SELECTED/*String*/		= "cancelSelected";

	ApplicationFacade.USER_SELECTED/*String*/		= "userSelected";
	ApplicationFacade.USER_ADDED/*String*/			= "userAdded";
	ApplicationFacade.USER_UPDATED/*String*/		= "userUpdated";
	ApplicationFacade.USER_DELETED/*String*/		= "userDeleted";

	ApplicationFacade.ADD_ROLE/*String*/			= "addRole";
	ApplicationFacade.ADD_ROLE_RESULT/*String*/		= "addRoleResult";

	/**
	 * Singleton ApplicationFacade Factory Method
	 */
	ApplicationFacade.getInstance = function()/*ApplicationFacade*/
	{
		//TODO Explore why Facade._instance is set here but not with AS3
		if( !(Facade._instance instanceof  ApplicationFacade))
			Facade._instance = new ApplicationFacade();

		return Facade._instance;
	}

	/**
	 * Start the application
	 */
	o.startup = function(app/*Object*/)
	{
		this.sendNotification( ApplicationFacade.STARTUP, app );    
	}

	/**
	 * Register Commands with the Controller 
	 */
	o._initializeController = function() 
	{
		Facade.prototype._initializeController.call(this);

		this.registerCommand( ApplicationFacade.STARTUP, StartupCommand );
		this.registerCommand( ApplicationFacade.DELETE_USER, DeleteUserCommand );
		this.registerCommand( ApplicationFacade.ADD_ROLE_RESULT, AddRoleResultCommand );
	}
}