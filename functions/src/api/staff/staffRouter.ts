import {Router} from "express";

import {validate, asyncHandler} from "../helpers";
import {createStaffSchema} from "../schemas";
import {
  createStaff,
  getAllStaff,
  getStaffByIds,
  deleteStaffById,
  updateStaffById,
} from "./staffControllers";

export const staffRouter = Router();

staffRouter.post(
	'/',
  validate(createStaffSchema),
	asyncHandler(createStaff),
  (req, res, next) => { res.send(201) }
);

staffRouter.get(
  '/',
  asyncHandler(getAllStaff)
)

staffRouter.get(
  '/:id',
  asyncHandler(getStaffByIds),
  (req, res, next) => { res.json(res.locals.staff) }
)

staffRouter.put(
  '/:id',
  asyncHandler(updateStaffById)
)

staffRouter.delete(
  '/:id',
  asyncHandler(deleteStaffById)
)