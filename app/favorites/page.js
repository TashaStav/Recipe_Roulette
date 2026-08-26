"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    Promise.resolve().then(() => {
      setFavorites(saved);
    });
  }, []);

  function removeFavorite(id) {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Favorites</h1>

      {favorites.length === 0 ? (
        <div>
          <p className="text-gray-600">It&apos;s empty here for now.</p>

          <Link
            href="/recipes"
            className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
          >
            View Recipes
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="rounded-md border bg-white p-4">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-40 w-full rounded-md object-cover"
              />

              <h2 className="mt-3 text-lg font-semibold">{recipe.name}</h2>

              <p className="mt-1 text-sm text-gray-600">
                Time: {recipe.prep_time_minutes + recipe.cook_time_minutes} min
              </p>

              <div className="mt-4 flex gap-4">
                <Link href={`/recipes/${recipe.id}`} className="text-blue-600">
                  Open recipe
                </Link>

                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
