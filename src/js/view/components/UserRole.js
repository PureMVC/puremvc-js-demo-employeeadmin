import {Easing} from "../../api/easing.js";
import {Role} from "../../model/enum/Role.js";

export class UserRole {

    constructor() {
        this.element = document.getElementById("userRole");
        this.roleSet = new Set();

        document.getElementById("roles").innerHTML = Role.comboList
            .map(role => `<option value="${role.id.toString()}">${role.name}</option>`).join("");

        document.getElementById("roles").addEventListener("change", this.roleChange.bind(this));
        document.getElementById("userRole_add").addEventListener("click", this.update.bind(this));
        document.getElementById("userRole_remove").addEventListener("click", this.delete.bind(this));

        document.getElementById("userRole_dismiss").addEventListener("click", this.animateOut.bind(this));
        window.matchMedia("(max-width: 767px)").addEventListener("change", this.mediaQueryChange.bind(this));
    }

    animateIn() {
        this.element.style.display = "block";

        let start = this.element.getBoundingClientRect().height,
        end = 0, duration = 500;

        (function animate(startTime, delta, screen) {
            let currentTime = new Date() - startTime;
            if (currentTime < duration) {
                let frame = Math.ceil(Easing.easeOutBack(currentTime, start, delta, duration));
                screen.style.backgroundColor = `rgba(128, 128, 128, ${0.5 * currentTime/duration})`; // alpha: 0 - 0.5
                this.element.style.top = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta, screen));
            }
        }.bind(this))(new Date(), end - start, document.getElementById("screen"));
    }

    animateOut() {
        let start = this.element.getBoundingClientRect().y,
        end = 450, duration = 500;

        (function animate(startTime, delta, onComplete) {
            let currentTime = new Date() - startTime;
            if (currentTime <= duration) {
                let frame = Math.ceil(Easing.easeInBack(currentTime, start, delta, duration));
                this.element.style.top = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta, onComplete));
            } else { onComplete() }
        }.bind(this))(new Date(), end - start, () => {
            this.element.style.display = "none";
        });
    }

    /** @param roles {Role[]} */
    saveAll(roles) { // add roles
        if (roles.length) this.roleSet.add(...roles);
        document.getElementById("userRole_list").innerHTML =
            roles.map(role => `<li data-id="${role.id.toString()}">${role.name}</li>`).join("");
    }

    update(event) {
        let dropdown = document.getElementById("roles");
        let option = dropdown.options[dropdown.selectedIndex];
        let role = Role.comboList.find((role) => role.id === parseInt(option.value));

        if (this.roleSet.has(role)) return;

        this.roleSet.add(role);
        this.delegate.add(this._user, role);
        document.getElementById("userRole_list").innerHTML += `<li data-id="${option.value}">${option.text}</li>`
    }

    delete(event) {
        let dropdown = document.getElementById("roles");
        let option = dropdown.options[dropdown.selectedIndex];
        let role = Role.comboList.find((role) => role.id === parseInt(option.value));

        if (!this.roleSet.has(role)) return;

        this.roleSet.delete(role);
        Array.from(document.getElementById("userRole_list").children).forEach(child => {
            if (role.id === parseInt(child.dataset.id)) {
                if (this._user) this.delegate.remove(this._user, role);
                child.remove();
            }
        });
    }

    reset() {
        this._user = null;
        this.roleSet = new Set();
        document.getElementById("userRole_list").innerHTML = "";
        let roles = document.getElementById("roles");
        roles.selectedIndex = 0;
        roles.dispatchEvent(new Event('change', { bubbles: true }));
    }

    roleChange(event) {
        let index = event.target.selectedIndex;
        document.getElementById("userRole_add").disabled = index === 0;
        document.getElementById("userRole_remove").disabled = index === 0;
    }

    mediaQueryChange(event) {
        if(!event.matches) { // reset on media query change (browser resize)
            this.element.style.display = "block";
        } else {
            this.element.style.display = "none";
        }
    }

    /** @param value {User} */
    set user(value) { this._user = value }

    set delegate(value) { this._delegate = value; }

    get delegate() { return this._delegate; }

}

// Constructor: UI Data, click/change event handlers
// Animation: In, Out
// CRUD: save, saveAll, update, delete, reset
// Navigation: navToX, navBack
// Change: (dropdown, media)
