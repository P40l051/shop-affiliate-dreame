import fs from "node:fs/promises";
import path from "node:path";

export interface ProductEditorial {
  highlights: { pro: string[]; contro: string[] };
  specs: Record<string, string>;
}

export interface ReviewEntry {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified?: boolean;
}

export interface ProductFull {
  asin: string;
  brand: string;
  name: string;
  title: string;
  slug: string;
  imageUrl: string;
  priceEur: number;
  priceRrpEur: number;
  discountPct: number;
  savingsEur: number;
  rating: number;
  reviewCount: number;
  amazonChoice: boolean;
  boughtPastMonth: number | null;
  commissionPct: number;
  affiliateUrl: string;
  keyFeatures: string[];
  reviews: ReviewEntry[];
  highlights: { pro: string[]; contro: string[] };
  specs: Record<string, string>;
  isPrimary?: boolean;
}

const COMPETITORS_FILE = path.join(
  process.cwd(),
  "content",
  "research",
  "competitors.json",
);
const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");
const FAQ_FILE = path.join(process.cwd(), "lib", "faq-data.ts");

export async function getAllProductsBase(): Promise<
  Omit<ProductFull, "highlights" | "specs" | "title">[]
> {
  const raw = await fs.readFile(COMPETITORS_FILE, "utf-8");
  return JSON.parse(raw).products;
}

export async function getAllProducts(): Promise<ProductFull[]> {
  const base = await getAllProductsBase();
  return Promise.all(
    base.map(async (p) => {
      const full = await enrichProduct(p);
      return full;
    }),
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductFull | null> {
  const base = await getAllProductsBase();
  const baseEntry = base.find((p) => p.slug === slug);
  if (!baseEntry) return null;
  return enrichProduct(baseEntry);
}

export async function getPrimaryProduct(): Promise<ProductFull> {
  const all = await getAllProducts();
  const primary = all.find((p) => p.isPrimary) ?? all[0];
  return primary;
}

export async function getCompetitorsForSlug(
  slug: string,
): Promise<Omit<ProductFull, "highlights" | "specs" | "title">[]> {
  const all = await getAllProductsBase();
  return all.filter((p) => p.slug !== slug);
}

async function enrichProduct(
  base: Omit<ProductFull, "highlights" | "specs" | "title">,
): Promise<ProductFull> {
  let editorial: ProductEditorial = {
    highlights: { pro: [], contro: [] },
    specs: {},
  };
  const editorialFile = path.join(PRODUCTS_DIR, `${base.slug}.json`);
  try {
    const raw = await fs.readFile(editorialFile, "utf-8");
    editorial = JSON.parse(raw);
  } catch {
    // No editorial file; that's OK
  }

  return {
    ...base,
    title: `${base.name}`,
    discountPct: discountPctSafe(base.priceEur, base.priceRrpEur),
    savingsEur: Math.max(0, (base.priceRrpEur ?? 0) - base.priceEur),
    highlights: editorial.highlights,
    specs: editorial.specs,
  };
}

function discountPctSafe(priceEur: number, rrpEur: number): number {
  if (!rrpEur || !priceEur || rrpEur <= 0) return 0;
  if (priceEur >= rrpEur) return 0;
  return Math.round(((rrpEur - priceEur) / rrpEur) * 100);
}

export async function getAffiliateUrlBySlug(
  slug: string,
): Promise<string | null> {
  const all = await getAllProductsBase();
  return all.find((p) => p.slug === slug)?.affiliateUrl ?? null;
}
