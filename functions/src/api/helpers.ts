import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Country } from '../entity/enum/country';
import { HttpError, HugError } from '../errors';

/**
 * This is a helper function that allows the use of async/await/throw in Express
 * middleware and route handlers, while also catching any uncaught exceptions
 * and forwarding them to the global error handler registered in Express.
 * https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
 * @param middleware The middleware or route handler using async/await
 */
export const asyncHandler = (
	middleware: (
		...params: [Request, Response, NextFunction, ...any[]]
	) => Promise<any>
) => (...params: [Request, Response, NextFunction, ...any[]]) => {
	Promise.resolve(middleware(...params)).catch(params[2]);
};

export const validate = (validationSchema: any) => (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const body = req.body;

	const { error, value } = validationSchema.validate(body);

	if (error) {
    console.log(error.details)
    const invalidInput = new HugError(error.details);
		throw new HttpError(422, invalidInput);
	}

	req.body = value;
	next();
};

export const getCountriesById = async (ids: string[]) => {
	return await getRepository(Country).findByIds(ids);
}