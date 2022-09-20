import { getRepository } from "typeorm";

import { Case } from '../../entity/Case';
import { Staff } from "../../entity/Staff";
import { Partner } from "../../entity/enum/Partner";
import { AbuseType } from "../../entity/enum/AbuseType";

export const createCase = async (req, res, next) => {  
  const repo = getRepository(Case);
  
  const newCase = new Case();
  
  newCase.province = req.body.province;
  newCase.rescue_date = req.body.rescue_date;
  newCase.months_of_abuse = req.body.months_of_abuse;
  newCase.tip_type = req.body.tip_type;
  newCase.reported_by_client = req.body.reported_by_client;
  
  newCase.clients = res.locals.clients;
  newCase.perpetrators = res.locals.perpetrators;
  
  const staff = await getRepository(Staff).findByIds(req.body.staff);
  newCase.staff = staff;
  
  const partners = await getRepository(Partner).findByIds(req.body.partners);
  newCase.partners = partners;
  
  const abuseTypes = await getRepository(AbuseType).findByIds(req.body.abuse_types);
  newCase.abuse_types = abuseTypes;

  await repo.save(newCase);

  res.locals.newCase = newCase;
  
  next();
    
};

export const getAllCases = async (req, res, next) => {
    res.send(
      await getRepository(Case).find({
        relations: [
          "clients",
          "perpetrators",
          "province",
          "abuse_types",
          "staff",
          "partners",
          "court_cases"
        ]
      })
      );
};