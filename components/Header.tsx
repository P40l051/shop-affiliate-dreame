import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export async function Header() {
  const all = await getAllProducts();
  const primary = all.find((p) => p.isPrimary) ?? all[0];
  const navLabel = (name: string) => name.split(" ").slice(-2).join(" ");
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
      <div className="container-tight py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
        <Link
          href={`/prodotto/${primary.slug}`}
          className="font-bold text-base sm:text-lg tracking-tight flex items-center gap-2 min-w-0"
        >
          <span aria-hidden>🤖</span>
          <span className="text-amazon-600 truncate">RobotAspirapolvere.pro</span>
        </Link>
        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-4 text-xs"
        >
          {all.slice(0, 6).map((p) => (
            <Link
              key={p.asin}
              href={`/prodotto/${p.slug}`}
              className="text-neutral-600 hover:text-amazon-600 whitespace-nowrap"
            >
              {p.brand} {navLabel(p.name)}
            </Link>
          ))}
          <Link
            href="/blog"
            className="font-semibold text-amazon-700 hover:text-amazon-800 whitespace-nowrap"
          >
            Blog
          </Link>
        </nav>
      </div>
      <nav
        aria-label="Prodotti mobile"
        className="md:hidden border-t border-neutral-100 bg-neutral-50"
      >
        <ul className="container-tight flex gap-2 py-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {all.slice(0, 6).map((p) => (
            <li key={p.asin} className="snap-start flex-shrink-0">
              <Link
                href={`/prodotto/${p.slug}`}
                className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 active:bg-amazon-50"
              >
                {p.brand} {navLabel(p.name)}
              </Link>
            </li>
          ))}
          <li className="snap-start flex-shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-amazon-500 text-white text-xs font-semibold"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
