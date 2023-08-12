import { defineFeature, loadFeature } from "jest-cucumber";

import Account from "../../../../src/Contexts/account/application/Account.ts";
import Datetime, { Dateformat } from "../../../../src/Contexts/account/domain/Datetime.ts";
import InMemoryTransactionRepository from "../../../../src/Contexts/account/infrastructure/InMemoryTransactionRepository.ts";

const feature = loadFeature("__tests__/features/account/account.feature");

const transactionRepository = new InMemoryTransactionRepository();
const account = new Account(transactionRepository);

let consoleLogSpy: jest.SpyInstance;
jest.useFakeTimers();
defineFeature(feature, (test) => {
	beforeAll(() => {
		// Lock Time
		consoleLogSpy = jest.spyOn(console, "log");
	});

	afterAll(() => {
		// Unlock Time
		jest.clearAllMocks();
	});

	test("A client with Deposit and Withdrawal", ({ when, then }) => {
		when(/^A client makes a deposit of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(Datetime.fromDateString(date, Dateformat.ENTRY_FORMAT));
			account.deposit(amount);
		});

		when(/^A deposit of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(Datetime.fromDateString(date, Dateformat.ENTRY_FORMAT));
			account.deposit(amount);
		});

		when(/^A withdrawal of (\d+) on "(.*)"$/, function (amount, date) {
			jest.setSystemTime(Datetime.fromDateString(date, Dateformat.ENTRY_FORMAT));
			account.withdraw(amount);
		});

		when(/^they print their bank statement/, function () {
			account.printStatement();
		});

		then("they would see:", function (expectedResponse) {
			expect(consoleLogSpy).toHaveBeenCalledWith(expectedResponse);
		});
	});
});
