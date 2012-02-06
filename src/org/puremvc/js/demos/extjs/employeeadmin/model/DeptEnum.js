/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.DeptEnum.prototype
 */
Ext.namespace("Puremvc.demo.model");
Puremvc.demo.model.DeptEnum = Ext.extend(Object, {
  /**
   *
   * @param value
   * @param ordinal
   */
  constructor: function(value/*String*/, ordinal/*int*/) {
    Puremvc.demo.model.DeptEnum.superclass.constructor.call(this);
    this.value = value;
    this.ordinal = ordinal;
  },

  equals: function(roleEnum/*RoleEnum*/)/*Boolean*/ {
    return (this.ordinal == roleEnum.ordinal && this.value == roleEnum.value);
  }

});

Ext.apply(Puremvc.demo.model.DeptEnum, {
  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  NONE_SELECTED/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("--None Selected--", -1),

  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  ACCT/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Accounting", 0),

  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  SALES/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Sales", 1),

  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  PLANT/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Plant", 2),

  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  SHIPPING/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Shipping", 3),

  /**
   * @type DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  QC/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Quality Control", 4),

  /**
   * @return {Array}
   */
  getList: function() {
    return [
      Puremvc.demo.model.DeptEnum.ACCT,
      Puremvc.demo.model.DeptEnum.SALES,
      Puremvc.demo.model.DeptEnum.PLANT
    ];
  },

  /**
   * @return {Array}
   */
  getComboList: function() {
    var cList/*Array*/ = Puremvc.demo.model.DeptEnum.getList();
    cList.unshift(Puremvc.demo.model.DeptEnum.NONE_SELECTED);
    return cList;
  }
});
