export enum DrinkEnum {
	TEA = "T",
	COFFEE = "C",
	CHOCOLATE = "H",
	ORANGE_JUICE = "O",
	WATER = "W",
	MILK = "M",
}

export type DrinkTypeValue = DrinkEnum | `${DrinkEnum}h`;

export class DrinkType {
	value: DrinkTypeValue;
	constructor(type: DrinkTypeValue) {
		this.value = type;
	}
}
