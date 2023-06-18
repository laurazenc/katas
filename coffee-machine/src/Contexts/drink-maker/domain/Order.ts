import { DrinkEnum, DrinkType } from "./DrinkType.ts";
import { Money } from "./Money.ts";

export class Order {
	type: DrinkType;
	public sugar: number;
	money: Money;

	constructor(type: DrinkEnum, sugar?: number, money?: Money) {
		this.type = new DrinkType(type);
		if (sugar) this.sugar = sugar;
		if (money) this.money = money;
	}
}
