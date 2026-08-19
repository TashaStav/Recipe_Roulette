import { recipesService } from '../services/recipes.js';
import { success, error } from '../utils/response.js';

export const recipesController = {
  getAll(req, res) {
    const recipes = recipesService.findAll();

    res.json(success(recipes));
  },

  getById(req, res) {
    const id = parseInt(req.params.id);

    const recipe = recipesService.findById(id);

    if (!recipe) {
      return res.status(404).json(error('Recipe not found', 404));
    }

    res.json(success(recipe));
  },
};