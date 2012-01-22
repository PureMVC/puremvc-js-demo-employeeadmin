/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.UserVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Ext.define("Puremvc.demo.model.vo.UserVO", {

  extend: "Ext.data.Model",

  fields: [
    {name: "uname", allowBlank: false, type: "string"},
    {name: "fname", allowBlank: false, type: "string"},
    {name: "lname", allowBlank: false, type: "string"},
    {name: "email", allowBlank: true, type: "string"},
    {name: "password", allowBlank: false, type: "string"},
    {name: "department", type: "auto"} /*Puremvc.demo.model.DeptEnum*/
  ],

  /**
   * @return {Boolean}
   */
  getIsValid: function() {
    var retVal = (this.get("uname") != "" && this.get("password") != "" && this.get("department") != Puremvc.demo.model.DeptEnum.NONE_SELECTED);
    return retVal;
  },

  /**
   * @return {String}
   */
  getGivenName: function() {
    var retVal = String.format("{0}, {1}", this.get("lname"), this.get("fname"));
    return retVal;
  }
});
