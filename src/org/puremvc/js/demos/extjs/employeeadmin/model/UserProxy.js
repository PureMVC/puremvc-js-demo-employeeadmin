/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.UserProxy.prototype
 */
Ext.namespace("Puremvc.demo.model");
Ext.define("Puremvc.demo.model.UserProxy", {

  extend: "org.puremvc.js.multicore.patterns.proxy.Proxy",

  /**
   * Constructor
   * @constructs
   */
  constructor: function() {
    this.callParent([Puremvc.demo.model.UserProxy.NAME, []]);

    // Generate some test data.
    this.addItem(new Puremvc.demo.model.vo.UserVO({
      uname: "lstooge",
      fname: "Larry",
      lname: "Stooge",
      email: "larry@stooges.com",
      password: "ijk456",
      department: Puremvc.demo.model.DeptEnum.ACCT
    }));
    this.addItem(new Puremvc.demo.model.vo.UserVO({
      uname: "cstooge",
      fname: "Curly",
      lname: "Stooge",
      email: "curly@stooges.com",
      password: "xyz987",
      department: Puremvc.demo.model.DeptEnum.SALES
    }));
    this.addItem(new Puremvc.demo.model.vo.UserVO({
      uname: "mstooge",
      fname: "Moe",
      lname: "Stooge",
      email: "moe@stooges.com",
      password: "abc123",
      department: Puremvc.demo.model.DeptEnum.PLANT
    }));
  },

  /**
   * Returns a data property cast to proper type.
   *
   * @return {Array}
   */
  getUsers: function() {
    return this.data;
  },

  /**
   * Add an item to the data.
   *
   * @param {Object} item
   */
  addItem: function(item/*Object*/) {
    this.getUsers().push(item);
  },

  /**
   * Update an item in the data.
   *
   * @param {Object} item
   */
  updateItem: function(item/*Object*/) {
    var user/*UserVO*/ = item;
    var users/*Array*/ = this.getUsers();
    for (var i/*int*/ = 0; i < users.length; i++) {
      if (users[i].get("uname") == user.get("uname")) {
        users[i] = user;
      }
    }
  },

  /**
   * Delete an item in the data.
   *
   * @param {Object} item
   */
  deleteItem: function(item/*Object*/) {
    var user/*UserVO*/ = item;
    var users/*Array*/ = this.getUsers();
    for (var i/*int*/ = 0; i < users.length; i++) {
      if (users[i].get("uname") == user.get("uname")) {
        users.splice(i, 1);  // Delete 1 item at i-th position in array.
      }
    }
  },

  statics: {
    /**
     * @type String
     * @constant
     * @memberof Puremvc.demo.model.UserProxy
     */
    NAME: "UserProxy"
  }
});