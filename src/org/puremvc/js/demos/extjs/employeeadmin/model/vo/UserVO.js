/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.UserVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Puremvc.demo.model.vo.UserVO = Ext.extend(Object, {
  /**
   * Constructor
   * @constructs
   * @param {String} uname      optional
   * @param {String} fname      optional
   * @param {String} lname      optional
   * @param {String} email      optional
   * @param {String} password    optional
   * @param {DeptEnum} department  optional
   */
  constructor: function(uname/*String*/, fname/*String*/, lname/*String*/,
    email/*String*/, password/*String*/, department/*DeptEnum*/) {
    Puremvc.demo.model.vo.UserVO.superclass.constructor.call(this);
    this.uname = "";
    this.fname = "";
    this.lname = "";
    this.email = "";
    this.password = "";
    this.department = Puremvc.demo.model.DeptEnum.NONE_SELECTED;

    if (uname != null) {
      this.uname = uname;
    }

    if (fname != null) {
      this.fname = fname;
    }

    if (lname != null) {
      this.lname = lname;
    }

    if (email != null) {
      this.email = email;
    }

    if (password != null) {
      this.password = password;
    }

    if (department != null) {
      this.department = department;
    }
  },

  /**
   * @return {Boolean}
   */
  getIsValid: function() {
    var retVal = (this.uname != "" && this.password != "" && this.department != Puremvc.demo.model.DeptEnum.NONE_SELECTED);
    return retVal;
  },

  /**
   * @return {String}
   */
  getGivenName: function() {
    var retVal = String.format("{0}, {1}", this.lname, this.fname);
    return retVal;
  }
});
