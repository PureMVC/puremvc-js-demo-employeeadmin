/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var PrepModelCommand = function(){}

/* subclass SimpleCommand */
PrepModelCommand.prototype = new SimpleCommand();
PrepModelCommand.prototype.constructor = PrepModelCommand;

PrepModelCommand.prototype.execute = function( note/*Notification*/ )
{
	this.facade.registerProxy( new UserProxy() );
	this.facade.registerProxy( new RoleProxy() );
}
