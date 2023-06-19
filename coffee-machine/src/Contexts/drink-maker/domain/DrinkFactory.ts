import { Chocolate, Coffee, Drink, Milk, OrangeJuice, Tea, Water } from "./Drink.ts";
import { DrinkEnum, DrinkType } from "./DrinkType.ts";

export class DrinkFactory {
	create(type: DrinkType): Drink {
		switch (type.value) {
			case DrinkEnum.TEA:
				return new Tea();
			case DrinkEnum.COFFEE:
				return new Coffee();
			case DrinkEnum.CHOCOLATE:
				return new Chocolate();
			case DrinkEnum.ORANGE_JUICE:
				return new OrangeJuice();
			case DrinkEnum.MILK:
				return new Milk();
			case DrinkEnum.WATER:
				return new Water();

			default:
				throw new Error(`Unsupported drink type: ${type.value}`);
		}
	}
}
