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
  const { userId, items, price, purchaseDate, status } = req.body;
  if (!userId || !items || !price)
    return res
      .status(400)
      .json({ message: "userId, items y price son requeridos" });
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const purchase = await Purchase.create({
    userId,
    items: JSON.stringify(items),
    quantity: totalQuantity,
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
  const purchase = await Purchase.findByPk(purchaseId);
  if (!purchase)
    return res.status(404).json({ message: "Compra no encontrada" });
  if (purchase.status === "CANCELED")
    return res.status(400).json({ message: "No se puede modificar una compra cancelada" });
  await purchase.update({ status });
  res.json(purchase);
};

export const deletePurchase = async (req, res) => {
  const { purchaseId } = req.params;
  await Purchase.destroy({ where: { purchaseId } });
  res.json({ message: `Compra ${purchaseId} eliminada` });
};
