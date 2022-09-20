import { Router } from 'express';


import { getAllPerpetrators } from './perpetratorControllers';
import { asyncHandler } from '../helpers';

export const perpetratorRouter = Router();

perpetratorRouter.get(
	'/',
	asyncHandler(getAllPerpetrators)
);