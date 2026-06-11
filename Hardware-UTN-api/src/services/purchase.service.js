import { Purchase } from "../Models/purchase";
import { Users } from "../Models/users";

export const getAllPurchase = async () => {
  return await Purchase.findAll({ include: Users });
};

export const getPurchaseByUser = async (userId) => {
  return await Purchase.findAll({ where: { userId }, include: Users });
};

export const getPurchaseById = async (purchaseId) => {
  return await Purchase.findByPk(purchaseId, { include: Users });
};

export const updateStatus = async (purchaseId, status) => {
  await Purchase.update({ status }, { where: { purchaseId } });
  return await Purchase.findByPk(purchaseId);
};

export const createPurchase = async (
  userId,
  product,
  quantity,
  price,
  purchaseDate,
  status,
) => {
  return await Purchase.create({
    userId,
    product,
    quantity,
    price,
    purchaseDate,
    status,
  });
};

export const deletePurchase = async (purchaseId) => {
  return await Purchase.destroy({ where: { purchaseId } });
};
