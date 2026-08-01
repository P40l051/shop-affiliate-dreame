import Image from "next/image";
import { AffiliateButton } from "./AffiliateButton";
import { formatPrice } from "@/lib/utils";

export interface ProductItem {
  asin: string;
  name: string;
  brand: string;
  priceEur: number;
  rrpEur?: number;
  rating: number;
  reviewCount: number;
  amazonChoice?: boolean;
  boughtPastMonth?: number | null;
  affiliateUrl: string;
  slug: string;
  isPrimary?: boolean;
  imageUrl?: string;
}

export function ProductCard({
  product,
  variant = "default",
}: {
  product: ProductItem;
  variant?: "default" | "compact";
}) {
  const savings =
    product.rrpEur && product.rrpEur > product.priceEur
      ? Math.round(((product.rrpEur - product.priceEur) / product.rrpEur) * 100)
      : 0;

  return (
    <article
      className={`bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col gap-4 ${
        variant === "compact" ? "" : "shadow-sm hover:shadow-md transition-shadow"
      }`}
    >
      <div className="relative aspect-square bg-gradient-to-br from-neutral-50 to-white rounded-xl overflow-hidden -mt-1">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            🤖
          </div>
        )}
        {product.amazonChoice && (
          <span className="absolute top-2 left-2 bg-amazon-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
            Scelta Amazon
          </span>
        )}
      </div>
      <header className="space-y-1">
        <div className="text-xs uppercase tracking-wider text-neutral-500">
          {product.brand}
        </div>
        <h3 className="text-lg sm:text-xl font-bold leading-tight text-neutral-900">
          {product.name}
        </h3>
      </header>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-amazon-600">
          {formatPrice(product.priceEur)}
        </span>
        {savings > 0 && product.rrpEur && (
          <>
            <span className="text-sm text-neutral-500 line-through">
              {formatPrice(product.rrpEur)}
            </span>
            <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded">
              -{savings}%
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1">
          <span className="bg-amazon-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-amazon-500" aria-label="stelle">
            ★★★★★
          </span>
        </span>
        <span className="text-neutral-600">
          {product.reviewCount.toLocaleString("it-IT")} recensioni
        </span>
      </div>
      {product.boughtPastMonth && (
        <div className="text-xs text-neutral-600">
          🔥 {product.boughtPastMonth.toLocaleString("it-IT")}+ acquistati nel mese scorso
        </div>
      )}
      <div className="mt-auto pt-2">
        <AffiliateButton slug={product.slug} />
      </div>
    </article>
  );
}
