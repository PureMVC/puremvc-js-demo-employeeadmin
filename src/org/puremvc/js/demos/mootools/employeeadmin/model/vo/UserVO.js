/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var UserVO = function
(
	uname/*String*/,
	fname/*String*/,
	lname/*String*/,
	email/*String*/,
	password/*String*/,
	department/*DeptEnum*/
)
{
	/**
	 * Constructor
	 * bindable
	 * @param uname			optional
	 * @param fname			optional
	 * @param lname			optional
	 * @param email			optional
	 * @param password		optional
	 * @param department	optional
	 */
	this.initialize = function
	(
		uname/*String*/,
		fname/*String*/,
		lname/*String*/,
		email/*String*/,
		password/*String*/,
		department/*DeptEnum*/
	)
	{
		if( uname != null )
			this.uname = uname;

		if( fname != null )
			this.fname = fname;

		if( lname != null )
			this.lname = lname;

		if( email != null )
			this.email = email;

		if( password != null )
			this.password = password;

		if( department != null )
			this.department = department;
	}

	this.uname/*String*/ = "";
	this.fname/*String*/ = "";
	this.lname/*String*/ = "";
	this.email/*String*/ = "";
	this.password/*String*/ = "";
	this.department/*DeptEnum*/ = DeptEnum.NONE_SELECTED;

	this.getIsValid = function()/*Boolean*/
	{
		return this.uname != "" && this.password != "" && this.department != DeptEnum.NONE_SELECTED;
	}

	this.getGivenName = function()/*String*/
	{
		return this.lname + ", " + this.fname;
	}
}

UserVO = new Class(new UserVO());