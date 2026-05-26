import { Router } from "express";
import {
  createItem,
  deleteItem,
  findAllItems,
  findItem,
  updateItem,
} from "../services/items.service.js";

const router = Router();

router.get("/items/:id", findItem);

router.get("/items", findAllItems);

router.post("/items", createItem);

router.put("/items/:id", updateItem);

router.delete("/items/:id", deleteItem);

export default router;
