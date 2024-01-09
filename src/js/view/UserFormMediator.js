import {puremvc} from "../api/puremvc-2.0.0.js"
import {UserForm} from "./components/UserForm.js";
import {ApplicationFacade} from "../ApplicationFacade.js";
import {UserProxy} from "../model/UserProxy.js";

export class UserFormMediator extends puremvc.Mediator {

    static get NAME() { return "UserFormMediator" }

    constructor() {
        super(UserFormMediator.NAME, new UserForm());
    }

    onRegister() {
        this.userForm.delegate = {
            add: (user) => this.onAdd(user),
            update: (user) => this.onUpdate(user),
            cancel: () => this.onCancel(),
            showRoles: () => this.showRoles()
        };

        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);
    }

    /** @param user {User} */
    onAdd(user) {
        user.id = this.userProxy.newInsertId();
        this.userProxy.add(user);
        this.facade.sendNotification(ApplicationFacade.USER_ADDED, user);
        this.userForm.reset();
    }

    /** @param user {User} */
    onUpdate(user) {
        this.userProxy.update(user);
        this.facade.sendNotification(ApplicationFacade.USER_UPDATED, user);
        this.userForm.reset();
    }

    onCancel() {
        this.facade.sendNotification(ApplicationFacade.CANCEL_SELECTED);
        this.userForm.reset();
    }

    showRoles() {
        this.facade.sendNotification(ApplicationFacade.ROLE_SHOW);
    }

    /** @returns {string[]} */
    listNotificationInterests() {
        return [
            ApplicationFacade.NEW_USER,
            ApplicationFacade.USER_DELETED,
            ApplicationFacade.USER_SELECTED,
        ];
    }

    /** @param notification {puremvc.Notification} */
    handleNotification(notification) {
        switch (notification.name) {
            case ApplicationFacade.NEW_USER:
                this.userForm.reset();
                break;
            case ApplicationFacade.USER_DELETED:
                this.userForm.reset();
                break;
            case ApplicationFacade.USER_SELECTED:
                this.userForm.animateIn();
                this.userForm.update(notification.body);
                break;
        }
    }

    get userForm() { return this.viewComponent }

}