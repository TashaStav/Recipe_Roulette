import Link from "next/link";
import AddToFavorites from "@/components/AddToFavorites";

export default async function RecipePage({ params }) {
  const { id } = await params;

  const response = await fetch(`https://dummyjson.com/recipes/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load recipe");
  }

  const recipe = await response.json();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/recipes" className="text-blue-600">
        Back to recipes
      </Link>

      <h1 className="mt-4 mb-4 text-3xl font-bold">{recipe.name}</h1>

      <img
        src={recipe.image}
        alt={recipe.name}
        className="mb-4 w-full rounded-md"
      />

      <AddToFavorites recipe={recipe} />

      <div className="mt-6 space-y-2">
        <p>Preparation: {recipe.prepTimeMinutes} min</p>
        <p>Cooking: {recipe.cookTimeMinutes} min</p>
        <p>Servings: {recipe.servings}</p>
        <p>Difficulty: {recipe.difficulty}</p>
        <p>Cuisine: {recipe.cuisine}</p>
      </div>

      <section className="mt-6">
        <h2 className="mb-2 text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-2xl font-semibold">Instructions</h2>
        <ol className="list-decimal pl-6">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
