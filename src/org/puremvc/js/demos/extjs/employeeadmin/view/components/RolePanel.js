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
