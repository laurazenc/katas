import { DrinkEnum } from "./DrinkType.ts";

export interface EmailNotifier {
	notifyMissingDrink(drink: DrinkEnum): void;
}
