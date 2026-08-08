"use client";

/**
 * Illustrative UI mockups rendered in CSS — decorative representations of the
 * project interfaces, not screenshots of live sites.
 */

function Chrome({
  url,
  accent,
  children,
}: {
  url: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900/90 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-white/8 bg-black/30 px-3 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span className="truncate text-[11px] text-white/40">{url}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-ink-800 to-ink-950">
        {children}
      </div>
    </div>
  );
}

export function EcommerceMockup({ accent }: { accent: string }) {
  return (
    <Chrome url="shop.hariom.dev" accent={accent}>
      <div className="flex h-full flex-col p-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-16 rounded-full bg-white/25" />
          <div className="flex gap-2">
            <div className="h-2 w-8 rounded-full bg-white/12" />
            <div className="h-2 w-8 rounded-full bg-white/12" />
            <div
              className="h-4 w-4 rounded-full"
              style={{ background: accent }}
            />
          </div>
        </div>
        {/* hero banner */}
        <div
          className="mt-3 flex h-1/3 flex-col justify-center gap-2 rounded-lg p-3"
          style={{
            background: `linear-gradient(120deg, ${accent}33, transparent)`,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="h-2 w-24 rounded-full bg-white/30" />
          <div className="h-1.5 w-32 rounded-full bg-white/12" />
          <div
            className="mt-1 h-4 w-14 rounded-md"
            style={{ background: accent }}
          />
        </div>
        {/* product grid */}
        <div className="mt-3 grid flex-1 grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] p-2"
            >
              <div className="flex-1 rounded-md bg-white/[0.06]" />
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="flex items-center justify-between">
                <div
                  className="h-1.5 w-6 rounded-full"
                  style={{ background: accent }}
                />
                <div className="h-3 w-3 rounded-full bg-white/12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function JobPortalMockup({ accent }: { accent: string }) {
  return (
    <Chrome url="jobsindelhincr.in" accent={accent}>
      <div className="flex h-full flex-col p-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-md"
              style={{ background: accent }}
            />
            <div className="h-2.5 w-12 rounded-full bg-white/25" />
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-10 rounded-full bg-white/12" />
            <div className="h-4 w-4 rounded-full bg-white/15" />
          </div>
        </div>
        {/* search bar */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2">
          <div className="h-2 flex-1 rounded-full bg-white/12" />
          <div
            className="h-4 w-10 rounded-md"
            style={{ background: accent }}
          />
        </div>
        {/* job listings */}
        <div className="mt-3 flex flex-1 gap-2">
          <div className="flex w-2/3 flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-2"
                style={i === 0 ? { borderColor: `${accent}66` } : {}}
              >
                <div
                  className="h-6 w-6 rounded-md"
                  style={{ background: i === 0 ? accent : "rgba(255,255,255,0.1)" }}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-1.5 w-20 rounded-full bg-white/22" />
                  <div className="h-1.5 w-12 rounded-full bg-white/10" />
                </div>
                <div className="h-3 w-8 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="flex w-1/3 flex-col gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] p-2">
            <div className="h-8 w-8 self-center rounded-full bg-white/12" />
            <div className="mx-auto h-1.5 w-12 rounded-full bg-white/18" />
            <div className="mx-auto h-1.5 w-8 rounded-full bg-white/10" />
            <div
              className="mt-1 h-3 w-full rounded-md"
              style={{ background: `${accent}cc` }}
            />
          </div>
        </div>
      </div>
    </Chrome>
  );
}
