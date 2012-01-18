/**
 * @lends Puremvc.demo.controller.PrepControllerCommand.prototype
 */
Ext.namespace('Puremvc.demo.controller');
Puremvc.demo.controller.PrepControllerCommand = Ext.extend(Puremvc.patterns.AsyncCommand, {
  /**
   * @class <code>AsyncCommand</code> subclass that is
   * responsible for preparing the data <code>Model</code>.
   * This is where all <code>Proxy</code> subclasses are
   * registered with the <code>Model</code>.
   *
   * @extends Puremvc.patterns.AsyncCommand
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Puremvc.demo.controller.PrepControllerCommand.superclass.constructor.call(this);
  },

  execute: function(notification /* Notification */) {
    // Register all of the non-system commands used by the application.
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.ADD_ROLE_RESULT, Puremvc.demo.controller.AddRoleResultCommand);
    this.facade.registerCommand(Puremvc.demo.ApplicationFacade.DELETE_USER, Puremvc.demo.controller.DeleteUserCommand);

    this.commandComplete();
  }
});
