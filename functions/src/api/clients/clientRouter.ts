import { Router } from 'express';


import { getAllClients } from './clientControllers';
import { asyncHandler } from '../helpers';

export const clientRouter = Router();

clientRouter.get(
	'/',
	asyncHandler(getAllClients)
);