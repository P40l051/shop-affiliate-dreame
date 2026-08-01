import { redirect } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function HomePage() {
  const target = SITE_URL
    ? `${SITE_URL.replace(/\/$/, "")}/prodotto/dreame-l40-ultra-ae`
    : "/prodotto/dreame-l40-ultra-ae";
  redirect(target);
}
