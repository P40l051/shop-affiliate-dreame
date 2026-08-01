"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Could plug in Sentry / log drain here
      console.error("Unhandled error:", error);
    }
  }, [error]);

  return (
    <main className="container-tight py-16 text-center space-y-6">
      <div className="text-6xl">⚠️</div>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
        Qualcosa è andato storto
      </h1>
      <p className="text-neutral-600 max-w-md mx-auto">
        Si è verificato un errore inatteso durante il caricamento della pagina.
        Riprova, o torna alla home.
      </p>
      {error.digest && (
        <p className="text-xs text-neutral-400 font-mono">
          Errore ID: {error.digest}
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg bg-amazon-500 hover:bg-amazon-600 px-6 py-3 font-semibold text-white shadow"
        >
          🔄 Riprova
        </button>
        <Link
          href="/prodotto/dreame-l40-ultra-ae"
          className="inline-flex items-center justify-center rounded-lg border-2 border-amazon-500 text-amazon-700 hover:bg-amazon-50 px-6 py-3 font-semibold"
        >
          🏠 Torna alla home
        </Link>
      </div>
    </main>
  );
}
