import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export async function Header() {
  const all = await getAllProducts();
  const primary = all.find((p) => p.isPrimary) ?? all[0];
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
      <div className="container-tight py-4 flex items-center justify-between gap-4">
        <Link
          href={`/prodotto/${primary.slug}`}
          className="font-bold text-lg tracking-tight flex items-center gap-2"
        >
          <span>🤖</span>
          <span className="text-amazon-600">RobotAspirapolvere.pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-xs overflow-x-auto">
          {all.slice(0, 8).map((p) => (
            <Link
              key={p.asin}
              href={`/prodotto/${p.slug}`}
              className="text-neutral-600 hover:text-amazon-600 whitespace-nowrap"
            >
              {p.brand} {p.name.split(" ").slice(-2).join(" ")}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
