import { BeverageQuantityChecker } from "../domain/BeverageQuantityChecker.ts";
import { DrinkEnum, DrinkTypeValue } from "../domain/DrinkType.ts";
import { EmailNotifier } from "../domain/EmailNotifier.ts";

export class QuantityChecker implements BeverageQuantityChecker {
	constructor(private readonly notifier: EmailNotifier) {}

	public isEmpty(drink: DrinkTypeValue): boolean {
		if (drink === DrinkEnum.MILK) {
			this.notifier.notifyMissingDrink(drink);

			return true;
		}

		return false;
	}
}
