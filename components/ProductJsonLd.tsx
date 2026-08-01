export interface ProductJsonLdProps {
  asin: string;
  name: string;
  description: string;
  imageUrl?: string;
  priceEur: number;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  brand?: string;
  sku?: string;
}

export function ProductJsonLd({
  asin,
  name,
  description,
  imageUrl,
  priceEur,
  rating,
  reviewCount,
  affiliateUrl,
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
      url: affiliateUrl,
      priceCurrency: "EUR",
      price: priceEur,
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
