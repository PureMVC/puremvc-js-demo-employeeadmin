/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.DeleteUserCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.DeleteUserCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    var user/*UserVO*/ = notification.getBody();

    var userProxy/*UserProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userProxy.deleteItem(user);

    var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
    roleProxy.deleteItem(user);

    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);
  }
});
