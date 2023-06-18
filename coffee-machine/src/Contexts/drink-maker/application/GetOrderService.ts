import { DrinkFactory } from "../domain/DrinkFactory.ts";
import { Order } from "../domain/Order.ts";
import { Printer } from "../domain/Printer.ts";

export class GetOrderService {
	constructor(private readonly drinkFactory: DrinkFactory, private readonly printer: Printer) {}

	execute(order: Order) {
		try {
			const drink = this.drinkFactory.create(order.type);

			drink.validateCost(order.money);

			if (order.sugar > 0) {
				drink.addSugar(order.sugar);
			}

			if (order.extraHot) {
				drink.heat();
			}

			return this.printer.print(`${drink.getType()}:${drink.getSugar()}:${drink.getStick()}`);
		} catch (e) {
			return this.printer.print(`M:${(e as unknown as Error).message}`);
		}
	}
}
