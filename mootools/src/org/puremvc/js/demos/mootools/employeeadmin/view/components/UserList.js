/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var UserList = function()
{
    /**
     * @ignore
     */
    this.Extends = UIComponent;

	/*
	 * Child elements.
	 */
	this.userList/*omniGrid*/ = null;
	this.newButton/*Element*/ = null;
	this.deleteButton/*Element*/ = null;

	this.selectedUser/*UserVO*/ = null;
	this.users/*Array*/ = null;

	/**
     * @ignore
	 */
	this.initialize = function()
	{
		this.parent("user-list-panel");

		// Overwrite listener handlers with
		// methods bound to 'this'
		this.userList_changeHandler = this.userList_changeHandler.bindWithEvent(this);
		this.newButton_clickHandler = this.newButton_clickHandler.bindWithEvent(this);
		this.deleteButton_changeHandler = this.deleteButton_changeHandler.bindWithEvent(this);
	}

    /**
     * Creates all children required to create the
     * initial View state of this control and adds them to the DOM.
     */
    this.initializeChildren = function()
    {
		var columnModel =
		[
			{
				header:"User Name",
				dataIndex:"uname",
				dataType:"string",
				width:100
			},
			{
				header:"First Name",
				dataIndex:"fname",
				dataType:"string",
				width:100
			},
			{
				header:"Last Name",
				dataIndex:"lname",
				dataType:"string",
				width:100
			},
			{
				header:"Email",
				dataIndex:"email",
				dataType:"string",
				width:122
			},
			{
				header:"Password",
				dataIndex:"password",
				dataType:"string",
				width:100
			},
			{
				header:"Department",
				dataIndex:"department",
				dataType:"string",
				width:100,
				labelFunction : function( data, row )
				{
					var user/*UserVo*/ = data;
					return (user.department != DeptEnum.NONE_SELECTED ? user.department.value : "");
				}
			}
		];

		this.userList = new omniGrid
		(
			"user-list",
			{
				columnModel: columnModel,
				pagination:false,
				serverSort:false,
				showHeader: true,
				alternaterows: true,
				showHeader:true,
				sortHeader:true,
				resizeColumns:true,
				multipleSelection:false,
					
				width:630,
				height:190
			}
		);

		this.newButton = $("new-button");

		this.deleteButton = $("delete-button");
    };

    /**
     * Adds the'click' listener to the startStop button after creation.
     */
    this.childrenInitialized = function()
    {
		this.userList.addEvent( "click", this.userList_changeHandler );
		this.newButton.addEvent( "click", this.newButton_clickHandler );
		this.deleteButton.addEvent( "click", this.deleteButton_changeHandler );
    };

	this.initializationComplete = function()
	{
		this.deSelect();
	}

	/**
	 * Add items from a UserVO list to the <SELECT> component.
	 */
	this.setUsers = function( userList/*Array*/ )
	{
		this.users = userList;
		this.refresh();
	}

	/**
	 * Refresh displayed items in the users list.
	 */
	this.refresh = function()
	{
		/*First clear all*/
		this.userList.removeAll();

		//Omnigrid server side data tweak
		this.userList.setData
		(
			{
				data:this.users
			} 
		);
	}

	/**
	 * List selection changed event listener.
	 *
	 * @param evt = {indices:this.selected, target:this, row:li.retrieve('row'), element:li }
	 */
	this.userList_changeHandler = function( evt/*Event*/ )
	{
		this.selectedUser = evt.target.getDataByRow(evt.row);
		this.deleteButton.disabled = false;

		this.fireEvent( UserList.SELECT );
	}

	/**
	 * New button click event listener. 
	 */
	this.newButton_clickHandler = function()
	{
		this.deSelect();
		this.fireEvent( UserList.NEW );
	}
	/**
	 * New button click event listener. 
	 */
	this.deleteButton_changeHandler = function()
	{
		this.fireEvent( UserList.DELETE );
	}

	/**
	 * Remove selection in the user list.
	 */
	this.deSelect = function()
	{
		this.userList.unselectAll();
		this.selectedUser = null;
		this.deleteButton.disabled = true;
	}
}
UserList = new Class(new UserList());

UserList.NEW/*String*/ 		= "new";
UserList.DELETE/*String*/ 	= "delete";
UserList.SELECT/*String*/ 	= "select";