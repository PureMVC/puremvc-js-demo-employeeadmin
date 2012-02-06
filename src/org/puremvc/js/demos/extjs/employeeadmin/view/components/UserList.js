/*
 PureMVC Javascript Employee Admin Demo for ExtJS by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserList.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserList = Ext.extend(Ext.grid.GridPanel, {

  /**
   * @type Puremvc.demo.model.vo.UserVO
   */
  selectedUser: null,

  /**
   * Constructor
   */
  constructor: function(config) {
    // Call superclass constructor.
    Puremvc.demo.view.components.UserList.superclass.constructor.call(this, config);

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
      bodyCls: "grid-background",
      frame: true,
      stripeRows: true,
      buttons: [
        {
          xtype: "tbbutton",
          id: "deleteButton",
          text: "Delete",
          listeners: {
            "click": {
              fn:this.deleteButton_clickHandler,
              scope: this
            }
          }
        },
        {
          xtype: "tbbutton",
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

      columnModel: this.colModel,

      selModel: new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
          "rowselect": {
            fn: this.userList_changeHandler,
            scope: this
          }
        }
      }),

      store: new Ext.data.Store({
        autoDestroy: true,
        storeId: "userStore",
        // reader configs
        idIndex: 0,
        fields: [
          {name: "uname", type: "string"},
          {name: "fname", type: "string"},
          {name: "lname", type: "string"},
          {name: "email", type: "string"},
          {name: "password", type: "string"},
          {name: "department", type: "auto"}
        ]
      }),

      view: new Ext.grid.GridView({
        forceFit: true
      })
    }
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    Puremvc.demo.view.components.UserList.superclass.initComponent.call(this);

    this.addEvents(Puremvc.demo.view.components.UserList.NEW, Puremvc.demo.view.components.UserList.DELETE, Puremvc.demo.view.components.UserList.SELECT);
  },

  colModel: new Ext.grid.ColumnModel({
    columns: [
      {header: "User Name", dataIndex: "uname"},
      {header: "First Name", dataIndex: "fname"},
      {header: "Last Name", dataIndex: "lname"},
      {header: "Email", dataIndex: "email", width: 122},
      {header: "Password", dataIndex: "password"},
      {header: "Department", dataIndex: "department",
        renderer: function(data, metaData, record, rowIndex, colIndex, store) {
          var retVal = (data.value != Puremvc.demo.model.DeptEnum.NONE_SELECTED ? data.value : "");
          return retVal;
        }
      }
    ],
    defaults: {
      width: 100,
      resizable: true,
      sortable: true
    }
  }),

  /**
   * Add items from a UserVO list to the grid's store.
   */
  setUsers: function(userList/*Array*/) {
    /* First clear out any existing users. */
    var store = this.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the userlist grid with data from the given array of UserVOs.
    for (var i = 0; i < userList.length; i++) {
      var user = userList[i];
      /*UserVO*/
      var userRecord = new Puremvc.demo.view.components.UserList.UserRecordType(user, user.uname);
      store.add(userRecord);
    }
  },

  /**
   * List selection changed event listener.
   *
   * @param {Ext.grid.RowSelectionModel} sm
   * @param {Number} rowIndex
   * @param {Ext.data.Record} record
   */
  userList_changeHandler: function(sm/*RowSelectionModel*/, rowIndex/*Number*/, record/*Ext.data.Record*/) {
    this.selectedUser = new Puremvc.demo.model.vo.UserVO(record.get('uname'), record.get('fname'), record.get('lname'),
      record.get('email'), record.get('password'), record.get('department'));

    var deleteButton = this.getFooterToolbar().get("deleteButton");
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
    sm.clearSelections();
    this.selectedUser = null;

    var deleteButton = this.getFooterToolbar().get("deleteButton");
    deleteButton.disable();
  }
});

Ext.apply(Puremvc.demo.view.components.UserList, {
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
  SELECT: "select",

  /**
   * A custom Ext.data.Record type.
   *
   * @type Puremvc.demo.view.components.UserList.UserRecordType
   * @constant
   * @memberof Puremvc.demo.view.components.UserList
   */
  UserRecordType: Ext.data.Record.create([
    {name: "uname", allowBlank: false, type: "string"},
    {name: "fname", allowBlank: false, type: "string"},
    {name: "lname", allowBlank: false, type: "string"},
    {name: "email", allowBlank: true, type: "string"},
    {name: "password", allowBlank: false, type: "string"},
    {name: "department", type: "auto"}
  ])
});

Ext.reg("x-demo-user-list-panel", Puremvc.demo.view.components.UserList);
