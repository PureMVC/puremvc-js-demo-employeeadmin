/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_components_UserForm()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.UserForm",UserForm);

	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");

	/**
	 * Constructor
	 *
	 * Uses composition with the <code>userform div</code> of the 
	 * <code>application div</code> to add it functionalities that we cannot add
	 * with inheritance because code behind did not exists with HTML.
	 */
	function UserForm(userFormDiv/*DomElement*/)
	{
		if(Objs.extending) return;

		this.__userFormDiv = userFormDiv;
		this.__eventDispatcher = new EventDispatcher();

		document.getElementById('submitButton').onclick = Relegate.create(this,this.__submit);
		document.getElementById('cancelButton').onclick = Relegate.create(this,this.__cancel);

		this.__fillList();

		//Needed to erase prefilled form informations.
		this.clearForm();
		this.setEnabled(false);
	}

	var o = UserForm.prototype;

	UserForm.ADD/*String*/			= "add";
	UserForm.UPDATE/*String*/		= "update";
	UserForm.CANCEL/*String*/		= "cancel";

	UserForm.MODE_ADD/*String*/		= "modeAdd";
	UserForm.MODE_EDIT/*String*/	= "modeEdit";

	o.__user/*UserVO*/ = null;
	o.__userFormDiv/*DomElement*/ = null;
	o.__eventDispatcher/*EventDispatcher*/ = null;
	o.__mode/*String*/ = null;

	/* Add items from DeptEnum the <SELECT> component. */
	o.__fillList = function()
	{
		var select = document.getElementById('department');
		var deptEnumList = DeptEnum.getComboList();
		
		/*First clear all*/
		while(select.firstChild)
			select.removeChild(select.firstChild);

		for(var i=0; i<deptEnumList.length; i++)
		{
			var option = select.appendChild(document.createElement('OPTION'));
			option.value = deptEnumList[i].ordinal;
			option.text = deptEnumList[i].value;
		}
	}

	/**
	 * Give focus to the form component.
	 */
	o.setFocus = function()
	{
		var firstname = document.getElementById('firstname');
		firstname.focus();
	}

	/**
	 * Set the user used to populate the form.
	 */
	o.setUser = function(user/*UserVO*/)
	{
		this.__user = user;

		var select = document.getElementById('department');
		
		if(user == null)
			this.clearForm();
		else
		{
			document.getElementById('username').value = user.username;
			document.getElementById('firstname').value = user.fname;
			document.getElementById('lastname').value = user.lname;
			document.getElementById('email').value = user.email;
			document.getElementById('password').value = user.password;
			document.getElementById('confirm').value = user.password;

			for(var i=0; i<select.options.length; i++)
				if(select.options[i].value == user.department.ordinal)
					select.selectedIndex = i;
		}
	}
	o.getUser = function()/*UserVO*/
	{
		this.__updateUser();
		return this.__user;
	}

	/**
	 * Update user attributes with form fields value.
	 */
	o.__updateUser = function()/*UserVO*/
	{
		this.__user.username = document.getElementById('username').value;
		this.__user.fname = document.getElementById('firstname').value;
		this.__user.lname = document.getElementById('lastname').value;
		this.__user.email = document.getElementById('email').value;
		this.__user.password = document.getElementById('password').value;
		this.__user.password = document.getElementById('confirm').value;

		var selected = document.getElementById('department').selectedIndex;
		var deptEnumList = DeptEnum.getComboList();
		this.__user.department = deptEnumList[selected];
	}

	/**
	 * Clear the whole form.
	 */
	o.clearForm = function()
	{
		document.getElementById('username').value = "";
		document.getElementById('firstname').value = "";
		document.getElementById('lastname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";
		document.getElementById('confirm').value = "";	
		document.getElementById('department').selectedIndex = 0;
	}

	/**
	 * Enable or disable the form.
	 */
	o.setEnabled = function(isEnabled)
	{
		document.getElementById('username').disabled =
		document.getElementById('firstname').disabled =
		document.getElementById('lastname').disabled =
		document.getElementById('email').disabled =
		document.getElementById('password').disabled =
		document.getElementById('confirm').disabled =
		document.getElementById('department').disabled =
		document.getElementById('submitButton').disabled =
		document.getElementById('cancelButton').disabled =
			!isEnabled;
	}

	/**
	 * Set the form mode to ADD or EDIT.
	 */
	o.setMode = function(mode/*String*/)
	{
		this.__mode = mode;
		
		var submitButton = document.getElementById('submitButton');
		
		switch(mode)
		{
			case UserForm.MODE_ADD:
				submitButton.removeChild(submitButton.firstChild);
				submitButton.appendChild(document.createTextNode("Add User"));
			break;
		
			case UserForm.MODE_EDIT:
				submitButton.removeChild(submitButton.firstChild);
				submitButton.appendChild(document.createTextNode("Update User"));
			break;
		}
	}

	/**
	 * Submit the add or update.
	 */
	o.__submit = function()
	{
		this.__updateUser();
		if( this.__user.getIsValid() )
		{
			if( this.__mode == UserForm.MODE_ADD )
				this.dispatchEvent( new EventS( UserForm.ADD) );
			else
				this.dispatchEvent( new EventS( UserForm.UPDATE) );
		}
	}

	/**
	 * Cancel the add or update
	 */
	o.__cancel = function()
	{
		this.dispatchEvent( new EventS( UserForm.CANCEL ) );
	}

	/**
	 * Enable submit button if required fields are satisfied.
	 */
	o.__enableSubmit = function
	(
		u/*String*/,
		p/*String*/,
		c/*String*/,
		d/*DeptEnum*/
	)/*Boolean*/
	{
		return ( u != '' && p != '' && p == c && d != DeptEnum.NONE_SELECTED );
	}

	/**
	 * Dispatches an event into the event flow.
	 */
	o.dispatchEvent = function(event/*EventS*/)
	{
		event.target = this;
		this.__eventDispatcher.dispatchEvent(event);
	}

	/**
	 * Registers an event listener object with an EventDispatcher object so that
	 * the listener receives notification of an event.
	 */
	o.addEventListener = function(type/*String*/, listener/*Object*/)
	{
		this.__eventDispatcher.addEventListener(type, listener);

	}

	/**
	 * Removes a listener from the EventDispatcher object.
	 */
	o.removeEventListener = function(type/*String*/, listener/*Object*/)
	{
		this.__eventDispatcher.removeEventListener(type, listener);
	}
}