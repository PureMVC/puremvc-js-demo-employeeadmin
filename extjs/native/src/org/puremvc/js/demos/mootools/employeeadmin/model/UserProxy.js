/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var UserProxy = function()
{
	this.parent( UserProxy.NAME, new Array() );
}

/* subclass Proxy */
UserProxy.prototype = new Proxy();
UserProxy.prototype.constructor = UserProxy;

// The name this Proxy is registered and retrieved with
UserProxy.NAME/*String*/ = "UserProxy";

/**
 * @override
 * 
 * Define some data when Proxy is registered.
 */
UserProxy.prototype.onRegister = function()
{
	// generate some test data			
	this.addItem( new UserVO("lstooge","Larry", 'Stooge', "larry@stooges.com", "ijk456" ,DeptEnum.ACCT) );
	this.addItem( new UserVO("cstooge","Curly", 'Stooge', "curly@stooges.com", "xyz987" ,DeptEnum.SALES) );
	this.addItem( new UserVO("mstooge","Moe", 'Stooge', "moe@stooges.com", "abc123" ,DeptEnum.PLANT) );
}

// return data property cast to proper type
UserProxy.prototype.getUsers = function()/*Array*/
{
	return this.data;
}

/* add an item to the data */
UserProxy.prototype.addItem = function( item/*Object*/ )
{
	this.getUsers().push( item );
}

/* update an item in the data */
UserProxy.prototype.updateItem = function( item/*Object*/ )
{
	var user/*UserVO*/ = item;
	var users/*Array*/ = this.getUsers();
	for( var i/*int*/=0; i<users.length; i++ )
		if( users[i].uname == user.uname )
			users[i] = user;
}

/* delete an item in the data */
UserProxy.prototype.deleteItem = function( item/*Object*/ )
{
	var user/*UserVO*/ = item;
	var users/*Array*/ = this.getUsers();
	for( var i/*int*/=0; i<users.length; i++ ) 
	{
			if( users[i].uname == user.uname )
				users.splice(i,1);
	}
}