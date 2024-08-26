//
//  UserProxy.js
//  PureMVC JS Demo - EmployeeAdmin
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";

export class UserProxy extends Proxy {

    static get NAME () { return "UserProxy"; }

    constructor() {
        super(UserProxy.NAME, []);
    }

    /**  @param item {User} */
    add(item) {
        this.users.push(item);
    }

    /** @param user {User} */
    update(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (user.id === this.users[i].id) {
                this.users[i] = user;
                break;
            }
        }
    }

    /** @param user {User} */
    remove(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (user.id === this.users[i].id) {
                this.users.splice(i, 1);
            }
        }
    }

    newInsertId() {
        let last = this.users[this.users.length - 1];
        return last.id + 1;
    }

    /** @returns {User[]} */
    get users() { return this.data; }

}
