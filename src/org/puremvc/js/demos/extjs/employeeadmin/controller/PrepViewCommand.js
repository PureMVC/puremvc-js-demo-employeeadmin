/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepViewCommand", {

  extend: "puremvc.SimpleCommand",

  /**
   * @class <code>SimpleCommand</code> subclass that is
   * responsible for preparing the <code>View</code>.
   * This is where the <code>ApplicationMediator</code> subclass is
   * registered with the <code>View</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification/*INotification*/) {
    // Create the Application component.
    var app = new Puremvc.demo.view.components.Application();

    // Register the ApplicationMediator passing the Application
    // instance to its constructor.
    this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));
  }
});
