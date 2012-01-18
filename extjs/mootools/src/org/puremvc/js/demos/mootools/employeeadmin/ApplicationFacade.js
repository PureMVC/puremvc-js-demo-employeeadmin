/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var ApplicationFacade = function()
{
	/**
	 * Required by MooTools for inheritance.
	 * @type Class
	 */
	this.Extends = new Class(new Facade());

	/**
	 * Start the application
	 */
	this.startup = function( app/*Object*/ )
	{
		this.sendNotification( ApplicationFacade.STARTUP, app );	
	}

	/**
	 * The <code>Model</code> <code>View</code> and
	 * <code>Controller</code> are initialized in a deliberate
	 * order to ensure internal dependencies are satisfied before
	 * operations are performed.<p>
	 * <code>initializeController()</code> should be overridden
	 * for the specific purpose of registering your commands. Any attempt to
	 * register <code>Mediator</code>s here will result in an error.
	 * being thrown because the View has not yet been initialized.</p>
	 * <p>calling <code>this.parent()</code> is also required.
	 */
	this.initializeController = function() 
	{
		// Always call this.parent()
		this.parent();

		this.registerCommand( ApplicationFacade.STARTUP, StartupCommand );
		this.registerCommand( ApplicationFacade.DELETE_USER, DeleteUserCommand );
		this.registerCommand( ApplicationFacade.ADD_ROLE_RESULT, AddRoleResultCommand );
	}
}

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
 * Singleton implementation for the <code>ApplicationFacade</code>
 * Your Singleton implementation is up to you.  This provides an example
 * that is compatable with JSDoc and most editors' code assistance.
 *
 * @return {ApplicationFacade} the <code>Facade</code> subclass instance
 * used throughout the application.
 */
ApplicationFacade.getInstance = function()/*ApplicationFacade*/
{
	if (Facade.instance == undefined)
	{
		// The classFactory is used as a descriptor for the ApplicatonFacade
		// when hierarchical relationships are required as in this case.
		var classFactory = new Class(new ApplicationFacade());
		Facade.instance = new classFactory();
	}
	return Facade.instance;
};