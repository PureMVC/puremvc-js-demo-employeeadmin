/*
 PureMVC Javascript Employee Admin Demo by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-08 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

function class_org_puremvc_js_demos_js_employeeadmin_model_enum_RoleEnum()
{
	Objs.register("org.puremvc.js.demos.js.employeeadmin.model.enum.RoleEnum",RoleEnum);

	/**
	 * Constructor
	 * Bindable
	 */
	function RoleEnum( value/*String*/, ordinal/*int*/ )
	{
		if(Objs.extending) return;

		this.value = value;
		this.ordinal = ordinal;
	}

	var o = RoleEnum.prototype;

	o.ordinal/*int*/ = null;
	o.value/*String*/ = null;

	RoleEnum.getList = function()/*Array*/
	{
		return [
			RoleEnum.ADMIN, 
			RoleEnum.ACCT_PAY, 
			RoleEnum.ACCT_RCV, 
			RoleEnum.EMP_BENEFITS, 
			RoleEnum.GEN_LEDGER, 
			RoleEnum.PAYROLL,
			RoleEnum.INVENTORY,
			RoleEnum.PRODUCTION,
			RoleEnum.QUALITY_CTL,
			RoleEnum.SALES,
			RoleEnum.ORDERS,
			RoleEnum.CUSTOMERS,
			RoleEnum.SHIPPING,
			RoleEnum.RETURNS
		];
	}

	RoleEnum.getComboList = function()/*Array*/
	{
		var cList/*Array*/ = RoleEnum.getList();
		cList.unshift( RoleEnum.NONE_SELECTED );
		return cList;
	}

	o.equals = function( roleEnum/*RoleEnum*/ )/*Boolean*/
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}

	RoleEnum.NONE_SELECTED/*RoleEnum*/ 	= new RoleEnum( '--None Selected--'		, -1 );
	RoleEnum.ADMIN/*RoleEnum*/ 			= new RoleEnum( 'Administrator'			, 0 );
	RoleEnum.ACCT_PAY/*RoleEnum*/ 		= new RoleEnum( 'Accounts Payable'		, 1 );
	RoleEnum.ACCT_RCV/*RoleEnum*/ 		= new RoleEnum( 'Accounts Receivable'	, 2 );
	RoleEnum.EMP_BENEFITS/*RoleEnum*/ 	= new RoleEnum( 'Employee Benefits'		, 3 );
	RoleEnum.GEN_LEDGER/*RoleEnum*/ 	= new RoleEnum( 'General Ledger'		, 4 );
	RoleEnum.PAYROLL/*RoleEnum*/ 		= new RoleEnum( 'Payroll'				, 5 );
	RoleEnum.INVENTORY/*RoleEnum*/ 		= new RoleEnum( 'Inventory'				, 6 );
	RoleEnum.PRODUCTION/*RoleEnum*/ 	= new RoleEnum( 'Production'			, 7 );
	RoleEnum.QUALITY_CTL/*RoleEnum*/ 	= new RoleEnum( 'Quality Control' 		, 8 );
	RoleEnum.SALES/*RoleEnum*/ 			= new RoleEnum( 'Sales'					, 9 );
	RoleEnum.ORDERS/*RoleEnum*/ 		= new RoleEnum( 'Orders'				,10 );
	RoleEnum.CUSTOMERS/*RoleEnum*/ 		= new RoleEnum( 'Customers'				,11 );
	RoleEnum.SHIPPING/*RoleEnum*/ 		= new RoleEnum( 'Shipping'				,12 );
	RoleEnum.RETURNS/*RoleEnum*/ 		= new RoleEnum( 'Returns'				,13 );
}