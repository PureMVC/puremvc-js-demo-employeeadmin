/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.EnumItemVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Ext.define("Puremvc.demo.model.vo.EnumItemVO", {

  extend: "Ext.data.Model",

  fields: [
    {name: "value", allowBlank: false, type: "string"},
    {name: "ordinal", allowBlank: false, type: "int"},
    {name: "associatedValue", allowBlank: false, type: "auto"} /*DeptEnum|RoleEnum*/
  ]
});
