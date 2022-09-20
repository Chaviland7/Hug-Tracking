import {Router} from "express";
import {getRepository} from "typeorm";

import {AbuseType} from "../entity/enum/AbuseType";
import {AttendeeType} from "../entity/enum/AttendeeType";
import {CounselingType} from "../entity/enum/CounselingType";
import {CourtAction} from "../entity/enum/CourtAction";
import {CourtType} from "../entity/enum/CourtType";
import {InteractionMedium} from "../entity/enum/InteractionMedium";
import {Partner} from "../entity/enum/Partner";
import {Province} from "../entity/enum/Province";
import {TipType} from "../entity/enum/TipType";
import { asyncHandler} from "./helpers";

// only one router needed for all enums because they only have GET endpoints
export const enumsRouter = Router();

enumsRouter.get(
	'/abuse_type',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(AbuseType).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/attendee_type',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(AttendeeType).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/counseling_type',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(CounselingType).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/court_action',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(CourtAction).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/court_type',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(CourtType).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/interaction_medium',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(InteractionMedium).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/partner',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(Partner).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/province',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(Province).createQueryBuilder().getMany()))
);

enumsRouter.get(
	'/tip_type',
	asyncHandler(async (req, res: any, next) => res.send(await getRepository(TipType).createQueryBuilder().getMany()))
);
