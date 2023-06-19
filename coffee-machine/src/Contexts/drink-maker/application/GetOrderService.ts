import { BeverageQuantityChecker } from "../domain/BeverageQuantityChecker.ts";
import { DrinkFactory } from "../domain/DrinkFactory.ts";
import { InventoryManagerRepository } from "../domain/InventoryManagerRepository.ts";
import { Order } from "../domain/Order.ts";
import { Printer } from "../domain/Printer.ts";

export class GetOrderService {
	constructor(
		private readonly drinkFactory: DrinkFactory,
		private readonly printer: Printer,
		private readonly inventoryManager: InventoryManagerRepository,
		private readonly beverageChecker: BeverageQuantityChecker,
	) {}

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

			this.inventoryManager.registerSale(new Date(), drink);
			if (this.beverageChecker.isEmpty(drink.type.value)) {
				return this.printer.print(`M:There is a shortage on ${order.type.value}`);
			}

			return this.printer.print(`${drink.getType()}:${drink.getSugar()}:${drink.getStick()}`);
		} catch (e) {
			return this.printer.print(`M:${(e as unknown as Error).message}`);
		}
	}
}
