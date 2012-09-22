/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.RoleVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Ext.define("Puremvc.demo.model.vo.RoleVO", {

  extend: "Ext.data.Model",

  fields: [
    {name: "uname", allowBlank: false, type: "string", defaultValue: ""}, /*string*/
    {name: "roles", allowBlank: false, type: "auto", defaultValue: []} /*Array*/
  ]
});
