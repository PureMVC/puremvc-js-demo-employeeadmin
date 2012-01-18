/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.UserProxy.prototype
 */
Ext.ns("Puremvc.demo.model");
Puremvc.demo.model.UserProxy = Ext.extend(Puremvc.patterns.Proxy, {

  /**
   * Constructor
   * @constructs
   */
  constructor: function() {
    Puremvc.demo.model.UserProxy.superclass.constructor.call(this, Puremvc.demo.model.UserProxy.NAME, []);

    // Generate some test data.
    this.addItem(new Puremvc.demo.model.vo.UserVO("lstooge", "Larry", 'Stooge', "larry@stooges.com", "ijk456", Puremvc.demo.model.DeptEnum.ACCT));
    this.addItem(new Puremvc.demo.model.vo.UserVO("cstooge", "Curly", 'Stooge', "curly@stooges.com", "xyz987", Puremvc.demo.model.DeptEnum.SALES));
    this.addItem(new Puremvc.demo.model.vo.UserVO("mstooge", "Moe", 'Stooge', "moe@stooges.com", "abc123", Puremvc.demo.model.DeptEnum.PLANT));
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
      if (users[i].uname == user.uname) {
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
      if (users[i].uname == user.uname) {
        users.splice(i, 1);  // Delete 1 item at i-th position in array.
      }
    }
  }
});

Ext.apply(Puremvc.demo.model.UserProxy, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.model.UserProxy
   */
  NAME: "UserProxy"
});