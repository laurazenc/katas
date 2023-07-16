import AccountService from "../domain/AccountService.ts";
import { TransactionRepository } from "../domain/TransactionRepository.ts";

class Account implements AccountService {
	constructor(private readonly transactionRepository: TransactionRepository) {}

	deposit(amount: number): void {
		this.transactionRepository.makeDeposit(amount);
	}

	printStatement(): void {
		this.transactionRepository.getTransactions();
	}

	withdraw(amount: number): void {
		this.transactionRepository.makeWithdrawal(amount);
	}
}

export default Account;
