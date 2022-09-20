import { STATUS_CODES } from "http";

export class HugError extends Error {
	constructor(public details: any) {
		super();
	}
}

export class HttpError extends Error {
	constructor(public statusCode: number, public internal?: HugError) {
		super(STATUS_CODES[statusCode]);
	}
}
