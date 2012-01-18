/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var RolePanelMediator = function( viewComponent/*Object*/ )
{
	/**
	 * Required by MooTools for inheritance.
	 * @type Class
	 */
	this.Extends = Mediator;

	this.roleProxy/*RoleProxy*/ = null;		

	/**
	 * Constructor
	 */
	this.initialize = function( viewComponent/*Object*/ )
	{
		this.parent( RolePanelMediator.NAME, viewComponent );

		// Overwrite listener handlers with
		// methods bound to 'this'
		this.onAddRole = this.onAddRole.bindWithEvent(this);
		this.onRemoveRole = this.onRemoveRole.bindWithEvent(this);

		var rolePanel/*RolePanel*/ = this.getRolePanel();
		rolePanel.addEvent( RolePanel.ADD, this.onAddRole );
		rolePanel.addEvent( RolePanel.REMOVE, this.onRemoveRole );

		this.roleProxy = this.facade.retrieveProxy( RoleProxy.NAME );
	}

	this.getRolePanel = function()/*RolePanel*/
	{
		return this.viewComponent;
	}

	this.onAddRole = function()
	{
		this.roleProxy.addRoleToUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
		this.getRolePanel().setMode(null);
	}

	this.onRemoveRole = function()
	{
		this.roleProxy.removeRoleFromUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
		this.updateUserRoleList();
		this.getRolePanel().setMode(null);
	}

	this.updateUserRoleList = function()
	{
		var userName/*String*/ = this.getRolePanel().user.uname;
		var userRoles/*Array*/ = this.roleProxy.getUserRoles( userName );
		this.getRolePanel().setUserRoles( userRoles );
	}

	/**
	 * @override
	 */
	this.listNotificationInterests = function()/*Array*/
	{
		return [
			ApplicationFacade.NEW_USER,
			ApplicationFacade.USER_ADDED,
			ApplicationFacade.USER_UPDATED,
			ApplicationFacade.USER_DELETED,
			ApplicationFacade.CANCEL_SELECTED,
			ApplicationFacade.USER_SELECTED,
			ApplicationFacade.ADD_ROLE_RESULT
		];
	}

	/**
	 * @override
	 */
	this.handleNotification = function( note/*INotification*/ )
	{
		var rolePanel/*RolePanel*/ = this.getRolePanel();

		switch( note.getName() )
		{
			case ApplicationFacade.NEW_USER:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_ADDED:
				rolePanel.user/*UserVO*/ = note.getBody();
				var roleVO/*RoleVO*/ = new RoleVO ( rolePanel.user.uname );
				this.roleProxy.addItem( roleVO );

				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_UPDATED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_DELETED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.CANCEL_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_SELECTED:
				rolePanel.clearForm();
				rolePanel.setEnabled(true);
				rolePanel.setMode(null);
			
				rolePanel.user = note.getBody();
				this.updateUserRoleList();
			break;

			case ApplicationFacade.ADD_ROLE_RESULT:
				this.updateUserRoleList();
			break;
		}
	}
}
RolePanelMediator = new Class(new RolePanelMediator());

RolePanelMediator.NAME/*String*/ = "RolePanelMediator";