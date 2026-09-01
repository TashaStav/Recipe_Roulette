import { describe, test, expect } from "@jest/globals";
import { recipesService } from "./recipes.js";

describe("recipes service", () => {
  test("findById returns recipe", async () => {
    const recipe = await recipesService.findById(1);

    expect(recipe).toBeDefined();
    expect(recipe.id).toBe(1);
    expect(recipe).toHaveProperty("name");
    expect(recipe).toHaveProperty("ingredients");
  });

  test("findRandom returns recipe", async () => {
    const recipe = await recipesService.findRandom();

    expect(recipe).toBeDefined();
    expect(recipe).toHaveProperty("id");
    expect(recipe).toHaveProperty("name");
  });

  test("findAll returns recipes", async () => {
    const recipes = await recipesService.findAll();

    expect(Array.isArray(recipes)).toBe(true);
    expect(recipes.length).toBeGreaterThan(0);
  });
});
