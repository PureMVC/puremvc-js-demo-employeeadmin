/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.DeleteUserCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.DeleteUserCommand", {

  extend: "org.puremvc.js.multicore.patterns.command.AsyncCommand",

  execute: function(notification/*INotification*/) {
    var user/*UserVO*/ = notification.getBody();

    var userProxy/*UserProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userProxy.deleteItem(user);

    var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
    roleProxy.deleteItem(user);

    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);

    this.commandComplete();
  }
});
