import { Chocolate, Coffee, Drink, OrangeJuice, Tea } from "./Drink.ts";
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
			default:
				throw new Error(`Unsupported drink type: ${type}`);
		}
	}
}
