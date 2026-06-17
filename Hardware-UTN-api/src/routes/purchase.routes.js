import { Router } from "express";
import {
  getAllPurchase,
  getPurchaseByUser,
  getPurchaseById,
  createPurchase,
  updateStatus,
  deletePurchase,
} from "../services/purchase.service.js";

const router = Router();

router.get("/purchases", getAllPurchase);

router.get("/purchases/user/:userId", getPurchaseByUser);

router.get("/purchases/:purchaseId", getPurchaseById);

router.post("/purchases", createPurchase);

router.put("/purchases/:purchaseId", updateStatus);

router.delete("/purchases/:purchaseId", deletePurchase);
export default router;
