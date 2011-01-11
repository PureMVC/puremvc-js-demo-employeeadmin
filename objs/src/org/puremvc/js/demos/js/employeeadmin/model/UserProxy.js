/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_model_UserProxy()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.UserProxy",UserProxy);

	var IProxy = Objs.load("org.puremvc.js.interfaces.IProxy");
	var Proxy = Objs.load("org.puremvc.js.patterns.proxy.Proxy");
	var UserVO = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO");
	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");

	/**
	 * Constructor
	 */
	function UserProxy()
	{
		Proxy.apply(this, [UserProxy.NAME, new Array()] );

		if(Objs.extending) return;

		// generate some test data			
		this.addItem( new UserVO('lstooge','Larry', 'Stooge', "larry@stooges.com", 'ijk456',DeptEnum.ACCT) );
		this.addItem( new UserVO('cstooge','Curly', 'Stooge', "curly@stooges.com", 'xyz987',DeptEnum.SALES) );
		this.addItem( new UserVO('mstooge','Moe', 'Stooge', "moe@stooges.com", 'abc123',DeptEnum.PLANT) );
	}

	/**
	 * <code>UserProxy</code> extends <code>Proxy</code>
	 */
	Objs.extend(UserProxy,Proxy);

	/**
	 * <code>UserProxy</code> implements <code>IProxy</code>
	 */
	Objs.implement(UserProxy,IProxy);

	var o = UserProxy.prototype;

	UserProxy.NAME/*String*/ = 'UserProxy';

	// return data property cast to proper type
	o.getUsers = function()/*Array*/
	{
		return this._data;
	}

	/* add an item to the data */
	o.addItem = function( item/*Object*/ )
	{
		this.getUsers().push( item );
	}

	/* update an item in the data */
	o.updateItem = function( item/*Object*/ )
	{
		var user/*UserVO*/ = item;
		var users/*Array*/ = this.getUsers();
		for( var i/*int*/=0; i<users.length; i++ )
			if( users[i].username == user.username )
				users[i] = user;
	}

	/* delete an item in the data */
	o.deleteItem = function( item/*Object*/ )
	{
		var user/*UserVO*/ = item;
		var users/*Array*/ = this.getUsers();
		for( var i/*int*/=0; i<users.length; i++ )
			if( users[i].username == user.username )
				users.splice(i,1);
	}
}