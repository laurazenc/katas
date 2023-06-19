import { ConsoleReportGeneratorRepository } from "../../../../src/Contexts/drink-maker/infrastructure/ConsoleReportGeneratorRepository.ts";
import { InMemoryInventoryManagerRepository } from "../../../../src/Contexts/drink-maker/infrastructure/InMemoryInventoryManagerRepository.ts";
import { TestData } from "../../../TestData.ts";

const inventoryManager = new InMemoryInventoryManagerRepository();
const reportGenerator = new ConsoleReportGeneratorRepository(inventoryManager);

describe("GetDailyReport", () => {
	const formattedDate = "2023-05-02";
	const fakeDate = new Date(formattedDate);

	describe("I want to be able to print a report anytime that contains: how many of each drink was sold and the total amount of money earned so far.", () => {
		inventoryManager.registerSale(fakeDate, TestData.aTeaDrink());
		inventoryManager.registerSale(fakeDate, TestData.aTeaDrink());
		inventoryManager.registerSale(fakeDate, TestData.aChocolateDrink());
		inventoryManager.registerSale(fakeDate, TestData.aCoffeeDrink());
		inventoryManager.registerSale(fakeDate, TestData.aCoffeeDrink());
		inventoryManager.registerSale(fakeDate, TestData.aCoffeeDrink());

		it("should generate the daily report", () => {
			const spy = jest.spyOn(console, "log");
			reportGenerator.generate(formattedDate);

			expect(spy).toHaveBeenCalledWith(expect.stringContaining("Sales on 2023-05-02:\n"));
		});
	});
});
