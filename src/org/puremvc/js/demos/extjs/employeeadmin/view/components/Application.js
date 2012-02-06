/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.Application.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.Application", {

  /** @extends Ext.container.Viewport */
  extend: "Ext.container.Viewport",

  /**
   * @class Serves as the main application's View.  All
   * other Views will become children of this control making
   * the Application act as the "stage".
   *
   * @constructs
   */
  constructor: function(config) {
    this.callParent(config);
  },

  initComponent: function() {
    var config = Ext.apply({
      id: "applicationViewport",
      layout: "fit",
      defaults: {
        bodyBorder: false,
        frame: true
      },
      items: [
        {
          xtype: "panel",
          id: "viewPortCenterRegion",
          region: "center",
          layout: {
            type: "vbox",
            align: "center",
            pack: "start"
          },
          defaults: {
            bodyBorder: false,
            border: 0,
            frame: false
          },
          items: [
            {
              xtype: "label",
              html: "<span class=\"application-name\">Employee Admin</span>&nbsp;<span class=\"application-category\">PureMVC JavaScript/ExtJS4 Demo</span>",
              flex: 0
            },
            {
              xtype: "x-demo-user-list-panel",
              id: "userList",
              border: "normal",
              width: 650,
              height: 250,
              flex: 1
            },
            {
              xtype: "panel",
              id: "userInformationPanel",
              layout: {
                type: "hbox",
                align: "stretch",
                pack: "start"
              },
              width: 650,
              height: 300,
              flex: 1,
              defaults: {
                bodyBorder: false,
                frame: true
              },
              items: [
                {
                  xtype: "x-demo-user-form-panel",
                  id: "userForm",
                  width: 300,
                  flex: 1
                },
                {
                  xtype: "x-demo-role-list-panel",
                  id: "rolePanel",
                  width: 350,
                  flex: 1
                }
              ]
            }
          ]
        }
      ]
    });
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);
  }
});
