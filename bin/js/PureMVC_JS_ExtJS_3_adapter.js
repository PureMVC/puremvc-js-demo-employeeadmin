(function(){
  /**
   * Augment all of the sub-classed PureMVC classes to work with the
   * simulated class inheritance mechanism employed by ExtJS.
   */
  var _classes = [ 
    org.puremvc.js.multicore.patterns.command.MacroCommand,
    org.puremvc.js.multicore.patterns.command.SimpleCommand,
    org.puremvc.js.multicore.patterns.mediator.Mediator,
    org.puremvc.js.multicore.patterns.proxy.Proxy
  ];
  for (var i = 0; i < _classes.length; ++i) {
    var _class = _classes[i];
    
    if (_class.prototype.constructor == null) {
      _class.prototype.constructor = _class;
    }
    
    _class.superclass = org.puremvc.js.multicore.patterns.observer.Notifier.prototype;
    _class.override = function(o) {
      Ext.override(_class, o);
    };
    _class.prototype.superclass = _class.prototype.supr = (function() {
      return org.puremvc.js.multicore.patterns.observer.Notifier.prototype;
    });
    _class.prototype.override = function(o) {
      for (var m in o) {
        this[m] = o[m];
      }
    };
    _class.extend = function(o) {
      return Ext.extend(_class, o);
    };
  }
  
  // Create aliases using shorter namespaces (for backward compatibility)
  Ext.namespace('Puremvc.core', 'Puremvc.patterns');
  Puremvc.core.Controller = org.puremvc.js.multicore.core.Controller;
  Puremvc.core.Model = org.puremvc.js.multicore.core.Model;
  Puremvc.core.View = org.puremvc.js.multicore.core.View;
  Puremvc.patterns.Facade = org.puremvc.js.multicore.patterns.facade.Facade;
  Puremvc.patterns.MacroCommand = org.puremvc.js.multicore.patterns.command.MacroCommand;
  Puremvc.patterns.Mediator = org.puremvc.js.multicore.patterns.mediator.Mediator;
  Puremvc.patterns.SimpleCommand = org.puremvc.js.multicore.patterns.command.SimpleCommand;
  Puremvc.patterns.Notification = org.puremvc.js.multicore.patterns.observer.Notification;
  Puremvc.patterns.Notifier = org.puremvc.js.multicore.patterns.observer.Notifier;
  Puremvc.patterns.Observer = org.puremvc.js.multicore.patterns.observer.Observer;
  Puremvc.patterns.Proxy = org.puremvc.js.multicore.patterns.proxy.Proxy;
})();
