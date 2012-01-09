/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @class
 * User form component <code>Mediator</code>.
 *
 * @see org.puremvc.js.patterns.mediator.Mediator Mediator
 * @see org.puremvc.js.patterns.observer.Notification Notification
 * @see org.puremvc.js.demos.objs.employeeadmin.model.vo.UserVO UserVO
 * @see org.puremvc.js.demos.objs.employeeadmin.model.UserProxy UserProxy
 * @see org.puremvc.js.demos.objs.employeeadmin.model.enum.DeptEnum DeptEnum
 * @see org.puremvc.js.demos.objs.employeeadmin.view.components.UserForm UserForm
 *
 * @extends org.puremvc.js.patterns.mediator.Mediator Mediator
 */
var UserFormMediator = Objs("org.puremvc.js.demos.objs.employeeadmin.view.UserFormMediator",
	Mediator,
	{	

	/**
	 * @construct
	 * @override
	 *
	 * Initialize a <code>UserFormMediator</code> instance.
	 * 
	 * @param {String} name
	 * 		Name for this <code>Mediator</code>.
	 *
	 * @param {UserForm} viewComponent
	 * 		The <code>UserForm</code> view Component this <code>Mediator</code>
	 * 		manage.
	 */
	initialize: function( name, viewComponent )
	{
		UserFormMediator.$super.initialize.call( this, name, viewComponent );
	
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.addEventListener( UserForm.ADD, this.onAdd, this );
		userForm.addEventListener( UserForm.UPDATE, this.onUpdate, this );
		userForm.addEventListener( UserForm.CANCEL, this.onCancel, this );
		
		this.userProxy = this.facade.retrieveProxy( ProxyNames.USER_PROXY );
	},
	
	/**
	 * @private
	 *
	 * A shortcut to the application <code>UserProxy</code> instance.
	 * 
	 * @type {UserProxy}
	 */
	userProxy: null,

	/**
	 * @private
	 * 
	 * The <code>UserForm</code> view component this <code>Mediator</code> manage.
	 * 
	 * @return {UserForm}
	 */
	getUserForm : function()
	{
		return this.viewComponent;
	},

	/**
	 * @private
	 * 
	 * Called when a user is added using the form.
	 * 
	 * @param {UiComponent.Event} event
	 * 		The dispatched event object.
	 */
	onAdd: function( event )
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.addItem( user );
		this.sendNotification( NotificationNames.USER_ADDED, user );
		
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},

	/**
	 * @private
	 * 
	 * Called when a user is updated using the form.
	 */
	onUpdate: function()
	{
		var user/*UserVO*/ = this.getUserForm().getUser();
		this.userProxy.updateItem( user );
		this.sendNotification(  NotificationNames.USER_UPDATED, user );
		
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},

	/**
	 * @private
	 * 
	 * Called when modifications made to a user in the form are canceled.
	 */
	onCancel: function()
	{
		this.sendNotification(  NotificationNames.CANCEL_SELECTED );
		var userForm/*UserForm*/ = this.getUserForm();
		userForm.clearForm();
		userForm.setEnabled(false);
		userForm.setMode(UserForm.MODE_ADD);
	},
	
	/**
	 * @override
	 */
	listNotificationInterests: function()
	{
		return [
			NotificationNames.NEW_USER,
			NotificationNames.USER_DELETED,
			NotificationNames.USER_SELECTED
		];
	},
	
	/**
	 * @override
	 */
	handleNotification: function( note )
	{
		var userForm/*UserForm*/ = this.getUserForm();
		
		var user/*UserVO*/;
		switch ( note.getName() )
		{
			case NotificationNames.NEW_USER:
				userForm.setUser( note.getBody() );
				userForm.setMode( UserForm.MODE_ADD );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
			
			case NotificationNames.USER_DELETED:
				userForm.clearForm();
				userForm.setEnabled(false);
			break;
	
			case NotificationNames.USER_SELECTED:
				user = note.getBody();
	
				userForm.clearForm();
				userForm.setUser( user );
	
				userForm.setMode( UserForm.MODE_EDIT );
				userForm.setEnabled(true);
				userForm.setFocus();
			break;
		}
	}
});

/*
 * Constants
 */
UserFormMediator.ADD/*String*/			= "add";
UserFormMediator.UPDATE/*String*/		= "update";
UserFormMediator.CANCEL/*String*/		= "cancel";

UserFormMediator.MODE_ADD/*String*/		= "modeAdd";
UserFormMediator.MODE_EDIT/*String*/	= "modeEdit";