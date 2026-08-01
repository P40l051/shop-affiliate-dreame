"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export interface StickyBuyBarProps {
  slug: string;
  productName: string;
  priceEur: number;
  rating: number;
  reviewCount: number;
}

export function StickyBuyBar({
  slug,
  productName,
  priceEur,
  rating,
  reviewCount,
}: StickyBuyBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-neutral-200 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
      <div className="container-tight py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-neutral-500 truncate">
            {productName}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-amazon-600">
              {formatPrice(priceEur)}
            </span>
            <span className="text-xs text-amber-500 font-semibold">
              {rating.toFixed(1)} ★
            </span>
            <span className="text-[10px] text-neutral-500">
              ({reviewCount.toLocaleString("it-IT")})
            </span>
          </div>
        </div>
        <Link
          href={`/go/${slug}`}
          rel="sponsored nofollow noopener"
          target="_blank"
          className="flex-shrink-0 inline-flex items-center justify-center gap-1 bg-amazon-500 hover:bg-amazon-600 text-white font-bold text-sm px-5 py-3 rounded-lg shadow-md transition-colors whitespace-nowrap"
        >
          Vedi Offerta ↗
        </Link>
      </div>
    </div>
  );
}
