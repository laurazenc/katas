import { GetOrderService } from "../../../../src/Contexts/drink-maker/application/GetOrderService.ts";
import { NotEnoughMoneyError } from "../../../../src/Contexts/drink-maker/domain/Drink.ts";
import { DrinkFactory } from "../../../../src/Contexts/drink-maker/domain/DrinkFactory.ts";
import { DrinkEnum } from "../../../../src/Contexts/drink-maker/domain/DrinkType.ts";
import { Money } from "../../../../src/Contexts/drink-maker/domain/Money.ts";
import { Order } from "../../../../src/Contexts/drink-maker/domain/Order.ts";
import { EmailNotifierService } from "../../../../src/Contexts/drink-maker/infrastructure/EmailNotifierService.ts";
import { InMemoryInventoryManagerRepository } from "../../../../src/Contexts/drink-maker/infrastructure/InMemoryInventoryManagerRepository.ts";
import { OrderPrinter } from "../../../../src/Contexts/drink-maker/infrastructure/OrderPrinter.ts";
import { QuantityChecker } from "../../../../src/Contexts/drink-maker/infrastructure/QuantityChecker.ts";

const makeDrinkFactory = new DrinkFactory();
const orderPrinter = new OrderPrinter();
const inventoryManger = new InMemoryInventoryManagerRepository();
const emailNotifier = new EmailNotifierService();
const beverageChecker = new QuantityChecker(emailNotifier);
const getOrderService = new GetOrderService(
	makeDrinkFactory,
	orderPrinter,
	inventoryManger,
	beverageChecker,
);

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

	describe("I want to be able to buy a orange juice for 0,6 euro", () => {
		it("should be allow to buy an orange juice", () => {
			const payWith = new Money(0.6);
			const order = new Order(DrinkEnum.ORANGE_JUICE, 0, payWith);

			const result = getOrderService.execute(order);
			expect(result).toEqual("O::");
		});
	});

	describe("I want to be able to have my coffee, chocolate or tea extra hot", () => {
		it.each([DrinkEnum.TEA, DrinkEnum.COFFEE, DrinkEnum.CHOCOLATE])(
			"should allow to heat %s drink",
			(type: DrinkEnum) => {
				const payWith = new Money(0.6);
				const order = new Order(type, 0, payWith, true);

				const result = getOrderService.execute(order);

				expect(result).toEqual(`${type}h::`);
			},
		);
	});
	describe("When I order a drink and it can be delivered because of a shortage, I want to see a message to the coffee machine console that indicates me the shortage and that a notification has been sent", () => {
		it("should notify to get refilled", () => {
			const order = new Order(DrinkEnum.MILK, 0, new Money(0));
			const result = getOrderService.execute(order);
			expect(result).toEqual("M:There is a shortage on M");
		});
	});
});
