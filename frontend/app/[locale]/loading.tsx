export default function Loading() {
  return (
    <div className="mx-auto max-w-content px-6 pt-32">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-2/3 rounded-lg bg-surface" />
        <div className="h-4 w-1/3 rounded bg-surface" />
        <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-surface" />
          ))}
        </div>
      </div>
    </div>
  );
}
