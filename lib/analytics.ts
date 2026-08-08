export function trackAffiliateClick(slug: string): void {
  try {
    const w = window as Window & {
      gtag?: (...args: unknown[]) => void;
      plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    };
    if (typeof w.gtag === "function") {
      w.gtag("event", "affiliate_click", { affiliate_slug: slug });
    }
    if (typeof w.plausible === "function") {
      w.plausible("affiliate_click", { props: { slug } });
    }
  } catch {
    // tracking is best-effort
  }
}
