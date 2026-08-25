"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRandomRecipe() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/recipes/random"
      );

      if (!response.ok) {
        throw new Error("Failed to load random recipe");
      }

      const result = await response.json();

      setRecipe(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {!recipe && (
        <button
          onClick={getRandomRecipe}
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Get Random Recipe"}
        </button>
      )}

      {recipe && (
        <div className="mx-auto max-w-md">
          <RecipeCard recipe={recipe} />

          <button
            onClick={getRandomRecipe}
            disabled={loading}
            className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Get another recipe"}
          </button>
        </div>
      )}
    </div>
  );
}