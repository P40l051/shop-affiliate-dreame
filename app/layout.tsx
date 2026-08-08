import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://robotaspirapolvere.pro";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff9900",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Robot Aspirapolvere 2026: la classifica con prezzi e offerte Amazon",
    template: "%s | Robot Aspirapolvere Pro",
  },
  description:
    "Classifica dei migliori robot aspirapolvere 2026 su Amazon.it: prezzi aggiornati, recensioni verificate, pro e contro, confronto modelli Dreame, Roborock e Ultenic.",
  authors: [{ name: "Robot Aspirapolvere Pro" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Robot Aspirapolvere Pro",
    images: [
      { url: `${SITE_URL}/og-default.png`, width: 1200, height: 630, alt: "RobotAspirapolvere.pro — recensioni indipendenti 2026" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robot Aspirapolvere 2026: la classifica con prezzi e offerte",
    description:
      "Classifica dei migliori robot aspirapolvere 2026 su Amazon.it: prezzi, recensioni verificate, pro e contro.",
    images: [`${SITE_URL}/og-default.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RobotAspirapolvere.pro",
  url: SITE_URL,
  description:
    "Sito di recensioni indipendenti e confronti di robot aspirapolvere sul mercato italiano.",
  logo: `${SITE_URL}/favicon.svg`,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RobotAspirapolvere.pro",
  url: SITE_URL,
  description:
    "Classifiche e recensioni indipendenti di robot aspirapolvere venduti su Amazon.it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
