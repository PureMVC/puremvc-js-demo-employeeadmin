/*
 PureMVC Javascript Employee Admin Demo for ExtJS by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserForm.prototype
 */
Ext.ns("Puremvc.demo.view.components");
Puremvc.demo.view.components.UserForm = Ext.extend(Ext.form.FormPanel, {

  /**
   * @type Puremvc.demo.model.vo.UserVO
   */
  user: null,

  /**
   * @type String
   */
  mode: null,

  /**
   * Constructor
   */
  constructor: function(config) {
    // Call superclass constructor.
    Puremvc.demo.view.components.UserForm.superclass.constructor.call(this, config);

    // Initialize member fields.
    this.user/*UserVO*/ = null;
    this.mode/*String*/ = null;
  },

  /**
   * Creates all children required to create the
   * initial View state of this control and adds them to the DOM.
   */
  initComponent: function() {
    var config = {
      title: "User Profile",
      buttons: [
        {
          xtype: "tbbutton",
          id: "submitButton",
          text: "Add User",
          handler: this.submit_clickHandler.createDelegate(this)
        },
        {
          xtype: "tbbutton",
          id: "cancelButton",
          text: "Cancel",
          handler: this.cancel_clickHandler.createDelegate(this)
        }
      ],
      defaults: {
        width: 135
      },
      items: [
        {
          xtype: "textfield",
          id: "fname",
          fieldLabel: "First Name",
          msgTarget: "side"
        },
        {
          xtype: "textfield",
          id: "lname",
          fieldLabel: "Last Name",
          msgTarget: "side"
        },
        {
          xtype: "textfield",
          id: "email",
          fieldLabel: "Email",
          msgTarget: "side",
          vtype: "email"
        },
        {
          xtype: "textfield",
          id: "uname",
          fieldLabel: "User Name",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          },
          itemCls: "required"
        },
        {
          xtype: "textfield",
          id: "password",
          fieldLabel: "Password",
          inputType: "password",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          },
          itemCls: "required"
        },
        {
          xtype: "textfield",
          id: "confirm",
          fieldLabel: "Confirm Password",
          inputType: "password",
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          },
          itemCls: "required"
        },
        {
          xtype: "combo",
          id: "department",
          fieldLabel: "Department",
          valueField: "ordinal",
          displayField: "value",
          typeAhead: true,
          mode: "local",
          forceSelection: true,
          triggerAction: "all",
          selectOnFocus: true,
          msgTarget: "side",
          listeners: {
            "focus": {
              fn: this.field_focusHandler,
              scope: this
            }
          },
          store: new Ext.data.Store({
            // store configs
            autoDestroy: true,
            storeId: "deptStore",
            // reader configs
            idIndex: 1,
            fields: [
              {name: "value", type: "string"},
              {name: "ordinal", type: "int"},
              {name: "associatedValue", type: "auto"}
            ]
          }),
          itemCls: "required"
        }
      ]
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    Puremvc.demo.view.components.UserForm.superclass.initComponent.call(this);

    this.addEvents(Puremvc.demo.view.components.UserForm.ADD,
      Puremvc.demo.view.components.UserForm.UPDATE,
      Puremvc.demo.view.components.UserForm.CANCEL);

    this.fillList();

    // Erase any pre-existing form information.
    this.clearForm();
    this.setEnabled(false);
  },

  getSelectedDept: function() {
    var deptListCombo = this.getForm().findField("department");
    var store = deptListCombo.getStore();
    var value = deptListCombo.getValue();
    var selectedRecord = store.getById(value);
    var retVal = (selectedRecord != null) ? selectedRecord.get("associatedValue") : null;
    return retVal;
  },

  setSelectedDeptValue: function(value/*Number*/) {
    var deptListCombo = this.getForm().findField("department");
    deptListCombo.setValue(value);
  },

  /**
   * Add items from DeptEnum to the Department combobox component.
   */
  fillList: function() {
    var deptEnumList = Puremvc.demo.model.DeptEnum.getComboList();

    /* First clear out any existing departments. */
    var deptListCombo = this.getForm().findField("department");
    var store = deptListCombo.getStore();
    store.removeAll(true); // true -> Don't fire the 'clear' event.

    // Load the department combobox with data from the dept enum list.
    for (var i = 0; i < deptEnumList.length; i++) {
      var dept = deptEnumList[i];
      dept["associatedValue"] = dept; // Store the enum
      var deptRecord = new Puremvc.demo.view.components.UserForm.DeptEnumRecordType(dept, dept.ordinal);
      store.add(deptRecord);
    }
  },

  /**
   * Give focus to the first field in the form component.
   */
  setFocus: function() {
    var firstNameField = this.getForm().findField("fname");
    firstNameField.focus();
  },

  /**
   * Select the user whose data will populate the form.
   *
   * @param {UserVO} user
   */
  setUser: function(user/*UserVO*/) {
    this.user = user;

    if (user == null) {
      this.clearForm();
    }
    else {
      var form = this.getForm();
      form.findField("uname").setValue(user.uname);
      form.findField("fname").setValue(user.fname);
      form.findField("lname").setValue(user.lname);
      form.findField("email").setValue(user.email);
      form.findField("password").setValue(user.password);
      form.findField("confirm").setValue(user.password);
      this.setSelectedDeptValue(user.department.ordinal);
    }
  },

  /**
   * @return {UserVO}
   */
  getUser: function() {
    this.updateUser();
    return this.user;
  },

  /**
   * Update user attributes with form fields value.
   */
  updateUser: function() {
    var form = this.getForm();
    this.user.uname = form.findField("uname").getValue();
    this.user.fname = form.findField("fname").getValue();
    this.user.lname = form.findField("lname").getValue();
    this.user.email = form.findField("email").getValue();
    this.user.password = form.findField("password").getValue();
    this.user.department = this.getSelectedDept();
  },

  /**
   * Clear the whole form.
   */
  clearForm: function() {
    var form = this.getForm();
    form.reset();
    form.findField("department").setValue(-1);
    form.clearInvalid();

//    this.setFieldError("uname", null);
//    this.setFieldError("fname", null);
//    this.setFieldError("lname", null);
//    this.setFieldError("email", null);
//    this.setFieldError("password", null);
//    this.setFieldError("confirm", null);
//    this.setFieldError("department", null);
  },

  /**
   * Enable or disable the form.
   */
  setEnabled: function(isEnabled/*Boolean*/) {
    var flag = !isEnabled;

    var form = this.getForm();
    var controls = ["fname", "lname", "email", "password", "confirm", "department"];
    var control = null;
    for (var i = 0; i < controls.length; ++i) {
      control = form.findField(controls[i]);
      control.setDisabled(flag);
    }

    controls = ["submitButton", "cancelButton"];
    for (var j = 0; j < controls.length; ++j) {
      control = this.getFooterToolbar().get(controls[j]);
      control.setDisabled(flag);
    }

    form.findField("uname").setDisabled(!(isEnabled && this.mode == Puremvc.demo.view.components.UserForm.MODE_ADD));
  },

  /**
   * Set the form mode to ADD or EDIT.
   *
   * @param {String} mode
   */
  setMode: function(mode/*String*/) {
    this.mode = mode;

    var submitButton = this.getFooterToolbar().get("submitButton");

    switch (mode) {
      case Puremvc.demo.view.components.UserForm.MODE_ADD:
        submitButton.setText("Add User");
        break;

      case Puremvc.demo.view.components.UserForm.MODE_EDIT:
        submitButton.setText("Update Profile");
        this.getForm().findField("uname").disable();
        break;
    }
  },

  /**
   * Submit the add or update.
   */
  submit_clickHandler: function() {
    if (!this.getErrors()) {
      this.updateUser();

      if (this.user.getIsValid()) {
        if (this.mode == Puremvc.demo.view.components.UserForm.MODE_ADD) {
          this.fireEvent(Puremvc.demo.view.components.UserForm.ADD, this);
        }
        else {
          this.fireEvent(Puremvc.demo.view.components.UserForm.UPDATE, this);
        }
      }
    }
  },

  /**
   * Display errors associated with form fields and return if at least one
   * field is in error.
   *
   * @return {Boolean}
   */
  getErrors: function() {
    var retVal = false;

    var form = this.getForm();
    var uname = form.findField("uname").getValue();
    var error/*Boolean*/ = Ext.isEmpty(uname);
    var errorMessage = (error) ? "User Name is a required field." : null;
    this.setFieldError("uname", errorMessage);
    retVal = error;

    var password = form.findField("password").getValue();
    error = Ext.isEmpty(password);
    errorMessage = (error) ? "Password is a required field." : null;
    this.setFieldError("password", errorMessage);
    retVal = retVal | error;

    var confirm = form.findField("confirm").getValue();
    error = (Ext.isEmpty(password) || confirm != password);
    errorMessage = (error) ? "The value of the Confirm Password field must match the value of the Password field." : null;
    this.setFieldError("confirm", errorMessage);
    retVal = retVal || error;

    var department = this.getSelectedDept();
    error = (department == Puremvc.demo.model.DeptEnum.NONE_SELECTED);
    errorMessage = (error) ? "A value must be selected for the Department field." : null;
    this.setFieldError("department", errorMessage);
    retVal = retVal || error;

    return retVal;
  },

  /**
   * Cancel the add or update.
   */
  cancel_clickHandler: function() {
    this.fireEvent(Puremvc.demo.view.components.UserForm.CANCEL, this);
  },

  /**
   * Handle focus event on all the required form fields.
   *
   * @param {Ext.form.Field} field
   */
  field_focusHandler: function(field) {
    this.setFieldError(field.id, null);
  },

  /**
   * Set or unset the error state on the uname field.
   *
   * @param {String} fieldName
   * @param {String} errorMessage
   */
  setFieldError: function(fieldName/*String*/, errorMessage/*String*/) {
    var field = this.getForm().findField(fieldName);

    if (!Ext.isEmpty(errorMessage)) {
      field.markInvalid(errorMessage);
    }
    else {
      field.clearInvalid();
    }
  }
});

Ext.apply(Puremvc.demo.view.components.UserForm, {
  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  ADD: "add",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  UPDATE: "update",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  CANCEL: "cancel",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  MODE_ADD: "modeAdd",

  /**
   * @type String
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  MODE_EDIT: "modeEdit",

  /**
   * A custom Ext.data.Record type.
   *
   * @type Puremvc.demo.view.components.UserForm.DeptEnumRecordType
   * @constant
   * @memberof Puremvc.demo.view.components.UserForm
   */
  DeptEnumRecordType: Ext.data.Record.create([
    {name: "value", allowBlank: false, type: "string"},
    {name: "ordinal", allowBlank: false, type: "int"},
    {name: "associatedValue", type: "auto"}
  ])
});

Ext.reg("x-demo-user-form-panel", Puremvc.demo.view.components.UserForm);
