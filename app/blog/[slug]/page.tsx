import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  type BlogBlock,
} from "@/lib/blog";
import { AffiliateButton } from "@/components/AffiliateButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robotaspirapolvere.pro";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const a = getArticleBySlug(params.slug);
  if (!a) return { title: "Articolo non trovato" };
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      url: `${SITE_URL}/blog/${a.slug}`,
      images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const products = await getAllProducts();
  const ctaProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);
  const related = getRelatedArticles(article);
  const relatedProducts = article.relatedSlugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: "RobotAspirapolvere.pro" },
    publisher: {
      "@type": "Organization",
      name: "RobotAspirapolvere.pro",
    },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container-tight py-8 sm:py-12 max-w-3xl space-y-6">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500">
          <ol className="flex gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-amazon-600">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-amazon-600">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-neutral-700 font-semibold truncate">
              {article.title.split(":")[0]}
            </li>
          </ol>
        </nav>

        <header className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
            {new Date(article.publishedAt).toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {article.readingMinutes} min lettura
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-neutral-900">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
            {article.description}
          </p>
        </header>

        <div className="space-y-5 text-neutral-800 leading-relaxed">
          {article.blocks.map((b, i) => (
            <BlockRender key={i} block={b} ctaProductBySlug={ctaProductBySlug} />
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <section className="bg-amazon-50 border border-amazon-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Prodotti citati in questa guida
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {relatedProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/prodotto/${p.slug}`}
                    className="flex gap-3 items-center bg-white rounded-xl border border-neutral-200 p-3 hover:border-amazon-400 hover:shadow-sm transition-all"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      loading="lazy"
                      className="w-16 h-16 object-contain bg-neutral-50 rounded-lg flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase text-neutral-500">
                        {p.brand}
                      </div>
                      <div className="font-bold text-sm leading-tight line-clamp-2">
                        {p.name}
                      </div>
                      <div className="text-amazon-600 font-bold text-sm mt-1">
                        Vedi scheda →
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-neutral-100 border border-neutral-200 rounded-2xl p-5 space-y-4">
          <h2 className="text-lg font-bold">Disclosure affiliato</h2>
          <p className="text-sm text-neutral-700">
            Questo articolo contiene link affiliati Amazon. Acquistando tramite i
            nostri link guadagniamo una piccola commissione, senza costo
            aggiuntivo per te. Le opinioni sono indipendenti: testiamo o
            analizziamo ogni prodotto citato.
          </p>
          <AffiliateButton
            slug={relatedProducts[0]?.slug ?? article.relatedSlugs[0]}
            label="Vedi offerta"
          />
        </section>

        {related.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-neutral-200">
            <h2 className="text-xl font-bold">Leggi anche</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="block bg-white rounded-xl border border-neutral-200 p-4 hover:border-amazon-300 hover:shadow-sm transition-all h-full"
                  >
                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}

function BlockRender({
  block,
  ctaProductBySlug,
}: {
  block: BlogBlock;
  ctaProductBySlug: (slug: string) => { slug: string; name: string } | undefined;
}) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl sm:text-3xl font-bold mt-8 text-neutral-900">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl sm:text-2xl font-bold mt-6 text-neutral-900">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-base sm:text-lg leading-relaxed">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2 leading-relaxed">
              <span className="text-amazon-500 flex-shrink-0">✓</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2 pl-5 list-decimal marker:text-amazon-600 marker:font-bold">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">
              {it}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-amazon-500 bg-amazon-50 pl-4 py-3 italic text-neutral-800 rounded-r">
          {block.text}
        </blockquote>
      );
    case "cta": {
      const p = ctaProductBySlug(block.productSlug);
      return (
        <div className="bg-white border-2 border-amazon-200 rounded-2xl p-5 my-6 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-amazon-700 font-bold">
              Offerta Amazon
            </div>
            <div className="font-bold text-lg mt-1 text-neutral-900">
              {p?.name ?? block.productSlug}
            </div>
          </div>
          <AffiliateButton
            slug={block.productSlug}
            label={block.label ?? "Vedi offerta Amazon"}
          />
        </div>
      );
    }
  }
}
