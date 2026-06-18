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
    admin: {type: DataTypes.BOOLEAN, defaultValue: false},
    superAdmin: {type: DataTypes.BOOLEAN, defaultValue: false}
  },
  {
    timestamps: false,
  },
);
