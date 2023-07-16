class Balance {
	private readonly _value: number;

	constructor(value: number) {
		this._value = value;
	}

	get value(): number {
		return this._value;
	}

	add(amount: number): Balance {
		return new Balance(this._value + amount);
	}

	subtract(amount: number): Balance {
		return new Balance(this._value - amount);
	}
}

export default Balance;
