import { recipesService } from "../services/recipes.js";
import { success, error } from "../utils/response.js";

export const recipesController = {
  async getAll(req, res) {
    const recipes = await recipesService.findAll();

    res.json(success(recipes));
  },

  async getById(req, res) {
    const id = parseInt(req.params.id);

    const recipe = await recipesService.findById(id);

    if (!recipe) {
      return res.status(404).json(error("Recipe not found", 404));
    }

    res.json(success(recipe));
  },
};
