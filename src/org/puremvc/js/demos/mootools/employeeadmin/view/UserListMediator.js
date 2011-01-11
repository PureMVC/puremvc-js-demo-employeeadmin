/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var UserListMediator = function( viewComponent/*Object*/ )
{
	/**
	 * Required by MooTools for inheritance.
	 * @type Class
	 */
	this.Extends = Mediator;

	/**
	 * Constructor
	 */
	this.initialize = function( viewComponent/*Object*/ )
	{
		this.parent( UserListMediator.NAME, viewComponent );

		// Overwrite listener handlers with
		// methods bound to 'this'
		this.onNew = this.onNew.bindWithEvent(this);
		this.onDelete = this.onDelete.bindWithEvent(this);
		this.onSelect = this.onSelect.bindWithEvent(this);

		var userList/*UserList*/ = this.getUserList();
		userList.addEvent( UserList.NEW, this.onNew );
		userList.addEvent( UserList.DELETE, this.onDelete );
		userList.addEvent( UserList.SELECT, this.onSelect );

		var userProxy = this.facade.retrieveProxy( UserProxy.NAME );
		userList.setUsers(userProxy.getUsers());
	}

	this.getUserList = function()/*UserList*/
	{
		return this.viewComponent;
	}

	this.onNew = function()
	{
		var user/*UserVO*/ = new UserVO();
		this.sendNotification( ApplicationFacade.NEW_USER, user );
	}

	this.onDelete = function()
	{
		var selectedUser = this.getUserList().selectedUser ;
		if(selectedUser == null)
			return;

		this.sendNotification
		(
			ApplicationFacade.DELETE_USER,
			this.getUserList().selectedUser 
		);
	}

	this.onSelect = function()
	{
		this.sendNotification
		(
			ApplicationFacade.USER_SELECTED,
			this.getUserList().selectedUser
		);
	}

	/**
	 * @override
	 */
	this.listNotificationInterests = function()/*Array*/
	{
		return [
			ApplicationFacade.CANCEL_SELECTED,
			ApplicationFacade.USER_UPDATED,
			ApplicationFacade.USER_ADDED,
			ApplicationFacade.USER_DELETED
		];
	}

	/**
	 * @override
	 */
	this.handleNotification = function( note/*INotification*/ )
	{
		var userList/*UserList*/ = this.getUserList();
		var userProxy = this.facade.retrieveProxy( UserProxy.NAME );

		switch( note.getName() )
		{
			case ApplicationFacade.CANCEL_SELECTED:
				userList.deSelect();
			break;

			case ApplicationFacade.USER_UPDATED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
			
			case ApplicationFacade.USER_ADDED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
			
			case ApplicationFacade.USER_DELETED:
				userList.setUsers( userProxy.getUsers() );
				userList.deSelect();
			break;
		}
	}
}
UserListMediator = new Class(new UserListMediator());