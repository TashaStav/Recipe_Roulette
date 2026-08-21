import dotenv from 'dotenv';
import { pool } from './database.js';

dotenv.config();

async function importRecipes() {
  try {
    const response = await fetch(
      'https://dummyjson.com/recipes?limit=50'
    );

    if (!response.ok) {
      throw new Error('Failed to load recipes');
    }

    const data = await response.json();

    for (const recipe of data.recipes) {
      const query = `
        INSERT INTO recipes (
          id,
          name,
          ingredients,
          instructions,
          prep_time_minutes,
          cook_time_minutes,
          servings,
          difficulty,
          cuisine,
          image,
          tags,
          meal_type
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12
        )
        ON CONFLICT (id) DO NOTHING
      `;

      const values = [
        recipe.id,
        recipe.name,
        recipe.ingredients,
        recipe.instructions,
        recipe.prepTimeMinutes,
        recipe.cookTimeMinutes,
        recipe.servings,
        recipe.difficulty,
        recipe.cuisine,
        recipe.image,
        recipe.tags,
        recipe.mealType,
      ];

      await pool.query(query, values);
    }

    console.log(`Imported ${data.recipes.length} recipes`);
  } catch (error) {
    console.error('Import failed:', error.message);
  } finally {
    await pool.end();
  }
}

importRecipes();