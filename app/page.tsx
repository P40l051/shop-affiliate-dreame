import { redirect } from "next/navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

export default function HomePage() {
  redirect(`${SITE_URL}/prodotto/dreame-l40-ultra-ae`);
}
