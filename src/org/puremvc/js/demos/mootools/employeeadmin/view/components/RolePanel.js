/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var RolePanel = function()
{
    /**
     * @ignore
     */
    this.Extends = UIComponent;

	/**
	 * Elements
	 */
	this.addRoleButton/*Element*/ = null;
	this.removeRoleButton/*Element*/ = null;
	this.roleList/*Element*/ = null;
	this.userRoleList/*Element*/ = null;

	/**
	 * The currently displayed user roles.
	 */
	this.user = null;

	/**
	 * The currently selected user role.
	 */
	this.selectedRole = null;

	/**
	 * The add or remove role mode.
	 */
	this.mode = null;

	/**
	 * Constructor
	 */
	this.initialize = function()
	{
		this.parent("role-list-panel");

		// Overwrite listener handlers with
		// methods bound to 'this'
		this.addRoleButton_clickHandler = this.addRoleButton_clickHandler.bindWithEvent(this);
		this.removeRoleButton_clickHandler = this.removeRoleButton_clickHandler.bindWithEvent(this);
		this.roleList_changeHandler = this.roleList_changeHandler.bindWithEvent(this);
		this.userRoleList_changeHandler = this.userRoleList_changeHandler.bindWithEvent(this);
	}

    /**
     * Creates all children required to create the
     * initial View state of this control and adds them to the DOM.
     */
    this.initializeChildren = function()
    {
		this.userRoleList = $("user-role-list");
		this.roleList = $("role-list");
		this.addRoleButton = $("add-role-button");
		this.removeRoleButton = $("remove-role-button");
    }
	
    /**
     * Adds the'click' listener to the startStop button after creation.
     */
    this.childrenInitialized = function()
    {
		this.addRoleButton.addEvent( "click", this.addRoleButton_clickHandler );
		this.removeRoleButton.addEvent( "click", this.removeRoleButton_clickHandler );
		this.roleList.addEvent( "change", this.roleList_changeHandler );
		this.userRoleList.addEvent( "change", this.userRoleList_changeHandler );
    }

	this.initializationComplete = function()
	{
		this.fillRoleList();
		this.setEnabled(false);
	}

	/**
	 * Add items from DeptEnum to the <code>userRoleList</code>.
	 */
	this.fillRoleList = function( userRoles/*Array*/ )
	{
		var roleEnumList = RoleEnum.getComboList();

		/*First clear all*/
		while( this.roleList.firstChild )
			this.roleList.removeChild( this.roleList.firstChild );

		for(var i=0; i<roleEnumList.length; i++)
		{
			var role/*RoleVO*/ = roleEnumList[i];
			var option = this.roleList.appendChild( document.createElement("OPTION") );
			option.associatedValue = role;
			option.text = role.value;
		}
	}

	/**
	 * Set the displayed user roles list.
	 */
	this.setUserRoles = function( userRoles/*Array*/ )
	{
		/*First clear all*/
		while( this.userRoleList.firstChild )
			this.userRoleList.removeChild( this.userRoleList.firstChild );

		if( userRoles == null )
			return;

		for( var i=0; i<userRoles.length; i++ )
		{
			var role/*RoleVO*/ = userRoles[i];
			var option = this.userRoleList.appendChild( document.createElement("OPTION") );
			option.associatedValue = role;
			option.text = role.value;
		}
	}

	/**
	 * Enable or disable the form.
	 */
	this.setEnabled = function( isEnabled/*Boolean*/ )
	{
		this.addRoleButton.disabled =
		this.removeRoleButton.disabled =
			!isEnabled;

		this.userRoleList.disabled =
		this.roleList.disabled =
			!isEnabled;
		
		if( !isEnabled )
			this.roleList.selectedIndex = -1;
	}

	/**
	 * Enable or disable the form.
	 *
	 * @param mode
	 *		The Add/Remove role mode of the form.
	 */
	this.setMode = function( mode/*String*/ )
	{
		switch( mode )
		{
			case RolePanel.ADD_MODE:
				this.addRoleButton.disabled = false;
				this.removeRoleButton.disabled = true;
			break;
			
			case RolePanel.REMOVE_MODE:
				this.addRoleButton.disabled = true;
				this.removeRoleButton.disabled = false;
				this.roleList.selectedIndex = 0;
			break;

			default:
				this.addRoleButton.disabled = true;
				this.removeRoleButton.disabled = true;
		}
	}

	/**
	 * Clear the panel from all its displayed data.
	 */
	this.clearForm = function()
	{
		this.user = null;
		this.setUserRoles(null);
		this.roleList.selectedIndex = 0;
	}

	/**
	 * Add button onclick event listener.
	 */
	this.addRoleButton_clickHandler = function()
	{
		this.fireEvent( RolePanel.ADD );
	}

	/**
	 * Remove button onclick event listener.
	 */
	this.removeRoleButton_clickHandler = function()
	{
		this.fireEvent( RolePanel.REMOVE );
	}

	/**
	 * Select role to remove.
	 */
	this.userRoleList_changeHandler = function()
	{
		this.roleList.selectedIndex = -1;
		this.selectedRole = this.userRoleList.options[ this.userRoleList.selectedIndex ].associatedValue;
		
		this.setMode( RolePanel.REMOVE_MODE );
	}

	/**
	 * Select role to add.
	 */
	this.roleList_changeHandler = function()
	{
		this.userRoleList.selectedIndex = -1;
		this.selectedRole = this.roleList[this.roleList.selectedIndex].associatedValue;
		
		if( this.selectedRole == RoleEnum.NONE_SELECTED )
			this.setMode( null );
		else
			this.setMode( RolePanel.ADD_MODE );
	}
}
RolePanel = new Class(new RolePanel());

RolePanel.REMOVE = "remove";
RolePanel.ADD_MODE = "addMode";
RolePanel.REMOVE_MODE = "removeMode";