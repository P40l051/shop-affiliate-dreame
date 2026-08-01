import { cn } from "@/lib/utils";

export interface TrustItem {
  icon: string;
  title: string;
  subtitle?: string;
}

export function TrustPills({
  items,
  variant = "light",
  className,
}: {
  items: TrustItem[];
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 text-sm",
        variant === "light" ? "text-neutral-700" : "text-white/95",
        className,
      )}
    >
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-1.5 whitespace-nowrap">
          <span aria-hidden className="text-base leading-none">
            {t.icon}
          </span>
          <span>
            <strong className="font-semibold">{t.title}</strong>
            {t.subtitle && (
              <span
                className={cn(
                  "ml-1",
                  variant === "light" ? "text-neutral-500" : "text-white/70",
                )}
              >
                {t.subtitle}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export const DEFAULT_TRUST_ITEMS: TrustItem[] = [
  { icon: "⚡", title: "Prime", subtitle: "consegna in 1 giorno" },
  { icon: "↩️", title: "Reso GRATUITO", subtitle: "entro 14 giorni" },
  { icon: "🚚", title: "Spedizione GRATUITA", subtitle: "per membri Prime" },
  { icon: "🛡️", title: "Garanzia", subtitle: "2 anni Italia" },
];
