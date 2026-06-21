import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Users = sequelize.define(
  "users",
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, unique: true, allowNull: false },
    mailAdress: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: {type: DataTypes.ENUM('user', 'admin', 'superAdmin'), defaultValue:'user', allowNull: false}
  },
  {
    timestamps: false,
  },
);
