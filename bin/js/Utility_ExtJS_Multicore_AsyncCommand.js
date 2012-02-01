/**
 * @fileOverview
 * PureMVC multicore native JavaScript port.
 * @author David Foley | david.foley@puremvc.org
 */
(function (scope){
	
	// create the org.puremvc.js object hierarchy
	// if the hierarchy does not yet exist
	if (null == scope['puremvc'])
	{
		scope['puremvc']= {};
	}

 	/* implementation begin */
	
	

/*
 PureMVC Javascript AsyncCommand Utility for native port
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @class puremvc.AsyncCommand
 * @extends puremvc.SimpleCommand
 *
 * A base #AsyncCommand implementation.
 *
 * Your subclass should override the #execute method where your business logic
 * will handle the
 * {@link puremvc.Notification Notification}
 * 
 * @constructor
 */
function AsyncCommand() {
  this.isAsyncCommand = true;
}

AsyncCommand.prototype = new puremvc.Notifier();
AsyncCommand.prototype.constructor = AsyncCommand;

/**
 * The #AsyncMacroCommand method to call on completion.
 */
AsyncCommand.prototype.onComplete = null;

/**
 * Registers the callback for a parent #AsyncMacroCommand.
 *
 * @param {Function} value The #AsyncMacroCommand method to call on completion.
 */
AsyncCommand.prototype.setOnComplete = function(value/*Function*/) {
  this.onComplete = value;
};

/**
 * Notify the parent #AsyncMacroCommand that this command is complete.
 *
 * Call this method from your subclass to signify that your asynchronous command
 * has finished.
 */
AsyncCommand.prototype.commandComplete = function() {
  if (this.onComplete && Object.prototype.toString.call(this.onComplete) === '[object Function]') {
    this.onComplete();
  }
};

/*
 PureMVC Javascript AsyncCommand Utility native port
 by Tony DeFusco <tony.defusco@puremvc.org>
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
 */

/**
 * @class puremvc.AsyncMacroCommand
 * @extends puremvc.Notifier
 * 
 * A base command implementation that executes other commands asynchronously,
 * such as {@link puremvc.SimpleCommand
 * SimpleCommand} or 
 * {@link puremvc.MacroCommand MacroCommand}
 * subclasses.
 *  
 * An AsyncMacroCommand maintains a list of command constructor references 
 * called *SubCommands*.
 * 
 * When #execute is called, the AsyncMacroCommand
 * caches a reference to the 
 * {@link puremvc.Notification Notification}
 * and calls #nextCommand on each of its *SubCommands* in turn.
 *
 * If there are still *SubCommands* to be executed, the #nextCommand method 
 * instantiates and calls #execute on each of its *SubCommands* in turn. Each 
 * *SubCommand* will be passed a reference to the original 
 * {@link puremvc.Notification Notification}
 * that was passed to the #AsyncMacroCommand's #execute method. If the
 * *SubCommand* to execute is an #AsyncCommand, the next *SubCommand* will not 
 * be executed until the previous *AsyncCommand has called its 
 * *commandComplete* method.
 * 
 * Unlike 
 * {@link puremvc.AsyncCommand AsyncCommand}
 * and 
 * {@link puremvc.SimpleCommand SimpleCommand},
 * your subclass should not override #execute, but instead, should override the 
 * #initializeAsyncMacroCommand method, calling #addSubCommand once for each 
 * *SubCommand* to be executed.
 *
 * You should not need to define a constructor, instead, override the 
 * #initializeAsyncMacroCommand method.
 *
 * If your subclass does define a constructor, be sure to call "super" like so
 * 
 *     function MyMacroCommand ()
 *     {
 *         AsyncMacroCommand.call(this);
 *     };
 * @constructor
 */
function AsyncMacroCommand() {
  this.isAsyncCommand = true;
  this.subCommands = new Array();
  this.initializeAsyncMacroCommand();
}

/* subclass Notifier */
AsyncMacroCommand.prototype = new puremvc.Notifier();
AsyncMacroCommand.prototype.constructor = AsyncMacroCommand;

/**
 * An array of <code>AsyncCommand</code>s or subclasses of.
 * @private
 * @type {Array.<SimpleCommand|MacroCommand|AsyncCommand|AsyncMacroCommand>}
 */
AsyncMacroCommand.prototype.subCommands = null;

/**
 * The <code>Notification</code> object to be passed to each <i>SubCommand</i>.
 * @type {Object}
 * @private
 */
AsyncMacroCommand.prototype.notification = null;

/**
 * The <code>AsyncMacroCommand</code> method to call on completion.
 * @type {Function}
 * @private
 */
AsyncMacroCommand.prototype.onComplete = null;

/**
 * Initialize the #AsyncMacroCommand
 *
 * In your subclass, override this method to
 * initialize the #AsyncMacroCommand<'s *SubCommand*
 * list with #ICommand class references.
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
 * Note that *SubCommands* may be any #Command implementor,
 * #AsyncMacroCommands, #AsyncCommands, #MacroCommands or #SimpleCommands are 
 * all acceptable.
 */
AsyncMacroCommand.prototype.initializeAsyncMacroCommand = function() {};

/**
 * Add a *SubCommand*.
 *
 * The *SubCommands* will be called in First In/First Out (FIFO) order.
 *
 * @param {Class} commandClassRef a reference to the #Class of the #ICommand.
 */
AsyncMacroCommand.prototype.addSubCommand = function(commandClassRef/*Class*/) {
  this.subCommands.push(commandClassRef);
};

/**
 * Registers the callback for a parent #AsyncMacroCommand.
 *
 * @param {Function} value The #AsyncMacroCommand method to call on completion.
 */
AsyncMacroCommand.prototype.setOnComplete = function(value /*Function*/) {
  this.onComplete = value.createDelegate(this);
};

/**
 * Starts execution of this #AsyncMacroCommand's *SubCommands*.
 *
 * The *SubCommands* will be called in First In/First Out (FIFO) order.
 *
 * @param {puremvc.Notification}
  * notification the #Notification object to be passed to each *SubCommand*.
 */
AsyncMacroCommand.prototype.execute = function(notification /*Notification*/) {
  this.notification = notification;
  this.nextCommand();
};

/**
 * Execute this #AsyncMacroCommand's next *SubCommand*.
 *
 * If the next *SubCommand* is asynchronous, a callback is registered for
 * the command completion, else the next command is run.
 */
AsyncMacroCommand.prototype.nextCommand = function() {
  if (this.subCommands.length > 0) {
    var commandClassRef/*Class*/ = this.subCommands.shift();
    var commandInstance/*Object*/ = new commandClassRef();
    var isAsync/*Boolean*/ = commandInstance.isAsyncCommand;

    if (isAsync) {
      commandInstance.setOnComplete(this.nextCommand.createDelegate(this));
    }
    commandInstance.initializeNotifier(this.multitonKey);
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
};

	
 	/* implementation end */
 	 
	// export the AsyncCommand utility classes to the
	// puremvc namespace
	var _classes = {
    'AsyncCommand': AsyncCommand,
    'AsyncMacroCommand': AsyncMacroCommand
  };
  for (var _class in _classes) {
	  scope['puremvc'][_class] = _classes[_class];
  }
})(this); // the 'this' parameter will resolve to global scope in all environments

