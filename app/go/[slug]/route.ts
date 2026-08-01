import { NextResponse } from "next/server";
import competitors from "@/content/research/competitors.json";

const SLUG_TO_URL: Record<string, string> = Object.fromEntries(
  (competitors as { products: Array<{ slug: string; affiliateUrl: string }> })
    .products.map((p) => [p.slug, p.affiliateUrl])
);

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const target = SLUG_TO_URL[params.slug];
  if (!target) {
    return NextResponse.json(
      { error: "Not found", slug: params.slug },
      { status: 404 }
    );
  }
  return NextResponse.redirect(target, 302);
}
