import {Easing} from "../../api/easing.js";
import {User} from "../../model/vo/User.js";
import {Department} from "../../model/enum/Department.js";

export class UserForm {

    static get MODE_ADD() { return "modeAdd" }
    static get MODE_EDIT() { return "modeEdit" }

    mode = UserForm.MODE_ADD;

    constructor() {
        this.element = document.getElementById("userForm");

        document.getElementById("department").innerHTML = Department.comboList
            .map(department =>`<option value="${department.id.toString()}">${department.name}</option>` ).join("");

        document.getElementById("userForm_role").addEventListener("click", this.navToRoles.bind(this));
        document.getElementById("userForm_back").addEventListener("click", this.navBack.bind(this));

        document.getElementById("userForm_submit").addEventListener("click", this.save.bind(this));
        document.getElementById("userForm_cancel").addEventListener("click", this.navBack.bind(this));

        window.matchMedia("(max-width: 767px)").addEventListener("change", this.mediaChange.bind(this));
    }

    animateIn() {
        this.element.style.display = "block";
        let start = this.element.getBoundingClientRect().x,
        end = 0, duration = 500;

        (function animate(startTime, delta) {
            let currentTime = new Date() - startTime;
            if (currentTime < duration) {
                let frame = Math.floor(Easing.easeOutQuad(currentTime, start, delta, duration)); // easeOutBounce
                this.element.style.left = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta));
            }
        }.bind(this))(new Date(), end - start);
    }

    animateOut() {
        let start = this.element.getBoundingClientRect().x,
        end = window.innerWidth + 2, duration= 400;

        (function animate(startTime, delta, onComplete) {
            let currentTime = new Date() - startTime;
            if (currentTime < duration) {
                let frame = Math.ceil(Easing.easeOutQuad(currentTime, start, delta, duration));
                this.element.style.left = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta, onComplete));
            } else { onComplete() }
        }.bind(this))(new Date(), end - start, () => {
            this.element.style.display = "none";
        });
    }

    save(event) {
        let department = document.getElementById("department");
        let user = new User(this.user ? this.user.id : 0,
            document.getElementById("username").value,
            document.getElementById("first").value,
            document.getElementById("last").value,
            document.getElementById("email").value,
            document.getElementById("password").value,
            new Department(department.selectedIndex, department.options[department.selectedIndex].text),
            this.user ? this.user.roles : []
        );
        if (user.isValid(document.getElementById("confirm").value)) {
            this.mode === UserForm.MODE_ADD ? this.delegate.add(user) : this.delegate.update(user);
        } else {
            alert("Invalid Form.");
        }
    }

    /** @param user {User} */
    update(user) { // populate fields
        this.user = user;
        this.mode = UserForm.MODE_EDIT;

        ["first", "last", "email", "username", "password"]
            .forEach(field => document.getElementById(field).value = user[field]);

        document.getElementById("confirm").value = user.password;
        document.getElementById("department").selectedIndex = user.department.id;
        document.getElementById("userForm_submit").innerText = "Update";
    }

    reset() {
        this.user = null;
        ["first", "last", "email", "username", "password", "confirm"].forEach(field =>  // reset fields
            document.getElementById(field).value = "");
        document.getElementById("department").selectedIndex = 0;
        document.getElementById("userForm_submit").innerText = "Save";
        this.mode = UserForm.MODE_ADD;
    }

    navToRoles() { this.delegate.showRoles() }

    navBack() {
        this.animateOut();
        this.delegate.cancel();
    }

    mediaChange(event) {
        if(!event.matches) { // reset on media query change (browser resize)
            this.element.style.display = "block";
        } else {
            this.element.style.left = window.innerWidth + "px";
            this.element.style.display = "none";
        }
    }

    set delegate(value) { this._delegate = value }

    get delegate() { return this._delegate }

}