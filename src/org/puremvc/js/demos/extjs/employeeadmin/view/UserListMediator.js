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

  /** @extends org.puremvc.js.multicore.patterns.mediator.Mediator */
  extend: "org.puremvc.js.multicore.patterns.mediator.Mediator",

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
   * @param {org.puremvc.js.multicore.patterns.observer.Notification}
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