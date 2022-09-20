import { getRepository } from 'typeorm';

import { Client } from '../../entity/Client';
import { getCountriesById } from '../helpers';

export const createClients = async (req, res, next) => {
  res.locals.clients = [];
  
  const repo = getRepository(Client);
  
  if (req.body.known_clients) {
    const existingClients = await repo.findByIds(req.body.known_clients);
    res.locals.clients.push(...existingClients);
  }
  
  if (req.body.new_clients) {
    for (const client of req.body.new_clients) {
      const newClient = new Client();
      newClient.first_name = client.first_name;
      newClient.last_name = client.last_name;
      newClient.date_of_birth = client.date_of_birth;
      newClient.gender = client.gender;
      newClient.nationalities = await getCountriesById(client.nationalities);

      const savedClient = await repo.save(newClient);
      
      res.locals.clients.push(savedClient);
    }
  }
  
  next();
};

export const getAllClients = async (req, res, next) => {
  res.send(
    await getRepository(Client).find({
      relations: [
        "nationalities"
      ]
    })
    );
};