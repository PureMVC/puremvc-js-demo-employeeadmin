/*
 PureMVC Javascript Objs Employee Admin Demo for jQuery
 by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-11 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * An enumeration of role items.
 */
var RoleEnum = Objs("org.puremvc.js.demos.objs.employeeadmin.model.enum.RoleEnum",
{
	/**
	 * The <code>RoleEnum</code> entry identifier.
	 * 
	 * @type {Number}
	 */
	ordinal: null,
	
	
	/**
	 * The <code>RoleEnum</code> entry value.
	 * 
	 * @type {String}
	 */
	value: null,
	
	/**
	 * @construct
	 * Initialize a <code>RoleEnum</code> instance.
	 * 
	 * @param {String} value
	 * 		Value shared by each enum item.
	 * 
	 * @param {Number} ordinal
	 * 		Index of the item in the list.	
	 */
	initialize: function( value, ordinal )
	{
		this.value = value;
		this.ordinal = ordinal;
	},
	
	/**
	 * Compare a <code>RoleEnum</code> object to the current one to check for their
	 * equality.
	 * 
	 * @param {RoleEnum} roleEnum
	 * 		The <code>RoleEnum</code> item to compare to the current.
	 * 
	 * @return {Boolean}
	 * 		The compared <code>RoleEnum</code> is equal to the current.
	 */
	equals: function( roleEnum/*RoleEnum*/ )
	{
		return ( this.ordinal == roleEnum.ordinal && this.value == roleEnum.value );
	}
});

RoleEnum.NONE_SELECTED/*RoleEnum*/ 	= new RoleEnum( "Select a role", -1 );
RoleEnum.ADMIN/*RoleEnum*/ 			= new RoleEnum( "Administrator", 0  );
RoleEnum.ACCT_PAY/*RoleEnum*/ 		= new RoleEnum( "Accounts Payable", 1  );
RoleEnum.ACCT_RCV/*RoleEnum*/ 		= new RoleEnum( "Accounts Receivable", 2  );
RoleEnum.EMP_BENEFITS/*RoleEnum*/ 	= new RoleEnum( "Employee Benefits", 3  );
RoleEnum.GEN_LEDGER/*RoleEnum*/ 	= new RoleEnum( "General Ledger", 4  );
RoleEnum.PAYROLL/*RoleEnum*/ 		= new RoleEnum( "Payroll", 5  );
RoleEnum.INVENTORY/*RoleEnum*/ 		= new RoleEnum( "Inventory", 6  );
RoleEnum.PRODUCTION/*RoleEnum*/ 	= new RoleEnum( "Production", 7  );
RoleEnum.QUALITY_CTL/*RoleEnum*/ 	= new RoleEnum( "Quality Control", 8  );
RoleEnum.SALES/*RoleEnum*/ 			= new RoleEnum( "Sales", 9  );
RoleEnum.ORDERS/*RoleEnum*/ 		= new RoleEnum( "Orders",10  );
RoleEnum.CUSTOMERS/*RoleEnum*/ 		= new RoleEnum( "Customers",11  );
RoleEnum.SHIPPING/*RoleEnum*/ 		= new RoleEnum( "Shipping",12  );
RoleEnum.RETURNS/*RoleEnum*/ 		= new RoleEnum( "Returns",13  );


/**
 * Returns the roles list excluding the <code>RoleEnum.NONE_SELECTED</code>
 * item used to fill the combo box.
 * 
 * @return {Array}
 * 		The roles list excluding the <code>RoleEnum.NONE_SELECTED</code>
 * 		item.
 */
RoleEnum.getList = function()
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
};

/**
 * Returns the roles list including the
 * <code>RoleEnum.NONE_SELECTED</code> item used to fill the combo box.
 * 
 * @return {Array}
 * 		The department list including the <code>RoleEnum.NONE_SELECTED</code>
 * 		item.
 */
RoleEnum.getComboList = function()
{
	var cList/*Array*/ = RoleEnum.getList();
	cList.unshift( RoleEnum.NONE_SELECTED );
	return cList;
};

/**
 * Returns the <code>RoleEnum</code> with this ordinal value.
 * 
 * @param {Number} ordinal
 * 		The ordinal value to search for in the list.
 * 
 * @return {RoleEnum}
 * 		The <code>RoleEnum</code> with this ordinal value or <code>null</code>
 * 		if not found.
 */
RoleEnum.getItem = function( ordinal )
{
	var list/*Array*/ = RoleEnum.getList();
	for( var i/*Number*/=0; i<list.length; i++ )
		if( RoleEnum[list[i]].ordinal == ordinal )
			return RoleEnum[list[i]];
	
	return null;
};