import { InventoryManagerRepository } from "../domain/InventoryManagerRepository.ts";
import { ReportGeneratorRepository } from "../domain/ReportGeneratorRepository.ts";

export class ConsoleReportGeneratorRepository implements ReportGeneratorRepository {
	constructor(private readonly inventoryManagerRepository: InventoryManagerRepository) {}

	public generate(date: string): void {
		const sales = this.inventoryManagerRepository.getSales(date);
		const report = [`Sales on ${date}:\n`];
		sales.forEach((sale) => {
			report.push(`Drink: ${sale.getType()} - Earning: ${sale.cost.value}\n`);
		});

		console.log(report.join(""));
	}
}
