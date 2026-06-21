import { Users } from "../Models/users.js";

export const getAllUsers = async (req, res) => {
  const { email } = req.query;
  const where = email ? { mailAdress: email } : {};
  const users = await Users.findAll({ where });
  res.json(users);
};

export const findUsers = async (req, res) => {
  const { userId } = req.params;
  const user = await Users.findByPk(userId);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const createUsers = async (req, res) => {
  const { firstName, lastName, userName, mailAdress, password, rol } = req.body;
  if (!firstName || !lastName || !userName || !mailAdress || !password)
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  const user = await Users.create({
    firstName,
    lastName,
    userName,
    mailAdress,
    password,
    ...(rol && { rol }),
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

export const loginUser = async (req, res) => {
  const { mailAdress, password } = req.body;
  if (!mailAdress || !password)
    return res.status(400).json({ message: "Email y contraseña son requeridos" });

  const user = await Users.findOne({ where: { mailAdress } });
  if (!user)
    return res.status(404).json({ message: "El email no está registrado" });

  if (user.password !== password)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  const { password: _, ...userData } = user.toJSON();
  res.json(userData);
};
