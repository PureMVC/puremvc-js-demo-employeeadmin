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

  /** @extends org.puremvc.js.multicore.patterns.mediator.Mediator */
  extend: "org.puremvc.js.multicore.patterns.mediator.Mediator",

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
