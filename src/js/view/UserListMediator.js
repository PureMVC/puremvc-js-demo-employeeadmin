import {puremvc} from "../api/puremvc-2.0.0.js"
import {UserList} from "./components/UserList.js";
import {UserProxy} from "../model/UserProxy.js";
import {ApplicationFacade} from "../ApplicationFacade.js";

export class UserListMediator extends puremvc.Mediator {

    static get NAME() { return "UserListMediator" }

    constructor() {
        super(UserListMediator.NAME, new UserList());
    }

    onRegister() {
        this.userList.delegate = {
            onNew: () => this.onNew(),
            onSelect: (user) => this.onSelect(user),
            onDelete: (user) => this.onDelete(user)
        }

        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);
        this.userList.users = this.userProxy.users;
        this.userProxy.users.forEach(user => this.userList.save(user));
    }

    onNew() {
        this.userList.reset();
        this.sendNotification(ApplicationFacade.NEW_USER);
    }

    /** @param user {User} */
    onSelect(user) {
        this.userList.animateOut();
        this.sendNotification(ApplicationFacade.USER_SELECTED, user);
    }

    /**  @param user {User} */
    onDelete(user) {
        this.userProxy.remove(user);
        this.sendNotification(ApplicationFacade.USER_DELETED);
    }

    /**  @returns {string[]} */
    listNotificationInterests() {
        return [
            ApplicationFacade.USER_ADDED,
            ApplicationFacade.USER_UPDATED,
            ApplicationFacade.CANCEL_SELECTED
        ];
    }

    /** @param notification {puremvc.Notification} */
    handleNotification(notification) {
        switch (notification.name) {
            case ApplicationFacade.USER_ADDED:
                this.userList.save(notification.body);
                this.userList.reset();
                break;
            case ApplicationFacade.USER_UPDATED:
                this.userList.update(notification.body);
                this.userList.reset();
                break;
            case ApplicationFacade.CANCEL_SELECTED:
                this.userList.animateIn();
                this.userList.reset();
                break;
        }
    }

    get userList() { return this.viewComponent; }

}