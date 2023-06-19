import { Printer } from "../domain/Printer.ts";

export class OrderPrinter implements Printer {
	print(message: string): string {
		return message;
	}
}
