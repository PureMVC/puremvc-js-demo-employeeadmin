import {puremvc} from "../api/puremvc-2.0.0.js"
import {Department} from "../model/enum/Department.js";
import {Role} from "../model/enum/Role.js";
import {User} from "../model/vo/User.js";
import {RoleProxy} from "../model/RoleProxy.js";
import {UserProxy} from "../model/UserProxy.js";
import {UserListMediator} from "../view/UserListMediator.js";
import {UserFormMediator} from "../view/UserFormMediator.js";
import {UserRoleMediator} from "../view/UserRoleMediator.js";

export class StartupCommand extends puremvc.SimpleCommand {

    /** @param notification {puremvc.Notification} */
    execute(notification) {
        let userProxy = new UserProxy();
        userProxy.add(new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", Department.ACCT, [Role.EMP_BENEFITS]));
        userProxy.add(new User(2, "cstooge","Curly", "Stooge", "curly@stooges.com", "xyz987", Department.SALES, [Role.ACCT_RCV, Role.GEN_LEDGER]));
        userProxy.add(new User(3, "mstooge","Moe", "Stooge", "moe@stooges.com", "abc123", Department.PLANT, [Role.PRODUCTION, Role.SALES, Role.SHIPPING]));

        this.facade.registerProxy(userProxy);
        this.facade.registerProxy(new RoleProxy());

        this.facade.registerMediator(new UserListMediator());
        this.facade.registerMediator(new UserFormMediator());
        this.facade.registerMediator(new UserRoleMediator());
    }

}