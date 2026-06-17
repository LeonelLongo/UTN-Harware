import { Users } from "../Models/users.js";

export const getAllUsers = async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
};

export const findUsers = async (req, res) => {
  const { userId } = req.params;
  const user = await Users.findByPk(userId);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const createUsers = async (req, res) => {
  const { firstName, lastName, userName, mailAdress, password } = req.body;
  if (!firstName || !lastName || !userName || !mailAdress || !password)
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  const user = await Users.create({
    firstName,
    lastName,
    userName,
    mailAdress,
    password,
  });
  res.status(201).json(user);
};

export const updateUsers = async (req, res) => {
  const { userId } = req.params;
  const user = await Users.findByPk(userId);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  await user.update(req.body);
  res.json(user);
};

export const deleteUsers = async (req, res) => {
  const { userId } = req.params;
  await Users.destroy({ where: { userId } });
  res.json({ message: `Usuario ${userId} eliminado` });
};
