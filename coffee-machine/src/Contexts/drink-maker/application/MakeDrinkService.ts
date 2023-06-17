import { Drink } from "../domain/Drink.ts";
import { Order } from "../domain/Order.ts";

export class MakeDrinkService {
	execute(order: Order) {
		const drink = new Drink(order.type);

		if (order.sugar > 0) {
			drink.addSugar(order.sugar);
		}

		return `${drink.getType()}:${drink.getSugar()}:${drink.getStick()}`;
	}
}
