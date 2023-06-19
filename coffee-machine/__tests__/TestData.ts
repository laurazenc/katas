import {
	Chocolate,
	Coffee,
	Drink,
	OrangeJuice,
	Tea,
} from "../src/Contexts/drink-maker/domain/Drink.ts";

export class TestData {
	static aTeaDrink(): Drink {
		return new Tea();
	}

	static aCoffeeDrink(): Drink {
		return new Coffee();
	}

	static aChocolateDrink(): Drink {
		return new Chocolate();
	}

	static aOrangeJuiceDrink(): Drink {
		return new OrangeJuice();
	}
}
