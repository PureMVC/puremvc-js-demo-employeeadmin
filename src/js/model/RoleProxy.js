import {puremvc} from "../api/puremvc-2.0.0.js"

export class RoleProxy extends puremvc.Proxy {

    static get NAME() { return "RoleProxy" }

    constructor() {
        super(RoleProxy.NAME, []);
    }

    /**
     * @param user {User}
     * @param role {Role}
     */
    addRoleToUser(user, role) {
        user.roles.push(role);
    }

    /**
     * @param user {User}
     * @param role {Role}
     */
    removeRoleFromUser(user, role) {
        for (let i = 0; i < user.roles.length; i++) {
            if(user.roles[i].id === role.id) {
                user.roles.splice(i, 1);
                break;
            }
        }
    }

}