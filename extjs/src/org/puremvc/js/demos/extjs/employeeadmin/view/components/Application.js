/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.Application.prototype
 */
Ext.ns("Puremvc.demo.view.components");
Puremvc.demo.view.components.Application = Ext.extend(Ext.Viewport, {
  /**
   * @class Serves as the main application's View.  All
   * other Views will become children of this control making
   * the Application act as the "stage".
   *
   * @extends Ext.Viewport
   * @constructs
   */
  constructor: function(config) {
    config = Ext.apply({
      id: "applicationViewport",
      layout: "fit",
      defaults: {
        border: false,
        frame: true
      },
      items: [
        {
          xtype: "panel",
          id: "viewPortCenterRegion",
          region: "center",
          layout: "vbox",
          layoutConfig: {
            align: "center",
            pack: "start"
          },
          hideBorders: true,
          defaults: {
            frame: false
          },
          items: [
            {
              xtype: "panel",
              layout: "fit",
              items: [
                {
                  xtype: "label",
                  html: "<span class=\"application-name\">Employee Admin</span>&nbsp;<span class=\"application-category\">PureMVC JavaScript/ExtJS Demo</span>",
                  flex: 1
                }
              ]
            },
            {
              xtype: "x-demo-user-list-panel",
              id: "userList",
              width: 650,
              height: 250,
              flex: 1
            },
            {
              xtype: "panel",
              id: "userInformationPanel",
              layout: "hbox",
              width: 650,
              height: 300,
              flex: 1,
              layoutConfig: {
                align: "stretchmax",
                pack: "start"
              },
              defaults: {
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
    }, config);
    Puremvc.demo.view.components.Application.superclass.constructor.call(this, config);
  }
});
