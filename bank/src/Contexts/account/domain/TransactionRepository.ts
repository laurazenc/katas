export interface TransactionRepository {
	makeDeposit(amount: number): void;

	makeWithdrawal(amount: number): void;

	getTransactions(): void;
}
