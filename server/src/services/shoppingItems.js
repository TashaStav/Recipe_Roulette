import { pool } from "../database.js";

export const shoppingItemsService = {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM shopping_items ORDER BY id",
    );

    return result.rows;
  },

  async create(recipeId, ingredient) {
    const result = await pool.query(
      `
        INSERT INTO shopping_items (recipe_id, ingredient)
        VALUES ($1, $2)
        RETURNING *
      `,
      [recipeId, ingredient],
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM shopping_items WHERE id = $1 RETURNING *",
      [id],
    );

    return result.rows[0];
  },
};