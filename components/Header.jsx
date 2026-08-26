import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b p-4">
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/recipes">Recipes</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/shoppingList">Shopping List</Link>
      </nav>
    </header>
  );
}
