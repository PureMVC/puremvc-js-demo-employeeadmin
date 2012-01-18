/*
 PureMVC Javascript Employee Admin Demo for JS Native by Cliff Hall<cliff.hall@puremvc.org> 
 Ported from Demo for Mootools by Frederic Saunier <frederic.saunier@puremvc.org> 
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved. 
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
/**
 * @misc
 * @class Serves as the main application's View.  All
 * other Views will become children of this control making
 * the Application act as the 'stage'
 *
 * @extends UIComponent
 */
var Application = function()
{

    /**
     * @ignore
     */
    this.Extends = UIComponent;

	/*
	 * Child elements.
	 */
	this.userForm = null;
	this.userList = null;
	this.rolePanel = null;

    /**
     * A reference to the <code>ApplicationFacade</code> Singleton.
     * This reference serves no purpose other than to access the <code>startup()</code>
     * method when the initial View has finished being built.
     * @type ApplicationFacade
     */
    this.facade = null;

    /**
     * @ignore
     */
    this.initialize = function()
    {
		this.facade = ApplicationFacade.getInstance();
		this.parent("application-div");
    }

    /**
     * Creates and adds the panels as children.
     */
    this.initializeChildren = function()
    {
		this.userList = new UserList();
		this.addChild( this.userList );

		this.userForm = new UserForm();
		this.addChild( this.userForm );

		this.rolePanel = new RolePanel();
		this.addChild( this.rolePanel );
    }

    /**
     * Once the children are added and the
     * initial state of the View has been build,
     * <code>startup()</code> is called passing
     * a reference to the <code>Application</code> as an
     * argument which starts the system and initializes
     * the Application's <code>Mediator</code>
     *
     * @see ApplicationFacade
     * @see StartupCommand
     * @see ViewPrepCommand
     * @see ModelPrepCommand
     * @see ApplicationMediator
     */
    this.initializationComplete = function()
    {
		this.facade.startup(this);
    }
}
Application = new Class(new Application());