/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var UserListMediator = function( viewComponent/*Object*/ )
{
	this.parent( UserListMediator.NAME, viewComponent );
}

/* subclass Mediator */
UserListMediator.prototype = new Mediator();
UserListMediator.prototype.constructor = UserListMediator;

// The name this Mediator is registered and retrieved with
UserListMediator.NAME/*String*/ = "UserListMediator";

/**
 * @override
 * 
 * Listen for events and retrieve needed Proxies when
 * Mediator is registered.
 */
UserListMediator.prototype.onRegister = function( )
{

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

UserListMediator.prototype.getUserList = function()/*UserList*/
{
	return this.viewComponent;
}

UserListMediator.prototype.onNew = function()
{
	var user/*UserVO*/ = new UserVO();
	this.sendNotification( ApplicationFacade.NEW_USER, user );
}

UserListMediator.prototype.onDelete = function()
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

UserListMediator.prototype.onSelect = function()
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
UserListMediator.prototype.listNotificationInterests = function()/*Array*/
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
UserListMediator.prototype.handleNotification = function( note/*INotification*/ )
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