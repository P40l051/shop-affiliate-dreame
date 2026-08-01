import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || ""
).replace(/^$/, "https://example.com");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = await getAllProducts();
  const now = new Date();

  return all.map((p) => ({
    url: `${SITE_URL}/prodotto/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.isPrimary ? 1.0 : 0.8,
  }));
}
