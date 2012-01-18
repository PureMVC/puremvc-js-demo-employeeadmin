/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var StartupCommand = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = MacroCommand;

	/**
	 * Add the Subcommands to startup the PureMVC apparatus.
	 * 
	 * Generally, it is best to prep the Model (mostly registering 
	 * proxies)followed by preparation of the View (mostly registering 
	 * Mediators).
	 */
	this.initializeMacroCommand = function( note/*INotification*/ )
	{
		this.addSubCommand( PrepModelCommand );
		this.addSubCommand( PrepViewCommand );
	}
}
StartupCommand = new Class(new StartupCommand());