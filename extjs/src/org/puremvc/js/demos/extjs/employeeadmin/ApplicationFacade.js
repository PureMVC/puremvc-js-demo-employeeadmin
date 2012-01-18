/*
 PureMVC Javascript Employee Admin Demo for ExtJS
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.ApplicationFacade.prototype
 */
Ext.ns('Puremvc.demo');
Puremvc.demo.ApplicationFacade = Ext.extend(Puremvc.patterns.Facade,
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
   * @extends Puremvc.patterns.Facade
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
    if (!Puremvc.patterns.Facade.hasCore(key)) {
      new Puremvc.demo.ApplicationFacade(key);
    }
    var retVal = Puremvc.patterns.Facade.getInstance(key);
    return retVal;
  }
});