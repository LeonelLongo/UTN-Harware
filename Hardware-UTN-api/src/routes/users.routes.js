import { Router } from "express";
import {
  getAllUsers,
  findUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  loginUser,
} from "../services/users.service.js";

const router = Router();

router.get("/users", getAllUsers);

router.post("/users/login", loginUser);

router.get("/users/:userId", findUsers);

router.post("/users", createUsers);

router.put("/users/:userId", updateUsers);

router.delete("/users/:userId", deleteUsers);

export default router;
