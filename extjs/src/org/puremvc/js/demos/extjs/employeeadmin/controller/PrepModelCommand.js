/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepModelCommand.prototype
 */
Ext.ns("Puremvc.demo.controller");
Puremvc.demo.controller.PrepModelCommand = Ext.extend(Puremvc.patterns.AsyncCommand, {
  execute: function(notification/*INotification*/) {
    this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
    this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());

    this.commandComplete();
  }
});
