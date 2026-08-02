import { getAllProducts } from "@/lib/products";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const all = await getAllProducts();
  return (
    <HeaderClient
      products={all.map((p) => ({
        slug: p.slug,
        brand: p.brand,
        name: p.name,
        priceEur: p.priceEur,
      }))}
    />
  );
}
