/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var PrepModelCommand = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = SimpleCommand;

	this.execute = function( note/*INotification*/ )
	{
		this.facade.registerProxy( new UserProxy() );
		this.facade.registerProxy( new RoleProxy() );
	}
}
PrepModelCommand = new Class(new PrepModelCommand());