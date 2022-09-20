import { Router } from 'express';

import { createCounselingSchema } from '../schemas';
import { createCounselingSession, getAllCounselingSessions } from './courtCasesControllers';
import { asyncHandler, validate } from '../helpers';
import { createClients } from '../clients/clientControllers';

export const counselingRouter = Router();

counselingRouter.get(
  '/',
  asyncHandler(getAllCounselingSessions)
)

counselingRouter.post(
	'/',
	validate(createCounselingSchema),
  asyncHandler(createClients),
	asyncHandler(createCounselingSession),
  (req, res, next) => { res.sendStatus(201) }
);