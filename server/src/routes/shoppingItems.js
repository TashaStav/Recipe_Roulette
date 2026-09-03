import { Router } from "express";

import { shoppingItemsController } from "../controllers/shoppingItems.js";

const router = Router();

router.get("/", shoppingItemsController.getAll);

router.post("/", shoppingItemsController.create);

router.delete("/:id", shoppingItemsController.delete);

export default router;
