/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_model_vo_RoleVO()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.vo.RoleVO",RoleVO);
	var o = RoleVO.prototype;

	/**
	 * Constructor
	 * Bindable
	 * @param username optional
	 * @param roles optional
	 */
	function RoleVO
	(
		username/*String*/,
		roles/*Array*/
	)
	{
		if(Objs.extending) return;

		if( username != null )
			this.username = username;

		if( roles != null )
			this.roles = roles;
	}

	o.username/*String*/ = '';
	o.roles/*Array*/ = new Array();
}