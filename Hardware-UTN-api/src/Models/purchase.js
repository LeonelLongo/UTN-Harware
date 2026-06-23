import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import { Users } from "./users.js";

export const Purchase = sequelize.define(
  "purchase",
  {
    purchaseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    items: { type: DataTypes.TEXT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETE", "CANCELED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: false,
  },
);

Users.hasMany(Purchase, { foreignKey: "userId" });
Purchase.belongsTo(Users, { foreignKey: "userId" });
