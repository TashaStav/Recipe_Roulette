"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadRecipes(
    selectedCuisine = cuisine,
    selectedMaxTime = maxTime,
  ) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (selectedCuisine) {
        params.append("cuisine", selectedCuisine);
      }

      if (selectedMaxTime) {
        params.append("maxTime", selectedMaxTime);
      }

      const query = params.toString();

      const response = await fetch(
        `http://localhost:3000/api/recipes${query ? `?${query}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load recipes");
      }

      const data = await response.json();

      setRecipes(data.data);
    } catch (error) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  function resetFilters() {
    setCuisine("");
    setMaxTime("");
    loadRecipes("", "");
  }

  return (
    <main className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Recipes</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={cuisine}
          onChange={(event) => setCuisine(event.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="">All cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="Mexican">Mexican</option>
          <option value="American">American</option>
          <option value="Indian">Indian</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Max time (min)"
          value={maxTime}
          onChange={(event) => setMaxTime(event.target.value)}
          className="rounded border px-2 py-1"
        />

        <button
          onClick={() => loadRecipes()}
          disabled={loading}
          className="rounded bg-black px-3 py-1 text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Apply filters"}
        </button>

        <button onClick={resetFilters} className="rounded border px-3 py-1">
          Reset
        </button>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {!loading && recipes.length === 0 && (
        <p className="mb-4">No recipes found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
