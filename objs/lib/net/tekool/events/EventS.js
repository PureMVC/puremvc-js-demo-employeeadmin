/**
* @author   Frederic Saunier - www.tekool.net
* @since    2006/02/08
*
* Copyright (C) 2006 Frederic Saunier
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*
*/
function class_net_tekool_events_EventS()
{
	Objs.register("net.tekool.events.EventS",EventS);

	/**
	* Provides a browser independent generic but simple Event object.		
	*/
	function EventS
	(
		type,
		target
	)
	{
		if(Objs.extending) return;

		this.type = type;
		this.target = target;
	}

	/**
	* The type of event.
	*
	* Theorically readonly, it must not be modified after the
	* <code>EventS</code> object is constructed.
	*
	* @readonly
	*/
	EventS.prototype.type/*String*/ = null;

	/**
	* The event target.
	*
	* Theorically readonly, it must not be modified after the
	* <code>EventS</code> object is constructed.
	*
	* @readonly
	*/
	EventS.prototype.target/*Object*/ = null;

	/**
	* @override
	*/
	EventS.prototype.toString = function()
	{
		return '[EventS] '
		+	'{ type:"' + (this.type || '') + '"'
		+	', target:' + (this.target || '')
		+	'}';
	}
}