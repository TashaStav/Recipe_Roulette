import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Recipe</h1>

      <p className="mb-8 text-gray-600">
        Find recipes and save your favorites.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/recipes" className="rounded bg-black px-5 py-3 text-white">
          View Recipes
        </Link>

        <Link
          href="/favorites"
          className="rounded bg-black px-5 py-3 text-white"
        >
          Favorites
        </Link>
      </div>
    </main>
  );
}
