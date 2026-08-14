export default function PanelLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page title */}
      <div>
        <div className="h-7 w-40 rounded-lg bg-card/60 border border-border/40" />
        <div className="h-4 w-64 mt-2.5 rounded-md bg-card/40 border border-border/30" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
            <div className="h-3 w-20 rounded-md bg-card/60 border border-border/30" />
            <div className="h-7 w-24 mt-3 rounded-lg bg-card/60 border border-border/30" />
            <div className="h-3 w-16 mt-2 rounded-md bg-card/40 border border-border/30" />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 h-64">
          <div className="h-4 w-28 rounded-md bg-card/60 border border-border/30" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card/60 border border-border/30 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3.5 w-3/4 rounded-md bg-card/60 border border-border/30" />
                  <div className="h-3 w-1/2 mt-2 rounded-md bg-card/40 border border-border/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 h-64">
          <div className="h-4 w-24 rounded-md bg-card/60 border border-border/30" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card/60 border border-border/30 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3.5 w-2/3 rounded-md bg-card/60 border border-border/30" />
                  <div className="h-3 w-1/3 mt-2 rounded-md bg-card/40 border border-border/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
