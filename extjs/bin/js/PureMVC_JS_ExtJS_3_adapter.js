/**
 * @fileOverview
 * Adapter to preserve backward compatibility with existing applications
 * coded with the ExtJS port of PureMVC.  Preserves backward compatibility by
 * mapping PureMVC classes to shorter ExtJS-style namespaces.
 * @author Tony DeFusco | tony.defusco@puremvc.org
 */
(function(){
  // Create aliases using shorter namespaces (for backward compatibility)
  Ext.namespace('Puremvc.core', 'Puremvc.patterns');
  var aliases = [
    // object path (namespace), alias (class name), ref to original class object
    [Puremvc.core, "Controller", org.puremvc.js.multicore.core.Controller],
    [Puremvc.core, "Model", org.puremvc.js.multicore.core.Model],
    [Puremvc.core, "View", org.puremvc.js.multicore.core.View],
    [Puremvc.patterns, "AsyncMacroCommand", org.puremvc.js.multicore.patterns.command.AsyncMacroCommand],
    [Puremvc.patterns, "AsyncCommand", org.puremvc.js.multicore.patterns.command.AsyncCommand],
    [Puremvc.patterns, "Facade", org.puremvc.js.multicore.patterns.facade.Facade],
    [Puremvc.patterns, "MacroCommand", org.puremvc.js.multicore.patterns.command.MacroCommand],
    [Puremvc.patterns, "Mediator", org.puremvc.js.multicore.patterns.mediator.Mediator],
    [Puremvc.patterns, "SimpleCommand", org.puremvc.js.multicore.patterns.command.SimpleCommand],
    [Puremvc.patterns, "Notification", org.puremvc.js.multicore.patterns.observer.Notification],
    [Puremvc.patterns, "Notifier", org.puremvc.js.multicore.patterns.observer.Notifier],
    [Puremvc.patterns, "Observer", org.puremvc.js.multicore.patterns.observer.Observer],
    [Puremvc.patterns, "Proxy", org.puremvc.js.multicore.patterns.proxy.Proxy]
  ];
  Ext.each(aliases, function(item, index, allItems) {
    var path = item[0];
    var alias = item[1];
    var target = item[2];
    if (path && alias && target) {
      path[alias] = target;
    }
  }, this);
})();
