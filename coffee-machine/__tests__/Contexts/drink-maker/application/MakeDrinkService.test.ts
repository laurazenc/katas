import { GetOrderService } from "../../../../src/Contexts/drink-maker/application/GetOrderService.ts";
import { NotEnoughMoneyError } from "../../../../src/Contexts/drink-maker/domain/Drink.ts";
import { DrinkFactory } from "../../../../src/Contexts/drink-maker/domain/DrinkFactory.ts";
import { DrinkEnum } from "../../../../src/Contexts/drink-maker/domain/DrinkType.ts";
import { Money } from "../../../../src/Contexts/drink-maker/domain/Money.ts";
import { Order } from "../../../../src/Contexts/drink-maker/domain/Order.ts";

const makeDrinkFactory = new DrinkFactory();
const getOrderService = new GetOrderService(makeDrinkFactory);

describe("MakeDrinkService", () => {
	describe("The drink maker should receive the correct instructions for my coffee / tea / chocolate order", () => {
		it.each([DrinkEnum.TEA, DrinkEnum.COFFEE, DrinkEnum.CHOCOLATE])(
			"should handle the right drink for a %s order",
			(type: DrinkEnum) => {
				const order = new Order(type, 0, new Money(5));
				const makeDrink = getOrderService.execute(order);
				expect(makeDrink).toEqual(`${type}::`);
			},
		);
	});
	describe("I want to be able to send instructions to the drink maker to add one or two sugars", () => {
		it.each([
			[1, DrinkEnum.TEA],
			[2, DrinkEnum.TEA],
			[1, DrinkEnum.COFFEE],
			[2, DrinkEnum.COFFEE],
			[1, DrinkEnum.CHOCOLATE],
			[2, DrinkEnum.CHOCOLATE],
		])("should include %i sugar for a %s order", (sugar: number, type: DrinkEnum) => {
			const order = new Order(type, sugar, new Money(5));
			const makeDrink = getOrderService.execute(order);
			expect(makeDrink).toEqual(`${type}:${sugar}:0`);
		});
	});

	describe("When my order contains sugar the drink maker should add a stick (touillette) with it", () => {
		it.each([
			[1, DrinkEnum.TEA],
			[2, DrinkEnum.TEA],
			[1, DrinkEnum.COFFEE],
			[2, DrinkEnum.COFFEE],
			[1, DrinkEnum.CHOCOLATE],
			[2, DrinkEnum.CHOCOLATE],
		])("should include a stick for a %s order with sugar", (sugar: number, type: DrinkEnum) => {
			const order = new Order(type, sugar, new Money(5));
			const makeDrink = getOrderService.execute(order);
			expect(makeDrink).toEqual(`${type}:${sugar}:0`);
		});
	});

	describe("The drink maker should make the drinks only if the correct amount of money is given", () => {
		describe("Given an order paid with enoughMoney", () => {
			const payWithEnoughMoney = new Money(5);
			it.each([
				[payWithEnoughMoney, DrinkEnum.TEA],
				[payWithEnoughMoney, DrinkEnum.CHOCOLATE],
				[payWithEnoughMoney, DrinkEnum.COFFEE],
			])("should be able to order a %s ", (money: Money, drink: DrinkEnum) => {
				const order = new Order(drink, 0, money);
				const makeDrink = getOrderService.execute(order);
				expect(makeDrink).toEqual(`${drink}::`);
			});
		});

		describe("Given an order paid without enoughMoney", () => {
			const payWithoutEnoughMoney = new Money(0);
			it.each([
				[payWithoutEnoughMoney, DrinkEnum.TEA],
				[payWithoutEnoughMoney, DrinkEnum.CHOCOLATE],
				[payWithoutEnoughMoney, DrinkEnum.COFFEE],
			])("should throw an error paying %s for order %s ", (money: Money, drink: DrinkEnum) => {
				const order = new Order(drink, 0, money);
				try {
					getOrderService.execute(order);
				} catch (e) {
					expect(e as NotEnoughMoneyError).toBeDefined();
				}
			});
		});
	});

	describe("If not enough money is provided, we want to send a message to the drink maker. The message should contains at least the amount of money missing.", () => {
		describe("Given an order paid without enoughMoney", () => {
			const payWithoutEnoughMoney = new Money(0);
			it.each([
				[payWithoutEnoughMoney, DrinkEnum.TEA],
				[payWithoutEnoughMoney, DrinkEnum.CHOCOLATE],
				[payWithoutEnoughMoney, DrinkEnum.COFFEE],
			])(
				"should throw an error with the missing amount from paying %s for order %s ",
				(money: Money, drink: DrinkEnum) => {
					const order = new Order(drink, 0, money);
					try {
						const result = getOrderService.execute(order);
						expect(result).toContain("M:");
					} catch (e) {
						expect((e as NotEnoughMoneyError).message).toContain("missing");
					}
				},
			);
		});
	});
});
