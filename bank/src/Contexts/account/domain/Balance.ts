class Balance {
	value: number;

	constructor(value: number) {
		this.value = Number(value);
	}

	add(amount: number): Balance {
		const newBalance = Number(this.getValue()) + Number(amount);

		return new Balance(Number(newBalance));
	}

	subtract(amount: number): Balance {
		return new Balance(this.value - amount);
	}

	getValue(): number {
		return this.value;
	}
}

export default Balance;
