/**
 * @fileOverview
 * Adapter to preserve backward compatibility with existing applications
 * coded with the ExtJS port of PureMVC.  Preserves backward compatibility by
 * mapping PureMVC classes to the original ExtJS-style namespaces.
 * @author Tony DeFusco | tony.defusco@puremvc.org
 */
(function(){
  // Create aliases using shorter namespaces (for backward compatibility)
  Ext.namespace("Puremvc.core", "Puremvc.patterns");
  var aliases = [
    // object path (namespace), alias (class name), ref to original class object
    [Puremvc.core, "Controller", puremvc.Controller],
    [Puremvc.core, "Model", puremvc.Model],
    [Puremvc.core, "View", puremvc.View],
    [Puremvc.patterns, "AsyncMacroCommand", puremvc.AsyncMacroCommand],
    [Puremvc.patterns, "AsyncCommand", puremvc.AsyncCommand],
    [Puremvc.patterns, "Facade", puremvc.Facade],
    [Puremvc.patterns, "MacroCommand", puremvc.MacroCommand],
    [Puremvc.patterns, "Mediator", puremvc.Mediator],
    [Puremvc.patterns, "SimpleCommand", puremvc.SimpleCommand],
    [Puremvc.patterns, "Notification", puremvc.Notification],
    [Puremvc.patterns, "Notifier", puremvc.Notifier],
    [Puremvc.patterns, "Observer", puremvc.Observer],
    [Puremvc.patterns, "Proxy", puremvc.Proxy]
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
