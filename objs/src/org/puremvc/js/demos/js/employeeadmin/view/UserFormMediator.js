/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_UserFormMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.UserFormMediator",UserFormMediator);

	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");

	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");

	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");
	var UserForm = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.UserForm");

	/**
	 * Constructor
	 */
	function UserFormMediator( viewComponent/*Object*/ )
	{
		Mediator.apply(this, [UserFormMediator.NAME, viewComponent] );

		if(Objs.extending) return;

		var userForm/*UserForm*/ = this._getUserForm();
		userForm.addEventListener( UserForm.ADD, Relegate.create(this,this._onAdd) );
		userForm.addEventListener( UserForm.UPDATE, Relegate.create(this,this._onUpdate) );
		userForm.addEventListener( UserForm.CANCEL, Relegate.create(this,this._onCancel) );

		this._userProxy = this._facade.retrieveProxy( UserProxy.NAME );
	}

	/**
	 * <code>UserFormMediator</code> extends <code>Mediator</code>
	 */
	Objs.extend(UserFormMediator,Mediator);

	/**
	 * <code>UserFormMediator</code> implements <code>IMediator</code>
	 */
	Objs.implement(UserFormMediator,IMediator);

	var o = UserFormMediator.prototype;

	o._userProxy/*UserProxy*/ = null;

	UserFormMediator.NAME/*String*/ = 'UserFormMediator';

	o._getUserForm  = function()/*UserForm*/
	{
		return this._viewComponent;
	}

	o._onAdd = function( event/*EventS*/ )
	{
		var user/*UserVO*/ = this._getUserForm().getUser();
		this._userProxy.addItem( user );
		this.sendNotification( ApplicationFacade.USER_ADDED, user );
		
		var userForm/*UserForm*/ = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}

	o._onUpdate = function( event/*EventS*/ )
	{
		var user/*UserVO*/ = this._getUserForm().getUser();
		this._userProxy.updateItem( user );
		this.sendNotification(  ApplicationFacade.USER_UPDATED, user );

		var userForm/*UserForm*/ = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}

	o._onCancel = function( event/*EventS*/ )
	{
		this.sendNotification(  ApplicationFacade.CANCEL_SELECTED );

		var userForm/*UserForm*/ = this._getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	}

	/**
	* @override
	*/
	o.listNotificationInterests = function()/*Array*/
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
	o.handleNotification = function( note/*INotification*/ )
	{
		var userForm/*UserForm*/ = this._getUserForm();
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
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_EDIT );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
		}
	}
}