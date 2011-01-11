/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_RolePanelMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.RolePanelMediator",RolePanelMediator);

	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");

	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");

	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var RoleProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.RoleProxy");
	var RoleVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO");
	var RoleEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum");
	var RolePanel = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.RolePanel");

	/**
	 * Constructor
	 */
	function RolePanelMediator( viewComponent/*Object*/ )
	{
		Mediator.apply(this, [RolePanelMediator.NAME, viewComponent] );

		if(Objs.extending) return;

		var rolePanel/*RolePanel*/ = this._getRolePanel();
		rolePanel.addEventListener( RolePanel.ADD, Relegate.create(this,this._onAddRole) );
		rolePanel.addEventListener( RolePanel.REMOVE, Relegate.create(this,this._onRemoveRole) );

		this._roleProxy = this._facade.retrieveProxy( RoleProxy.NAME );
	}

	/**
	 * <code>RolePanelMediator</code> extends <code>Mediator</code>
	 */
	Objs.extend(RolePanelMediator,Mediator);

	/**
	 * <code>RolePanelMediator</code> implements <code>IMediator</code>
	 */
	Objs.implement(RolePanelMediator,IMediator);

	var o = RolePanelMediator.prototype;

	RolePanelMediator.NAME/*String*/ = 'RolePanelMediator';

	o._roleProxy/*RoleProxy*/ = null;		

	o._getRolePanel = function()/*RolePanel*/
	{
		return this._viewComponent;
	}

	o._onAddRole = function( event/*EventS*/ )
	{
		this._roleProxy.addRoleToUser( this._getRolePanel().user, this._getRolePanel().selectedRole );
	}

	o._onRemoveRole = function( event/*EventS*/ )
	{
		this._roleProxy.removeRoleFromUser( this._getRolePanel().user, this._getRolePanel().selectedRole );
		
		this.__updateUserRoleList();
	}

	o.__updateUserRoleList = function()
	{
		this._getRolePanel().setUserRoles( this._roleProxy.getUserRoles( this._getRolePanel().user.username ) );
	}

	/**
	* @override
	*/
	o.listNotificationInterests = function()/*Array*/
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
	o.handleNotification = function( note/*INotification*/ )
	{
		var rolePanel/*RolePanel*/ = this._getRolePanel();

		switch( note.getName() )
		{
			case ApplicationFacade.NEW_USER:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_ADDED:
				rolePanel.user/*UserVO*/ = note.getBody();
				var roleVO/*RoleVO*/ = new RoleVO ( rolePanel.user.username );
				this._roleProxy.addItem( roleVO );
				this._clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_UPDATED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_DELETED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.CANCEL_SELECTED:
				this._clearForm();
				rolePanel.setEnabled(false);
			break;

			case ApplicationFacade.USER_SELECTED:
				rolePanel.user = note.getBody();
				this.__updateUserRoleList();
				
				//TODO rolePanel.roleCombo.selectedItem = RoleEnum.NONE_SELECTED;
				rolePanel.setEnabled(true);
				
			break;

			case ApplicationFacade.ADD_ROLE_RESULT:
				this.__updateUserRoleList();
			break;
		}
	}

	o._clearForm = function()
	{
		var rolePanel/*RolePanel*/ = this._getRolePanel();

		rolePanel.user = null;
		rolePanel.setUserRoles(null);
	}
}