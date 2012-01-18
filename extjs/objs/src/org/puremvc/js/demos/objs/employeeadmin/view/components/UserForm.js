/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * The UI component in charge of the <em>user form</em>.
 * 
 * @extends org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent UiComponent
 */
var UserForm = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm",
	UiComponent,
{
	
	/**
	 * The user form panel HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	userFormPanel: null,
	
	/**
	 * The unique name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	uname: null,
	
	/**
	 * The first name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	fname: null,
	
	/**
	 * The long name field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	lname: null,
	
	/**
	 * The email field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	email: null,
	
	/**
	 * The password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	password: null,
	
	/**
	 * The confirm password field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	confirm: null,
	
	/**
	 * The department field HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	department: null,
	
	/**
	 * The submit button HTML element.
	 * 
	 * @private
	 * @type {HTMLElement}
	 */
	submitButton: null,
	
	/**
	 * The selected user.
	 * 
	 * @private
	 * @type {UserVO}
	 */
	user: null,
	
	/**
	 * The roles list for the selected user.
	 * 
	 * @private
	 * @type {Array}
	 */
	userRoles: null,
	
	/**
	 * @private
	 * @type {String}
	 */
	mode: null,
	
	/**
	 * An array used to compare currently selected items in the role list to those
	 * lastly inserted to know which one was the last changed by the user. 
	 * 
	 * @private
	 * @type {Array}
	 */
	roleListComparer: null,
	
	/**
	 * @construct
	 * @override
	 *
	 * Initialize a <code>UserForm</code> instance.
	 */
	initialize: function()
	{
		UserForm.$super.initialize.call( this );
		
		this.initializeChildren();
		this.configureListeners();

		//Needed to erase prefilled form informations.
		this.clearForm();
		this.setEnabled(false);
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren: function()
    {
		/*
		 * We use JQuery to initialize reference to UI components
		 */
		this.userFormPanel = $(".user-form-panel");
	
		this.uname = this.userFormPanel.find(".uname");
		this.fname = this.userFormPanel.find(".fname");
		this.lname = this.userFormPanel.find(".lname");
		this.email = this.userFormPanel.find(".email");
		this.password = this.userFormPanel.find(".password");
		this.confirm = this.userFormPanel.find(".confirm");
		this.department = this.userFormPanel.find(".department");
	
		this.submitButton = this.userFormPanel.find(".submit-button").button();
		this.cancelButton = this.userFormPanel.find(".cancel-button").button();	
    },
	
    /**
     * Configure event listeners registration.
     */
	configureListeners: function()
	{
		var that/*UserForm*/ = this; //Needed for closures to use "this" reference.
		this.uname.focus( function(evt){ that.field_focusHandler(evt) } );
		this.password.focus( function(evt){ that.field_focusHandler(evt) } );
		this.confirm.focus( function(evt){ that.field_focusHandler(evt) } );
		this.department.focus( function(evt){ that.field_focusHandler(evt) } );
		this.submitButton.click( function(evt){ that.submit_clickHandler(evt) } );
		this.cancelButton.click( function(evt){ that.cancel_clickHandler(evt) } );
	},
	
	/**
	 * Add items from <code>DeptEnum</code> to the corresponding list UI
	 * component.
	 * 
	 * @param {Array} deptEnumList
	 *		List of <code>DeptEnum</code> items or an empty array to empty
	 *		the list UI component content. 
	 */
	fillList: function( deptEnumList )
	{
		var htmlList/*String*/ = "";
		for(var i/*Number*/=0; i<deptEnumList.length; i++)
		{		
			var deptEnum/*DeptEnum*/ = deptEnumList[i];
			
			/*
			 * An item not having a value in jQuery will be excluded from the
			 * pop-up menu.
			 */ 
			var valueAttr = 'value="' + deptEnum.ordinal + '"';
			
			var selectedAttr/*String*/ = "";
			if( this.user && deptEnum.equals(this.user.department) )
				selectedAttr = "selected";
				
			if( !this.user && deptEnum.equals(DeptEnum.NONE_SELECTED) )
				selectedAttr = "selected";
								
			htmlList += '<option ' + valueAttr + ' ' + selectedAttr + ' >' + deptEnum.value + '</option>';
		}
	
		this.department.html(htmlList);
	},
	
	/**
	 * Give focus to the form component.
	 */
	setFocus: function()
	{
		this.fname.focus();
	},
	
	/**
	 * Set the user used to populate the form.
	 * 
	 * @param {UserVO} user
	 * 		The currently selected user.
	 */
	setUser: function( user )
	{
		this.user = user;
		
		if( !user )
			this.clearForm();
		else
		{
			this.uname.val(user.uname);
			this.fname.val(user.fname);
			this.lname.val(user.lname);
			this.email.val(user.email);
			this.password.val(user.password);
			this.confirm.val(user.password);

			this.fillList( DeptEnum.getComboList() );
		}
	},
	
	getUser: function()/*UserVO*/
	{
		this.updateUser();
		return this.user;
	},
	
	/**
	 * Update user attributes with form fields value.
	 */
	updateUser: function()
	{
		this.user.uname = this.uname.val();
		this.user.fname = this.fname.val();
		this.user.lname = this.lname.val();
		this.user.email = this.email.val();
		this.user.password = this.password.val();
	
		var selected/*Number*/ = parseInt(this.department.val())+1;
		var deptEnumList/*Array*/ = DeptEnum.getComboList();
		this.user.department = deptEnumList[selected];
	},
	
	/**
	 * Clear the whole form.
	 */
	clearForm: function()
	{
		this.uname.val("");
		this.fname.val("");
		this.lname.val("");
		this.email.val("");
		this.password.val("");
		this.confirm.val("");
		this.fillList([]);
		this.setFieldError( 'uname', false );
		this.setFieldError( 'password', false );
		this.setFieldError( 'confirm', false );
		this.setFieldError( 'department', false );
	},

	/**
	 * Enable or disable the form.
	 * 
	 * @param {Boolean} isEnabled
	 * 		The form must be enabled.
	 */
	setEnabled: function( isEnabled )
	{
		if( isEnabled )
		{
			this.fname.removeAttr("disabled");
			this.lname.removeAttr("disabled");
			this.email.removeAttr("disabled");
			this.password.removeAttr("disabled");
			this.confirm.removeAttr("disabled");
			this.department.removeAttr("disabled");
			this.submitButton.button("enable");
			this.cancelButton.button("enable");
		
			if( this.mode == UserForm.MODE_EDIT )
				this.uname.attr( "disabled", "disabled" );
			else
				this.uname.removeAttr("disabled");
		}
		else
		{
			this.uname.attr( "disabled", "disabled" );
			this.fname.attr( "disabled", "disabled" );
			this.lname.attr( "disabled", "disabled" );
			this.email.attr( "disabled", "disabled" );
			this.password.attr( "disabled", "disabled" );
			this.confirm.attr( "disabled", "disabled" );
			this.department.attr( "disabled", "disabled" );
			this.submitButton.button( "disable" );
			this.cancelButton.button( "disable" );
		}		

	},

	/**
	 * Set the form mode to ADD or EDIT.
	 * 
	 * @param {String} mode
	 * 		<code>UserForm.MODE_ADD</code> or <code>UserForm.MODE_EDIT</code>
	 */
	setMode: function( mode )
	{
		this.mode = mode;
	
		switch(mode)
		{
			case UserForm.MODE_ADD:
				this.submitButton.find(".ui-button-text").text("Add");
			break;
		
			case UserForm.MODE_EDIT:
				this.submitButton.find(".ui-button-text").text("Save");
			break;
		}
	},
	
	/**
	 * Submit the add or update.
	 */
	submit_clickHandler: function()
	{
		this.updateUser();
		
		if( this.getErrors() )
			return;
	
		if( this.user.getIsValid() )
		{
			if( this.mode == UserForm.MODE_ADD )
				this.dispatchEvent( UserForm.ADD );
			else
				this.dispatchEvent( UserForm.UPDATE );
		}
	},
	
	/**
	 * Cancel the add or update
	 */
	cancel_clickHandler: function()
	{
		this.dispatchEvent( UserForm.CANCEL );
	},
	
	/**
	 * Handle focus event on all the required form fields.
	 */
	field_focusHandler: function( evt )
	{
		this.setFieldError( $(evt.target).attr("class"), false );
	},
	
	/**
	 * Display errors associated with form fields and return if at least one
	 * field is in error.
	 * 
	 * @return {Boolean}
	 * 		The form contains errors.
	 */
	getErrors: function()
	{
		var error/*Boolean*/ = false;

		if( this.uname.val() == "" )
			this.setFieldError( 'uname', error = true );
		else
			this.setFieldError( 'uname', false );
	
		if( this.password.val() == "" )
			this.setFieldError( 'password', error = true );
		else
			this.setFieldError( 'password', false );
	
		if( this.password.val() != "" && this.confirm.val() != this.password.val() )
			this.setFieldError( 'confirm', error = true );
		else
			this.setFieldError( 'confirm', false );
	
		var selected/*Number*/ = parseInt(this.department.val())+1;
		var deptEnumList/*Array*/ = DeptEnum.getComboList();
		var department/*DeptEnum*/ = deptEnumList[selected];
	
		if( DeptEnum.NONE_SELECTED.equals( department ) )
			this.setFieldError( 'department', error = true );
		else
			this.setFieldError( 'department', false );
	
		return error;
	},
	
	/**
	 * Set or unset the error state on the uname field.
	 * 
	 * @param {String} fieldName
	 * 		Name of the field to mark as (or not mark as) containing an error.
	 *
	 * @param {Boolean} error
	 * 		The field must be marked as containing an error.
	 */
	setFieldError: function( fieldName, error )
	{
		var label/*HTMLElement*/ = this.userFormPanel.find( 'label[for="' + fieldName + '"]' );
		var field/*HTMLElement*/ = this.userFormPanel.find( '.' + fieldName );
	
		if( error )
			field.addClass( 'fieldError' );
		else
			field.removeClass( 'fieldError' );
	}
});

/*
 * Event names
 */
UserForm.ADD/*String*/		= "add";
UserForm.UPDATE/*String*/	= "update";
UserForm.CANCEL/*String*/		= "cancel";

UserForm.MODE_ADD/*String*/		= "modeAdd";
UserForm.MODE_EDIT/*String*/	= "modeEdit";