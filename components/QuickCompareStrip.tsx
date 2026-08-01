"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { AffiliateButton } from "./AffiliateButton";

export interface QuickCompareItem {
  asin: string;
  name: string;
  imageUrl?: string;
  priceEur: number;
  rating: number;
}

export function QuickCompareStrip({
  primary,
  rival,
  title,
  primarySlug,
}: {
  primary: QuickCompareItem;
  rival: QuickCompareItem;
  title: string;
  primarySlug: string;
}) {
  const savings = primary.priceEur - rival.priceEur;
  return (
    <section className="bg-gradient-to-br from-amazon-50 via-white to-neutral-50 rounded-2xl border border-amazon-100 p-6 sm:p-8 space-y-4">
      <header>
        <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold mb-1">
          Confronto rapido
        </div>
        <h3 className="text-xl font-bold text-neutral-900 leading-snug">
          {title}
        </h3>
      </header>
      <div className="grid sm:grid-cols-3 gap-4 items-center">
        <CompareCard item={primary} highlight isPrimary />
        <div className="hidden sm:flex flex-col items-center justify-center text-neutral-400">
          <div className="text-2xl font-bold text-neutral-900">VS</div>
          {savings !== 0 && (
            <div
              className={`text-xs font-semibold mt-1 ${
                savings > 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {savings > 0 ? "−" : "+"}
              {formatPrice(Math.abs(savings))}
            </div>
          )}
        </div>
        <CompareCard item={rival} />
      </div>
      <div className="flex justify-center pt-2">
        <AffiliateButton slug={primarySlug} label="Scegli il migliore" />
      </div>
    </section>
  );
}

function CompareCard({
  item,
  highlight,
  isPrimary,
}: {
  item: QuickCompareItem;
  highlight?: boolean;
  isPrimary?: boolean;
}) {
  return (
    <div
      className={`relative bg-white rounded-xl border p-4 ${
        highlight
          ? "border-amazon-500 ring-2 ring-amazon-200 shadow-md"
          : "border-neutral-200"
      }`}
    >
      {isPrimary && (
        <span className="absolute -top-2 -right-2 bg-amazon-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow">
          Consigliato
        </span>
      )}
      <div className="flex gap-3 items-start">
        <div className="relative flex-shrink-0 w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="80px"
              className="object-contain p-1"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-neutral-500 truncate">
            {item.asin}
          </div>
          <div className="font-bold text-sm text-neutral-900 leading-tight line-clamp-2">
            {item.name}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-lg font-extrabold ${
                highlight ? "text-amazon-600" : "text-neutral-900"
              }`}
            >
              {formatPrice(item.priceEur)}
            </span>
            <span className="text-xs text-amber-500 font-semibold">
              {item.rating.toFixed(1)} ★
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
