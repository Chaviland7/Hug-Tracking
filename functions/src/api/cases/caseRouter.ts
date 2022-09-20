import { Router } from 'express';

import { createCaseSchema } from '../schemas';
import { createCase, getAllCases } from './caseControllers';
import { asyncHandler, validate } from '../helpers';
import { createClients } from '../clients/clientControllers';
import { createPerpetrators } from '../perpetrators/perpetratorControllers';

export const caseRouter = Router();

caseRouter.get(
  '/',
  asyncHandler(getAllCases)
)

caseRouter.post(
	'/',
	validate(createCaseSchema),
  asyncHandler(createClients),
  asyncHandler(createPerpetrators),
	asyncHandler(createCase),
  (req, res, next) => { res.status(200).json(res.locals.newCase) }
);