import { DrinkEnum, DrinkType, DrinkTypeValue } from "./DrinkType.ts";
import { Money } from "./Money.ts";

export class NotEnoughMoneyError extends Error {
	constructor(missingAmount: number) {
		super();
		this.message = `You are missing ${missingAmount} money`;
	}
}

export class DrinkCannotBeHeated extends Error {
	constructor(type: DrinkType) {
		super();
		this.message = `You cannot heat a ${type}`;
	}
}

export abstract class Drink {
	type: DrinkType;
	sugar = 0;
	stick = 0;
	cost = new Money(0);
	hot = false;

	public addSugar(sugar: number) {
		this.sugar = sugar;
		if (sugar > 0) {
			this.addStick();
		}
	}

	private addStick() {
		this.stick = 1;
	}

	public getType(): DrinkTypeValue {
		return new DrinkType(`${this.type.value}${this.hot ? "h" : ""}` as DrinkTypeValue).value;
	}

	public getSugar(): string {
		return this.sugar > 0 ? this.sugar.toString() : "";
	}

	public getStick(): string {
		return this.stick > 0 ? "0" : "";
	}

	public validateCost(money: Money) {
		if (this.cost.isGreaterThan(money)) {
			const missingAmount = this.cost.getMissingAmount(money);
			throw new NotEnoughMoneyError(missingAmount);
		}
	}

	abstract heat(): void;
}

export class Tea extends Drink {
	type: DrinkType;
	cost = new Money(0.4);

	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.TEA);
	}

	public heat(): void {
		this.hot = true;
	}
}
export class Chocolate extends Drink {
	type: DrinkType;
	cost = new Money(0.5);
	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.CHOCOLATE);
	}

	public heat(): void {
		this.hot = true;
	}
}
export class Coffee extends Drink {
	type: DrinkType;
	cost = new Money(0.6);
	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.COFFEE);
	}

	public heat(): void {
		this.hot = true;
	}
}

export class OrangeJuice extends Drink {
	type: DrinkType;
	cost = new Money(0.6);
	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.ORANGE_JUICE);
	}

	public heat(): void {
		throw new DrinkCannotBeHeated(this.type);
	}
}
