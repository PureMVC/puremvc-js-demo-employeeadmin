export class Role {

    static NONE_SELECTED = new Role(0, "--None Selected---");
    static ADMIN = new Role(1, "Administrator");
    static ACCT_PAY = new Role(2, "Accounts Payable");
    static ACCT_RCV = new Role(3, "Accounts Receivable");
    static EMP_BENEFITS = new Role(4, "Employee Benefits");
    static GEN_LEDGER = new Role(5, "General Ledger");
    static PAYROLL = new Role(6, "Payroll");
    static INVENTORY = new Role(7, "Inventory");
    static PRODUCTION = new Role(8, "Production");
    static QUALITY_CTL = new Role(9, "Quality Control");
    static SALES = new Role(10, "Sales");
    static ORDERS = new Role(11, "Orders");
    static CUSTOMERS = new Role(12, "Customers");
    static SHIPPING = new Role(13, "Shipping");
    static RETURNS = new Role(14, "Returns");

    /**
     * @param id {int}
     * @param name {string}
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /** @returns {Role[]} */
    static get list() {
        return [
            Role.ADMIN,
            Role.ACCT_PAY,
            Role.ACCT_RCV,
            Role.EMP_BENEFITS,
            Role.GEN_LEDGER,
            Role.PAYROLL,
            Role.INVENTORY,
            Role.PRODUCTION,
            Role.QUALITY_CTL,
            Role.SALES,
            Role.ORDERS,
            Role.CUSTOMERS,
            Role.SHIPPING,
            Role.RETURNS
        ];
    }

    /** @returns {Role[]} */
    static get comboList() {
        let cList = Role.list;
        cList.unshift(Role.NONE_SELECTED);
        return cList;
    }

    /**
     * @param role {Role}
     * @returns {boolean}
     */
    equals(role) {
        return this.id === role.id && this.name === role.name;
    }

}