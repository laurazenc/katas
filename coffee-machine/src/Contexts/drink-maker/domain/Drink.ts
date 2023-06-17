import { DrinkEnum, DrinkType } from "./DrinkType.ts";

export class Drink {
	type: DrinkType;
	sugar = 0;
	stick = 0;
	constructor(type: DrinkType) {
		this.type = type;
	}

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
}
