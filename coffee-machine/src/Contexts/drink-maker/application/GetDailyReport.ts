import { ReportGeneratorRepository } from "../domain/ReportGeneratorRepository.ts";

export class GetDailyReport {
	constructor(private readonly reportGeneratorRepository: ReportGeneratorRepository) {}

	execute(date: Date) {
		this.reportGeneratorRepository.generate(date);
	}
}
