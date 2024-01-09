import {ApplicationFacade} from "./ApplicationFacade.js";

document.addEventListener("DOMContentLoaded", () => {
	ApplicationFacade.getInstance("EmployeeAdmin").startup();
});

