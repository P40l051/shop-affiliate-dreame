import { redirect } from "next/navigation";
import { getAffiliateUrlBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const target = await getAffiliateUrlBySlug(params.slug);
  if (!target) {
    return new Response("Not found", { status: 404 });
  }
  return Response.redirect(target, 302);
}

export const POST = GET;

interface _UnusedType {
  _redirect?: typeof redirect;
}
