import {Easing} from "../../api/easing.js";

export class UserList {

    constructor() {
        this.element = document.getElementById("userList");
        document.getElementById("userList_add").addEventListener("click", this.add.bind(this));
        document.getElementById("userList_delete").addEventListener("click", this.delete.bind(this));
        window.matchMedia("(max-width: 767px)").addEventListener("change", this.mediaChange.bind(this));

        window.addEventListener("hashchange", () => {
            const hash = window.location.hash.slice(1) || '/';
            // href="#/" - Home
            // href="#/about" - About
            // localhost:3000/users/1
        });
    }

    animateIn() {
        let start = this.element.getBoundingClientRect().x,
        end = 0, duration= 350;

        (function animate(startTime, delta) {
            let currentTime = new Date() - startTime;
            if (currentTime < duration) {
                let frame = Math.ceil(Easing.easeOutQuad(currentTime, start, delta, duration));
                this.element.style.left = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta));
            }
        }.bind(this))(new Date(), end - start);
    }

    animateOut() {
        let start = this.element.getBoundingClientRect().x,
        end = -100, duration = 350;

        (function animate(startTime, delta) {
            let currentTime = new Date() - startTime;
            if (currentTime < duration) {
                let frame = Math.floor(Easing.easeOutQuad(currentTime, start, delta, duration));
                this.element.style.left = `${frame}px`;
                requestAnimationFrame(animate.bind(this, startTime, delta));
            }
        }.bind(this))(new Date(), end - start);
    }

    /** @param user {User} */
    save(user) {
        let li = document.createElement("li");
        li.addEventListener("click", this.navToForm.bind(this));

        li.innerHTML = `
            <input id="user_${user.id}" type="radio" name="users" value="${user.id}" />
            <label for="user_${user.id}">
                <span>${user.last}, ${user.first}</span>
                <span>${user.username}</span>
                <span>${user.first}</span>
                <span>${user.last}</span>
                <span>${user.email}</span>
                <span>${user.password}</span>
                <span>${user.department.name}</span>
            </label>`;

        document.getElementById("userList_table").appendChild(li);
    }

    add(event) { this.delegate.onNew() }

    /** @param user {User} */
    update(user) {
        for (let radio of document.getElementsByName("users")) {
            if (user.id !== parseInt(radio.value)) continue;

            let spans = radio.nextElementSibling.querySelectorAll("span");
            spans[0].textContent = `${user.last}, ${user.first}`;
            spans[1].textContent = user.username;
            spans[2].textContent = user.first;
            spans[3].textContent = user.last;
            spans[4].textContent = user.email;
            spans[5].textContent = user.password;
            spans[6].textContent = user.department.name;
            break;
        }
    }

    delete(event) {
        let radios = document.getElementsByName("users");
        let checkedRadio = Array.from(radios).find(radio => radio.checked);
        if (checkedRadio) {
            let id = parseInt(checkedRadio.value);
            let user = this.users.find(user => user.id === id);
            if (user) {
                this.delegate.onDelete(user);
                checkedRadio.parentElement.remove();
            }
        }
    }

    reset() { // reset selection
        document.getElementsByName("users").forEach(radio => radio.checked = false);
        document.getElementById("userList_delete").disabled = true;
    }

    navToForm(event) {
        if (event.target.tagName.toLowerCase() !== "input") return;
        document.getElementById("userList_delete").disabled = false;

        let id = parseInt(event.target.value);
        this.delegate.onSelect(this.users.find(user => user.id === id));
    }

    mediaChange(event) {
        if(event.matches) {
            this.element.style.left = "0px";
        }
    }

    /** @returns {User[]} */
    get users() { return this._users }

    /** @param value {User[]} */
    set users(value) { this._users = value }

    set delegate(value) { this._delegate = value; }

    get delegate() { return this._delegate; }

}