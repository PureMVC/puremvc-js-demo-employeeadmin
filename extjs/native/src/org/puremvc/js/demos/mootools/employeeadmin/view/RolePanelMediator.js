/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var RolePanelMediator = function( viewComponent/*Object*/ )
{
	this.parent( RolePanelMediator.NAME, viewComponent );
}

/* subclass Mediator */
RolePanelMediator.prototype = new Mediator();
RolePanelMediator.prototype.constructor = RolePanelMediator;

// The name this Mediator is registered and retrieved with
RolePanelMediator.NAME/*String*/ = "RolePanelMediator";
	
/**
 * @override
 * 
 * Listen for events and retrieve needed Proxies when
 * Mediator is registered.
 */
RolePanelMediator.prototype.onRegister = function( )
{
	// Overwrite listener handlers with
	// methods bound to 'this'
	this.onAddRole = this.onAddRole.bindWithEvent(this);
	this.onRemoveRole = this.onRemoveRole.bindWithEvent(this);

	var rolePanel/*RolePanel*/ = this.getRolePanel();
	rolePanel.addEvent( RolePanel.ADD, this.onAddRole );
	rolePanel.addEvent( RolePanel.REMOVE, this.onRemoveRole );

	this.roleProxy = this.facade.retrieveProxy( RoleProxy.NAME );
}

RolePanelMediator.prototype.getRolePanel = function()/*RolePanel*/
{
	return this.viewComponent;
}

RolePanelMediator.prototype.onAddRole = function()
{
	this.roleProxy.addRoleToUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
	this.getRolePanel().setMode(null);
}

RolePanelMediator.prototype.onRemoveRole = function()
{
	this.roleProxy.removeRoleFromUser( this.getRolePanel().user, this.getRolePanel().selectedRole );
	this.updateUserRoleList();
	this.getRolePanel().setMode(null);
}

RolePanelMediator.prototype.updateUserRoleList = function()
{
	var userName/*String*/ = this.getRolePanel().user.uname;
	var userRoles/*Array*/ = this.roleProxy.getUserRoles( userName );
	this.getRolePanel().setUserRoles( userRoles );
}

/**
 * @override
 */
RolePanelMediator.prototype.listNotificationInterests = function()/*Array*/
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
RolePanelMediator.prototype.handleNotification = function( note/*Notification*/ )
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