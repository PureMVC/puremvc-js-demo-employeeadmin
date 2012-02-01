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
Ext.define("Puremvc.demo.controller.StartupCommand", {

  extend: "puremvc.AsyncMacroCommand",

  /**
   * Add the Subcommands to startup the PureMVC apparatus.
   *
   * Generally, it is best to prep the Model (mostly registering proxies)
   * followed by preparation of the View (mostly the registering of
   * Mediators).
   */
  initializeAsyncMacroCommand: function(note/*INotification*/) {
    this.addSubCommand(Puremvc.demo.controller.PrepControllerCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepModelCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepViewCommand);
  }
});
