import * as Joi from 'joi';

import { Genders, Languages } from '../entity/enum/enums';

const foreignKey = Joi.number().integer().min(0);

export const createStaffSchema = Joi.object({
  first_name: Joi.string().required().label("First Name"),
  last_name: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  gender: Joi.string().valid(...Object.values(Genders)).required().label("Gender"),
  language: Joi.string().valid(...Object.values(Languages)).required().label("Preferred Language"),
  nationalities: Joi.array().items(foreignKey).required().label("Nationalities"),
});

export const createClientSchema = Joi.object({
  first_name: Joi.string().required().label("First Name"),
  last_name: Joi.string().required().label("Last Name"),
  date_of_birth: Joi.date().less('now').required().label("Birthdate"),
  gender: Joi.string().valid(...Object.values(Genders)).required().label("Gender"),
  nationalities: Joi.array().items(foreignKey).required().label("Nationalities"),
})

export const createPerpetratorSchema = Joi.object({
  first_name: Joi.string().required().label("First Name"),
  last_name: Joi.string().required().label("Last Name"),
  date_of_birth: Joi.date().less('now').required().label("Birthdate"),
  gender: Joi.string().valid(...Object.values(Genders)).required().label("Gender"),
  nationalities: Joi.array().items(foreignKey).required().label("Nationalities"),
  clientId: foreignKey.label("Client ID")
});

export const createPartnerSchema = Joi.object({
  name: Joi.string().required().label("Partner Name"),
  country: Joi.string().required().label("Partner Country")
});

export const createGrantSchema = Joi.object({
  name: Joi.string().required().label("Grant Name"),
  start_date: Joi.date().required().label("Start Date"),
  end_date: Joi.date().greater(Joi.ref('start_date')).required().label("End Date"),
  granting_org: foreignKey.required().label("Granting Organization"),
  notes: Joi.string().label("Notes")
});

export const createCaseSchema = Joi.object({
  province: foreignKey.required().label("Province"),
  rescue_date: Joi.date().required().label("Date of 'rescue'"),
  months_of_abuse: Joi.number().integer().min(0).required().label("Abuse Duration (months)"),
  abuse_types: Joi.array().items(foreignKey).required().label("Type of Abuse"),
  tip_type: Joi.string().label("Tip Type"),
  reported_by_client: Joi.boolean().required().label("Reported By Client (Y/N)"),
  staff: Joi.array().items(foreignKey).min(1).label("Staff Members"),
  partners: Joi.array().items(foreignKey).label("Partners"),
  known_clients: Joi.array().items(foreignKey).min(1).label("Known Client(s)"),
  new_clients: Joi.array().items(createClientSchema).min(1).label("New Client(s)"),
  known_perpetrators: Joi.array().items(foreignKey).min(1).label("Known Perpetrator(s)"),
  new_perpetrators: Joi.array().items(createPerpetratorSchema).min(1).label("New Perpetrator(s)"),
}).or('known_clients', 'new_clients').or('known_perpetrators', 'new_perpetrators');

export const createCourtCaseSchema = Joi.object({
  case: foreignKey.required().label("Case"),
  date: Joi.date().required().label("Date"),
  court_name: Joi.string().required().label("Court Name"),
  court_type: foreignKey.required().label("Court Type"),
  actions: Joi.array().items(foreignKey).min(1).label("Action(s)"),
  result: Joi.string().label("Outcome"),
  notes: Joi.string().label("Notes")
});

export const createCounselingSchema = Joi.object({
  date: Joi.date().less('now').required().label("Date"),
  minutes: Joi.number().integer().positive().required().label("Session length (minutes)"),
  medium: foreignKey.required().label("Medium"),
  type: foreignKey.required().label("Type"),
  staff: Joi.array().items(foreignKey).min(1).label("Counsellor(s)"),
  knownClients: Joi.array().items(foreignKey).min(1).label("Known Client(s)"),
  newClients: Joi.array().items(createClientSchema).min(1).label("New Client(s)")
}).or('knownClients', 'newClients');

export const createTrainingSchema = Joi.object({
  name: Joi.string().required().label("Grant Name"),
  date: Joi.date().required().label("Date"),
  topic: Joi.string().label("Topic"),
  minutes: Joi.number().integer().positive().label("Session length (minutes)"),
  location: Joi.string().label("Location"),
  attendee_count: Joi.number().integer().required().label("Number of attendees"),
  cost: Joi.number().integer().label("Cost (baht)"),
});

export const createProjectSchema = Joi.object({
  name: Joi.string().required().label("Project Name"),
  start_date: Joi.date().required().label("Start Date"),
  end_date: Joi.date().required().label("End Date"),
  grant: foreignKey.label("Associated Grant"),
  notes: Joi.string().label("Notes"),
});
