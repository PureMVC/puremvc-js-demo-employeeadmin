//
//  UserRoleMediator.js
//  PureMVC JS Demo - EmployeeAdmin
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Mediator} from "@puremvc/puremvc-js-multicore-framework";
import {UserRole} from "./components/UserRole.js";
import {ApplicationFacade} from "../ApplicationFacade.js";
import {RoleProxy} from "../model/RoleProxy.js";

export class UserRoleMediator extends Mediator {

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

    /**  @param notification {Notification} */
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
