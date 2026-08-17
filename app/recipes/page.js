import RecipeCard from "@/components/RecipeCard";

export default async function RecipesPage() {
  const response = await fetch("https://dummyjson.com/recipes?limit=30");

  if (!response.ok) {
    throw new Error("Failed to load recipes");
  }

  const data = await response.json();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Recipes</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {data.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
