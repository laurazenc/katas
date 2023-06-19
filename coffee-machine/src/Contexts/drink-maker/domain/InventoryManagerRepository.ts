import { Drink } from "./Drink.ts";

export interface InventoryManagerRepository {
	registerSale(date: Date, drink: Drink): void;
	getSales(date: string): Drink[];
}
