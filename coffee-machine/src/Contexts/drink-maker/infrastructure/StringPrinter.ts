import { Printer } from "../domain/Printer.ts";

export class StringPrinter implements Printer {
	print(message: string): string {
		return message;
	}
}
