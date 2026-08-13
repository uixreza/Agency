import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { ReactNode } from "react";

const stats: {
  key: string;
  valueKey: string;
  icon: ReactNode;
}[] = [
  {
    key: "statProjects",
    valueKey: "statValueProjects",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  },
  {
    key: "statRevenue",
    valueKey: "statValueRevenue",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "statClients",
    valueKey: "statValueClients",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "statHours",
    valueKey: "statValueHours",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default async function PanelHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);
  const t = await getTranslations("panel");

  const notifications = t.raw("notif") as {
    title: string;
    description: string;
    time: string;
  }[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            className="group relative overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                i % 2 === 0 ? "bg-accent/5" : "bg-warm/5"
              }`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs text-muted">{t(stat.key)}</div>
                <div className="mt-2 text-2xl font-bold text-foreground">
                  {t(stat.valueKey)}
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  i % 2 === 0
                    ? "bg-accent/10 border-accent/25 text-accent"
                    : "bg-warm/10 border-warm/25 text-warm"
                }`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            {t("notifTitle")}
          </h2>
          <span className="text-[10px] text-muted">
            {notifications.length} · {t("notifications")}
          </span>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/30 p-3 transition-colors duration-300 hover:border-accent/30">
              <div
                className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  i < 2 ? "bg-accent" : "bg-border"
                }`}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {item.title}
                </div>
                <div className="text-xs text-muted truncate">
                  {item.description}
                </div>
              </div>
              <span className="ms-auto text-[10px] text-muted flex-shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}