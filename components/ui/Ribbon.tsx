export function Ribbon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rotate-[6deg] rounded-full bg-(--color-accent-deep) px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-(--color-accent-ink) shadow-[0_6px_16px_-6px_rgba(0,0,0,.4)] ${className}`}
    >
      {children}
    </span>
  );
}

export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.3" opacity="0.55">
        <ellipse cx="32" cy="19" rx="7.5" ry="11.5" />
        <ellipse cx="32" cy="45" rx="7.5" ry="11.5" />
        <ellipse cx="19" cy="32" rx="11.5" ry="7.5" />
        <ellipse cx="45" cy="32" rx="11.5" ry="7.5" />
        <circle cx="32" cy="32" r="3.5" />
      </g>
    </svg>
  );
}

export function PillButton({
  href,
  children,
  variant = "filled",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline transition-transform duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "filled"
      ? "bg-(--color-accent-deep) text-(--color-accent-ink) shadow-[0_10px_26px_-10px_rgba(201,116,143,0.6)]"
      : "border border-(--color-ink)/25 text-(--color-ink) hover:border-(--color-ink)/45";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
