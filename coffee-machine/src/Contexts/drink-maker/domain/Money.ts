export class Money {
	value: number;

	constructor(money: number) {
		this.value = money;
	}

	public isGreaterThan(money: Money) {
		return this.value > money.value;
	}

	public getMissingAmount(money: Money): number {
		return this.value - money.value;
	}
}
