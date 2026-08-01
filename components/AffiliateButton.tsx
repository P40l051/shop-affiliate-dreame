import Link from "next/link";
import { cn } from "@/lib/utils";

export function AffiliateButton({
  slug,
  label = "Vedi Offerta su Amazon",
  variant = "primary",
  className,
  showAffiliateLabel = true,
}: {
  slug: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  showAffiliateLabel?: boolean;
}) {
  const variantClass =
    variant === "primary"
      ? "bg-amazon-500 hover:bg-amazon-600 text-white shadow-md"
      : "bg-white border-2 border-amazon-500 text-amazon-700 hover:bg-amazon-50";

  return (
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <Link
        href={`/go/${slug}`}
        rel="sponsored nofollow noopener"
        target="_blank"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors whitespace-nowrap min-h-[44px]",
          variantClass,
          variant === "primary"
            ? "px-6 py-3 text-base"
            : "px-5 py-3 text-sm sm:text-sm sm:px-4 sm:py-2 sm:text-xs",
        )}
      >
        {label}
        <span aria-hidden>↗</span>
      </Link>
      {showAffiliateLabel && (
        <span className="text-[10px] uppercase tracking-wider text-neutral-500 pl-1">
          * link affiliato
        </span>
      )}
    </div>
  );
}
