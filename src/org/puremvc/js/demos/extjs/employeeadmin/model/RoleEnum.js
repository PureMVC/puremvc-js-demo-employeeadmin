/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.RoleEnum.prototype
 */
Ext.namespace("Puremvc.demo.model");
Ext.define("Puremvc.demo.model.RoleEnum", {

  extend: "Object",

  constructor: function(value/*String*/, ordinal/*int*/) {
    this.callParent();
    this.value = value;
    this.ordinal = ordinal;
  },

  /**
   *
   * @param roleEnum
   *
   * @return {Boolean}
   */
  equals: function(roleEnum/*RoleEnum*/) {
    return (this.ordinal == roleEnum.ordinal && this.value == roleEnum.value);
  },

  statics: {
    /**
     * @return {Array}
     */
    getList: function() {
      return [
        Puremvc.demo.model.RoleEnum.ADMIN,
        Puremvc.demo.model.RoleEnum.ACCT_PAY,
        Puremvc.demo.model.RoleEnum.ACCT_RCV,
        Puremvc.demo.model.RoleEnum.EMP_BENEFITS,
        Puremvc.demo.model.RoleEnum.GEN_LEDGER,
        Puremvc.demo.model.RoleEnum.PAYROLL,
        Puremvc.demo.model.RoleEnum.INVENTORY,
        Puremvc.demo.model.RoleEnum.PRODUCTION,
        Puremvc.demo.model.RoleEnum.QUALITY_CTL,
        Puremvc.demo.model.RoleEnum.SALES,
        Puremvc.demo.model.RoleEnum.ORDERS,
        Puremvc.demo.model.RoleEnum.CUSTOMERS,
        Puremvc.demo.model.RoleEnum.SHIPPING,
        Puremvc.demo.model.RoleEnum.RETURNS
      ];
    },

    /**
     * @return {Array}
     */
    getComboList: function() {
      var cList/*Array*/ = Puremvc.demo.model.RoleEnum.getList();
      cList.unshift(Puremvc.demo.model.RoleEnum.NONE_SELECTED);
      return cList;
    }
  }
});

Ext.apply(Puremvc.demo.model.RoleEnum, {
  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  NONE_SELECTED/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("--None Selected--", -1),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ADMIN/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Administrator", 0),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ACCT_PAY/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Accounts Payable", 1),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ACCT_RCV/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Accounts Receivable", 2),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  EMP_BENEFITS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Employee Benefits", 3),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  GEN_LEDGER/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("General Ledger", 4),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  PAYROLL/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Payroll", 5),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  INVENTORY/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Inventory", 6),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  PRODUCTION/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Production", 7),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  QUALITY_CTL/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Quality Control", 8),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  SALES/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Sales", 9),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ORDERS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Orders", 10),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  CUSTOMERS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Customers", 11),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  SHIPPING/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Shipping", 12),

  /**
   * @type Puremvc.demo.model.RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  RETURNS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Returns", 13)
});
