import { MakeDrinkService } from "../../../../src/Contexts/drink-maker/application/MakeDrinkService.ts";
import { DrinkEnum } from "../../../../src/Contexts/drink-maker/domain/DrinkType.ts";
import { Order } from "../../../../src/Contexts/drink-maker/domain/Order.ts";

describe("MakeDrinkService", () => {
	describe("Given a customer orders", () => {
		it("should handle a tea order with 1 sugar", () => {
			const order = new Order(DrinkEnum.TEA, 1);
			const makeDrink = new MakeDrinkService().execute(order);
			expect(makeDrink).toEqual("T:1:0");
		});
		it("should handle a chocolate order without sugar", () => {
			const order = new Order(DrinkEnum.CHOCOLATE, 0);
			const makeDrink = new MakeDrinkService().execute(order);
			expect(makeDrink).toEqual("H::");
		});
		it("should handle a coffee order", () => {
			const order = new Order(DrinkEnum.COFFEE, 2);
			const makeDrink = new MakeDrinkService().execute(order);
			expect(makeDrink).toEqual("C:2:0");
		});
	});
});
