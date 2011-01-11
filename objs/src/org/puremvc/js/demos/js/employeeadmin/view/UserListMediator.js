/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_view_UserListMediator()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.view.UserListMediator",UserListMediator);

	var EventS = Objs.load("net.tekool.events.EventS");
	var Relegate = Objs.load("net.tekool.utils.Relegate");

	var IMediator = Objs.load("org.puremvc.js.interfaces.IMediator");
	var INotification = Objs.load("org.puremvc.js.interfaces.INotification");
	var Mediator = Objs.load("org.puremvc.js.patterns.mediator.Mediator");
	var Notification = Objs.load("org.puremvc.js.patterns.observer.Notification");
	var ApplicationFacade = Objs.load("org.puremvc.js.demos.js.employeeadmin.ApplicationFacade");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var UserProxy = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.UserProxy");
	var UserList = Objs.load("org.puremvc.js.demos.js.employeeadmin.view.components.UserList");

	/**
	 * Constructor
	 */
	function UserListMediator( viewComponent/*Object*/ )
	{
		Mediator.apply(this, [UserListMediator.NAME, viewComponent] );

		if(Objs.extending) return;

		var userList/*UserList*/ = this._getUserList();
		userList.addEventListener( UserList.NEW, Relegate.create(this,this._onNew) );
		userList.addEventListener( UserList.DELETE, Relegate.create(this,this._onDelete) );
		userList.addEventListener( UserList.SELECT, Relegate.create(this,this._onSelect) );

		var userProxy = this._facade.retrieveProxy( UserProxy.NAME );
		userList.setUsers(userProxy.getUsers());
	}

	/**
	 * <code>UserListMediator</code> extends <code>Mediator</code>
	 */
	Objs.extend(UserListMediator,Mediator);

	/**
	 * <code>UserListMediator</code> implements <code>IMediator</code>
	 */
	Objs.implement(UserListMediator,IMediator);

	var o = UserListMediator.prototype;

	o._getUserList = function()/*UserList*/
	{
		return this._viewComponent;
	}

	o._onNew = function( event/*EventS*/ )
	{
		var user/*UserVO*/ = new UserVO();
		this.sendNotification( ApplicationFacade.NEW_USER, user );
	}

	o._onDelete = function( event/*EventS*/ )
	{
		var selectedUser = this._getUserList().selectedUser ;
		if(selectedUser == null)
			return;

		this.sendNotification
		(
			ApplicationFacade.DELETE_USER,
			this._getUserList().selectedUser 
		);
	}

	o._onSelect = function( event/*EventS*/ )
	{
		this.sendNotification
		(
			ApplicationFacade.USER_SELECTED,
			this._getUserList().selectedUser
		);
	}

	/**
	* @override
	*/
	o.listNotificationInterests = function()/*Array*/
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
	o.handleNotification = function( note/*INotification*/ )
	{
		var userList/*UserList*/ = this._getUserList();
		var userProxy = this._facade.retrieveProxy( UserProxy.NAME );

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