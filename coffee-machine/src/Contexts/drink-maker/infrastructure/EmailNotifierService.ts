import { DrinkEnum } from "../domain/DrinkType.ts";
import { EmailNotifier } from "../domain/EmailNotifier.ts";

export class EmailNotifierService implements EmailNotifier {
	public notifyMissingDrink(drink: DrinkEnum): void {
		console.error(`Email sent for shortage on ${drink}`);
	}
}
