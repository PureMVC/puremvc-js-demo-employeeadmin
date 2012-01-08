/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var RoleEnum = function( value/*String*/, ordinal/*int*/ )
{
	/**
	 * Constructor
	 * Bindable
	 */
	this.initialize = function( value/*String*/, ordinal/*int*/ )
	{
		this.value = value;
		this.ordinal = ordinal;
	}

	this.ordinal/*int*/ = null;
	this.value/*String*/ = null;

	this.equals = function( roleEnum/*RoleEnum*/ )/*Boolean*/
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}

}

RoleEnum = new Class(new RoleEnum());
RoleEnum.NONE_SELECTED/*RoleEnum*/ 	= new RoleEnum( "--None Selected--"		, -1 );
RoleEnum.ADMIN/*RoleEnum*/ 			= new RoleEnum( "Administrator"			, 0  );
RoleEnum.ACCT_PAY/*RoleEnum*/ 		= new RoleEnum( "Accounts Payable"		, 1  );
RoleEnum.ACCT_RCV/*RoleEnum*/ 		= new RoleEnum( "Accounts Receivable"	, 2  );
RoleEnum.EMP_BENEFITS/*RoleEnum*/ 	= new RoleEnum( "Employee Benefits"		, 3  );
RoleEnum.GEN_LEDGER/*RoleEnum*/ 	= new RoleEnum( "General Ledger"		, 4  );
RoleEnum.PAYROLL/*RoleEnum*/ 		= new RoleEnum( "Payroll"				, 5  );
RoleEnum.INVENTORY/*RoleEnum*/ 		= new RoleEnum( "Inventory"				, 6  );
RoleEnum.PRODUCTION/*RoleEnum*/ 	= new RoleEnum( "Production"			, 7  );
RoleEnum.QUALITY_CTL/*RoleEnum*/ 	= new RoleEnum( "Quality Control" 		, 8  );
RoleEnum.SALES/*RoleEnum*/ 			= new RoleEnum( "Sales"					, 9  );
RoleEnum.ORDERS/*RoleEnum*/ 		= new RoleEnum( "Orders"				,10  );
RoleEnum.CUSTOMERS/*RoleEnum*/ 		= new RoleEnum( "Customers"				,11  );
RoleEnum.SHIPPING/*RoleEnum*/ 		= new RoleEnum( "Shipping"				,12  );
RoleEnum.RETURNS/*RoleEnum*/ 		= new RoleEnum( "Returns"				,13  );

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