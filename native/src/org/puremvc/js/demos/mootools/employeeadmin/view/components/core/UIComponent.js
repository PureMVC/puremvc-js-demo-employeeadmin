/**
 * @misc
 * @class An ultra-light framework class used as a wrapper
 * and pseudo-extenstion of the MooTools Native Element
 * implementation. Its primary goal is to encourage the addition
 * of  elements to the DOM in a top-down fashion.
 *
 * @param {mixed} element String or Element to become the subject
 * of ths instance.<p>If a string is passed, an element ID is assumed first.
 * if the element ID is not found in the DOM, a tag name is assumed and
 * MooTools will attempt to create that Element.</p><p>If an Element is
 * passed in, it is left as-is.</p>
 *
 * @param {Object} properties The Object containing the default properties
 * to be set on the Element.
 */
var UIComponent = function(element /* mixed String or Element */, properties /* Object */)
{

    /**
     * <code>true</code> if the component has
     * been initialized <code>false</code> otherwise
     * @type Boolean
     */
    this.initialized = false;

    /**
     * The Native <code>Element</code> used as
     * the subject of this UIComponent instance.
     * @type Element
     */
    this.element = null;

    /**
     * @ignore
     */
    this.initialize = function(element /* mixed String or Element */, properties /* Object */)
    {
		this.element = $(element);

		if (!this.element)
			this.element = new Element(element, properties);
		else
			this.element.setProperties(properties);

		// Copy methods of the Element object to
		// 'this' and bind the functions to the element itself.
		// This creates a transparent wrapper in the UIComponent for
		// each method of the Element.
		var e = this.element;
		for (var key in e)
		{
			var type = null;
			try
			{
				// IE 7+ has a problem with this sometimes.
				type = typeof e[key];
			}
			catch(e){}

			if (type == "function" && !this[key])
			{
				try
				{
					// Safari has trouble here with some function binding
					this[key] = e[key].bind(e);
				}
				catch(e){}
			}
		}
    };

    /**
     * Used in the creation of children used in this component.
     * Override this method to create new UIComponents or 'grab'
     * existing DOM nodes.
     */
    this.initializeChildren = function(){};
    /**
     * Called after <code>initializeChildren()</code>.
     * Override this method for additional processing
     * or adding event listeners to children
     */
    this.childrenInitialized = function(){};
    /**
     * Called after <code>childrenInitialized()</code>
     * Override this method to perform any final processing
     * before the child is considered initialized.
     */
    this.initializationComplete = function()
    {
		this.initialized = true;
    };

    /**
     * Wrapper for the MooTools <code>Element.grab()</code>
     * that serves 2 primary purposes.
     * <ol>
     * <li>Appends the child UIComponent's DOMElement
     * to this one.</li>
     * <li>calls the child's initialization routines to gaurantee all
     * elements are added to the DOM in a 'top down' fashion. (else IE will leak like a siv)</li>
     * </ol>
     * @param {UIComponent} child The child to append.
     * @return {UIComponent} this object - can be used for chaining
     */
    this.addChild = function(child /* UIComponent */ )
    {
		this.grab(child.element);

		// Initialize child
		child.initializeChildren();
		child.childrenInitialized();
		child.initializationComplete();

		// Fire an added event
		child.fireEvent("added");

		return this;
    };
};
UIComponent = new Class(new UIComponent());