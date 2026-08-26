"use client";

import { useEffect, useState } from "react";

export default function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadItems() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:3000/api/shopping-list",
      );

      if (!response.ok) {
        throw new Error("Failed to load shopping list");
      }

      const result = await response.json();

      setItems(result.data);
    } catch (error) {
      setError("Failed to load shopping list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function removeItem(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/shopping-list/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== id),
      );
    } catch (error) {
      setError("Failed to remove item");
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping List</h1>

      {loading && <p>Loading...</p>}

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {!loading && items.length === 0 && (
        <p className="text-gray-600">Your shopping list is empty.</p>
      )}

      {!loading && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border bg-white p-3"
            >
              <span>{item.ingredient}</span>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}