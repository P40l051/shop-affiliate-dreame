export default function Loading() {
  return (
    <main className="container-tight py-16 space-y-8 animate-pulse">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div className="space-y-5">
          <div className="flex gap-2">
            <div className="h-6 w-32 bg-neutral-200 rounded-full" />
            <div className="h-6 w-40 bg-neutral-200 rounded-full" />
          </div>
          <div className="h-16 bg-neutral-200 rounded-lg" />
          <div className="h-20 bg-neutral-200 rounded-lg" />
          <div className="h-40 bg-neutral-200 rounded-2xl" />
          <div className="h-12 w-48 bg-neutral-300 rounded-lg" />
        </div>
        <div className="aspect-square bg-neutral-100 rounded-3xl" />
      </div>
    </main>
  );
}
