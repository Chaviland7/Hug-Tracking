import {getConnection, getRepository} from "typeorm";

import {Staff} from "../../entity/Staff";

export const createStaff = async (req, res, next) => {
  res.locals.created_staff = (
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Staff)
        .values([req.body])
        .execute()
  ).identifiers.map((i: any) => i.id);
  next();
};

export const getAllStaff = async (req, res: any, next) => {
  res.send(await getRepository(Staff).createQueryBuilder().getMany());
};

export const getStaffByIds = async (req, res, next) => {
  res.locals.staff = await getRepository(Staff).findByIds(req.params.staff);
};

export const updateStaffById = async (req, res, next) => {
  res.send(await getRepository(Staff).findOneOrFail(req.params.id));
};

export const deleteStaffById = async (req, res, next) => {
  await getRepository(Staff).delete(req.params.id);
  res.sendStatus(204);
}
