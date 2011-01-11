/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_components_RolePanel()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.RolePanel",RolePanel);

	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var RoleVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO");
	var RoleEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");

	RolePanel.ADD/*String*/ = 'add';
	RolePanel.REMOVE/*String*/ = 'remove';

	/**
	 * Constructor
	 *
	 * Uses composition with the <code>rolepanel div</code> of the 
	 * <code>application div</code> to add it functionalities that we cannot add
	 * with inheritance because code behind did not exists with HTML.
	 */
	function RolePanel(userFormDiv/*DomElement*/)
	{
		if(Objs.extending) return;

		this.__userFormDiv = userFormDiv;
		this.__eventDispatcher = new EventDispatcher();

		this.roleList = document.getElementById('roleList');
		
		document.getElementById('addRoleButton').onclick = Relegate.create(this,this.__onAdd);
		document.getElementById('removeRoleButton').onclick = Relegate.create(this,this.__onRemove);
		document.getElementById('fullRoleList').onchange = Relegate.create(this,this.__selectRoleToAdd);
		document.getElementById('roleList').onchange = Relegate.create(this,this.__selectRoleToRemove);

		this.fillFullRoleList();
		this.setEnabled(false);
	}

	var o = RolePanel.prototype;

	/**
	 * The currently displayed user roles.
	 */
	o.user = null;

	/**
	 * The currently selected user role.
	 */
	o.selectedRole = null

	/**
	 * Set the displayed user roles list.
	 */
	o.setUserRoles = function(userRoles/*Array*/)
	{
		/*First clear all*/
		while(this.roleList.firstChild)
			this.roleList.removeChild(this.roleList.firstChild);

		if(userRoles == null)
			return;

		for(var i=0; i<userRoles.length; i++)
		{
			var role/*RoleVO*/ = userRoles[i];
			var option = this.roleList.appendChild(document.createElement('OPTION'));
			option.associatedValue = role;
			option.text = role.value;
		}
	}

	/**
	 * Add button onclick event listener.
	 */
	o.__onAdd = function()
	{
		this.dispatchEvent( new EventS( RolePanel.ADD, true ) );
	}

	/**
	 * Remove button onclick event listener.
	 */
	o.__onRemove = function()
	{
		this.dispatchEvent( new EventS( RolePanel.REMOVE, true ) );
	}

	/**
	 * Fill the full role list with the associated enum value.
	 */
	o.fillFullRoleList = function(userRoles/*Array*/)
	{
		var fullRoleEnumList = RoleEnum.getComboList();
		var fullRoleList = document.getElementById('fullRoleList');

		/*First clear all*/
		while(fullRoleList.firstChild)
			fullRoleList.removeChild(this.roleList.firstChild);

		for(var i=0; i<fullRoleEnumList.length; i++)
		{
			var role/*RoleVO*/ = fullRoleEnumList[i];
			var option = fullRoleList.appendChild(document.createElement('OPTION'));
			option.associatedValue = role;
			option.text = role.value;
		}
	}

	/**
	 * Enable or disable the form.
	 */
	o.setEnabled = function(isEnabled)
	{
		document.getElementById('addRoleButton').disabled = true;
		document.getElementById('removeRoleButton').disabled = true;

		document.getElementById('roleList').disabled =
		document.getElementById('fullRoleList').disabled =
			!isEnabled;
		
		document.getElementById('fullRoleList').selectedIndex = -1;
	}

	o.roleList/*DomElement*/ = null;

	/**
	 * Select role to remove.
	 */
	o.__selectRoleToRemove = function()
	{
		var fullRoleList = document.getElementById('fullRoleList');
		fullRoleList.selectedIndex = RoleEnum.NONE_SELECTED.ordinal;
		this.selectedRole = this.roleList.options[this.roleList.selectedIndex].associatedValue;
		
		document.getElementById('addRoleButton').disabled = true;
		document.getElementById('removeRoleButton').disabled =	false;
	}

	/**
	 * Select role to add.
	 */
	o.__selectRoleToAdd = function()
	{
		this.roleList.selectedIndex = -1;

		var fullRoleList = document.getElementById('fullRoleList');
		this.selectedRole = fullRoleList[fullRoleList.selectedIndex].associatedValue;
		
		document.getElementById('addRoleButton').disabled = this.selectedRole == RoleEnum.NONE_SELECTED;
		document.getElementById('removeRoleButton').disabled = true;
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