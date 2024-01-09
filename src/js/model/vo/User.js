import {Department} from "../enum/Department.js";

export class User {

    /**
     * @param id {int}
     * @param username {string}
     * @param first {string}
     * @param last {string}
     * @param email {string}
     * @param password {string}
     * @param department {Department}
     * @param roles {Role[]}
     */
    constructor(id, username, first, last, email, password, department, roles) {
        this.id = id;
        this.username = username || "";
        this.first = first || "";
        this.last = last || "";
        this.email = email || "";
        this.password = password || "";
        this.department = department || Department.NONE_SELECTED;
        this.roles = roles || [];
    }

    /**
     * @param confirm {string}
     * @returns {boolean}
     */
    isValid(confirm) {
        return this.username !== "" && this.first !== "" && this.last !== "" && this.email !== "" &&
            this.password !== "" && this.password === confirm && this.department.id !== 0;
    }

}