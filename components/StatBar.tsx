import { cn } from "@/lib/utils";

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export function StatBar({
  stats,
  variant = "default",
  className,
}: {
  stats: StatItem[];
  variant?: "default" | "compact";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-" + (variant === "compact" ? "3" : "6"),
        `grid-cols-2 sm:grid-cols-${stats.length}`,
        className,
      )}
    >
      {stats.map((s, i) => (
        <li
          key={i}
          className={cn(
            "bg-white rounded-xl border border-neutral-200 text-center",
            variant === "compact" ? "p-3" : "p-5",
          )}
        >
          <div className={cn("mb-1", variant === "compact" ? "text-xl" : "text-3xl")}>
            {s.icon}
          </div>
          <div
            className={cn(
              "font-extrabold text-amazon-600 tabular-nums",
              variant === "compact" ? "text-base" : "text-2xl",
            )}
          >
            {s.value}
          </div>
          <div
            className={cn(
              "text-neutral-600 mt-0.5",
              variant === "compact" ? "text-[10px]" : "text-xs",
            )}
          >
            {s.label}
          </div>
        </li>
      ))}
    </ul>
  );
}
