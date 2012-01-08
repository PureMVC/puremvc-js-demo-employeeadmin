/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
var DeptEnum = function( value/*String*/, ordinal/*int*/ )
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
DeptEnum = new Class(new DeptEnum());

DeptEnum.NONE_SELECTED/*DeptEnum*/ 	= new DeptEnum( "--None Selected--"	, -1 );
DeptEnum.ACCT/*DeptEnum*/ 			= new DeptEnum( "Accounting"		, 0  );
DeptEnum.SALES/*DeptEnum*/ 			= new DeptEnum( "Sales"				, 1  );
DeptEnum.PLANT/*DeptEnum*/ 			= new DeptEnum( "Plant"				, 2  );
DeptEnum.SHIPPING/*DeptEnum*/ 		= new DeptEnum( "Shipping"			, 3  );
DeptEnum.QC/*DeptEnum*/ 			= new DeptEnum( "Quality Control"	, 4  );

DeptEnum.getList = function()/*Array*/
{
	return [
		DeptEnum.ACCT, 
		DeptEnum.SALES, 
		DeptEnum.PLANT
	];
}

DeptEnum.getComboList = function()/*Array*/
{
	var cList/*Array*/ = DeptEnum.getList();
	cList.unshift( DeptEnum.NONE_SELECTED );
	return cList;
}
