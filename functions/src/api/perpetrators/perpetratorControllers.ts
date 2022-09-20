import { getRepository } from 'typeorm';

import { Perpetrator } from '../../entity/Perpetrator';
import { getCountriesById } from '../helpers';

export const createPerpetrators = async (req, res, next) => {
  res.locals.perpetrators = [];
  
  const repo = getRepository(Perpetrator);
  
  if (req.body.known_perpetrators) {
    const existingPerpetrators = await repo.findByIds(req.body.known_perpetrators);
    res.locals.perpetrators.push(...existingPerpetrators);
  }
  
  if (req.body.new_perpetrators) {
    for (const perp of req.body.new_perpetrators) {
      const newPerp = new Perpetrator();
      newPerp.first_name = perp.first_name;
      newPerp.last_name = perp.last_name;
      newPerp.date_of_birth = perp.date_of_birth;
      newPerp.gender = perp.gender;
      newPerp.nationalities = await getCountriesById(perp.nationalities);
      // TODO
      // newPerp.client_id = perp.client_id

      const savedPerpetrator = await repo.save(newPerp);
      
      res.locals.perpetrators.push(savedPerpetrator);
    }
  }
  
  next();
};

export const getAllPerpetrators = async (req, res, next) => {
  res.send(
    await getRepository(Perpetrator).find({
      relations: [
        "nationalities"
      ]
    })
    );
};