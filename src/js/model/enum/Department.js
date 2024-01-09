export class Department {

    static NONE_SELECTED = new Department(0, "---None Selected---");
    static ACCT = new Department(1, "Accounting");
    static SALES = new Department(2, "Sales");
    static PLANT = new Department(3, "Plant");
    static SHIPPING = new Department(4, "Shipping");
    static QC = new Department(5, "Quality Control");

    /**
     * @param id {int}
     * @param name {string}
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /**  @returns {Department[]} */
    static get list() {
        return [
            Department.ACCT,
            Department.SALES,
            Department.PLANT,
            Department.SHIPPING,
            Department.QC
        ];
    }

    /** @returns {Department[]} */
    static get comboList() {
        let cList = Department.list;
        cList.unshift(Department.NONE_SELECTED);
        return cList;
    }

    /**
     * @param department {Department}
     * @returns {boolean}
     */
    equals(department) {
        return this.id === department.id && this.name === department.name;
    }

}
