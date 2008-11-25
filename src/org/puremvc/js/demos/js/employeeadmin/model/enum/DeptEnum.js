/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_model_enum_DeptEnum()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.enum.DeptEnum",DeptEnum);
	var o = DeptEnum.prototype;

	/**
	 * Constructor
	 * Bindable
	 */
	function DeptEnum( value/*String*/, ordinal/*int*/ )
	{
		if(Objs.extending) return;

		this.value = value;
		this.ordinal = ordinal;
	}

	o.ordinal/*int*/ = null;
	o.value/*String*/ = null;

	/**
	 * @override
	 */
	DeptEnum.getList = function()/*Array*/
	{
		return [
			DeptEnum.ACCT, 
			DeptEnum.SALES, 
			DeptEnum.PLANT
		];
	}

	/**
	 * @override
	 */
	DeptEnum.getComboList = function()/*Array*/
	{
		var cList/*Array*/ = DeptEnum.getList();
		cList.unshift( DeptEnum.NONE_SELECTED );
		return cList;
	}

	o.equals = function( roleEnum/*RoleEnum*/ )/*Boolean*/
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}

	DeptEnum.NONE_SELECTED/*DeptEnum*/ 	= new DeptEnum( '--None Selected--'	, -1 );
	DeptEnum.ACCT/*DeptEnum*/ 			= new DeptEnum( 'Accounting'		, 0 );
	DeptEnum.SALES/*DeptEnum*/ 			= new DeptEnum( 'Sales'				, 1 );
	DeptEnum.PLANT/*DeptEnum*/ 			= new DeptEnum( 'Plant'				, 2 );
	DeptEnum.SHIPPING/*DeptEnum*/ 		= new DeptEnum( 'Shipping'			, 3 );
	DeptEnum.QC/*DeptEnum*/ 			= new DeptEnum( 'Quality Control'	, 4 );
}