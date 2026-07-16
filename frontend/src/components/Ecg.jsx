// Signature visual motif for the app: an ECG / pulse trace.
// Used as a section divider, a "live" indicator, and a loading state —
// a heartbeat is the one honest metaphor for a live queue.

export function EcgDivider({ color = "var(--teal)", className = "" }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className={`w-full h-6 ${className}`}
      aria-hidden="true"
    >
      <path
        className="ecg-path"
        d="M0,12 H150 L158,3 L166,21 L174,12 H400"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PulseLoader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <svg viewBox="0 0 300 60" className="w-64 h-14" aria-hidden="true">
        <path
          className="ecg-path"
          d="M0,30 H100 L110,8 L120,52 L130,30 H300"
          fill="none"
          stroke="var(--coral)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p
        className="font-data text-xs tracking-[0.25em] uppercase"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </p>
    </div>
  );
}