import { shoppingItemsService } from "../services/shoppingItems.js";
import { success, error } from "../utils/response.js";

export const shoppingItemsController = {
  async getAll(req, res) {
    const items = await shoppingItemsService.findAll();

    res.json(success(items));
  },

  async create(req, res) {
    const { recipeId, ingredient } = req.body;

    if (!recipeId || !ingredient) {
      return res.status(400).json(error("recipeId and ingredient are required", 400));
    }

    const item = await shoppingItemsService.create(recipeId, ingredient);

    res.status(201).json(success(item));
  },

  async delete(req, res) {
    const id = parseInt(req.params.id);

    const item = await shoppingItemsService.delete(id);

    if (!item) {
      return res.status(404).json(error("Shopping item not found", 404));
    }

    res.json(success(item));
  },
};