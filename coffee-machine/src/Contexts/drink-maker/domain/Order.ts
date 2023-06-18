import { DrinkEnum, DrinkType } from "./DrinkType.ts";
import { Money } from "./Money.ts";

export class Order {
	type: DrinkType;
	public sugar: number;
	public extraHot = false;
	money: Money;

	constructor(type: DrinkEnum, sugar?: number, money?: Money, extraHot?: boolean) {
		this.type = new DrinkType(type);
		if (sugar) this.sugar = sugar;
		if (money) this.money = money;
		if (extraHot) this.extraHot = extraHot;
	}
}
