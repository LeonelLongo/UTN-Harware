import { Purchase } from "../Models/purchase.js";
import { Users } from "../Models/users.js";

export const getAllPurchase = async (req, res) => {
  const purchases = await Purchase.findAll({ include: Users });
  res.json(purchases);
};

export const getPurchaseByUser = async (req, res) => {
  const { userId } = req.params;
  const purchases = await Purchase.findAll({
    where: { userId },
    include: Users,
  });
  res.json(purchases);
};

export const getPurchaseById = async (req, res) => {
  const { purchaseId } = req.params;
  const purchase = await Purchase.findByPk(purchaseId, { include: Users });
  if (!purchase)
    return res.status(404).json({ message: "Compra no encontrada" });
  res.json(purchase);
};

export const createPurchase = async (req, res) => {
  const { userId, product, quantity, price, purchaseDate, status } = req.body;
  if (!userId || !product || !quantity || !price)
    return res
      .status(400)
      .json({ message: "userId, product, quantity y price son requeridos" });
  const purchase = await Purchase.create({
    userId,
    product,
    quantity,
    price,
    purchaseDate,
    status,
  });
  res.status(201).json(purchase);
};

export const updateStatus = async (req, res) => {
  const { purchaseId } = req.params;
  const { status } = req.body;
  if (!status)
    return res.status(400).json({ message: "El campo status es requerido" });
  await Purchase.update({ status }, { where: { purchaseId } });
  const purchase = await Purchase.findByPk(purchaseId);
  res.json(purchase);
};

export const deletePurchase = async (req, res) => {
  const { purchaseId } = req.params;
  await Purchase.destroy({ where: { purchaseId } });
  res.json({ message: `Compra ${purchaseId} eliminada` });
};
