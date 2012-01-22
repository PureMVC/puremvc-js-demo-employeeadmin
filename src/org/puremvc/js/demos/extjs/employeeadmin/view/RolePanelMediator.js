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

  /** @extends org.puremvc.js.multicore.patterns.mediator.Mediator */
  extend: "org.puremvc.js.multicore.patterns.mediator.Mediator",

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
