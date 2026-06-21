import express from "express";
import { PORT } from "./config.js";
import itemRoutes from "./routes/items.routes.js";
import userRoutes from "./routes/users.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import { sequelize } from "./Database/db.js";
import "./Models/items.js";
import { Users } from "./Models/users.js";
import "./Models/purchase.js";

const app = express();

try {
  app.listen(PORT);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  app.use(itemRoutes);
  app.use(userRoutes);
  app.use(purchaseRoutes);
  await sequelize.sync();

  const superAdminExists = await Users.findOne({ where: { mailAdress: "admin@hardware-utn.com" } });
  if (!superAdminExists) {
    await Users.create({
      firstName: "Super",
      lastName: "Admin",
      userName: "superadmin",
      mailAdress: "admin@hardware-utn.com",
      password: "admin1234",
      rol: "superAdmin",
    });
    console.log("SuperAdmin creado → admin@hardware-utn.com / admin1234");
  }

  console.log(`Server listening in port ${PORT}`);
} catch (error) {
  console.error(`Error on initialization:`, error);
}
