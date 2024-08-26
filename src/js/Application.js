//
//  Application.js
//  PureMVC JS Demo - EmployeeAdmin
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {ApplicationFacade} from "./ApplicationFacade.js";

document.addEventListener("DOMContentLoaded", () => {
	ApplicationFacade.getInstance("EmployeeAdmin").startup();
});

