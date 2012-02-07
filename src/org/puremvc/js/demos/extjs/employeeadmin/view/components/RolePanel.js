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
      bodyCssCls: "grid-background",
      buttons: [
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
      ],
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

//    this.setDisabled(flag);

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
