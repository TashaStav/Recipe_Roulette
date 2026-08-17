import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div className="border rounded-md p-3 bg-white">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-md"
      />

      <h2 className="mt-2 text-base font-bold">{recipe.name}</h2>

      <p className="mt-1 text-sm">Time: {recipe.prepTimeMinutes} min</p>

      <Link
        href={`/recipes/${recipe.id}`}
        className="mt-2 inline-block text-blue-500"
      >
        Open recipe
      </Link>
    </div>
  );
}
