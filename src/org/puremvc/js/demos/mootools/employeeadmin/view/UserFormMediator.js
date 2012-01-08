/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var UserFormMediator = function( viewComponent/*Object*/ )
{
	Mediator.call( this, UserFormMediator.NAME, viewComponent );
}

/* subclass Mediator */
UserFormMediator.prototype = new Mediator();
UserFormMediator.prototype.constructor = UserFormMediator;

// The name this Mediator is registered and retrieved with
UserFormMediator.NAME/*String*/ = "UserFormMediator";

/**
 * @override
 * 
 * Listen for events and retrieve needed Proxies when
 * Mediator is registered.
 */
UserFormMediator.prototype.onRegister = function( )
{
	// Overwrite listener handlers with
	// methods bound to 'this'
	this.onAdd = this.onAdd.bindWithEvent(this);
	this.onUpdate = this.onUpdate.bindWithEvent(this);
	this.onCancel = this.onCancel.bindWithEvent(this);

	var userForm/*UserForm*/ = this.getUserForm();
	userForm.addEvent( UserForm.ADD, this.onAdd );
	userForm.addEvent( UserForm.UPDATE, this.onUpdate );
	userForm.addEvent( UserForm.CANCEL, this.onCancel );

	this.userProxy = this.facade.retrieveProxy( UserProxy.NAME );
}

UserFormMediator.prototype.getUserForm  = function()/*UserForm*/
{
	return this.viewComponent;
}

UserFormMediator.prototype.onAdd = function()
{
	var user/*UserVO*/ = this.getUserForm().getUser();
	this.userProxy.addItem( user );
	this.sendNotification( ApplicationFacade.USER_ADDED, user );
	
	var userForm/*UserForm*/ = this.getUserForm();
	userForm.clearForm();
	userForm.setEnabled(false);
	userForm.setMode(UserForm.MODE_ADD);
}

UserFormMediator.prototype.onUpdate = function()
{
	var user/*UserVO*/ = this.getUserForm().getUser();
	this.userProxy.updateItem( user );
	this.sendNotification(  ApplicationFacade.USER_UPDATED, user );

	var userForm/*UserForm*/ = this.getUserForm();
	userForm.clearForm();
	userForm.setEnabled(false);
	userForm.setMode(UserForm.MODE_ADD);
}

UserFormMediator.prototype.onCancel = function()
{
	this.sendNotification(  ApplicationFacade.CANCEL_SELECTED );

	var userForm/*UserForm*/ = this.getUserForm();
	userForm.clearForm();
	userForm.setEnabled(false);
	userForm.setMode(UserForm.MODE_ADD);
}

/**
 * @override
 */
UserFormMediator.prototype.listNotificationInterests = function()/*Array*/
{
	return [
		ApplicationFacade.NEW_USER,
		ApplicationFacade.USER_DELETED,
		ApplicationFacade.USER_SELECTED
	];
}

/**
 * @override
 */
UserFormMediator.prototype.handleNotification = function( note/*Notification*/ )
{
	var userForm/*UserForm*/ = this.getUserForm();
	switch ( note.getName() )
	{
		case ApplicationFacade.NEW_USER:
			userForm.setUser( note.getBody() );
			userForm.setMode( UserForm.MODE_ADD );
			userForm.setEnabled(true);
			userForm.setFocus();
		break;

		case ApplicationFacade.USER_DELETED:
			userForm.clearForm();
			userForm.setEnabled(false);
		break;

		case ApplicationFacade.USER_SELECTED:
			userForm.clearForm();
			userForm.setUser( note.getBody() );
			userForm.setMode( UserForm.MODE_EDIT );
			userForm.setEnabled(true);
			userForm.setFocus();
		break;
	}
}