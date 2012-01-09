/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * The UI component in charge of the <em>User List</em>.
 * 
 * @extends org.puremvc.js.demos.objs.employeeadmin.view.components.UiComponent UiComponent
 */
var UserList = Objs("org.puremvc.js.demos.objs.employeeadmin.view.components.UserList",
	UiComponent,
{

	/**
	 * The user list panel HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	userListPanel: null,
	
	/**
	 * The user list HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	userList: null,
	
	/**
	 * The "new" button HTML element.
	 * 
	 * @type {HTMLElement}
	 * @private
	 */
	newButton: null,

	/**
	 * The current selected user.
	 * 
	 * @type {String}
	 * @private
	 */
	selectedUser: null,
	
	/**
	 * The user list of the application.
	 * 
	 * @type {Array}
	 * @private
	 */
	users: null,
	
	/**
	 * @construct
	 * @override
	 * Initialize a <code>UserList</code> instance.
	 */
	initialize: function()
	{
		UserList.$super.initialize.call( this );
		
		this.initializeChildren();
		this.configureListeners();
	},

    /**
     * Initialize references to DOM elements.
     */
    initializeChildren: function()
    {
		this.userListPanel = $(".user-list-panel");

		this.userList = this.userListPanel.find("#user-list");
		this.userList.jqGrid
		(
			{
				datatype: "local",
				width: 630,
				height: 160,
			   	colNames:['User Name', 'First Name', 'Last Name', 'Email', 'Department'],
			   	colModel:
				[
			   		{name:'uname', index:'uname', width:125 },
			   		{name:'fname', index:'fname', width:125 },
			   		{name:'lname', index:'lname', width:125 },
			   		{name:'email', index:'email', width:130 },
			   		{name:'department', index:'department', width:125}
			   	]
			}
		);

		this.newButton = this.userListPanel.find(".new-button").button();
		this.deleteButton = this.userListPanel.find(".delete-button").button();	
		this.deleteButton.button("disable");
    },

    /**
     * Configure event listeners registration.
     */
    configureListeners: function()
    {		
		var that/*UserList*/ = this; //Needed to delegate events to this instance.
		
		this.userList.jqGrid( 'setGridParam', { onSelectRow: function( id ){ that.userList_selectHandler( id ); } } );
		this.newButton.click( function(evt){ that.newButton_clickHandler(evt) } );
		this.deleteButton.click( function(evt){ that.deleteButton_clickHandler(evt) } );
    },

	/**
	 * Add users from a list to the <SELECT> component.
	 * 
	 * @param {Array} userList
	 * 		The user list to set.
	 */
	setUsers: function( userList )
	{
		this.users = userList;
		
		// First clear all
		this.userList.jqGrid( 'clearGridData' );

		// Fill the data-grid
		for(var i/*Number*/=0; i<userList.length; i++)
		{
			var user/*UserVO*/ = userList[i];
			var rowData/*Object*/ = 
			{
				uname: user.uname,
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				department: user.department.value
			};

			this.userList.jqGrid( 'addRowData', i+1, rowData );
		}
	},
	
	/**
	 * Return current selected user in user list.
	 * 
	 * <p>Note that jQgrid cannot embed any external data to transport the
	 * UserVo. So it is best to return uname.
	 * 
	 * @return {String}
	 * 		The user name selected in the user list.
	 */
	getSelectedUser: function()
	{
		return this.selectedUser;
	},
	
	/**
	 * List row selection event listener.
	 * 
	 * @param {String} id
	 * 		The id of the selected row.
	 */
	userList_selectHandler: function( id )
	{
		var rowData/*Object*/ = this.userList.jqGrid( 'getRowData', id );

		var uname/*String*/;
		for( var i/*Number*/=0; i<this.users.length; i++ )
		{
			if( this.users[i].uname == rowData.uname )
			{
				uname = rowData.uname;
				break;
			}	
		}	

		this.selectedUser = uname;
		this.dispatchEvent( UserList.SELECT );
		
		this.deleteButton.button("enable");
	},
	
	/**
	 * New button click event listener. 
	 */
	newButton_clickHandler: function()
	{
		this.deSelect();
		this.dispatchEvent( UserList.NEW );
	},

	/**
	 * New button click event listener. 
	 */
	deleteButton_clickHandler: function()
	{
		this.dispatchEvent( UserList.DELETE );
	},
	
	/**
	 * Remove selection in the user list.
	 */
	deSelect: function()
	{
		this.userList.jqGrid( 'resetSelection' );
		this.selectedUser = null;

		this.deleteButton.button("disable");
	}
});

/*
 * Events type
 */
UserList.NEW/*String*/ 		= "new";
UserList.DELETE/*String*/ 	= "delete";
UserList.SELECT/*String*/ 	= "select";