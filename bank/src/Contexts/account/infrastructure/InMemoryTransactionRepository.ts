import Transaction from "../application/Transaction.ts";
import { TransactionRepository } from "../domain/TransactionRepository.ts";

class InMemoryTransactionRepository implements TransactionRepository {
	transactions: Transaction[] = [];

	constructor() {
		this.transactions = [];
	}

	makeDeposit(amount: number): void {
		const transaction = new Transaction(new Date(), amount);
		this.transactions.push(transaction);
	}

	makeWithdrawal(amount: number): void {
		const transaction = new Transaction(new Date(), -amount);
		this.transactions.push(transaction);
	}

	getTransactions(): void {
		this.transactions.forEach((transaction) => {
			console.log(transaction);
		});
	}
}

export default InMemoryTransactionRepository;
