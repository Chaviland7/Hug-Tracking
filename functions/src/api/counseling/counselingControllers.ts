import { getRepository } from "typeorm";

import { Counseling } from '../../entity/Counseling';
import { Staff } from "../../entity/Staff";
import { CounselingType } from "../../entity/enum/CounselingType";
import { InteractionMedium } from "../../entity/enum/InteractionMedium";

export const createCounselingSession = async (req, res, next) => {
  const repo = getRepository(Counseling);
  
  const newSesh = new Counseling();
  
  newSesh.date = req.body.date;
  newSesh.minutes = req.body.minutes;
  
  newSesh.clients = res.locals.clients;
  
  const staff = await getRepository(Staff).findByIds(req.body.staff);
  newSesh.staff = staff;
  
  const medium = await getRepository(InteractionMedium).findOneOrFail(req.body.medium);
  newSesh.medium = medium;
  
  const type = await getRepository(CounselingType).findOneOrFail(req.body.type);
  newSesh.type = type;

  await repo.save(newSesh);
  
  next();
    
};

export const getAllCounselingSessions = async (req, res, next) => {
    res.send(await getRepository(Counseling).createQueryBuilder().getMany());
};