import AccountService from "../domain/AccountService.ts";

class Account implements AccountService {
	deposit(amount: number): void {}

	printStatement(): void {}

	withdraw(amount: number): void {}
}

export default Account;
