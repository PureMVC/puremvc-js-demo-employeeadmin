/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var StartupCommand = function(){}

/* subclass MacroCommand*/
StartupCommand.prototype = new MacroCommand();

/**
 * Add the Subcommands to startup the PureMVC apparatus.
 * 
 * Generally, it is best to prep the Controller (mostly
 * registering Commands) first, then the Model (mostly 
 * registering Proxies) followed by preparation of the 
 * View (mostly registering Mediators).
 */
StartupCommand.prototype.initializeMacroCommand = function( )
{
	this.addSubCommand( PrepControllerCommand );
	this.addSubCommand( PrepModelCommand );
	this.addSubCommand( PrepViewCommand );
}
