//
//  RoleProxy.js
//  PureMVC JS Demo - EmployeeAdmin
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";

export class RoleProxy extends Proxy {

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
