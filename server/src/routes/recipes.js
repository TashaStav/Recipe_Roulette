import { Router } from 'express';
import { recipesController } from '../controllers/recipes.js';

const router = Router();

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);

export default router;