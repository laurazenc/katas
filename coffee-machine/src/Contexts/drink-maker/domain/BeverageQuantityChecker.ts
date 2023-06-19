import { DrinkTypeValue } from "./DrinkType.ts";

export interface BeverageQuantityChecker {
	isEmpty(drink: DrinkTypeValue): boolean;
}
