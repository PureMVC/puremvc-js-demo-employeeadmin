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
