export interface ReportGeneratorRepository {
	generate(date: string): void;
}
