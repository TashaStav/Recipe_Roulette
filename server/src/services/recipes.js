import { pool } from "../database.js";

export const recipesService = {
  async findAll() {
    const result = await pool.query("SELECT * FROM recipes ORDER BY id");

    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);

    return result.rows[0];
  },
};
