import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function discountPct(priceEur: number, rrpEur: number): number {
  if (rrpEur <= 0) return 0;
  return Math.round(((rrpEur - priceEur) / rrpEur) * 100);
}

export function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
