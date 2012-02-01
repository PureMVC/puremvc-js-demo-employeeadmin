/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepControllerCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepControllerCommand", {

  /** @extends puremvc.AsyncCommand */
  extend: "puremvc.AsyncCommand",

  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the <code>Controller</code>.
   * This is where all <code>Command</code> subclasses are
   * registered with the <code>Controller</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification /* Notification */) {
    // Register all of the non-system commands used by the application.
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT, Puremvc.demo.controller.AddRoleResultCommand);
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER, Puremvc.demo.controller.DeleteUserCommand);

    this.commandComplete();
  }
});
