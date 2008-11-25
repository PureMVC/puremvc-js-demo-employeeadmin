/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_components_UserList()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.components.UserList",UserList);

	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var EventDispatcher = Objs.load("net.tekool.events.EventDispatcher");
	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");

	/**
	 * Constructor
	 *
	 * Uses composition with the <code>userlist div</code> of the 
	 * <code>application div</code> to add it functionalities that we cannot add
	 * with inheritance because code behind did not exists with HTML.
	 */
	function UserList(userListPanel/*DomElement*/)
	{
		if(Objs.extending) return;

		this.__userListPanel = userListPanel;
		this.__eventDispatcher = new EventDispatcher();

		document.getElementById('userList').onchange = Relegate.create(this, this.__onSelect);
		document.getElementById('newButton').onclick = Relegate.create(this,this.__onNew);
		document.getElementById('deleteButton').onclick = Relegate.create(this,this.__onDelete);
		
		this.deSelect();
	}

	var o = UserList.prototype;

	UserList.NEW/*String*/ 		= 'new';
	UserList.DELETE/*String*/ 	= 'delete';
	UserList.SELECT/*String*/ 	= 'select';

	o.selectedUser/*UserVO*/ = null;
	o.__users/*Array*/ = null;
	o.__userListPanel/*DomElement*/ = null;
	o.__eventDispatcher/*EventDispatcher*/ = null;

	/**
	 * Add items from a UserVO list to the <SELECT> component.
	 */
	o.setUsers = function(userList/*Array*/)
	{
		this.__users = userList;
		this.refresh();
	}

	/**
	 * Refresh displayed items in the the <SELECT> component from the users list.
	 */
	o.refresh = function()
	{
		var select = document.getElementById('userList');
		
		/*First clear all*/
		while(select.firstChild)
			select.removeChild(select.firstChild);

		for(var i=0; i<this.__users.length; i++)
		{
			var user/*UserVO*/ = this.__users[i];
			var option = select.appendChild(document.createElement('OPTION'));
			option.associatedValue = user;

			//We don't have a datagrid available with all browsers
			option.text = ""
				+ user.username			+ " - "
				+ user.fname			+ " - "
				+ user.lname			+ " - "
				+ user.email			+ " - "
				+ user.password			+ 
				 (user.department != DeptEnum.NONE_SELECTED ? (" - " + user.department.value) : "")
			;
		}
	}

	/**
	 * List selection changed event listener.
	 */
	o.__onSelect = function()
	{
		var select = document.getElementById('userList');
		this.selectedUser = select.options[select.selectedIndex].associatedValue;
		document.getElementById('deleteButton').disabled = false;

		this.dispatchEvent( new EventS( UserList.SELECT,this ) );
	}

	/**
	 * New button click event listener. 
	 */
	o.__onNew = function()
	{
		this.deSelect();
		this.dispatchEvent( new EventS( UserList.NEW,this ) );
	}
	/**
	 * New button click event listener. 
	 */
	o.__onDelete = function()
	{
		this.dispatchEvent( new EventS( UserList.DELETE,this ) );
	}

	/**
	 * Remove selection in the user list.
	 */
	o.deSelect = function()
	{
		document.getElementById('userList').selectedIndex = -1;
		this.selectedUser = null;
		document.getElementById('deleteButton').disabled = true;
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