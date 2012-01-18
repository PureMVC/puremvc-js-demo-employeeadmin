/**
 * @lends Puremvc.patterns.AsyncCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.AsyncCommand = Ext.extend(Puremvc.patterns.SimpleCommand, {

  /**
   * The <code>AsyncMacroCommand</code> method to call on completion.
   */
  onComplete: null,

  /**
   * @extends Puremvc.patterns.SimpleCommand
   * @class A base <code>AsyncCommand</code> implementation.
   *
   * <P>
   * Your subclass should override the <code>execute</code>
   * method where your business logic will handle the notification. </P>
   *
   * @see Puremvc.patterns.AsyncMacroCommand
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.AsyncCommand.superclass.constructor.call(this);
    this.isAsyncCommand = true;
  },

  /**
   * Registers the callback for a parent <code>AsyncMacroCommand</code>.
   *
   * @param {Function} value The <code>AsyncMacroCommand</code> method to call on completion.
   */
  setOnComplete: function(value/*function*/) {
    this.onComplete = value;
  },

  /**
   * Notify the parent <code>AsyncMacroCommand</code> that this command is complete.
   * <P>
   * Call this method from your subclass to signify that your asynchronous command
   * has finished.
   */
  commandComplete: function() {
    this.onComplete();
  }
});
/**
 * @lends Puremvc.patterns.AsyncMacroCommand.prototype
 */
Ext.namespace('Puremvc.patterns');
Puremvc.patterns.AsyncMacroCommand = Ext.extend(Puremvc.patterns.Notifier, {

  /**
   * An array of <code>AsyncCommand</code>s or subclasses of.
   * @type Array
   * @private
   */
  subCommands: null,

  /**
   * The <code>Notification</code> object to be passed to each <i>SubCommand</i>.
   * @type Object
   * @private
   */
  notification: null,

  /**
   * The <code>AsyncMacroCommand</code> method to call on completion.
   * @type Function
   * @private
   */
  onComplete: null,

  /**
   * @extends Puremvc.patterns.Notifier
   * @class <P>A base command implementation that executes other
   * commands asynchronously.</P>
   *
   * <P>
   * An <code>AsyncMacroCommand</code> maintains a list of
   * command Class references called <i>SubCommands</i>.</P>
   *
   * <P>
   * When <code>execute</code> is called, the <code>AsyncMacroCommand</code>
   * caches a reference to the <notification and calls
   * <code>nextCommand</code>.</P>
   *
   * <P>
   * If there are still <i>SubCommands</i>'s to be executed,
   * the <code>nextCommand</code> method instantiates and calls <code>execute</code>
   * on each of its <i>SubCommands</i> in turn. Each <i>SubCommand</i> will be passed
   * a reference to the original notification that was passed to the
   * <code>AsyncMacroCommand</code>'s <code>execute</code> method. If the
   * <i>SubCommand</i> to execute is an <code>AsyncCommand</code>, the
   * next <i>SubCommand</i> will not be executed until the previous
   * <code>AsyncCommand</code> has called its <i>commandComplete</i> method.</P>
   *
   * <P>
   * Unlike <code>AsyncCommand</code> and <code>SimpleCommand</code>, your subclass
   * should not override <code>execute</code>, but instead, should
   * override the <code>initializeAsyncMacroCommand</code> method,
   * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
   * to be executed.</P>
   *
   * <P>
   * You should not need to define a constructor,
   * instead, override the <code>initializeAsyncMacroCommand</code>
   * method.</P>
   *
   * <P>
   * If your subclass does define a constructor, be
   * sure to call the superclass constructor anyway.</P>
   *
   * @see Puremvc.patterns.AsyncCommand
   *
   * @author Tony DeFusco
   *
   * @constructs
   */
  constructor: function() {
    Puremvc.patterns.AsyncMacroCommand.superclass.constructor.call(this);
    this.subCommands = new Array();
    this.initializeAsyncMacroCommand();
  },

  /**
   * Initialize the <code>AsyncMacroCommand</code>.
   *
   * <P>
   * In your subclass, override this method to
   * initialize the <code>AsyncMacroCommand</code>'s <i>SubCommand</i>
   * list with <code>ICommand</code> class references.
   * </P>
   *
   * <listing>
   *    // Initialize MyMacroCommand
   *    function initializeAsyncMacroCommand()
   *    {
   *      addSubCommand(myapp.controller.FirstCommand);
   *      addSubCommand(myapp.controller.SecondCommand);
   *      addSubCommand(myapp.controller.ThirdCommand);
   *    }
   * </listing>
   *
   * <P>
   * Note that <i>SubCommand</i>s may be any <code>Command</code> implementor,
   * <code>AsyncMacroCommand</code>s, <code>AsyncCommand</code>s,
   * <code>MacroCommand</code>s or <code>SimpleCommands</code> are all acceptable.
   */
  initializeAsyncMacroCommand: function() {

  },

  /**
   * Add a <i>SubCommand</i>.
   *
   * <P>
   * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
   * order.</P>
   *
   * @param {Class} commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
   */
  addSubCommand: function(commandClassRef/*Class*/) {
    this.subCommands.push(commandClassRef);
  },

  /**
   * Registers the callback for a parent <code>AsyncMacroCommand</code>.
   *
   * @param {Function} value The <code>AsyncMacroCommand</code> method to call on completion
   */
  setOnComplete: function (value /*Function*/) {
    this.onComplete = value.createDelegate(this);
  },

  /**
   * Starts execution of this <code>AsyncMacroCommand</code>'s <i>SubCommands</i>.
   * <P>
   * The <i>SubCommands</i> will be called in First In/First Out (FIFO) order.
   * </P>
   *
   * @param {Puremvc.patterns.Notification} notification the <code>Notification</code> object to be passed to each <i>SubCommand</i>.
   */
  execute: function(notification /*Puremvc.patterns.Notification*/) {
    this.notification = notification;
    this.nextCommand();
  },

  /**
   * Execute this <code>AsyncMacroCommand</code>'s next <i>SubCommand</i>.
   *
   * <P>
   * If the next <i>SubCommand</i> is asynchronous, a callback is registered for
   * the command completion, else the next command is run.</P>
   */
  nextCommand: function() {
    if (this.subCommands.length > 0) {
      var commandClassRef/*Class*/ = this.subCommands.shift();
      var commandInstance/*Object*/ = new commandClassRef();
      var isAsync/*Boolean*/ = commandInstance.isAsyncCommand;

      if (isAsync) {
        commandInstance.setOnComplete(this.nextCommand.createDelegate(this));
      }

      commandInstance.execute(this.notification);

      if (!isAsync) {
        this.nextCommand();
      }
    }
    else {
      if (this.onComplete != null) {
        this.onComplete();
      }

      this.notification = null;
      this.onComplete = null;
    }
  }
});
