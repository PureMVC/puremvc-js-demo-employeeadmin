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
function class_net_tekool_events_EventDispatcher()
{
	Objs.register("net.tekool.events.EventDispatcher",EventDispatcher);

	/**
	* Provides a browser independent generic but simple EventDispatcher class.		
	*/
	function EventDispatcher()
	{
		if(Objs.extending) return;

		this.__listenerMap = new Object();
	}

	/**
	* Prefix pattern used on map items to prevent name collisions.
	*/
	EventDispatcher.QUEUE_PATTERN = '@_@';

	var o = EventDispatcher.prototype;

	/**
	* @private
	*/
	o.__listenerMap = null;

	/**
	* Dispatches an event into the event flow.
	*/
	o.dispatchEvent = function(event/*EventS*/)
	{
		if(typeof event == 'undefined')
			return;

		if(typeof event.type == 'undefined')
			return;

		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + event.type].slice(0);}
		catch(e){return};

		var len = queue.length;
		for(var i=0; i<len; i++)
		{
			var listener = queue[i];

			if(typeof event.target == 'undefined')
				event.target = this;

			if(typeof listener == 'function')
				listener.call(this,event);
			else
			{
				if(typeof listener.handleEvent != 'undefined')
					listener.handleEvent.call(listener,event);

				var handler = listener[event.type + 'Handler'];
				if(typeof handler != 'undefined')
					handler.call(listener,event);
			}
		}
	}

	/**
	* Registers an event listener object with an EventDispatcher object so that
	* the listener receives notification of an event.
	*/
	o.addEventListener = function(type/*String*/, listener/*Object*/)
	{
		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
		if(typeof queue == 'undefined')
			queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type] = new Array();

		var len = queue.length;
		for(var i=0; i<len; i++)
			if(queue[i] == listener)
				return;

		queue.push(listener);
	}

	/**
	* Removes a listener from the EventDispatcher object.
	*/
	o.removeEventListener = function(type/*String*/, listener/*Object*/)
	{
		var queue;
		try{ queue = this.__listenerMap[EventDispatcher.QUEUE_PATTERN + type]} catch(e){};
		if(typeof queue == 'undefined')
			return;

		var len = queue.length;
		for(var i=0; i<len; i++)
			if(queue[i] == listener)
			{
				queue.splice(i,1);
				return;
			}
	}
}