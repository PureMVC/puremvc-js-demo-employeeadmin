/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.AddRoleResultCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.AddRoleResultCommand", {

  extend: "puremvc.AsyncCommand",

  execute: function(notification/*INotification*/) {
    var result/*Boolean*/ = notification.getBody();

    if (result === false) {
      Puremvc.demo.common.Util.alert("Role already exists for this user!", "Add User Role");
    }

    this.commandComplete();
  }
});
