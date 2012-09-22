/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace("Puremvc.demo.common");
Ext.define("Puremvc.demo.common.Util", {

  extend: "Object",

  /**
   * @class A static class for holding miscellaneous shared utility
   * functions that may be used throughout the application.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  statics: {
    /**
     * Create a custom pop-up Ext.Msg message box.
     *
     * @param message
     * @param title
     */
    alert: function(message, title) {
      Ext.Msg.show({
        title: title,
        msg: message,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
      });
    }
  }
});
