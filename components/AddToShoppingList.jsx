"use client";

import { useState } from "react";

export default function AddToShoppingList({ recipe }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function addToShoppingList() {
    try {
      setLoading(true);

      for (const ingredient of recipe.ingredients) {
        const response = await fetch(
          "http://localhost:3000/api/shopping-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipeId: recipe.id,
              ingredient,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to add ingredient");
        }
      }

      setAdded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={addToShoppingList}
      disabled={loading || added}
      className="mt-6 rounded bg-black px-5 py-3 text-white disabled:bg-gray-400"
    >
      {loading
        ? "Adding..."
        : added
          ? "Added to shopping list"
          : "Add to shopping list"}
    </button>
  );
}
