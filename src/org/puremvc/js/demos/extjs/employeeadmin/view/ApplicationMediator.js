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
   * @param {Puremvc.patterns.Notification} notification the notification to act upon.
   */
  handleNotification: function(notification /* Puremvc.patterns.Notification */) {
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
