/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_model_vo_UserVO()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.vo.UserVO",UserVO);

	var DeptEnum = Objs.load("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum");

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
	function UserVO
	(
		uname/*String*/,
		fname/*String*/,
		lname/*String*/,
		email/*String*/,
		password/*String*/,
		department/*DeptEnum*/
	)
	{
		if(Objs.extending) return;

		if( uname != null )
			this.username = uname;

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

	var o = UserVO.prototype;

	o.username/*String*/ = '';
	o.fname/*String*/ = '';
	o.lname/*String*/ = '';
	o.email/*String*/ = '';
	o.password/*String*/ = '';
	o.department/*DeptEnum*/ = DeptEnum.NONE_SELECTED;

	o.getIsValid = function()/*Boolean*/
	{
		return true;//TODO 

		return this.username != '' && this.password != '' && this.department != DeptEnum.NONE_SELECTED;
	}

	o.getGivenName = function()/*String*/
	{
		return this.lname + ', ' + this.fname;
	}
}