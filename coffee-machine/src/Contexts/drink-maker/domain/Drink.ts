import { DrinkEnum, DrinkType } from "./DrinkType.ts";
import { Money } from "./Money.ts";

export class NotEnoughMoneyError extends Error {
	constructor(missingAmount: number) {
		super();
		this.message = `You are missing ${missingAmount} money`;
	}
}

export abstract class Drink {
	type: DrinkType;
	sugar = 0;
	stick = 0;
	cost = new Money(0);

	public addSugar(sugar: number) {
		this.sugar = sugar;
		if (sugar > 0) {
			this.addStick();
		}
	}

	private addStick() {
		this.stick = 1;
	}

	public getType(): DrinkEnum {
		return this.type.value;
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
}

export class Tea extends Drink {
	type: DrinkType;
	cost = new Money(0.4);

	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.TEA);
	}
}
export class Chocolate extends Drink {
	type: DrinkType;
	cost = new Money(0.5);
	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.CHOCOLATE);
	}
}
export class Coffee extends Drink {
	type: DrinkType;
	cost = new Money(0.6);
	constructor() {
		super();
		this.type = new DrinkType(DrinkEnum.COFFEE);
	}
}
