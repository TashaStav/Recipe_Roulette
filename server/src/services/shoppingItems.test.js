import { describe, test, expect } from "@jest/globals";
import { shoppingItemsService } from "./shoppingItems.js";

describe("shopping items service", () => {
  test("create creates shopping item", async () => {
    const item = await shoppingItemsService.create(1, "Test ingredient");

    expect(item).toBeDefined();
    expect(item).toHaveProperty("id");
    expect(item.recipe_id).toBe(1);
    expect(item.ingredient).toBe("Test ingredient");

    await shoppingItemsService.delete(item.id);
  });

  test("findAll returns shopping items", async () => {
    const items = await shoppingItemsService.findAll();

    expect(Array.isArray(items)).toBe(true);
  });

  test("delete removes shopping item", async () => {
    const item = await shoppingItemsService.create(1, "Ingredient to delete");

    const deletedItem = await shoppingItemsService.delete(item.id);

    expect(deletedItem).toBeDefined();
    expect(deletedItem.id).toBe(item.id);

    const items = await shoppingItemsService.findAll();

    expect(items.some((currentItem) => currentItem.id === item.id)).toBe(false);
  });
});
