import Balance from "../domain/Balance.ts";
import Datetime from "../domain/Datetime.ts";
import Transaction from "../domain/Transaction.ts";
import { TransactionRepository } from "../domain/TransactionRepository.ts";

class InMemoryTransactionRepository implements TransactionRepository {
	transactions: Transaction[] = [];

	constructor() {
		this.transactions = [];
	}

	makeDeposit(amount: number): void {
		const transaction = new Transaction(new Datetime(), amount);
		this.transactions.push(transaction);
	}

	makeWithdrawal(amount: number): void {
		const transaction = new Transaction(new Datetime(), -amount);
		this.transactions.push(transaction);
	}

	getTransactions(): void {
		let transactionsPrint = "";
		transactionsPrint += "Date       || Amount || Balance\n";
		let balance = new Balance(0);
		const listOfTransactions = this.transactions
			.map((transaction) => {
				balance = balance.add(transaction.getAmount());

				return `${transaction.getDate()} || ${transaction.getAmount()}   || ${balance.value}`;
			})
			.reverse()
			.join("\n");
		transactionsPrint += listOfTransactions;
		console.log(transactionsPrint);
	}
}

export default InMemoryTransactionRepository;
