import {puremvc} from "../api/puremvc-2.0.0.js"
import {UserRole} from "./components/UserRole.js";
import {ApplicationFacade} from "../ApplicationFacade.js";
import {RoleProxy} from "../model/RoleProxy.js";

export class UserRoleMediator extends puremvc.Mediator {

    static get NAME() { return "UserRoleMediator" }

    constructor() {
        super(UserRoleMediator.NAME, new UserRole());
    }

    onRegister() {
        this.userRole.delegate = {
            add: (user, role) => this.onAddRole(user, role),
            remove: (user, role) => this.onRemoveRole(user, role),
        }
        this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME);
    }

    /** @param user {User}
     * @param role {Role} */
    onAddRole(user, role) {
        this.roleProxy.addRoleToUser(user, role);
    }

    /** @param user {User}
     * @param role {Role} */
    onRemoveRole(user, role) {
        this.roleProxy.removeRoleFromUser(user, role);
    }

    /** @returns {string[]} */
    listNotificationInterests() {
        return [
            ApplicationFacade.NEW_USER,
            ApplicationFacade.USER_ADDED,
            ApplicationFacade.USER_UPDATED,
            ApplicationFacade.USER_DELETED,
            ApplicationFacade.USER_SELECTED,
            ApplicationFacade.CANCEL_SELECTED,
            ApplicationFacade.ROLE_SHOW
        ];
    }

    /**  @param notification {puremvc.Notification} */
    handleNotification(notification) {
        switch (notification.name) {
            case ApplicationFacade.NEW_USER:
                this.userRole.reset();
                break;
            case ApplicationFacade.USER_ADDED:
                this.userRole.reset();
                break;
            case ApplicationFacade.USER_UPDATED:
                this.userRole.reset();
                break;
            case ApplicationFacade.USER_DELETED:
                this.userRole.reset();
                break;
            case ApplicationFacade.USER_SELECTED:
                let user = notification.body;
                this.userRole.user = user;
                this.userRole.saveAll(user.roles);
                break;
            case ApplicationFacade.CANCEL_SELECTED:
                this.userRole.reset();
                break;
            case ApplicationFacade.ROLE_SHOW:
                this.userRole.animateIn();
                break;
        }
    }

    get userRole() { return this.viewComponent }

}