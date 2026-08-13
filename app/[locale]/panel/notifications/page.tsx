"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const bellIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const checkIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function PanelNotificationsPage() {
  const t = useTranslations("panel");
  const items = t.raw("notif") as {
    title: string;
    description: string;
    time: string;
  }[];
  const [read, setRead] = useState<boolean[]>(() =>
    items.map((_, i) => i >= 2),
  );

  const unreadCount = read.filter((r) => !r).length;

  const markAll = () => setRead(items.map(() => true));
  const toggle = (i: number) =>
    setRead((prev) => prev.map((r, j) => (j === i ? !r : r)));

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {t("notifTitle")}
          </h1>
          <p className="text-xs text-muted mt-1">
            {unreadCount > 0
              ? `${unreadCount} ${t("notifications")}`
              : t("notifEmpty")}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-accent/10 border border-accent/25 text-accent hover:opacity-90 transition-all duration-300">
            {checkIcon}
            {t("notifMarkAll")}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isRead = read[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={`w-full flex items-start gap-4 rounded-2xl border p-4 text-start transition-all duration-300 hover:border-accent/30 ${
                isRead
                  ? "bg-surface/60 border-border/30"
                  : "bg-accent/[0.06] border-accent/25"
              }`}>
              <div
                className={`mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                  isRead
                    ? "bg-card/60 border-border/40 text-muted"
                    : "bg-accent/10 border-accent/25 text-accent"
                }`}>
                {isRead ? checkIcon : bellIcon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isRead
                        ? "text-muted"
                        : "text-foreground"
                    }`}>
                    {item.title}
                  </span>
                  {!isRead && (
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted mt-1">{item.description}</p>
              </div>
              <span className="text-[10px] text-muted flex-shrink-0">
                {item.time}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}