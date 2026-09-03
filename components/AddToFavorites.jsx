"use client";

import { useEffect, useState } from "react";

export default function AddToFavorites({ recipe }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const isAlreadySaved = favorites.some((item) => item.id === recipe.id);

    Promise.resolve().then(() => {
      setSaved(isAlreadySaved);
    });
  }, [recipe.id]);

  function addToFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const isAlreadySaved = favorites.some((item) => item.id === recipe.id);

    if (isAlreadySaved) {
      return;
    }

    favorites.push(recipe);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setSaved(true);
  }

  return (
    <button
      onClick={addToFavorites}
      disabled={saved}
      className="mt-6 rounded bg-black px-5 py-3 text-white disabled:bg-gray-400"
    >
      {saved ? "Added to favorites" : "Add to favorites"}
    </button>
  );
}
