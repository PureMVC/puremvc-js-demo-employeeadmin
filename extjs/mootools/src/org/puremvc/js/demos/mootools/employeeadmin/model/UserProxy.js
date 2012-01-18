/*
 PureMVC Javascript Employee Admin Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-10 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

var UserProxy = function()
{
    /**
     * Required by MooTools for inheritance.
     * @type Class
     */
    this.Extends = Proxy;

	/**
	 * Constructor
	 */
	this.initialize = function()
	{
		this.parent( UserProxy.NAME, new Array() );

		// generate some test data			
		this.addItem( new UserVO("lstooge","Larry", 'Stooge', "larry@stooges.com", "ijk456" ,DeptEnum.ACCT) );
		this.addItem( new UserVO("cstooge","Curly", 'Stooge', "curly@stooges.com", "xyz987" ,DeptEnum.SALES) );
		this.addItem( new UserVO("mstooge","Moe", 'Stooge', "moe@stooges.com", "abc123" ,DeptEnum.PLANT) );
	}

	// return data property cast to proper type
	this.getUsers = function()/*Array*/
	{
		return this.data;
	}

	/* add an item to the data */
	this.addItem = function( item/*Object*/ )
	{
		this.getUsers().push( item );
	}

	/* update an item in the data */
	this.updateItem = function( item/*Object*/ )
	{
		var user/*UserVO*/ = item;
		var users/*Array*/ = this.getUsers();
		for( var i/*int*/=0; i<users.length; i++ )
			if( users[i].uname == user.uname )
				users[i] = user;
	}

	/* delete an item in the data */
	this.deleteItem = function( item/*Object*/ )
	{
		var user/*UserVO*/ = item;
		var users/*Array*/ = this.getUsers();
		for( var i/*int*/=0; i<users.length; i++ )
			if( users[i].uname == user.uname )
				users.splice(i,1);
	}
}
UserProxy = new Class(new UserProxy());

UserProxy.NAME/*String*/ = "UserProxy";