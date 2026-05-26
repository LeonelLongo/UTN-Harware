import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Item = sequelize.define("item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER },
  value: { type: DataTypes.FLOAT },
  summary: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING },
  available: { type: DataTypes.BOOLEAN, defaultValue: false },
});
