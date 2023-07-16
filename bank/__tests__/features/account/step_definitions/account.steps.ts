import { Then, When } from "@cucumber/cucumber";
import assert from "assert";

import Account from "../../../../src/Contexts/account/application/Account.ts";

const account = new Account();

When("A client makes a deposit of {int} on {string}", function (amount) {
	account.deposit(amount);
});

When("A deposit of {int} on {string}", function (amount) {
	account.deposit(amount);
});

When("A withdrawal of {int} on {string}", function (amount) {
	account.withdraw(amount);
});

When("they print their bank statement", function () {
	account.printStatement();
});

Then("they would see:", function (expectedResponse) {
	assert.equal(this.whatIHeard, expectedResponse);
});
