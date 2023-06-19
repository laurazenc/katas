import { Drink } from "../domain/Drink.ts";
import { InventoryManagerRepository } from "../domain/InventoryManagerRepository.ts";

type SalesMap = Map<string, Drink[]>;
export class InMemoryInventoryManagerRepository implements InventoryManagerRepository {
	inventory: SalesMap;

	constructor() {
		this.inventory = new Map();
	}

	public registerSale(date: Date, drink: Drink): void {
		const formattedDate = date.toISOString().split("T")[0];

		if (!this.inventory.has(formattedDate)) {
			this.inventory.set(formattedDate, [drink]);
		}

		const currentItemData = this.inventory.get(formattedDate);

		this.inventory.set(formattedDate, [...(currentItemData || []), drink]);
	}

	public getSales(date: string): Drink[] {
		const salesByDate: Drink[] = [];

		this.inventory.forEach((value, key) => {
			if (key === date) {
				value.forEach((drink) => {
					salesByDate.push(drink);
				});
			}
		});

		return salesByDate;
	}
}
