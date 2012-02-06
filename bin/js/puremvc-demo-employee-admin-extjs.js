/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.ApplicationFacade.prototype
 */
Ext.namespace("Puremvc.demo");
Ext.define("Puremvc.demo.ApplicationFacade", {

  /** @extends puremvc.Facade */
  extend: "puremvc.Facade",

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
   *
   * @param {string} key The multiton key.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function(key /* string */) {
    this.callParent(arguments);
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
    this.callParent(arguments);

    this.registerCommand(Puremvc.demo.ApplicationFacade.STARTUP, Puremvc.demo.controller.StartupCommand);
  },

  statics: {

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
  }
});
/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

Ext.namespace("Puremvc.demo.common");
Ext.define("Puremvc.demo.common.Util", {

  extend: "Object",

  /**
   * @class A static class for holding miscellaneous shared utility
   * functions that may be used throughout the application.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  statics: {
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
    }
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.AddRoleResultCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.AddRoleResultCommand", {

  extend: "puremvc.AsyncCommand",

  execute: function(notification/*INotification*/) {
    var result/*Boolean*/ = notification.getBody();

    if (result === false) {
      Puremvc.demo.common.Util.alert("Role already exists for this user!", "Add User Role");
    }

    this.commandComplete();
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.DeleteUserCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.DeleteUserCommand", {

  extend: "puremvc.AsyncCommand",

  execute: function(notification/*INotification*/) {
    var user/*UserVO*/ = notification.getBody();

    var userProxy/*UserProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userProxy.deleteItem(user);

    var roleProxy/*RoleProxy*/ = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
    roleProxy.deleteItem(user);

    this.sendNotification(Puremvc.demo.ApplicationFacade.USER_DELETED);

    this.commandComplete();
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepControllerCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepControllerCommand", {

  /** @extends puremvc.AsyncCommand */
  extend: "puremvc.AsyncCommand",

  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the <code>Controller</code>.
   * This is where all <code>Command</code> subclasses are
   * registered with the <code>Controller</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification /* Notification */) {
    // Register all of the non-system commands used by the application.
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT, Puremvc.demo.controller.AddRoleResultCommand);
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER, Puremvc.demo.controller.DeleteUserCommand);

    this.commandComplete();
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepModelCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepModelCommand", {

  extend: "puremvc.AsyncCommand",

  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification/*INotification*/) {
    this.facade.registerProxy(new Puremvc.demo.model.UserProxy());
    this.facade.registerProxy(new Puremvc.demo.model.RoleProxy());

    this.commandComplete();
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.PrepViewCommand", {

  extend: "puremvc.AsyncCommand",

  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the <code>View</code>.
   * This is where the <code>ApplicationMediator</code> subclass is
   * registered with the <code>View</code>.
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    this.callParent(arguments);
  },

  execute: function(notification/*INotification*/) {
    // Create the Application component.
    var app = new Puremvc.demo.view.components.Application();

    // Register the ApplicationMediator passing the Application
    // instance to its constructor.
    this.facade.registerMediator(new Puremvc.demo.view.ApplicationMediator(app));

    this.commandComplete();
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.controller.PrepViewCommand.prototype
 */
Ext.namespace("Puremvc.demo.controller");
Ext.define("Puremvc.demo.controller.StartupCommand", {

  extend: "puremvc.AsyncMacroCommand",

  /**
   * Add the Subcommands to startup the PureMVC apparatus.
   *
   * Generally, it is best to prep the Model (mostly registering proxies)
   * followed by preparation of the View (mostly the registering of
   * Mediators).
   */
  initializeAsyncMacroCommand: function(note/*INotification*/) {
    this.addSubCommand(Puremvc.demo.controller.PrepControllerCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepModelCommand);
    this.addSubCommand(Puremvc.demo.controller.PrepViewCommand);
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.DeptEnum.prototype
 */
Ext.namespace("Puremvc.demo.model");
Ext.define("Puremvc.demo.model.DeptEnum", {

  extend: "Object",

  /**
   *
   * @param value
   * @param ordinal
   */
  constructor: function(value/*String*/, ordinal/*int*/) {
    this.callParent();
    this.value = value;
    this.ordinal = ordinal;
  },

  equals: function(roleEnum/*RoleEnum*/)/*Boolean*/ {
    return (this.ordinal == roleEnum.ordinal && this.value == roleEnum.value);
  },

  statics: {

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
  }
});

Ext.apply(Puremvc.demo.model.DeptEnum, {
  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  NONE_SELECTED/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("--None Selected--", -1),

  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  ACCT/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Accounting", 0),

  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  SALES/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Sales", 1),

  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  PLANT/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Plant", 2),

  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  SHIPPING/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Shipping", 3),

  /**
   * @type Puremvc.demo.model.DeptEnum
   * @constant
   * @memberof Puremvc.demo.model.DeptEnum
   */
  QC/*DeptEnum*/: new Puremvc.demo.model.DeptEnum("Quality Control", 4)
});

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

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.model.vo.RoleVO.prototype
 */
Ext.namespace("Puremvc.demo.model.vo");
Ext.define("Puremvc.demo.model.vo.RoleVO", {

  extend: "Ext.data.Model",

  fields: [
    {name: "uname", allowBlank: false, type: "string", defaultValue: ""}, /*string*/
    {name: "roles", allowBlank: false, type: "auto", defaultValue: []} /*Array*/
  ]
});

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

  extend: "puremvc.Proxy",

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
/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.Application.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.Application", {

  /** @extends Ext.container.Viewport */
  extend: "Ext.container.Viewport",

  /**
   * @class Serves as the main application's View.  All
   * other Views will become children of this control making
   * the Application act as the "stage".
   *
   * @constructs
   */
  constructor: function(config) {
    this.callParent(config);
  },

  initComponent: function() {
    var config = Ext.apply({
      id: "applicationViewport",
      layout: "fit",
      defaults: {
        bodyBorder: false,
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
          defaults: {
            bodyBorder: false,
            border: 0,
            frame: false
          },
          items: [
            {
              xtype: "label",
              html: "<span class=\"application-name\">Employee Admin</span>&nbsp;<span class=\"application-category\">PureMVC JavaScript/ExtJS4 Demo</span>",
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
                bodyBorder: false,
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
    });
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4 
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.RolePanel.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.RolePanel", {

  /** @extends Ext.form.Panel */
  extend: "Ext.form.Panel",

  alias: "widget.x-demo-role-list-panel",

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
   * @constructs
   */
  constructor: function(config) {
    // Call superclass constructor.
    this.callParent(arguments);

    // Initialize member fields.
    this.user = null;
    this.selectedRole = null;
    this.mode = null;
  },

  initComponent: function() {
    var config = {
      title: "User Roles",
      buttons: [
        {
          xtype: "combobox",
          id: "roleList",
          valueField: "ordinal",
          displayField: "value",
          typeAhead: true,
          queryMode: "local",
          forceSelection: true,
          triggerAction: "all",
          selectOnFocus: true,
          width: 140,
          store: Ext.create("Ext.data.Store", {
            model: "EnumItemVO",
            proxy: {
              type: "memory",
              reader: {
                type: "array"
              }
            }
          }),
          listeners: {
            "select": {
              fn: this.roleList_changeHandler,
              scope: this
            }
          }
        },
        {
          xtype: "button",
          id: "addRoleButton",
          text: "Add",
          listeners: {
            "click": {
              fn: this.addRoleButton_clickHandler,
              scope: this
            }
          }
        },
        {
          xtype: "button",
          id: "removeRoleButton",
          text: "Remove",
          listeners: {
            "click": {
              fn: this.removeRoleButton_clickHandler,
              scope: this
            }
          }
        }
      ],
      items: [
        {
          xtype: "gridpanel",
          id: "userRoleList",
          layout: "fit",
          viewConfig: {
            deferEmptyText: false,
            emptyText: "No Roles Assigned Yet",
            forceFit: true,
            itemSelector: "tr.x-grid-row",
            stripeRows: true,
            tpl: new Ext.XTemplate("<div></div>")
          },
          viewType: "gridview",
          selModel: {mode: "SINGLE"},
          selType: "rowmodel",
          hideHeaders: true,
          frame: false,
          columns: [
            {
              dataIndex: "value",
              flex: 1
            }
          ],
          store: Ext.create("Ext.data.Store", {
            model: "RoleVO",
            proxy: {
              type: "memory",
              reader: {
                type: "array"
              }
            }
          }),
          listeners: {
            "selectionchange": {
              fn: this.userRoleList_changeHandler,
              scope: this
            }
          }
        }
      ]
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);

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
    var roleListCombo = this.getFooterToolbar().getComponent("roleList");
    var store = roleListCombo.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the rolelist combobox with data from the role enum list.
    for (var i = 0; i < roleEnumList.length; i++) {
      var role/*RoleEnum*/ = roleEnumList[i];
      var roleRecord = new Puremvc.demo.model.vo.EnumItemVO({value:role.value, ordinal:role.ordinal, associatedValue:role});
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
    var roleList = this.getComponent("userRoleList");
    var store = roleList.getStore();
    store.removeAll(false); // true -> Don't fire the 'clear' event.

    // Load the rolelist with data from the role enum list.
    for (var i = 0; i < userRoles.length; i++) {
      var role/*RoleEnum*/ = userRoles[i];
      var roleRecord = new Puremvc.demo.model.vo.EnumItemVO({value:role.value, ordinal:role.ordinal, associatedValue:role});
      store.add(roleRecord);
    }
  },

  getSelectedRole: function() {
    var roleListCombo = this.getFooterToolbar().getComponent("roleList");
    var store = roleListCombo.getStore();
    var value = roleListCombo.getValue();
    var selectedRecord = store.findRecord("ordinal", value);
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedRoleValue: function(value/*Number*/) {
    var roleListCombo = this.getFooterToolbar().getComponent("roleList");
    roleListCombo.setValue(value);
  },

  getSelectedUserRole: function(selectedRecords) {
    var selectedRecord = (selectedRecords.length > 0) ? selectedRecords[0] : null;
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedUserRoleValue: function(value/*Number*/) {
    var userRoleListView = this.getComponent("userRoleList");
    var sm = userRoleListView.getSelectionModel();
    if (value == -1) {
      sm.selected.clear();
    }
    else {
      sm.select(value, false);
    }
  },

  /**
   * Enable or disable the form.
   */
  setEnabled: function(isEnabled/*Boolean*/) {
    var flag = !isEnabled;

    var controls = ["addRoleButton", "removeRoleButton", "roleList"];
    for (var i = 0; i < controls.length; ++i) {
      var control = this.getFooterToolbar().getComponent(controls[i]);
      control.setDisabled(flag);
    }

    var userRoleList = this.getComponent("userRoleList");
    userRoleList.setDisabled(flag);

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
    var addRoleButton = fbar.getComponent("addRoleButton");
    var removeRoleButton = fbar.getComponent("removeRoleButton");

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
   *
   * @param {Ext.selection.RowModel} selectionModel
   * @param {Array|Ext.data.Model} selectedRecords
   * @param {Object} eOpts
   */
  userRoleList_changeHandler: function(selectionModel /*RowModel*/, selectedRecords /*Array*/, eOpts /*Object*/) {
    this.setSelectedRoleValue(-1);
    this.selectedRole = this.getSelectedUserRole(selectedRecords);

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
  },

  getFooterToolbar: function() {
    var retVal = this.dockedItems.findBy(function(inItem) {
      return (inItem.alias == "widget.toolbar" && inItem.dock == "bottom");
    });
    return retVal;
  },

  statics: {
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
    REMOVE_MODE: "removeMode"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserForm.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.UserForm", {

  extend: "Ext.form.Panel",

  alias: "widget.x-demo-user-form-panel",

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
    this.callParent(arguments);

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
          xtype: "button",
          id: "submitButton",
          text: "Add User",
          handler: Ext.bind(this.submit_clickHandler, this)
        },
        {
          xtype: "button",
          id: "cancelButton",
          text: "Cancel",
          handler: Ext.bind(this.cancel_clickHandler, this)
        }
      ],
      defaults: {
        labelWidth: 120
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
          },
          labelClsExtra: "required"
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
          },
          labelClsExtra: "required"
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
          },
          labelClsExtra: "required"
        },
        {
          xtype: "combobox",
          id: "department",
          fieldLabel: "Department",
          valueField: "ordinal",
          displayField: "value",
          typeAhead: true,
          queryMode: "local",
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
          store: Ext.create("Ext.data.Store", {
            model: "EnumItemVO",
            proxy: {
              type: "memory",
              reader: {
                type: "array"
              }
            }
          }),
          labelClsExtra: "required"
        }
      ]
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);

    this.addEvents(Puremvc.demo.view.components.UserForm.ADD,
      Puremvc.demo.view.components.UserForm.UPDATE,
      Puremvc.demo.view.components.UserForm.CANCEL);

    this.fillList();

    // Erase any pre-existing form information.
    this.clearForm();
    this.setEnabled(false);
  },

  getSelectedDept: function() {
    var deptListCombo = this.getForm().findField("department");
    var store = deptListCombo.getStore();
    var value = deptListCombo.getValue();
    var selectedRecord = store.findRecord("ordinal", value);
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
      var dept /*DeptEnum*/ = deptEnumList[i];
      var deptRecord = new Puremvc.demo.model.vo.EnumItemVO({value:dept.value, ordinal:dept.ordinal, associatedValue:dept});
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
   * @param {Puremvc.demo.model.vo.UserVO} user
   */
  setUser: function(user/*UserVO*/) {
    this.user = user;

    if (user == null) {
      this.clearForm();
    }
    else {
      var form = this.getForm();
      form.findField("uname").setValue(user.get("uname"));
      form.findField("fname").setValue(user.get("fname"));
      form.findField("lname").setValue(user.get("lname"));
      form.findField("email").setValue(user.get("email"));
      form.findField("password").setValue(user.get("password"));
      form.findField("confirm").setValue(user.get("password"));
      this.setSelectedDeptValue(user.get("department").ordinal);
    }
  },

  /**
   * @return {Puremvc.demo.model.vo.UserVO}
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
    this.user.set("uname", form.findField("uname").getValue());
    this.user.set("fname", form.findField("fname").getValue());
    this.user.set("lname", form.findField("lname").getValue());
    this.user.set("email", form.findField("email").getValue());
    this.user.set("password", form.findField("password").getValue());
    this.user.set("department", this.getSelectedDept());
    this.user.commit(false);
  },

  /**
   * Clear the whole form.
   */
  clearForm: function() {
    var form = this.getForm();
    form.reset();
    form.findField("department").setValue(-1);
    form.clearInvalid();
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
      control = this.getFooterToolbar().getComponent(controls[j]);
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

    var submitButton = this.getFooterToolbar().getComponent("submitButton");

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
  },

  getFooterToolbar: function() {
    var retVal = this.dockedItems.findBy(function(inItem) {
      return (inItem.alias == "widget.toolbar" && inItem.dock == "bottom");
    });
    return retVal;
  },

  statics: {
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
    MODE_EDIT: "modeEdit"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserList.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.UserList", {

  extend: "Ext.grid.Panel",

  alias: "widget.x-demo-user-list-panel",

  /**
   * @type Puremvc.demo.model.vo.UserVO
   */
  selectedUser: null,

  /**
   * Constructor
   */
  constructor: function(config) {
    // Call superclass constructor.
    this.callParent(arguments);

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
      buttons: [
        {
          xtype: "button",
          id: "deleteButton",
          text: "Delete",
          listeners: {
            "click": {
              fn: this.deleteButton_clickHandler,
              scope: this
            }
          }
        },
        {
          xtype: "button",
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

      columns: [
        {header: "User Name", dataIndex: "uname", width: 100},
        {header: "First Name", dataIndex: "fname", width: 100},
        {header: "Last Name", dataIndex: "lname", width: 100},
        {header: "Email", dataIndex: "email", width: 122},
        {header: "Password", dataIndex: "password", width: 100},
        {header: "Department", dataIndex: "department",
          renderer: function(data, metaData, record, rowIndex, colIndex, store) {
            var retVal = (data.value != Puremvc.demo.model.DeptEnum.NONE_SELECTED ? data.value : "");
            return retVal;
          },
          width: 100
        }
      ],

      selModel: {mode: "SINGLE"},
      selType: "rowmodel",

      listeners: {
        "select": {
          fn: this.userList_changeHandler,
          scope: this
        }
      },

      store: Ext.create("Ext.data.Store", {
        model: "UserVO",
        proxy: {
          type: "memory",
          reader: {
            type: "array"
          }
        }
      }),

      viewConfig: {
        forceFit: true,
        itemSelector: "tr.x-grid-row",
        stripeRows: true,
        tpl: new Ext.XTemplate("<div></div>")
      },

      viewType: "gridview"
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);

    this.addEvents(Puremvc.demo.view.components.UserList.NEW, Puremvc.demo.view.components.UserList.DELETE, Puremvc.demo.view.components.UserList.SELECT);
  },

  /**
   * Add items from a UserVO list to the grid's store.
   */
  setUsers: function(userList/*Array*/) {
    /* First clear out any existing users. */
    var store = this.getStore();
    store.removeAll(false);

    // Load the userlist grid with data from the given array of UserVOs.
    var recordsToAdd = [];
    for (var i = 0; i < userList.length; i++) {
      var user = /*UserVO*/userList[i];
      recordsToAdd.push(user);
    }
    store.add(recordsToAdd);
  },

  /**
   * List selection changed event listener.
   *
   * @param {Ext.selection.RowModel} sm
   * @param {Ext.data.Model} record
   * @param {Number} rowIndex
   */
  userList_changeHandler: function(sm/*RowModel*/, record/*Ext.data.Model*/, rowIndex/*Number*/) {
    this.selectedUser = record;

    var deleteButton = this.getFooterToolbar().getComponent("deleteButton");
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
    sm.deselectAll(false);
    this.selectedUser = null;

    var deleteButton = this.getFooterToolbar().getComponent("deleteButton");
    deleteButton.disable();
  },

  getFooterToolbar: function() {
    var retVal = this.dockedItems.findBy(function(inItem) {
      return (inItem.alias == "widget.toolbar" && inItem.dock == "bottom");
    });
    return retVal;
  },

  statics: {
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
    SELECT: "SelectUser"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.ApplicationMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.ApplicationMediator", {

  /** @extends puremvc.Mediator */
  extend: "puremvc.Mediator",
    
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
   * @see Puremvc.demo.view.components.Application
   *
   * @constructs
   */
  constructor: function(viewComponent /* Puremvc.demo.view.components.Application */) {
    this.callParent([Puremvc.demo.view.ApplicationMediator.NAME, viewComponent]);
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
    this.callParent(arguments);
    
    // Handle creation and registration of any Mediators that can be initialized
    // at startup.
    var child = this.app.query("#userForm")[0];
    this.facade.registerMediator(new Puremvc.demo.view.UserFormMediator(child));

    child = this.app.query("#userList")[0];
    this.facade.registerMediator(new Puremvc.demo.view.UserListMediator(child));

    child = this.app.query("#rolePanel")[0];
    this.facade.registerMediator(new Puremvc.demo.view.RolePanelMediator(child));

    this.initializeComponent();
  },

  initializeComponent: function() {
  },

  statics: {
    /**
     * @lends Puremvc.demo.view.ApplicationMediator
     */
    /**
     * Constant used as a unique name for this <code>Mediator</code> subclass.
     *
     * @type String
     * @constant
     * @memberof Puremvc.demo.view.ApplicationMediator
     */
    NAME: "ApplicationMediator"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.RolePanelMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.RolePanelMediator", {

  /** @extends puremvc.Mediator */
  extend: "puremvc.Mediator",

  /**
   * Constructor
   *
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    this.callParent([Puremvc.demo.view.RolePanelMediator.NAME, viewComponent]);
  },

  /**
   * @return {Puremvc.demo.view.components.RolePanel}
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
    var userName/*String*/ = rolePanel.user.get("uname");
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
        var roleVO/*RoleVO*/ = new Puremvc.demo.model.vo.RoleVO({uname: rolePanel.user.get("uname")});
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
    this.callParent(arguments);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var rolePanel/*RolePanel*/ = this.getRolePanel();
    rolePanel.on(Puremvc.demo.view.components.RolePanel.ADD, this.onAddRole, this);
    rolePanel.on(Puremvc.demo.view.components.RolePanel.REMOVE, this.onRemoveRole, this);

    this.roleProxy = this.facade.retrieveProxy(Puremvc.demo.model.RoleProxy.NAME);
  }, 

  statics: {
    /**
     * @type String
     * @constant
     * @memberof Puremvc.demo.view.RolePanelMediator
     */
    NAME: "RolePanelMediator"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.UserFormMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.UserFormMediator", {

  /** @extends puremvc.Mediator */
  extend: "puremvc.Mediator",

  /**
   * Constructor
   *
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    this.callParent([Puremvc.demo.view.UserFormMediator.NAME, viewComponent]);
  },

  /**
   *
   */
  userProxy/*UserProxy*/: null,

  /**
   * @return {Puremvc.demo.view.components.UserForm}
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
    this.callParent(arguments);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var userForm/*UserForm*/ = this.getUserForm();
    userForm.on(Puremvc.demo.view.components.UserForm.ADD, this.onAdd, this);
    userForm.on(Puremvc.demo.view.components.UserForm.UPDATE, this.onUpdate, this);
    userForm.on(Puremvc.demo.view.components.UserForm.CANCEL, this.onCancel, this);

    this.userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
  },
  
  statics: {
    /**
     * @type String
     * @constant
     * @memberof Puremvc.demo.view.UserFormMediator
     */
    NAME: "UserFormMediator"
  }
});

/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.UserListMediator.prototype
 */
Ext.namespace("Puremvc.demo.view");
Ext.define("Puremvc.demo.view.UserListMediator", {

  /** @extends puremvc.Mediator */
  extend: "puremvc.Mediator",

  /**
   * Constructor
   *
   * @constructs
   */
  constructor: function(viewComponent/*Object*/) {
    // Always call superclass constructor.
    this.callParent([Puremvc.demo.view.UserListMediator.NAME, viewComponent]);
  },

  /**
   * @return {Puremvc.demo.view.components.UserList}
   */
  getUserList: function() {
    return this.viewComponent;
  },

  /**
   *
   */
  onNew: function() {
    var user/*UserVO*/ = new Puremvc.demo.model.vo.UserVO({
      uname: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      department: Puremvc.demo.model.DeptEnum.NONE_SELECTED
    });
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
   * @param {puremvc.Notification}
    */
  handleNotification: function(note/*INotification*/) {
    var userList/*UserList*/ = this.getUserList();
    var userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    var allUsers = userProxy.getUsers();

    switch (note.getName()) {
      case Puremvc.demo.ApplicationFacade.CANCEL_SELECTED:
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_UPDATED:
        userList.setUsers(allUsers);
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_ADDED:
        userList.setUsers(allUsers);
        userList.deSelect();
        break;

      case Puremvc.demo.ApplicationFacade.USER_DELETED:
        userList.setUsers(allUsers);
        userList.deSelect();
        break;
    }
  },

  /**
   * Called by the <code>View</code> when the <code>Mediator</code> is registered.
   * This method is usually overridden as needed by the subclass.
   */
  onRegister: function() {
    this.callParent(arguments);
    this.initializeComponent();
  },

  initializeComponent: function() {
    var userList/*UserList*/ = this.getUserList();
    userList.on(Puremvc.demo.view.components.UserList.NEW, this.onNew, this);
    userList.on(Puremvc.demo.view.components.UserList.DELETE, this.onDelete, this);
    userList.on(Puremvc.demo.view.components.UserList.SELECT, this.onSelect, this);

    var userProxy = this.facade.retrieveProxy(Puremvc.demo.model.UserProxy.NAME);
    userList.setUsers(userProxy.getUsers());

    userList.deSelect();
  },
  
  statics: {
    /**
     * @type String
     * @constant
     * @memberof Puremvc.demo.view.UserListMediator
     */
    NAME: "UserListMediator"
  }
});
