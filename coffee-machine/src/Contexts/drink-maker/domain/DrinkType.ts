export enum DrinkEnum {
	TEA = "T",
	COFFEE = "C",
	CHOCOLATE = "H",
}

export class DrinkType {
	value: DrinkEnum;
	constructor(readonly type: DrinkEnum) {
		this.value = type;
	}
}
