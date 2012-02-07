/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.PrepViewCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    // Create the Application component.
    var app = new Puremvc.demo.view.components.Application({});

    // Register the ApplicationMediator passing the Application
    // instance to its constructor.
    this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));
  }
});
