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