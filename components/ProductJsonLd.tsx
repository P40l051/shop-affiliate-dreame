export interface ProductJsonLdProps {
  asin: string;
  name: string;
  description: string;
  imageUrl?: string;
  priceEur: number;
  rating: number;
  reviewCount: number;
  slug: string;
  brand?: string;
  sku?: string;
}

function priceValidUntil(): string {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

export function ProductJsonLd({
  asin,
  name,
  description,
  imageUrl,
  priceEur,
  rating,
  reviewCount,
  slug,
  brand,
  sku,
}: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    description,
    image: imageUrl,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    sku: sku || asin,
    gtin13: asin,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: `https://robotaspirapolvere.pro/prodotto/${slug}`,
      priceCurrency: "EUR",
      price: priceEur,
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Amazon Italia",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
