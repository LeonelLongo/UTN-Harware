import express from "express";
import { PORT } from "./config.js";
import itemRoutes from "./routes/items.routes.js";
import { sequelize } from "./Database/db.js";
import "./Models/items.js";

const app = express();

try {
  app.listen(PORT);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
  })
  app.use(itemRoutes);
  await sequelize.sync();
  console.log(`Server listening in port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
