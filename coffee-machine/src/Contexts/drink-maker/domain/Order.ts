import { DrinkEnum, DrinkType } from "./DrinkType.ts";

export class Order {
	type: DrinkType;
	public sugar: number;

	constructor(type: DrinkEnum, sugar: number) {
		this.type = new DrinkType(type);
		this.sugar = sugar;
	}
}
