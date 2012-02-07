/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.RoleVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Puremvc.demo.model.vo.RoleVO = Ext.extend(Object, {

  /**
   *
   * @constructs
   * @param {String} uname optional
   * @param {Array} roles optional
   */
  constructor: function(uname/*String*/, roles/*Array*/) {
    Puremvc.demo.model.vo.RoleVO.superclass.constructor.call(this);
    this.uname/*String*/ = "";
    this.roles/*Array*/ = [];

    if (uname != null) {
      this.uname = uname;
    }

    if (roles != null) {
      this.roles = roles;
    }
  }
});
