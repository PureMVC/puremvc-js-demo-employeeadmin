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
function class_net_tekool_utils_Relegate()
{
	Objs.register("net.tekool.utils.Relegate",Relegate);

	/**
	 * An helper to redirect a method call to the specified target while retaining
	 * original arguments of the call.
	 */
	function Relegate(){}
	Relegate.create = function(t,f)
	{
		var a = new Array();
		for(var i=2; i<arguments.length; i++)
			a.push(arguments[i]);

		return function()
		{
			var b = new Array();
			for(var i=0; i<arguments.length; i++)
				b.push(arguments[i]);

			return f.apply
			(
				t,
				b.concat(a)
			);
		};
	}
}