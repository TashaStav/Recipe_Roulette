import { recipesService } from "../services/recipes.js";
import { success, error } from "../utils/response.js";

export const recipesController = {
  async getAll(req, res) {
    const { cuisine, maxTime } = req.query;

    const recipes = await recipesService.findAll(cuisine, maxTime);

    res.json(success(recipes));
  },

  async getRandom(req, res) {
    const recipe = await recipesService.findRandom();

    res.json(success(recipe));
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
