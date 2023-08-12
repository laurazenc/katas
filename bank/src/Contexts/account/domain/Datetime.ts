import { format, parse } from "date-fns";

export enum Dateformat {
	DEFAULT_FORMAT = "dd/MM/yyyy",
	ENTRY_FORMAT = "dd-MM-yyyy",
}

class Datetime {
	private readonly _dateInstance: Date;

	constructor(dateInstance: Date | string | number = new Date()) {
		this._dateInstance = new Date(dateInstance);
	}

	static fromDateString(value: string, format: string = Dateformat.DEFAULT_FORMAT) {
		return parse(value, format, new Date());
	}

	getDate() {
		return format(this._dateInstance, Dateformat.DEFAULT_FORMAT);
	}
}

export default Datetime;
