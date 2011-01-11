/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var UserFormMediator = function( viewComponent/*Object*/ )
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
		this.parent( UserFormMediator.NAME, viewComponent );

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

	this.userProxy/*UserProxy*/ = null;

	this.getUserForm  = function()/*UserForm*/
	{
		return this.viewComponent;
	}

	this.onAdd = function()
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.addItem( user );
		this.sendNotification( ApplicationFacade.USER_ADDED, user );
		
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}

	this.onUpdate = function()
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.updateItem( user );
		this.sendNotification(  ApplicationFacade.USER_UPDATED, user );

		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}

	this.onCancel = function()
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
	this.listNotificationInterests = function()/*Array*/
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
	this.handleNotification = function( note/*INotification*/ )
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
}
UserFormMediator = new Class(new UserFormMediator());

UserFormMediator.NAME/*String*/ = "UserFormMediator";