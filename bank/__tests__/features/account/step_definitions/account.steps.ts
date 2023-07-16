import { defineFeature, loadFeature } from "jest-cucumber";

import Account from "../../../../src/Contexts/account/application/Account.ts";
import InMemoryTransactionRepository from "../../../../src/Contexts/account/infrastructure/InMemoryTransactionRepository.ts";

const feature = loadFeature("__tests__/features/account/account.feature");

const transactionRepository = new InMemoryTransactionRepository();
const account = new Account(transactionRepository);

jest.useFakeTimers();

jest.setSystemTime(new Date("04 Dec 1995 00:12:00 GMT").getTime());

defineFeature(feature, (test) => {
	test("A client with Deposit and Withdrawal", ({ when, then }) => {
		when(/^A client makes a deposit of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(new Date(date).getTime());
			account.deposit(amount);
		});

		when(/^A deposit of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(new Date(date).getTime());

			account.deposit(amount);
		});

		when(/^A withdrawal of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(new Date(date).getTime());

			account.withdraw(amount);
		});

		when(/^they print their bank statement/, function () {
			account.printStatement();
		});

		then("they would see:", function (expectedResponse) {
			expect(expectedResponse).toEqual("");
		});
	});
});
