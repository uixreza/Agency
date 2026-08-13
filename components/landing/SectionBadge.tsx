interface SectionBadgeProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({
  icon,
  children,
  className = "",
}: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pe-4 ps-2 text-sm font-medium text-accent border border-accent/20 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent shadow-[0_0_24px_rgba(0,229,204,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm ${className}`}>
      {icon && (
        <span className="grid place-items-center w-6 h-6 rounded-full bg-accent/15 border border-accent/25 text-accent shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
