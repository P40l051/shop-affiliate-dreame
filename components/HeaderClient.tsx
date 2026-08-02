"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export interface NavProduct {
  slug: string;
  brand: string;
  name: string;
  priceEur: number;
}

function brandLabel(brand: string): string {
  return brand.charAt(0).toUpperCase() + brand.slice(1);
}

export function HeaderClient({ products }: { products: NavProduct[] }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setProductsOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="container-tight py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-bold text-base sm:text-lg tracking-tight flex items-center gap-2 min-w-0"
          >
            <span aria-hidden>🤖</span>
            <span className="text-amazon-600 truncate">RobotAspirapolvere.pro</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            aria-label="Navigazione principale"
            className="hidden md:flex items-center gap-2"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-amazon-600 hover:bg-neutral-100 transition-colors min-h-[44px]"
              >
                Prodotti
                <ChevronDown
                  aria-hidden
                  className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProductsOpen(false)}
                    aria-hidden
                  />
                  <div
                    role="menu"
                    aria-label="Tutti i prodotti"
                    className="absolute left-0 top-full mt-1 z-50 w-80 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl"
                  >
                    <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-neutral-500">
                      Tutti i robot aspirapolvere ({products.length})
                    </div>
                    <ul className="max-h-[60vh] overflow-y-auto">
                      {products.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/prodotto/${p.slug}`}
                            role="menuitem"
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-amazon-50 transition-colors"
                          >
                            <span className="min-w-0">
                              <span className="block text-[10px] uppercase tracking-wider text-neutral-500">
                                {brandLabel(p.brand)}
                              </span>
                              <span className="block text-sm font-semibold text-neutral-900 leading-tight truncate">
                                {p.name}
                              </span>
                            </span>
                            <span className="flex-shrink-0 text-sm font-bold text-amazon-600">
                              {formatPrice(p.priceEur)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-amazon-600 hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              Blog
            </Link>
          </nav>

          {/* MOBILE TRIGGER */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Apri menu"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden />
            ) : (
              <Menu className="w-5 h-5" aria-hidden />
            )}
          </button>
        </div>

        {/* MOBILE PANEL */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Navigazione mobile"
            className="md:hidden border-t border-neutral-200 bg-white shadow-md"
          >
            <ul className="container-tight py-2">
              <li>
                <Link
                  href="/blog"
                  onClick={closeAll}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold text-amazon-700 hover:bg-amazon-50 min-h-[44px]"
                >
                  Blog
                  <span aria-hidden>→</span>
                </Link>
              </li>
              <li className="pt-2 pb-1 px-3 text-[10px] uppercase tracking-wider text-neutral-500">
                Tutti i robot aspirapolvere ({products.length})
              </li>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/prodotto/${p.slug}`}
                    onClick={closeAll}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-amazon-50 min-h-[44px]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-500">
                        {brandLabel(p.brand)}
                      </span>
                      <span className="block text-sm font-semibold text-neutral-900 leading-tight truncate">
                        {p.name}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-sm font-bold text-amazon-600">
                      {formatPrice(p.priceEur)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
