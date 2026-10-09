const styles: Record<string, string> = {
  Delivered: "bg-success-bg text-success",
  Dispatched: "bg-mist-light text-primary",
  "Pending Review": "bg-coral-light/50 text-primary",
  "Pending Verification": "bg-coral-light/50 text-primary",
  Cancelled: "bg-danger/10 text-danger",
  Healthy: "bg-success-bg text-success",
  Low: "bg-coral-light/50 text-primary",
  Critical: "bg-danger/10 text-danger",
  Draft: "bg-bg-secondary text-text-muted",
  Live: "bg-success-bg text-success",
  Published: "bg-success-bg text-success",
  Scheduled: "bg-mist-light text-primary",
  "Gold Patron": "bg-coral-light/50 text-primary",
  "Silver Patron": "bg-bg-secondary text-text-secondary",
  Platinum: "bg-primary text-white",
};

export function Pill({ value }: { value: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${styles[value] ?? "bg-bg-secondary text-text-secondary"}`}>
      {value}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-plum">{eyebrow}</div>
        <h1 className="font-display text-[26px] lg:text-[32px] font-semibold tracking-tight">{title}</h1>
        {sub && <p className="text-[13px] text-text-secondary mt-0.5">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
