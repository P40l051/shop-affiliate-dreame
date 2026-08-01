import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Recensioni Robot Aspirapolvere 2026 — Offerte Amazon",
    template: "%s | Robot Aspirapolvere Pro",
  },
  description:
    "Recensioni indipendenti di robot aspirapolvere su Amazon.it: prezzo, funzioni, recensioni reali clienti, confronto modelli simili, FAQ.",
  authors: [{ name: "Robot Aspirapolvere Pro" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: `${SITE_URL}/prodotto/dreame-l40-ultra-ae`,
    siteName: "Robot Aspirapolvere Pro",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/prodotto/dreame-l40-ultra-ae`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
