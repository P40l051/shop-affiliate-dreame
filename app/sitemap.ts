import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

function brandSlug(brand: string): string {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = await getAllProducts();
  const now = new Date();
  const brandMap = new Map<string, string>();
  for (const p of all) {
    brandMap.set(brandSlug(p.brand), p.brand);
  }
  const brands = Array.from(brandMap, ([slug, brand]) => ({ brand, slug }));

  const productEntries: MetadataRoute.Sitemap = all.map((p) => ({
    url: `${SITE_URL}/prodotto/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.isPrimary ? 1.0 : 0.8,
  }));

  const brandEntries: MetadataRoute.Sitemap = brands.map(({ slug }) => ({
    url: `${SITE_URL}/brand/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllArticles().map((a) => {
    const art = getArticleBySlug(a.slug);
    const lastModified = new Date(art?.updatedAt ?? art?.publishedAt ?? now);
    return {
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/chi-siamo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...productEntries,
    ...brandEntries,
    ...blogEntries,
    ...blogIndex,
  ];
}
