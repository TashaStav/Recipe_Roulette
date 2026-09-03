import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div className="rounded-md border bg-white p-3">
      <Image
        src={recipe.image}
        alt={recipe.name}
        width={600}
        height={400}
        className="h-40 w-full rounded-md object-cover"
      />

      <h2 className="mt-2 text-base font-bold">{recipe.name}</h2>

      <p className="mt-1 text-sm">
        Time: {recipe.prep_time_minutes + recipe.cook_time_minutes} min
      </p>

      <Link
        href={`/recipes/${recipe.id}`}
        className="mt-2 inline-block text-blue-500"
      >
        Open recipe
      </Link>
    </div>
  );
}
