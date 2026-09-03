import { pool } from "../database.js";

export const recipesService = {
  async findAll(cuisine, maxTime) {
    let query = "SELECT * FROM recipes WHERE 1=1";
    const values = [];

    if (cuisine) {
      values.push(cuisine);
      query += ` AND cuisine = $${values.length}`;
    }

    if (maxTime) {
      values.push(Number(maxTime));
      query += ` AND (prep_time_minutes + cook_time_minutes) <= $${values.length}`;
    }

    query += " ORDER BY id";

    const result = await pool.query(query, values);

    return result.rows;
  },
  async findRandom() {
    const result = await pool.query(
      "SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1",
    );

    return result.rows[0];
  },
  async findById(id) {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);

    return result.rows[0];
  },
};
