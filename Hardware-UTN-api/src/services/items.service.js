import { Item } from "../Models/items.js";

export const findAllItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

export const findItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findOne({ where: { id: id } });

  if (!item) return res.status(404).send({ message: "Item not found" });
  res.json(item);
};

export const createItem = async (req, res) => {
  const {
    title,
    model,
    rating,
    value,
    summary,
    imageUrl,
    available,
    category,
    subCategory,
    stock,
    isOffer,
    specs,
  } = req.body;

  if (!title) {
    return res.status(400).send({ message: "Title field is required" });
  }

  if (value !== undefined && Number(value) < 0) {
    return res.status(400).send({ message: "El precio no puede ser negativo." });
  }

  const newItem = await Item.create({
    title,
    model,
    rating,
    value,
    summary,
    imageUrl,
    available,
    category,
    subCategory,
    stock,
    isOffer,
    specs,
  });
  res.json(newItem);
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) return res.status(404).send({ message: "Item not found" });

  if (req.body.value !== undefined && Number(req.body.value) < 0) {
    return res.status(400).send({ message: "El precio no puede ser negativo." });
  }

  const allowed = ["title", "model", "value", "summary", "imageUrl", "available", "category", "subCategory", "stock", "isOffer", "specs"];
  const updateData = {};
  for (const field of allowed) {
    if (req.body[field] !== undefined) updateData[field] = req.body[field];
  }

  await item.update(updateData);
  res.json(item);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) return res.status(404).send({ message: "Item no existente" });

  await item.destroy();

  res.send(`Borrando item con id: ${id}`);
};
