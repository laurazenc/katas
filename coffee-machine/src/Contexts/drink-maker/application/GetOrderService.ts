import { DrinkFactory } from "../domain/DrinkFactory.ts";
import { Order } from "../domain/Order.ts";

export class GetOrderService {
	constructor(private readonly drinkFactory: DrinkFactory) {}

	execute(order: Order) {
		try {
			const drink = this.drinkFactory.create(order.type);

			drink.validateCost(order.money);

			if (order.sugar > 0) {
				drink.addSugar(order.sugar);
			}

			return `${drink.getType()}:${drink.getSugar()}:${drink.getStick()}`;
		} catch (e) {
			return `M:${(e as unknown as Error).message}`;
		}
	}
}
