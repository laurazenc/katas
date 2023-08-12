import Datetime from "./Datetime.ts";

class Transaction {
	constructor(private readonly date: Datetime, private readonly amount: number) {}

	public getDate(): string {
		return this.date.getDate();
	}

	public getAmount(): number {
		return this.amount;
	}
}

export default Transaction;
