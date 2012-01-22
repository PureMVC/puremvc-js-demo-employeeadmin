/*
 PureMVC Javascript Employee Admin Demo for ExtJS4
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @lends Puremvc.demo.view.components.UserForm.prototype
 */
Ext.namespace("Puremvc.demo.view.components");
Ext.define("Puremvc.demo.view.components.UserForm", {

  extend: "Ext.form.Panel",

  alias: "widget.x-demo-user-form-panel",

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
    this.callParent(arguments);

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
          xtype: "button",
          id: "submitButton",
          text: "Add User",
          handler: Ext.bind(this.submit_clickHandler, this)
        },
        {
          xtype: "button",
          id: "cancelButton",
          text: "Cancel",
          handler: Ext.bind(this.cancel_clickHandler, this)
        }
      ],
      defaults: {
        labelWidth: 120
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
          labelClsExtra: "required"
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
          labelClsExtra: "required"
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
          labelClsExtra: "required"
        },
        {
          xtype: "combobox",
          id: "department",
          fieldLabel: "Department",
          valueField: "ordinal",
          displayField: "value",
          typeAhead: true,
          queryMode: "local",
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
          store: Ext.create("Ext.data.Store", {
            model: "EnumItemVO",
            proxy: {
              type: "memory",
              reader: {
                type: "array"
              }
            }
          }),
          labelClsExtra: "required"
        }
      ]
    };
    Ext.apply(this, config);
    this.initialConfig = Ext.apply({}, config);

    // Always call superclass method.
    this.callParent(arguments);

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
    var selectedRecord = store.findRecord("ordinal", value);
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
      var dept /*DeptEnum*/ = deptEnumList[i];
      var deptRecord = new Puremvc.demo.model.vo.EnumItemVO({value:dept.value, ordinal:dept.ordinal, associatedValue:dept});
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
   * @param {Puremvc.demo.model.vo.UserVO} user
   */
  setUser: function(user/*UserVO*/) {
    this.user = user;

    if (user == null) {
      this.clearForm();
    }
    else {
      var form = this.getForm();
      form.findField("uname").setValue(user.get("uname"));
      form.findField("fname").setValue(user.get("fname"));
      form.findField("lname").setValue(user.get("lname"));
      form.findField("email").setValue(user.get("email"));
      form.findField("password").setValue(user.get("password"));
      form.findField("confirm").setValue(user.get("password"));
      this.setSelectedDeptValue(user.get("department").ordinal);
    }
  },

  /**
   * @return {Puremvc.demo.model.vo.UserVO}
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
    this.user.set("uname", form.findField("uname").getValue());
    this.user.set("fname", form.findField("fname").getValue());
    this.user.set("lname", form.findField("lname").getValue());
    this.user.set("email", form.findField("email").getValue());
    this.user.set("password", form.findField("password").getValue());
    this.user.set("department", this.getSelectedDept());
    this.user.commit(false);
  },

  /**
   * Clear the whole form.
   */
  clearForm: function() {
    var form = this.getForm();
    form.reset();
    form.findField("department").setValue(-1);
    form.clearInvalid();
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
      control = this.getFooterToolbar().getComponent(controls[j]);
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

    var submitButton = this.getFooterToolbar().getComponent("submitButton");

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
    MODE_EDIT: "modeEdit"
  }
});
