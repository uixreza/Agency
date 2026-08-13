import { useTranslations } from "next-intl";

export default function PanelPlaceholder({ section }: { section: string }) {
  const t = useTranslations("panel");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-2xl blur-xl bg-accent/20 -z-10 scale-150 opacity-50" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {t(section as "analytics")}
        </h2>
        <p className="text-sm text-muted mt-2">{t("comingSoon")}</p>
      </div>
    </div>
  );
}