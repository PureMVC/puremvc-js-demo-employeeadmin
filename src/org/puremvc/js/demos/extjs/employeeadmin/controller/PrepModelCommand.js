/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepModelCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepModelCommand", {

  extend: "puremvc.AsyncCommand",

  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification/*INotification*/) {
    this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
    this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());

    this.commandComplete();
  }
});
