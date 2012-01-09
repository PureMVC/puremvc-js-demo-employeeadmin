/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * Start the application.
 *
 * @extends org.puremvc.js.patterns.command.SimpleCommand SimpleCommand
 *
 * @constructor
 */
var StartupCommand = Objs("org.puremvc.js.demos.objs.employeeadmin.controller.StartupCommand",
	MacroCommand,
{
	/**
	 * @override
	 * 
	 * Add the Subcommands to startup the PureMVC apparatus.
	 * 
	 * Generally, it is best to prep the Model (mostly registering 
	 * proxies)followed by preparation of the View (mostly registering 
	 * Mediators).
	 * 
	 * @param {Notification} note
	 * 		The <code>Notification</code> object to be passed to each entry
	 * 		of <i>subCommands</i> list.
	 */
	initializeMacroCommand: function( note )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
	}
});