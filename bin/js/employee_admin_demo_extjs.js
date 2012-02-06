/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.ApplicationFacade.prototype
 */
Ext.namespace("Puremvc.demo");
Puremvc.demo.ApplicationFacade = Ext.extend(puremvc.Facade,
{
  /**
   * @class <p>
   * A <i>concrete</i> <code>Facade</code> implementation used to facilitate
   * the startup process of the MVC. This is the 'hub' that accesses and
   * communicates with the <code>Proxy</code>s, <code>Mediator</code>s and
   * <code>Command</code>s that do the work in your application.
   * </p>
   * <p>
   * Excerpts from "Implementation Idioms and Best Practices" by Cliff
   * Hall: "...By composition then, the Facade implements and exposes the
   * features of the Model, View and Controller; aggregating their
   * functionality and shielding the developer from direct interaction with
   * the Core actors of the framework..."
   * </p>
   * <p>
   * "By convention, it is named <i>ApplicationFacade</i>, but you may call
   * it whatever you like".
   * </p>
   * <p>
   * "Once the application's View hierarchy has been built, the PureMVC
   * apparatus is started and the Model and View regions are prepared for
   * use." For more information on creating the concrete Facade, see page
   * 11 in "Implementation Idioms and Best Practices" by Cliff Hall.
   * </p>
   * @extends puremvc.Facade
   *
   * @param {string} key The multiton key.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(key /* string */) {
    Puremvc.demo.ApplicationFacade.superclass.constructor.call(this, key);
  },

  /**
   * Method used to start the system.
   *
   * @param {Object} viewComponent the <code>Application</code>
   * instance used as the <code>View</code> or undefined to defer until view
   * creation.
   */
  startup: function(viewComponent/*Object*/) {
    this.sendNotification(Puremvc.demo.ApplicationFacade.STARTUP, viewComponent);
  },

  /**
   * The <code>Model</code> <code>View</code> and
   * <code>Controller</code> are initialized in a deliberate
   * order to ensure internal dependencies are satisfied before
   * operations are performed.<p>
   * <code>initializeController()</code> should be overridden
   * for the specific purpose of registering your commands. Any attempt to
   * register <code>Mediator</code>s here will result in an error.
   * being thrown because the <code>View</code> has not yet been initialized.</p>
   * <p>calling <code>this.parent()</code> is also required.
   */
  initializeController: function() {
    // Always call this.parent()
    Puremvc.demo.ApplicationFacade.superclass.initializeController.call(this);

    this.registerCommand(Puremvc.demo.ApplicationFacade.STARTUP, Puremvc.demo.controller.StartupCommand);
  }
});

Ext.apply(Puremvc.demo.ApplicationFacade, {
  /* Notification name constants /*

   /**
   * Constant used to register and identify the notification that should execute
   * the <code>StartupCommand</code>.
   *
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.system.StartupCommand
   */
  STARTUP: "Startup",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   */
  NEW_USER: "newUser",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.DeleteUserCommand
   */
  DELETE_USER: "deleteUser",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   */
  CANCEL_SELECTED: "cancelSelected",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   */
  USER_SELECTED: "userSelected",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   */
  USER_ADDED: "userAdded",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.DeleteUserCommand
   */
  USER_UPDATED:  "userUpdated",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.DeleteUserCommand
   */
  USER_DELETED:  "userDeleted",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.AddRoleResultCommand
   */
  ADD_ROLE:  "addRole",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.ApplicationFacade
   * @see Puremvc.demo.controller.AddRoleResultCommand
   */
  ADD_ROLE_RESULT: "addRoleResult",

  /**
   * Singleton implementation for the <code>ApplicationFacade</code>
   * Your Singleton implementation is up to you.  This provides an example
   * that is compatible with JSDoc and most editors' code assistance.
   *
   * @param {string} key The multiton key.
   *
   * @return {Puremvc.demo.ApplicationFacade} the <code>Facade</code> subclass instance
   * used throughout the application.
   */
  getInstance: function(key /* string */) {
    if (!puremvc.Facade.hasCore(key)) {
      new Puremvc.demo.ApplicationFacade(key);
    }
    var retVal = puremvc.Facade.getInstance(key);
    return retVal;
  }
});
/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace("Puremvc.demo.common");

/**
 * @namespace A static class for holding miscellaneous shared utility
 * functions that may be used throughout the application.
 */
Puremvc.demo.common.Util = {

  /**
   * Create a custom pop-up Ext.Msg message box.
   *
   * @param message
   * @param title
   */
  alert: function(message, title) {
    Ext.Msg.show({
      title: title,
      msg: message,
      buttons: Ext.MessageBox.OK,
      icon: Ext.MessageBox.INFO
    });
  },

  /**
   * Add the required label to the given field or fields.
   *
   * @param an individual field or array of fields.
   */
  addRequiredToFieldLabel: function(field) {
    var fields = [].concat(field);
    Ext.each(fields, function(item, index, allItems) {
      item.mon(item, "afterrender", function () {
        var formItem = this.el.up(".x-form-item", 10);

        if (formItem) {
          var label = formItem.child(".x-form-item-label");

          if (label) {
            Ext.get(label).addClass("required");
          }
        }
      }, item);
    }, field);
  }
};


/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.AddRoleResultCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");

Puremvc.demo.controller.AddRoleResultCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    var result/*Boolean*/ = notification.getBody();

    if (result === false) {
      Puremvc.demo.common.Util.alert("Role already exists for this user!", "Add User Role");
    }
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.DeleteUserCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.DeleteUserCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    var user/*UserVO*/ = notification.getBody();

    var userProxy/*UserProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userProxy.deleteItem(user);

    var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
    roleProxy.deleteItem(user);

    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);
  }
});

/**
 * @lends Puremvc.demo.controller.PrepControllerCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.PrepControllerCommand = Ext.extend(puremvc.SimpleCommand, {
  /**
   * @class <code>SimpleCommand</code> subclass that is
   * responsible for preparing the data <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
   *
   * @extends puremvc.SimpleCommand
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Puremvc.demo.controller.PrepControllerCommand.superclass.constructor.call(this);
  },

  execute: function(notification /* Notification */) {
    // Register all of the non-system commands used by the application.
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT, Puremvc.demo.controller.AddRoleResultCommand);
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER, Puremvc.demo.controller.DeleteUserCommand);
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepModelCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.PrepModelCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
    this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.PrepViewCommand = Ext.extend(puremvc.SimpleCommand, {
  execute: function(notification/*INotification*/) {
    // Create the Application component.
    var app = new Puremvc.demo.view.components.Application({});

    // Register the ApplicationMediator passing the Application
    // instance to its constructor.
    this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Puremvc.demo.controller.StartupCommand = Ext.extend(puremvc.MacroCommand, {
  /**
   * Add the Subcommands to startup the PureMVC apparatus.
   *
   * Generally, it is best to prep the Model (mostly registering proxies)
   * followed by preparation of the View (mostly the registering of
   * Mediators).
   */
  initializeMacroCommand: function(note/*INotification*/) {
    this.addSubCommand(Puremvc.demo.controller.PrepControllerCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepModelCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepViewCommand);
  }
});

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

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.RoleEnum.prototype
 */
Ext.namespace("Puremvc.demo.model");
Puremvc.demo.model.RoleEnum = Ext.extend(Object, {
  constructor: function(value/*String*/, ordinal/*int*/) {
    Puremvc.demo.model.RoleEnum.superclass.constructor.call(this);
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
  }
});

Ext.apply(Puremvc.demo.model.RoleEnum, {
  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  NONE_SELECTED/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("--None Selected--", -1),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ADMIN/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Administrator", 0),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ACCT_PAY/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Accounts Payable", 1),

  /**
   * @type RoleEnum
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
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  GEN_LEDGER/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("General Ledger", 4),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  PAYROLL/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Payroll", 5),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  INVENTORY/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Inventory", 6),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  PRODUCTION/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Production", 7),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  QUALITY_CTL/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Quality Control", 8),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  SALES/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Sales", 9),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  ORDERS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Orders", 10),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  CUSTOMERS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Customers", 11),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  SHIPPING/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Shipping", 12),

  /**
   * @type RoleEnum
   * @constant
   * @memberof Puremvc.demo.model.RoleEnum
   */
  RETURNS/*RoleEnum*/: new Puremvc.demo.model.RoleEnum("Returns", 13),

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
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.RoleProxy.prototype
 */
Ext.namespace("Puremvc.demo.model");
Puremvc.demo.model.RoleProxy = Ext.extend(puremvc.Proxy, {

  /**
   * Constructor
   * @constructs
   */
  constructor: function() {
    Puremvc.demo.model.RoleProxy.superclass.constructor.call(this, Puremvc.demo.model.RoleProxy.NAME, []);

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            "lstooge",
            [
              Puremvc.demo.model.RoleEnum.PAYROLL,
              Puremvc.demo.model.RoleEnum.EMP_BENEFITS
            ]
           )
       );

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            "cstooge",
            [
              Puremvc.demo.model.RoleEnum.ACCT_PAY,
              Puremvc.demo.model.RoleEnum.ACCT_RCV,
              Puremvc.demo.model.RoleEnum.GEN_LEDGER
            ]
           )
       );

    this.addItem
      (
        new Puremvc.demo.model.vo.RoleVO
          (
            "mstooge",
            [
              Puremvc.demo.model.RoleEnum.INVENTORY,
              Puremvc.demo.model.RoleEnum.PRODUCTION,
              Puremvc.demo.model.RoleEnum.SALES,
              Puremvc.demo.model.RoleEnum.SHIPPING
            ]
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
   * @param {UserVO} user
   * @param {RoleEnum} role
   *
   * @return {Boolean}
   */
  doesUserHaveRole: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    var hasRole/*Boolean*/ = false;
    for (var i/*int*/ = 0; i < roles.length; i++) {
      if (roles[i].uname == user.uname) {
        var userRoles/*Array*/ = roles[i].roles;
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
   * @param {UserVO} user
   * @param {RoleEnum} role
   */
  addRoleToUser: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    var result/*Boolean*/ = false;
    if (!this.doesUserHaveRole(user, role)) {
      for (var i/*int*/ = 0; i < roles.length; i++) {
        if (roles[i].uname == user.uname) {
          var userRoles/*Array*/ = roles[i].roles;
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
   * @param {UserVO} user
   * @param {RoleEnum} role
   */
  removeRoleFromUser: function(user/*UserVO*/, role/*RoleEnum*/) {
    var roles = this.getRoles();
    if (this.doesUserHaveRole(user, role)) {
      for (var i/*int*/ = 0; i < roles.length; i++) {
        if (roles[i].uname == user.uname) {
          var userRoles/*Array*/ = roles[i].roles;
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
      if (roles[i].uname == uname) {
        userRoles = roles[i].roles;
        break;
      }
    }

    return userRoles;
  }
});

Ext.apply(Puremvc.demo.model.RoleProxy, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.model.RoleProxy
   */
  NAME: "RoleProxy"
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.UserProxy.prototype
 */
Ext.namespace("Puremvc.demo.model");
Puremvc.demo.model.UserProxy = Ext.extend(puremvc.Proxy, {

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
/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.Application.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Puremvc.demo.view.components.Application = Ext.extend(Ext.Viewport, {
  /**
   * @class Serves as the main application's View.  All
   * other Views will become children of this control making
   * the Application act as the "stage".
   *
   * @extends Ext.Viewport
   * @constructs
   */
  constructor: function(config) {
    config = Ext.apply({
      id: "applicationViewport",
      layout: {
        type: "fit"
      },
      defaults: {
        border: false,
        frame: true
      },
      items: [
        {
          xtype: "panel",
          id: "viewPortCenterRegion",
          region: "center",
          layout: {
            type: "vbox",
            align: "center",
            pack: "start"
          },
          hideBorders: true,
          defaults: {
            frame: false
          },
          items: [
            {
              xtype: "panel",
              layout: "fit",
              items: [
                {
                  xtype: "label",
                  html: "<span class=\"application-name\">Employee Admin</span>&nbsp;<span class=\"application-category\">PureMVC JavaScript/ExtJS3 Demo</span>"
                }
              ],
              flex: 0
            },
            {
              xtype: "x-demo-user-list-panel",
              id: "userList",
              width: 650,
              height: 250,
              flex: 1
            },
            {
              xtype: "panel",
              id: "userInformationPanel",
              layout: {
                type: "hbox",
                align: "stretch",
                pack: "start"
              },
              width: 650,
              height: 300,
              flex: 1,
              defaults: {
                frame: true
              },
              items: [
                {
                  xtype: "x-demo-user-form-panel",
                  id: "userForm",
                  width: 300,
                  flex: 1
                },
                {
                  xtype: "x-demo-role-list-panel",
                  id: "rolePanel",
                  width: 350,
                  flex: 1
                }
              ]
            }
          ]
        }
      ]
    }, config);
    Puremvc.demo.view.components.Application.superclass.constructor.call(this, config);
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.RolePanel.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Puremvc.demo.view.components.RolePanel = Ext.extend(Ext.grid.GridPanel, {

  /**
   * The currently displayed user roles.
   */
  user: null,

  /**
   * The currently selected user role.
   */
  selectedRole: null,

  /**
   * The add or remove role mode.
   */
  mode: null,

  /**
   * Constructor
   *
   * @extends Ext.form.FormPanel
   *
   * @constructs
   */
  constructor: function(config) {
    // Call superclass constructor.
    Puremvc.demo.view.components.RolePanel.superclass.constructor.call(this, config);

    // Initialize member fields.
    this.user = null;
    this.selectedRole = null;
    this.mode = null;
  },

  initComponent: function() {
    var config = {
      title: "User Roles",
      fbar: {
        buttonAlign: "right",
        items: [
          {
            xtype: "combo",
            id: "roleList",
            valueField: "ordinal",
            displayField: "value",
            typeAhead: true,
            mode: "local",
            forceSelection: true,
            triggerAction: "all",
            selectOnFocus: true,
            hiddenName: "roleListField",
            hiddenId: "roleListHidden",
            width: 135,
            store: new Ext.data.ArrayStore({
              // store configs
              autoDestroy: true,
              storeId: "rolesStore",
              // reader configs
              idIndex: 1,
              fields: [
                {name: "value", type: "string"},
                {name: "ordinal", type: "int"},
                {name: "associatedValue", type: "auto"}
              ]
            }),
            listeners: {
              "select": {
                fn: this.roleList_changeHandler,
                scope: this
              }
            }
          },
          {
            xtype: "tbbutton",
            id: "addRoleButton",
            text: "Add",
            listeners: {
              "click": {
                fn: this.addRoleButton_clickHandler,
                scope: this
              }
            }
          },
          {xtype: "tbspacer"},
          {
            xtype: "tbbutton",
            id: "removeRoleButton",
            text: "Remove",
            listeners: {
              "click": {
                fn: this.removeRoleButton_clickHandler,
                scope: this
              }
            }
          }
        ]
      },
      hideHeaders: true,
      frame: true,
      store: new Ext.data.Store({
        // store configs
        autoDestroy: true,
        storeId: "userRolesStore",
        // reader configs
        idIndex: 1,
        fields: [
          {name: "value", type: "string"},
          {name: "ordinal", type: "int"},
          {name: "associatedValue", type: "auto"}
        ]
      }),
      columns: [
        {
          dataIndex: "value"
        }
      ],
      selModel: new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
          "selectionchange": {
            fn: this.userRoleList_changeHandler,
            scope: this
          }
        }
      }),
      view: new Ext.grid.GridView({
        forceFit: true
      })
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    Puremvc.demo.view.components.RolePanel.superclass.initComponent.call(this);

    this.addEvents(Puremvc.demo.view.components.RolePanel.ADD, Puremvc.demo.view.components.RolePanel.REMOVE);

    this.fillRoleList();
    this.setEnabled(false);
  },

  /**
   * Add items from DeptEnum to the <code>userRoleList</code>.
   */
  fillRoleList: function() {
    var roleEnumList = Puremvc.demo.model.RoleEnum.getComboList();

    /* First clear out any existing roles. */
    var roleListCombo = this.getFooterToolbar().get("roleList");
    var store = roleListCombo.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the rolelist combobox with data from the role enum list.
    for (var i = 0; i < roleEnumList.length; i++) {
      var role/*RoleVO*/ = roleEnumList[i];
      role["associatedValue"] = role;
      var roleRecord = new Puremvc.demo.view.components.RolePanel.RoleEnumRecordType(role, role.ordinal);
      store.add(roleRecord);
    }
  },

  /**
   * Set the displayed user roles list.
   *
   * @param {Array} userRoles
   */
  setUserRoles: function(userRoles/*Array*/) {
    userRoles = userRoles || [];

    /* First clear out any existing roles. */
    var store = this.getStore();
    store.removeAll(false); // true -> Don't fire the 'clear' event.

    // Load the rolelist with data from the role enum list.
    for (var i = 0; i < userRoles.length; i++) {
      var role/*RoleVO*/ = userRoles[i];
      role["associatedValue"] = role;
      var roleRecord = new Puremvc.demo.view.components.RolePanel.RoleEnumRecordType(role, role.ordinal);
      store.add(roleRecord);
    }
  },

  getSelectedRole: function() {
    var roleListCombo = this.getFooterToolbar().get("roleList");
    var store = roleListCombo.getStore();
    var value = roleListCombo.getValue();
    var selectedRecord = store.getById(value);
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedRoleValue: function(value/*Number*/) {
    var roleListCombo = this.getFooterToolbar().get("roleList");
    roleListCombo.setValue(value);
  },

  getSelectedUserRole: function() {
    var selectedRecords = this.selModel.getSelections();
    var selectedRecord = (selectedRecords.length > 0) ? selectedRecords[0] : null;
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedUserRoleValue: function(value/*Number*/) {
    if (value == -1) {
      this.selModel.clearSelections();
    }
    else {
      this.selModel.selectRow(value, false);
    }
  },

  /**
   * Enable or disable the form.
   */
  setEnabled: function(isEnabled/*Boolean*/) {
    var flag = !isEnabled;

    var controls = ["addRoleButton", "removeRoleButton", "roleList"];
    for (var i = 0; i < controls.length; ++i) {
      var control = this.getFooterToolbar().get(controls[i]);
      control.setDisabled(flag);
    }

    this.setDisabled(flag);

    if (flag) {
      this.setSelectedRoleValue(-1);
    }
  },

  /**
   * Set the role mode of this form: add or remove.
   *
   * @param {String} mode The Add/Remove role mode of the form.
   */
  setMode: function(mode/*String*/) {
    var fbar = this.getFooterToolbar();
    var addRoleButton = fbar.get("addRoleButton");
    var removeRoleButton = fbar.get("removeRoleButton");

    switch (mode) {
      case Puremvc.demo.view.components.RolePanel.ADD_MODE:
        addRoleButton.enable();
        removeRoleButton.disable();
        break;

      case Puremvc.demo.view.components.RolePanel.REMOVE_MODE:
        addRoleButton.disable();
        removeRoleButton.enable();
        this.setSelectedRoleValue(-1);
        break;

      default:
        addRoleButton.disable();
        removeRoleButton.disable();
    }
  },

  /**
   * Clear the panel of all its displayed data.
   */
  clearForm: function() {
    this.user = null;
    this.setUserRoles();
    this.setSelectedRoleValue(-1);
  },

  /**
   * Add button onclick event listener.
   */
  addRoleButton_clickHandler: function() {
    this.fireEvent(Puremvc.demo.view.components.RolePanel.ADD, this);
  },

  /**
   * Remove button onclick event listener.
   */
  removeRoleButton_clickHandler: function() {
    this.fireEvent(Puremvc.demo.view.components.RolePanel.REMOVE, this);
  },

  /**
   * Select role to remove.
   */
  userRoleList_changeHandler: function() {
    this.setSelectedRoleValue(-1);
    this.selectedRole = this.getSelectedUserRole();

    this.setMode(Puremvc.demo.view.components.RolePanel.REMOVE_MODE);
  },

  /**
   * Select role to add.
   */
  roleList_changeHandler: function() {
    this.setSelectedUserRoleValue(-1);
    this.selectedRole = this.getSelectedRole();

    if (this.selectedRole == Puremvc.demo.model.RoleEnum.NONE_SELECTED) {
      this.setMode(null);
    }
    else {
      this.setMode(Puremvc.demo.view.components.RolePanel.ADD_MODE);
    }
  }
});

Ext.apply(Puremvc.demo.view.components.RolePanel, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.RolePanel
   */
  ADD: "add",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.RolePanel
   */
  REMOVE: "remove",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.RolePanel
   */
  ADD_MODE: "addMode",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.RolePanel
   */
  REMOVE_MODE: "removeMode",

  /**
   * A custom Ext.data.Record type.
   *
   * @type Puremvc.demo.view.components.RolePanel.RoleEnumRecordType
   * @constant
   * @memberof Puremvc.demo.view.components.RolePanel
   */
  RoleEnumRecordType: Ext.data.Record.create([
    {name: "value", allowBlank: false, type: "string"},
    {name: "ordinal", allowBlank: false, type: "int"},
    {name: "associatedValue", type: "auto"}
  ])
});

Ext.reg("x-demo-role-list-panel", Puremvc.demo.view.components.RolePanel);

/*
 PureMVC Javascript Employee Admin Demo for ExtJS by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserForm.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserForm = Ext.extend(Ext.form.FormPanel, {

  /**
   * @type Puremvc.demo.model.vo.UserVO
   */
  user: null,

  /**
   * @type String
   */
  mode: null,

  /**
   * Constructor
   */
  constructor: function(config) {
    // Call superclass constructor.
    Puremvc.demo.view.components.UserForm.superclass.constructor.call(this, config);

    // Initialize member fields.
    this.user/*UserVO*/ = null;
    this.mode/*String*/ = null;
  },

  /**
   * Creates all children required to create the
   * initial View state of this control and adds them to the DOM.
   */
  initComponent: function() {
    var config = {
      title: "User Profile",
      buttons: [
        {
          xtype: "tbbutton",
          id: "submitButton",
          text: "Add User",
          handler: this.submit_clickHandler.createDelegate(this)
        },
        {
          xtype: "tbbutton",
          id: "cancelButton",
          text: "Cancel",
          handler: this.cancel_clickHandler.createDelegate(this)
        }
      ],
      defaults: {
        width: 135
      },
      items: [
        {
          xtype: "textfield",
          id: "fname",
          fieldLabel: "First Name",
          msgTarget: "side"
        },
        {
          xtype: "textfield",
          id: "lname",
          fieldLabel: "Last Name",
          msgTarget: "side"
        },
        {
          xtype: "textfield",
          id: "email",
          fieldLabel: "Email",
          msgTarget: "side",
          vtype: "email"
        },
        {
          xtype: "textfield",
          id: "uname",
          fieldLabel: "User Name",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          }
        },
        {
          xtype: "textfield",
          id: "password",
          fieldLabel: "Password",
          inputType: "password",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          }
        },
        {
          xtype: "textfield",
          id: "confirm",
          fieldLabel: "Confirm Password",
          inputType: "password",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          }
        },
        {
          xtype: "combo",
          id: "department",
          fieldLabel: "Department",
          valueField: "ordinal",
          displayField: "value",
          typeAhead: true,
          mode: "local",
          forceSelection: true,
          triggerAction: "all",
          selectOnFocus: true,
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          },
          store: new Ext.data.Store({
            // store configs
            autoDestroy: true,
            storeId: "deptStore",
            // reader configs
            idIndex: 1,
            fields: [
              {name: "value", type: "string"},
              {name: "ordinal", type: "int"},
              {name: "associatedValue", type: "auto"}
            ]
          })
        }
      ],
      labelWidth: 120
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    Puremvc.demo.view.components.UserForm.superclass.initComponent.call(this);

    this.addEvents(Puremvc.demo.view.components.UserForm.ADD,
      Puremvc.demo.view.components.UserForm.UPDATE,
      Puremvc.demo.view.components.UserForm.CANCEL);

    this.fillList();

    // Erase any pre-existing form information.
    this.clearForm();
    this.setEnabled(false);

    // Add required indicator to the appropriate fields.
    Puremvc.demo.common.Util.addRequiredToFieldLabel([
      this.findById("uname"),
      this.findById("password"),
      this.findById("confirm"),
      this.findById("department")
    ]);
  },

  getSelectedDept: function() {
    var deptListCombo = this.getForm().findField("department");
    var store = deptListCombo.getStore();
    var value = deptListCombo.getValue();
    var selectedRecord = store.getById(value);
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedDeptValue: function(value/*Number*/) {
    var deptListCombo = this.getForm().findField("department");
    deptListCombo.setValue(value);
  },

  /**
   * Add items from DeptEnum to the Department combobox component.
   */
  fillList: function() {
    var deptEnumList = Puremvc.demo.model.DeptEnum.getComboList();

    /* First clear out any existing departments. */
    var deptListCombo = this.getForm().findField("department");
    var store = deptListCombo.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the department combobox with data from the dept enum list.
    for (var i = 0; i < deptEnumList.length; i++) {
      var dept = deptEnumList[i];
      dept["associatedValue"] = dept; // Store the enum
      var deptRecord = new Puremvc.demo.view.components.UserForm.DeptEnumRecordType(dept, dept.ordinal);
      store.add(deptRecord);
    }
  },

  /**
   * Give focus to the first field in the form component.
   */
  setFocus: function() {
    var firstNameField = this.getForm().findField("fname");
    firstNameField.focus();
  },

  /**
   * Select the user whose data will populate the form.
   *
   * @param {UserVO} user
   */
  setUser: function(user/*UserVO*/) {
    this.user = user;

    if (user == null) {
      this.clearForm();
    }
    else {
      var form = this.getForm();
      form.findField("uname").setValue(user.uname);
      form.findField("fname").setValue(user.fname);
      form.findField("lname").setValue(user.lname);
      form.findField("email").setValue(user.email);
      form.findField("password").setValue(user.password);
      form.findField("confirm").setValue(user.password);
      this.setSelectedDeptValue(user.department.ordinal);
    }
  },

  /**
   * @return {UserVO}
   */
  getUser: function() {
    this.updateUser();
    return this.user;
  },

  /**
   * Update user attributes with form fields value.
   */
  updateUser: function() {
    var form = this.getForm();
    this.user.uname = form.findField("uname").getValue();
    this.user.fname = form.findField("fname").getValue();
    this.user.lname = form.findField("lname").getValue();
    this.user.email = form.findField("email").getValue();
    this.user.password = form.findField("password").getValue();
    this.user.department = this.getSelectedDept();
  },

  /**
   * Clear the whole form.
   */
  clearForm: function() {
    var form = this.getForm();
    form.reset();
    form.findField("department").setValue(-1);
    form.clearInvalid();

//    this.setFieldError("uname", null);
//    this.setFieldError("fname", null);
//    this.setFieldError("lname", null);
//    this.setFieldError("email", null);
//    this.setFieldError("password", null);
//    this.setFieldError("confirm", null);
//    this.setFieldError("department", null);
  },

  /**
   * Enable or disable the form.
   */
  setEnabled: function(isEnabled/*Boolean*/) {
    var flag = !isEnabled;

    var form = this.getForm();
    var controls = ["fname", "lname", "email", "password", "confirm", "department"];
    var control = null;
    for (var i = 0; i < controls.length; ++i) {
      control = form.findField(controls[i]);
      control.setDisabled(flag);
    }

    controls = ["submitButton", "cancelButton"];
    for (var j = 0; j < controls.length; ++j) {
      control = this.getFooterToolbar().get(controls[j]);
      control.setDisabled(flag);
    }

    form.findField("uname").setDisabled(!(isEnabled && this.mode == Puremvc.demo.view.components.UserForm.MODE_ADD));
  },

  /**
   * Set the form mode to ADD or EDIT.
   *
   * @param {String} mode
   */
  setMode: function(mode/*String*/) {
    this.mode = mode;

    var submitButton = this.getFooterToolbar().get("submitButton");

    switch (mode) {
      case Puremvc.demo.view.components.UserForm.MODE_ADD:
        submitButton.setText("Add User");
        break;

      case Puremvc.demo.view.components.UserForm.MODE_EDIT:
        submitButton.setText("Update Profile");
        this.getForm().findField("uname").disable();
        break;
    }
  },

  /**
   * Submit the add or update.
   */
  submit_clickHandler: function() {
    if (!this.getErrors()) {
      this.updateUser();

      if (this.user.getIsValid()) {
        if (this.mode == Puremvc.demo.view.components.UserForm.MODE_ADD) {
          this.fireEvent(Puremvc.demo.view.components.UserForm.ADD, this);
        }
        else {
          this.fireEvent(Puremvc.demo.view.components.UserForm.UPDATE, this);
        }
      }
    }
  },

  /**
   * Display errors associated with form fields and return if at least one
   * field is in error.
   *
   * @return {Boolean}
   */
  getErrors: function() {
    var retVal = false;

    var form = this.getForm();
    var uname = form.findField("uname").getValue();
    var error/*Boolean*/ = Ext.isEmpty(uname);
    var errorMessage = (error) ? "User Name is a required field." : null;
    this.setFieldError("uname", errorMessage);
    retVal = error;

    var password = form.findField("password").getValue();
    error = Ext.isEmpty(password);
    errorMessage = (error) ? "Password is a required field." : null;
    this.setFieldError("password", errorMessage);
    retVal = retVal | error;

    var confirm = form.findField("confirm").getValue();
    error = (Ext.isEmpty(password) || confirm != password);
    errorMessage = (error) ? "The value of the Confirm Password field must match the value of the Password field." : null;
    this.setFieldError("confirm", errorMessage);
    retVal = retVal || error;

    var department = this.getSelectedDept();
    error = (department == Puremvc.demo.model.DeptEnum.NONE_SELECTED);
    errorMessage = (error) ? "A value must be selected for the Department field." : null;
    this.setFieldError("department", errorMessage);
    retVal = retVal || error;

    return retVal;
  },

  /**
   * Cancel the add or update.
   */
  cancel_clickHandler: function() {
    this.fireEvent(Puremvc.demo.view.components.UserForm.CANCEL, this);
  },

  /**
   * Handle focus event on all the required form fields.
   *
   * @param {Ext.form.Field} field
   */
  field_focusHandler: function(field) {
    this.setFieldError(field.id, null);
  },

  /**
   * Set or unset the error state on the uname field.
   *
   * @param {String} fieldName
   * @param {String} errorMessage
   */
  setFieldError: function(fieldName/*String*/, errorMessage/*String*/) {
    var field = this.getForm().findField(fieldName);

    if (!Ext.isEmpty(errorMessage)) {
      field.markInvalid(errorMessage);
    }
    else {
      field.clearInvalid();
    }
  }
});

Ext.apply(Puremvc.demo.view.components.UserForm, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  ADD: "add",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  UPDATE: "update",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  CANCEL: "cancel",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  MODE_ADD: "modeAdd",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  MODE_EDIT: "modeEdit",

  /**
   * A custom Ext.data.Record type.
   *
   * @type Puremvc.demo.view.components.UserForm.DeptEnumRecordType
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  DeptEnumRecordType: Ext.data.Record.create([
    {name: "value", allowBlank: false, type: "string"},
    {name: "ordinal", allowBlank: false, type: "int"},
    {name: "associatedValue", type: "auto"}
  ])
});

Ext.reg("x-demo-user-form-panel", Puremvc.demo.view.components.UserForm);

/*
 PureMVC Javascript Employee Admin Demo for ExtJS by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserList.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserList = Ext.extend(Ext.grid.GridPanel, {

  /**
   * @type Puremvc.demo.model.vo.UserVO
   */
  selectedUser: null,

  /**
   * Constructor
   */
  constructor: function(config) {
    // Call superclass constructor.
    Puremvc.demo.view.components.UserList.superclass.constructor.call(this, config);

    // Initialize member fields.
    this.selectedUser/*UserVO*/ = null;
  },

  /**
   * Creates all children required to create the
   * initial View state of this control and adds them to the DOM.
   */
  initComponent: function() {
    var config = {
      title: "Users",
      frame: true,
      stripeRows: true,
      buttons: [
        {
          xtype: "tbbutton",
          id: "deleteButton",
          text: "Delete",
          listeners: {
            "click": {
              fn:this.deleteButton_clickHandler,
              scope: this
            }
          }
        },
        {
          xtype: "tbbutton",
          id: "newButton",
          text: "Add",
          listeners: {
            "click": {
              fn: this.newButton_clickHandler,
              scope: this
            }
          }
        }
      ],

      columnModel: this.colModel,

      selModel: new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
          "rowselect": {
            fn: this.userList_changeHandler,
            scope: this
          }
        }
      }),

      store: new Ext.data.Store({
        autoDestroy: true,
        storeId: "userStore",
        // reader configs
        idIndex: 0,
        fields: [
          {name: "uname", type: "string"},
          {name: "fname", type: "string"},
          {name: "lname", type: "string"},
          {name: "email", type: "string"},
          {name: "password", type: "string"},
          {name: "department", type: "auto"}
        ]
      }),

      view: new Ext.grid.GridView({
        forceFit: true
      })
    }
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    Puremvc.demo.view.components.UserList.superclass.initComponent.call(this);

    this.addEvents(Puremvc.demo.view.components.UserList.NEW, Puremvc.demo.view.components.UserList.DELETE, Puremvc.demo.view.components.UserList.SELECT);
  },

  colModel: new Ext.grid.ColumnModel({
    columns: [
      {header: "User Name", dataIndex: "uname"},
      {header: "First Name", dataIndex: "fname"},
      {header: "Last Name", dataIndex: "lname"},
      {header: "Email", dataIndex: "email", width: 122},
      {header: "Password", dataIndex: "password"},
      {header: "Department", dataIndex: "department",
        renderer: function(data, metaData, record, rowIndex, colIndex, store) {
          var retVal = (data.value != Puremvc.demo.model.DeptEnum.NONE_SELECTED ? data.value : "");
          return retVal;
        }
      }
    ],
    defaults: {
      width: 100,
      resizable: true,
      sortable: true
    }
  }),

  /**
   * Add items from a UserVO list to the grid's store.
   */
  setUsers: function(userList/*Array*/) {
    /* First clear out any existing users. */
    var store = this.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the userlist grid with data from the given array of UserVOs.
    for (var i = 0; i < userList.length; i++) {
      var user = userList[i];
      /*UserVO*/
      var userRecord = new Puremvc.demo.view.components.UserList.UserRecordType(user, user.uname);
      store.add(userRecord);
    }
  },

  /**
   * List selection changed event listener.
   *
   * @param {Ext.grid.RowSelectionModel} sm
   * @param {Number} rowIndex
   * @param {Ext.data.Record} record
   */
  userList_changeHandler: function(sm/*RowSelectionModel*/, rowIndex/*Number*/, record/*Ext.data.Record*/) {
    this.selectedUser = new Puremvc.demo.model.vo.UserVO(record.get('uname'), record.get('fname'), record.get('lname'),
      record.get('email'), record.get('password'), record.get('department'));

    var deleteButton = this.getFooterToolbar().get("deleteButton");
    deleteButton.enable();

    this.fireEvent(Puremvc.demo.view.components.UserList.SELECT, this);
  },

  /**
   * New button click event listener.
   */
  newButton_clickHandler: function() {
    this.deSelect();
    this.fireEvent(Puremvc.demo.view.components.UserList.NEW, this);
  },

  /**
   * Delete button click event listener.
   */
  deleteButton_clickHandler: function() {
    this.fireEvent(Puremvc.demo.view.components.UserList.DELETE, this);
  },

  /**
   * Remove selection in the user list.
   */
  deSelect: function() {
    var sm = this.getSelectionModel();
    sm.clearSelections();
    this.selectedUser = null;

    var deleteButton = this.getFooterToolbar().get("deleteButton");
    deleteButton.disable();
  }
});

Ext.apply(Puremvc.demo.view.components.UserList, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserList
   */
  NEW: "new",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserList
   */
  DELETE: "delete",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserList
   */
  SELECT: "select",

  /**
   * A custom Ext.data.Record type.
   *
   * @type Puremvc.demo.view.components.UserList.UserRecordType
   * @constant
   * @memberof Puremvc.demo.view.components.UserList
   */
  UserRecordType: Ext.data.Record.create([
    {name: "uname", allowBlank: false, type: "string"},
    {name: "fname", allowBlank: false, type: "string"},
    {name: "lname", allowBlank: false, type: "string"},
    {name: "email", allowBlank: true, type: "string"},
    {name: "password", allowBlank: false, type: "string"},
    {name: "department", type: "auto"}
  ])
});

Ext.reg("x-demo-user-list-panel", Puremvc.demo.view.components.UserList);

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.ApplicationMediator.prototype
 */
Ext.namespace('Puremvc.demo.view');
Puremvc.demo.view.ApplicationMediator = Ext.extend(puremvc.Mediator, {
  /**
   * A named shortcut to the <code>Application</code> instance.  This
   * prevents us from having to reference the more
   * ambiguous <code>viewComponent</code> property.
   * @type Puremvc.demo.view.components.Application
   */
  app: null,

  /**
   * @class The <code>Mediator</code> subclass attached to
   * the <code>Shell</code>.  Its primary responsibility here is
   * to register additional <code>Mediator</code>s for child <code>View</code>s but
   * it can listen for and/or send <code>Notification</code>s and steward
   * state changes for the View.
   *
   * @param {Puremvc.demo.view.components.Application} viewComponent the view component to register with the <code>ApplicationMediator</code>.
   *
   * @extends puremvc.Mediator
   *
   * @see Puremvc.demo.view.components.Application
   *
   * @constructs
   */
  constructor: function(viewComponent /* Puremvc.demo.view.components.Application */) {
    Puremvc.demo.view.ApplicationMediator.superclass.constructor.call(this, Puremvc.demo.view.ApplicationMediator.NAME, viewComponent);
    this.app = this.getViewComponent();
  },

  /**
   * Provides a list of notification interests to the <code>View</code>.
   * Without an accurate list, the <code>handleNotification()</code> method
   * may not be invoked.  A common mistake made by developers is to provide handling
   * routines in the <code>handleNotification()</code> method but forget to
   * add the notification name in the <code>listNotificationInterests()</code> array.
   * <p>Note that changing this array at runtime will not have any effect on
   * notification interests since this method is called by the <code>View</code>
   * a single time when the <code>Mediator</code> is first registered.
   *
   * @return {String[]} the array of notification names to act upon.
   */
  listNotificationInterests: function() {
    return [];
  },

  /**
   * Handles notifications broadcasted by the system provided that
   * the <code>Notification</code> is listed in the <code>listNotificationInterests()</code>
   * return value.
   *
   * @param {puremvc.Notification} notification the notification to act upon.
   */
  handleNotification: function(notification /* puremvc.Notification */) {
    switch (notification.getName()) {
      default:
        break;
    }
  },

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    Puremvc.demo.view.ApplicationMediator.superclass.onRegister.call(this);
    
    // Handle creation and registration of any Mediators that can be initialized
    // at startup.
    var child = this.app.findById('userForm');
    this.facade.registerMediator(new Puremvc.demo.view.UserFormMediator(child));

    child = this.app.findById('userList');
    this.facade.registerMediator(new Puremvc.demo.view.UserListMediator(child));

    child = this.app.findById('rolePanel');
    this.facade.registerMediator(new Puremvc.demo.view.RolePanelMediator(child));

    this.initializeComponent();
  },

  initializeComponent: function() {
  }
});

Ext.apply(Puremvc.demo.view.ApplicationMediator,
/**
 * @lends Puremvc.demo.view.ApplicationMediator
 */
{
  /**
   * Constant used as a unique name for this <code>Mediator</code> subclass.
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.ApplicationMediator
   */
  NAME: "ApplicationMediator"
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.RolePanelMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Puremvc.demo.view.RolePanelMediator = Ext.extend(puremvc.Mediator, {
  /**
   * Constructor
   *
   * @extends puremvc.Mediator
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    Puremvc.demo.view.RolePanelMediator.superclass.constructor.call(this, Puremvc.demo.view.RolePanelMediator.NAME, viewComponent);
  },

  /**
   * @return {RolePanel}
   */
  getRolePanel: function() {
    return this.viewComponent;
  },

  /**
   *
   */
  onAddRole: function() {
    var rolePanel/*RolePanel*/ = this.getRolePanel();
    this.roleProxy.addRoleToUser(rolePanel.user, rolePanel.selectedRole);
    rolePanel.setMode(null);
  },

  /**
   *
   */
  onRemoveRole: function() {
    var rolePanel/*RolePanel*/ = this.getRolePanel();
    this.roleProxy.removeRoleFromUser(rolePanel.user, rolePanel.selectedRole);
    this.updateUserRoleList();
    rolePanel.setMode(null);
  },

  /**
   *
   */
  updateUserRoleList: function() {
    var rolePanel/*RolePanel*/ = this.getRolePanel();
    var userName/*String*/ = rolePanel.user.uname;
    var userRoles/*Array*/ = this.roleProxy.getUserRoles(userName);
    rolePanel.setUserRoles(userRoles);
  },

  /**
   * @override
   * @return {Array}
   */
  listNotificationInterests: function() {
    return [
      Puremvc.demo.ApplicationFacade.NEW_USER,
      Puremvc.demo.ApplicationFacade.USER_ADDED,
      Puremvc.demo.ApplicationFacade.USER_UPDATED,
      Puremvc.demo.ApplicationFacade.USER_DELETED,
      Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,
      Puremvc.demo.ApplicationFacade.USER_SELECTED,
      Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT
    ];
  },

  /**
   * @override
   */
  handleNotification: function(note/*INotification*/) {
    var rolePanel/*RolePanel*/ = this.getRolePanel();

    switch (note.getName()) {
      case Puremvc.demo.ApplicationFacade.NEW_USER:
        rolePanel.clearForm();
        rolePanel.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.USER_ADDED:
        rolePanel.user/*UserVO*/ = note.getBody();
        var roleVO/*RoleVO*/ = new Puremvc.demo.model.vo.RoleVO(rolePanel.user.uname);
        this.roleProxy.addItem(roleVO);

        rolePanel.clearForm();
        rolePanel.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.USER_UPDATED:
        rolePanel.clearForm();
        rolePanel.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.USER_DELETED:
        rolePanel.clearForm();
        rolePanel.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:
        rolePanel.clearForm();
        rolePanel.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.USER_SELECTED:
        rolePanel.clearForm();
        rolePanel.setEnabled(true);
        rolePanel.setMode(null);

        rolePanel.user = note.getBody();
        this.updateUserRoleList();
        break;

      case Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT:
        this.updateUserRoleList();
        break;
    }
  },

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    Puremvc.demo.view.RolePanelMediator.superclass.onRegister.call(this);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var rolePanel/*RolePanel*/ = this.getRolePanel();
    rolePanel.on(Puremvc.demo.view.components.RolePanel.ADD, this.onAddRole, this);
    rolePanel.on(Puremvc.demo.view.components.RolePanel.REMOVE, this.onRemoveRole, this);

    this.roleProxy = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
  }
});

Ext.apply(Puremvc.demo.view.RolePanelMediator, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.RolePanelMediator
   */
  NAME: "RolePanelMediator"
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.UserFormMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Puremvc.demo.view.UserFormMediator = Ext.extend(puremvc.Mediator, {

  /**
   * Constructor
   *
   * @extends puremvc.Mediator
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    Puremvc.demo.view.UserFormMediator.superclass.constructor.call(this, Puremvc.demo.view.UserFormMediator.NAME, viewComponent);
  },

  /**
   *
   */
  userProxy/*UserProxy*/: null,

  /**
   *
   */
  getUserForm: function()/*UserForm*/ {
    return this.viewComponent;
  },

  /**
   *
   */
  onAdd: function() {
    var user/*UserVO*/ = this.getUserForm().getUser();
    this.userProxy.addItem(user);
    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_ADDED, user);

    var userForm/*UserForm*/ = this.getUserForm();
    userForm.clearForm();
    userForm.setEnabled(false);
    userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
  },

  /**
   *
   */
  onUpdate: function() {
    var user/*UserVO*/ = this.getUserForm().getUser();
    this.userProxy.updateItem(user);
    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_UPDATED, user);

    var userForm/*UserForm*/ = this.getUserForm();
    userForm.clearForm();
    userForm.setEnabled(false);
    userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
  },

  /**
   *
   */
  onCancel: function() {
    this.sendNotification(Puremvc.demo.ApplicationFacade.CANCEL_SELECTED);

    var userForm/*UserForm*/ = this.getUserForm();
    userForm.clearForm();
    userForm.setEnabled(false);
    userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
  },

  /**
   * @override
   *
   * @return {Array}
   */
  listNotificationInterests: function() {
    return [
      Puremvc.demo.ApplicationFacade.NEW_USER,
      Puremvc.demo.ApplicationFacade.USER_DELETED,
      Puremvc.demo.ApplicationFacade.USER_SELECTED
    ];
  },

  /**
   * @override
   */
  handleNotification: function(note/*INotification*/) {
    var userForm/*UserForm*/ = this.getUserForm();
    switch (note.getName()) {
      case Puremvc.demo.ApplicationFacade.NEW_USER:
        userForm.setUser(note.getBody());
        userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_ADD);
        userForm.setEnabled(true);
        userForm.setFocus();
        break;

      case Puremvc.demo.ApplicationFacade.USER_DELETED:
        userForm.clearForm();
        userForm.setEnabled(false);
        break;

      case Puremvc.demo.ApplicationFacade.USER_SELECTED:
        userForm.clearForm();
        userForm.setUser(note.getBody());
        userForm.setMode(Puremvc.demo.view.components.UserForm.MODE_EDIT);
        userForm.setEnabled(true);
        userForm.setFocus();
        break;
    }
  },

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    Puremvc.demo.view.UserFormMediator.superclass.onRegister.call(this);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var userForm/*UserForm*/ = this.getUserForm();
    userForm.on(Puremvc.demo.view.components.UserForm.ADD, this.onAdd, this);
    userForm.on(Puremvc.demo.view.components.UserForm.UPDATE, this.onUpdate, this);
    userForm.on(Puremvc.demo.view.components.UserForm.CANCEL, this.onCancel, this);

    this.userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
  }
});

Ext.apply(Puremvc.demo.view.UserFormMediator, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.UserFormMediator
   */
  NAME: "UserFormMediator"
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.UserListMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Puremvc.demo.view.UserListMediator = Ext.extend(puremvc.Mediator, {

  /**
   * Constructor
   *
   * @extends puremvc.Mediator
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    Puremvc.demo.view.UserListMediator.superclass.constructor.call(this, Puremvc.demo.view.UserListMediator.NAME, viewComponent);
  },

  /**
   * @return {UserList}
   */
  getUserList: function() {
    return this.viewComponent;
  },

  /**
   *
   */
  onNew: function() {
    var user/*UserVO*/ = new Puremvc.demo.model.vo.UserVO();
    this.sendNotification(Puremvc.demo.ApplicationFacade.NEW_USER, user);
  },

  /**
   *
   */
  onDelete: function() {
    var selectedUser = this.getUserList().selectedUser;
    if (selectedUser == null) {
      return;
    }

    this.sendNotification(Puremvc.demo.ApplicationFacade.DELETE_USER,
      this.getUserList().selectedUser);
  },

  /**
   *
   */
  onSelect: function() {
    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_SELECTED,
      this.getUserList().selectedUser);
  },

  /**
   * @override
   *
   * @return {Array}
   */
  listNotificationInterests: function() {
    return [
      Puremvc.demo.ApplicationFacade.CANCEL_SELECTED,
      Puremvc.demo.ApplicationFacade.USER_UPDATED,
      Puremvc.demo.ApplicationFacade.USER_ADDED,
      Puremvc.demo.ApplicationFacade.USER_DELETED
    ];
  },

  /**
   * @override
   *
   * @param {Notification}
    */
  handleNotification: function(note/*INotification*/) {
    var userList/*UserList*/ = this.getUserList();
    var userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);

    switch (note.getName()) {
      case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_UPDATED:
        userList.setUsers(userProxy.getUsers());
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_ADDED:
        userList.setUsers(userProxy.getUsers());
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_DELETED:
        userList.setUsers(userProxy.getUsers());
        userList.deSelect();
        break;
    }
  },

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    Puremvc.demo.view.UserListMediator.superclass.onRegister.call(this);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var userList/*UserList*/ = this.getUserList();
    userList.on(Puremvc.demo.view.components.UserList.NEW, this.onNew, this);
    userList.on(Puremvc.demo.view.components.UserList.DELETE, this.onDelete, this);
    userList.on(Puremvc.demo.view.components.UserList.SELECT, this.onSelect, this);

//    userList.getSelectionModel().on("rowselect", userList.userList_changeHandler, userList);

    var userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userList.setUsers(userProxy.getUsers());

    userList.deSelect();
  }
});

Ext.apply(Puremvc.demo.view.UserListMediator, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.UserListMediator
   */
  NAME: "UserListMediator"
});
