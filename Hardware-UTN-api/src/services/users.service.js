import { Users } from "../Models/users.js";

export const getAllUsers = async () => {
  return await Users.findAll();
};

export const findUsers = async (userId) => {
  return await Users.findByPk(userId);
};

export const createUsers = async (
  firstName,
  lastName,
  userName,
  mailAdress,
  password,
) => {
  return await Users.create({
    firstName,
    lastName,
    userName,
    mailAdress,
    password,
  });
};

export const updateUsers = async (userId, data) => {
  await Users.update(data, { where: { userId } });
  return await Users.findByPk(userId);
};

export const deleteUsers = async (userId) => {
  return await Users.destroy({ where: { userId } });
};
