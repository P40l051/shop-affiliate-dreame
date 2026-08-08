"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { formatPrice } from "@/lib/utils";
import { AffiliateButton } from "./AffiliateButton";

export interface QuickCompareItem {
  asin: string;
  name: string;
  slug: string;
  imageUrl?: string;
  priceEur: number;
  rating: number;
}

export interface RivalOption extends QuickCompareItem {
  brand: string;
}

export function QuickCompareStrip({
  primary,
  rival,
  rivals,
  defaultSlug,
  primarySlug,
}: {
  primary: QuickCompareItem;
  rival: QuickCompareItem;
  rivals: RivalOption[];
  defaultSlug: string;
  primarySlug: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeSlug = params.get("vs") ?? defaultSlug;

  const selected = useMemo(
    () => rivals.find((r) => r.slug === activeSlug) ?? rivals.find((r) => r.slug === defaultSlug) ?? rival,
    [activeSlug, rivals, defaultSlug, rival],
  );

  const savings = useMemo(() => primary.priceEur - selected.priceEur, [primary, selected]);

  function onChange(slug: string) {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (slug === defaultSlug) {
      next.delete("vs");
    } else {
      next.set("vs", slug);
    }
    const qs = next.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }

  const titlePrefix = primary.name.split(" ").slice(0, 3).join(" ");
  const titleSuffix = selected.name.split(" ").slice(0, 3).join(" ");

  return (
    <section className="bg-gradient-to-br from-amazon-50 via-white to-neutral-50 rounded-2xl border border-amazon-100 p-5 sm:p-8 space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold mb-1">
            Confronto rapido
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
            {titlePrefix} vs {titleSuffix}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="qc-rival"
            className="text-xs font-semibold text-neutral-600 hidden sm:inline"
          >
            Confronta con
          </label>
          <div className="relative flex-1 sm:flex-initial">
            <select
              id="qc-rival"
              value={selected.slug}
              onChange={(e) => onChange(e.target.value)}
              className="appearance-none w-full sm:w-auto bg-white border border-neutral-300 rounded-lg pl-3 pr-9 py-3 min-h-[44px] text-sm font-semibold text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amazon-500 focus:border-amazon-500"
            >
              {rivals.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.brand} · {r.name}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs"
            >
              ▾
            </span>
          </div>
        </div>
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
        <CompareCard item={selected} key={selected.slug} />
      </div>
      <div className="flex justify-center pt-2">
        <AffiliateButton slug={primarySlug} label="Scegli il migliore" />
      </div>
      <div className="flex justify-center">
        <Link
          href={`/confronto/${primarySlug}/vs/${selected.slug}`}
          className="text-sm font-semibold text-amazon-700 hover:text-amazon-800 underline underline-offset-2"
        >
          Apri confronto completo →
        </Link>
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
