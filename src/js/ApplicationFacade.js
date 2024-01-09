import {puremvc} from "./api/puremvc-2.0.0.js"
import {StartupCommand} from "./controller/StartupCommand.js";

export class ApplicationFacade extends puremvc.Facade {

    static get STARTUP () { return "startup" }

    static get NEW_USER() { return "newUser" }
    static get CANCEL_SELECTED() { return "cancelSelected" }

    static get USER_SELECTED() { return "userSelected" }
    static get USER_ADDED() { return "userAdded" }
    static get USER_UPDATED() { return "userUpdated" }
    static get USER_DELETED() { return "userDeleted" }

    static get ROLE_SHOW() { return "roleShow" }
    static get ROLE_HIDDEN() { return "roleHidden" }

    static get BACK() { return "back" }

    constructor(key) {
        super(key);
    }

    /** @override */
    initializeController() {
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, () => new StartupCommand());
    }

    static getInstance(key) {
        return puremvc.Facade.getInstance(key, k => new ApplicationFacade(k));
    }

    startup(app) {
        this.sendNotification(ApplicationFacade.STARTUP, app);
    }

}