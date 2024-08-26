//
//  UITest.spec.js
//  PureMVC JS Demo - EmployeeAdmin
//
//  Copyright(c) 2023 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {expect, test} from "@playwright/test";

test.describe("UI Tests", () => {

	test("test for title", async ({page}) => {
		await page.goto("http://localhost:4173/");
		await expect(page).toHaveTitle("Employee Admin");
	});

	test("test for Larry", async ({page}) => {
		await page.goto("http://localhost:4173/");

		await page.getByText('lstooge').click();
		await expect(page.locator('input#first')).toHaveValue("Larry");
		await expect(page.locator('input#last')).toHaveValue("Stooge");
		await expect(page.locator('input#email')).toHaveValue("larry@stooges.com");
		await expect(page.locator('input#username')).toHaveValue("lstooge");
		await expect(page.locator('input#password')).toHaveValue("ijk456");
		await expect(page.locator('input#confirm')).toHaveValue("ijk456");

		let department = page.locator('select#department option:checked');
		expect(await department.getAttribute('value')).toBe("1");
		expect(await department.innerText()).toBe("Accounting");

		const roles = page.locator('#userRole_list li');
		expect(await roles.count()).toBe(1);
		expect(await roles.nth(0).innerText()).toEqual("Employee Benefits");
	});

	test("test for Curly", async ({page}) => {
		await page.goto("http://localhost:4173/");

		await page.getByText('cstooge').click();
		await expect(page.locator('input#first')).toHaveValue("Curly");
		await expect(page.locator('input#last')).toHaveValue("Stooge");
		await expect(page.locator('input#email')).toHaveValue("curly@stooges.com");
		await expect(page.locator('input#username')).toHaveValue("cstooge");
		await expect(page.locator('input#password')).toHaveValue("xyz987");
		await expect(page.locator('input#confirm')).toHaveValue("xyz987");

		let department = page.locator('select#department option:checked');
		expect(await department.getAttribute('value')).toBe("2");
		expect(await department.innerText()).toBe("Sales");

		const roles = page.locator('#userRole_list li');
		expect(await roles.count()).toBe(2);
		expect(await roles.nth(0).innerText()).toEqual("Accounts Receivable");
		expect(await roles.nth(1).innerText()).toEqual("General Ledger");
	});

	test("test for Moe", async ({page}) => {
		await page.goto("http://localhost:4173/");

		await page.getByText('mstooge').click();
		await expect(page.locator('input#first')).toHaveValue("Moe");
		await expect(page.locator('input#last')).toHaveValue("Stooge");
		await expect(page.locator('input#email')).toHaveValue("moe@stooges.com");
		await expect(page.locator('input#username')).toHaveValue("mstooge");
		await expect(page.locator('input#password')).toHaveValue("abc123");
		await expect(page.locator('input#confirm')).toHaveValue("abc123");

		let department = page.locator('select#department option:checked');
		expect(await department.getAttribute('value')).toBe("3");
		expect(await department.innerText()).toBe("Plant");

		const roles = page.locator('#userRole_list li');
		expect(await roles.count()).toBe(3);
		expect(await roles.nth(0).innerText()).toEqual("Production");
		expect(await roles.nth(1).innerText()).toEqual("Sales");
		expect(await roles.nth(2).innerText()).toEqual("Shipping");
	});

	test("test new employee", async ({page}) => {
		await page.goto("http://localhost:4173/");

		await page.locator("#first").fill('Shemp');
		await page.locator('#last').fill('Stooge');
		await page.locator('#email').fill('shemp@stooges.com');
		await page.locator('#username').fill('sshemp');
		await page.locator('#password').fill('xyz987');
		await page.locator('#confirm').fill('xyz987');
		await page.locator('#department').selectOption('1');
		await page.locator('#userForm_submit').click();

		let users = page.locator('#userList_table li');
		expect(await users.count()).toBe(5);

		let li = await users.nth(4);
		let children = li.locator('> *');
		expect(await children.count()).toBe(2); // input & label

		let shemp = children.nth(1); // label
		let spans = shemp.locator('> *'); // label > span
		expect(await spans.count()).toBe(7);
        expect(await spans.nth(0).innerText()).toEqual("Stooge, Shemp");
        expect(await spans.nth(1).innerText()).toEqual("sshemp");
        expect(await spans.nth(2).innerText()).toEqual("Shemp");
        expect(await spans.nth(3).innerText()).toEqual("Stooge");
        expect(await spans.nth(4).innerText()).toEqual("shemp@stooges.com");
        expect(await spans.nth(5).innerText()).toEqual("xyz987");
		expect(await spans.nth(6).innerText()).toBe("Accounting");
	});

});


// await page.getByRole('button', { name: 'Save' }).click();
//

