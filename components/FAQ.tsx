"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-2xl bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn(
                "w-full flex items-start gap-4 text-left px-5 py-4 transition-colors hover:bg-neutral-50",
                isOpen && "bg-amazon-50/40",
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors",
                  isOpen
                    ? "bg-amazon-500 text-white"
                    : "bg-neutral-100 text-neutral-600",
                )}
              >
                {isOpen ? "−" : "+"}
              </span>
              <span className="flex-1 font-semibold text-neutral-900 text-base">
                {item.question}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 pt-1 pl-[3.75rem] text-neutral-700 text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function FAQSchemaJsonLd({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
