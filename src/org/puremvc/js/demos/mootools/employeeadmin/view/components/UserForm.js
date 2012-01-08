/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var UserForm = function()
{
    /**
     * @ignore
     */
    this.Extends = UIComponent;

	/*
	 * Child elements.
	 */
	this.uname/*Element*/ = null;
	this.fname/*Element*/ = null;
	this.lname/*Element*/ = null;
	this.email/*Element*/ = null;
	this.password/*Element*/ = null;
	this.confirm/*Element*/ = null;
	this.department/*Element*/ = null;
	this.submitButton/*Element*/ = null;
	this.cancelButton/*Element*/ = null;
	

	this.user/*UserVO*/ = null;
	this.mode/*String*/ = null;

	/**
	 * Constructor
	 */
	this.initialize = function()
	{
		this.parent("user-form-panel");

		// Overwrite listener handlers with
		// methods bound to 'this'
		this.submit_clickHandler = this.submit_clickHandler.bindWithEvent(this);
		this.cancel_clickHandler = this.cancel_clickHandler.bindWithEvent(this);
		this.field_focusHandler = this.field_focusHandler.bindWithEvent(this);
	}

    /**
     * Creates all children required to create the
     * initial View state of this control and adds them to the DOM.
     */
    this.initializeChildren = function()
    {
		this.uname = $("uname");
		this.fname = $("fname");
		this.lname = $("lname");
		this.email = $("email");
		this.password = $("password");
		this.confirm = $("confirm");
		this.department = $("department");

		this.submitButton = $("submit-button");
		this.cancelButton = $("cancel-button");
    }

    /**
     * Adds the 'click' listener to the startStop button after creation.
     */
    this.childrenInitialized = function()
    {
		this.uname.addEvent( "focus", this.field_focusHandler );
		this.password.addEvent( "focus", this.field_focusHandler );
		this.confirm.addEvent( "focus", this.field_focusHandler );
		this.department.addEvent( "focus", this.field_focusHandler );

		this.submitButton.addEvent( "click", this.submit_clickHandler );
		this.cancelButton.addEvent( "click", this.cancel_clickHandler );
    }

	this.initializationComplete = function()
	{
		this.fillList();

		//Needed to erase prefilled form informations.
		this.clearForm();
		this.setEnabled(false);
	}

	/**
	 * Add items from DeptEnum the <SELECT> component.
	 */
	this.fillList = function()
	{
		var deptEnumList = DeptEnum.getComboList();
		
		/*First clear all*/
		while(this.department.firstChild)
			this.department.removeChild(this.department.firstChild);

		for(var i=0; i<deptEnumList.length; i++)
		{
			var option = this.department.appendChild(document.createElement("option"));
			option.value = deptEnumList[i].ordinal;
			option.text = deptEnumList[i].value;
		}
	}

	/**
	 * Give focus to the form component.
	 */
	this.setFocus = function()
	{
		this.fname.focus();
	}

	/**
	 * Set the user used to populate the form.
	 */
	this.setUser = function( user/*UserVO*/ )
	{
		this.user = user;
		
		if(user == null)
			this.clearForm();
		else
		{
			this.uname.value = user.uname;
			this.fname.value = user.fname;
			this.lname.value = user.lname;
			this.email.value = user.email;
			this.password.value = user.password;
			this.confirm.value = user.password;

			for(var i=0; i<this.department.options.length; i++)
				if(this.department.options[i].value == user.department.ordinal)
					this.department.selectedIndex = i;
		}
	}

	this.getUser = function()/*UserVO*/
	{
		this.updateUser();
		return this.user;
	}

	/**
	 * Update user attributes with form fields value.
	 */
	this.updateUser = function()/*UserVO*/
	{
		this.user.uname = this.uname.value;
		this.user.fname = this.fname.value;
		this.user.lname = this.lname.value;
		this.user.email = this.email.value;
		this.user.password = this.password.value;

		var selected = this.department.selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		this.user.department = deptEnumList[selected];
	}

	/**
	 * Clear the whole form.
	 */
	this.clearForm = function()
	{
		this.uname.value = "";
		this.fname.value = "";
		this.lname.value = "";
		this.email.value = "";
		this.password.value = "";
		this.confirm.value = "";	
		this.department.selectedIndex = 0;

		this.setFieldError( 'uname', false );
		this.setFieldError( 'password', false );
		this.setFieldError( 'confirm', false );
		this.setFieldError( 'department', false );
	}

	/**
	 * Enable or disable the form.
	 */
	this.setEnabled = function( isEnabled/*Boolean*/ )
	{
		this.fname.disabled =
		this.lname.disabled =
		this.email.disabled =
		this.password.disabled =
		this.confirm.disabled =
		this.department.disabled =
		this.submitButton.disabled =
		this.cancelButton.disabled =
			!isEnabled;

		this.uname.disabled = !(isEnabled && this.mode == UserForm.MODE_ADD);

	}

	/**
	 * Set the form mode to ADD or EDIT.
	 */
	this.setMode = function( mode/*String*/ )
	{
		this.mode = mode;
	
		switch(mode)
		{
			case UserForm.MODE_ADD:
				this.submitButton.removeChild(this.submitButton.firstChild);
				this.submitButton.appendChild(document.createTextNode("Add User"));
			break;
		
			case UserForm.MODE_EDIT:
				this.submitButton.removeChild(this.submitButton.firstChild);
				this.submitButton.appendChild(document.createTextNode("Update Profile"));
				this.uname.disabled = true;
			break;
		}
	}

	/**
	 * Submit the add or update.
	 */
	this.submit_clickHandler = function()
	{
		if( this.getErrors() )
			return;

		this.updateUser();

		if( this.user.getIsValid() )
		{
			if( this.mode == UserForm.MODE_ADD )
				this.fireEvent( UserForm.ADD );
			else
				this.fireEvent( UserForm.UPDATE );
		}
	}

	/**
	 * Display errors associated with form fields and return if at least one
	 * field is in error.
	 */
	this.getErrors = function()/*Boolean*/
	{
		var error/*Boolean*/ = false;
		if( this.uname.value == "" )
			this.setFieldError( 'uname', error = true );
		else
			this.setFieldError( 'uname', false );

		if( this.password.value == "" )
			this.setFieldError( 'password', error = true );
		else
			this.setFieldError( 'password', false );

		if( this.password.value != "" && this.confirm.value != this.password.value )
			this.setFieldError( 'confirm', error = true );
		else
			this.setFieldError( 'confirm', false );

		var selected = this.department.selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		var department = deptEnumList[selected];

		if( department == DeptEnum.NONE_SELECTED )
			this.setFieldError( 'department', error = true );
		else
			this.setFieldError( 'department', false );

		return error;
	}

	/**
	 * Cancel the add or update
	 */
	this.cancel_clickHandler = function()
	{
		this.fireEvent( UserForm.CANCEL );
	}

	/**
	 * Handle focus event on all the required form fields.
	 */
	this.field_focusHandler = function( evt )
	{
		this.setFieldError( evt.target.id, false );
	}

	/**
	 * Set or unset the error state on the uname field.
	 */
	this.setFieldError = function( fieldName/*String*/, error/*Boolean*/ )
	{
		var label/*Element*/ = this.getElements( 'label[for=' + fieldName + ']' )[0];
		var field/*Element*/ = this.getElement( '#' + fieldName );

		if( error )
		{
			label.addClass( 'fieldError' );
			field.addClass( 'fieldError' );
		}
		else
		{
			label.removeClass( 'fieldError' );
			field.removeClass( 'fieldError' );
		}
	}
}

UserForm = new Class(new UserForm());

UserForm.ADD/*String*/			= "add";
UserForm.UPDATE/*String*/		= "update";
UserForm.CANCEL/*String*/		= "cancel";

UserForm.MODE_ADD/*String*/		= "modeAdd";
UserForm.MODE_EDIT/*String*/	= "modeEdit";