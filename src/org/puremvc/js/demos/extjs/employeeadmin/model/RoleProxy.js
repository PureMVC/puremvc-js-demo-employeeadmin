/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.RoleProxy.prototype
 */
Ext.namespace("Puremvc.demo.model");
Ext.define("Puremvc.demo.model.RoleProxy", {

  extend: "puremvc.Proxy",

  /**
   * Constructor
   * @constructs
   */
  constructor: function() {
    this.callParent([Puremvc.demo.model.RoleProxy.NAME, []]);

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            {
              uname: "lstooge",
              roles: [
                Puremvc.demo.model.RoleEnum.PAYROLL,
                Puremvc.demo.model.RoleEnum.EMP_BENEFITS
              ]
            }
           )
       );

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            {
              uname: "cstooge",
              roles: [
                Puremvc.demo.model.RoleEnum.ACCT_PAY,
                Puremvc.demo.model.RoleEnum.ACCT_RCV,
                Puremvc.demo.model.RoleEnum.GEN_LEDGER
              ]
            }
           )
       );

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            {
              uname: "mstooge",
              roles: [
                Puremvc.demo.model.RoleEnum.INVENTORY,
                Puremvc.demo.model.RoleEnum.PRODUCTION,
                Puremvc.demo.model.RoleEnum.SALES,
                Puremvc.demo.model.RoleEnum.SHIPPING
              ]
            }
           )
       );
  },

  /**
   * Get the data property cast to the appropriate type.
   *
   * @return {Array}
   */
  getRoles: function() {
    return this.data;
  },

  /**
   * Add an item to the data.
   *
   * @param {Object} item
   */
  addItem: function(item/*Object*/) {
    this.getRoles().push(item);
  },

  /**
   * Delete an item from the data.
   *
   * @param {Object} item
   */
  deleteItem: function(item/*Object*/) {
    var roles = this.getRoles();
    for (var i/*int*/ = 0; i < roles.length; i++) {
      if (roles[i].uname == item.uname) {
        roles.splice(i, 1);
        break;
      }
    }
  },

  /**
   * Determine if the user has a given role.
   *
   * @param {Puremvc.demo.model.vo.UserVO} user
   * @param {Puremvc.demo.model.RoleEnum} role
   *
   * @return {Boolean}
   */
  doesUserHaveRole: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    var hasRole/*Boolean*/ = false;
    for (var i/*int*/ = 0; i < roles.length; i++) {
      if (roles[i].get("uname") == user.get("uname")) {
        var userRoles/*Array*/ = roles[i].get("roles");
        for (var j/*int*/ = 0; j < userRoles.length; j++) {
          var roleEnum/*RoleEnum*/ = userRoles[j];
          if (roleEnum.equals(role)) {
            hasRole = true;
            break;
          }
        }
        break;
      }
    }
    return hasRole;
  },

  /**
   * Add a role to this user.
   *
   * @param {Puremvc.demo.model.vo.UserVO} user
   * @param {Puremvc.demo.model.RoleEnum} role
   */
  addRoleToUser: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    var result/*Boolean*/ = false;
    if (!this.doesUserHaveRole(user, role)) {
      for (var i/*int*/ = 0; i < roles.length; i++) {
        if (roles[i].get("uname") == user.get("uname")) {
          var userRoles/*Array*/ = roles[i].get("roles");
          userRoles.push(role);
          result = true;
          break;
        }
      }
    }

    this.sendNotification(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT, result);
  },

  /**
   * Remove a role from the user.
   *
   * @param {Puremvc.demo.model.vo.UserVO} user
   * @param {Puremvc.demo.model.RoleEnum} role
   */
  removeRoleFromUser: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    if (this.doesUserHaveRole(user, role)) {
      for (var i/*int*/ = 0; i < roles.length; i++) {
        if (roles[i].get("uname") == user.get("uname")) {
          var userRoles/*Array*/ = roles[i].get("roles");
          for (var j/*int*/ = 0; j < userRoles.length; j++) {
            var roleEnum/*RoleEnum*/ = userRoles[j];
            if (roleEnum.equals(role)) {
              userRoles.splice(j, 1);
              break;
            }
          }
          break;
        }
      }
    }
  },

  /**
   * Get a user's roles.
   *
   * @param {String} uname
   *
   * @return {Array}
   */
  getUserRoles: function(uname/*String*/) {
    var roles = this.getRoles();
    var userRoles/*Array*/ = new Array();

    for (var i/*int*/ = 0; i < roles.length; i++) {
      if (roles[i].get("uname") == uname) {
        userRoles = roles[i].get("roles");
        break;
      }
    }

    return userRoles;
  },

  statics: {
    /**
     * @type String
     * @constant
     * @memberof Puremvc.demo.model.RoleProxy
     */
    NAME: "RoleProxy"
  }
});
