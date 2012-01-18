/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var ApplicationFacade = function(){}

/* subclass Facade */
ApplicationFacade.prototype = new Facade();
ApplicationFacade.prototype.constructor = ApplicationFacade;

/**
 * Start the application
 */
ApplicationFacade.prototype.startup = function( app/*Object*/ )
{
	this.registerCommand( ApplicationFacade.STARTUP, StartupCommand );
	this.sendNotification( ApplicationFacade.STARTUP, app );	
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