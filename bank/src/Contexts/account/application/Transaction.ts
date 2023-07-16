class Transaction {
	constructor(private readonly date: Date, private readonly amount: number) {}

	public getDate(): Date {
		return this.date;
	}

	public getAmount(): number {
		return this.amount;
	}
}

export default Transaction;
