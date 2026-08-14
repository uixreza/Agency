"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePanel } from "@/components/panel/PanelProvider";
import { timeAgo } from "@/lib/panel-data";

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

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
}

export default function PanelNotificationsPage() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state } = usePanel();
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());

  const items: NotificationItem[] = useMemo(() => {
    const list: NotificationItem[] = [];

    state.tasks
      .filter((task) => task.active && task.status === "pending")
      .forEach((task) => {
        list.push({
          id: `${task.id}-pending`,
          title: t("notifPendingTitle", {
            task: t(`catalog.${task.serviceId}.title`),
          }),
          desc: t("taskNotePending"),
          time: task.updatedAt,
        });
      });

    state.tasks
      .filter((task) => task.active && task.note)
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 4)
      .forEach((task) => {
        list.push({
          id: `${task.id}-update`,
          title: t("notifUpdateTitle", {
            task: t(`catalog.${task.serviceId}.title`),
          }),
          desc: task.note,
          time: task.updatedAt,
        });
      });

    state.messages
      .filter((msg) => msg.sender === "team")
      .slice()
      .sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      )
      .slice(0, 3)
      .forEach((msg) => {
        list.push({
          id: `${msg.id}-msg`,
          title: t("notifMsgTitle"),
          desc: msg.text,
          time: msg.time,
        });
      });

    return list.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
    );
  }, [state, t]);

  const unreadCount = items.filter((item) => !readIds.has(item.id)).length;

  const markAll = () => setReadIds(new Set(items.map((item) => item.id)));
  const toggle = (item: NotificationItem) =>
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });

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

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-card/60 border border-border/50 flex items-center justify-center text-muted">
            {bellIcon}
          </div>
          <p className="text-sm text-muted">{t("notifEmpty")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isRead = readIds.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item)}
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
                        isRead ? "text-muted" : "text-foreground"
                      }`}>
                      {item.title}
                    </span>
                    {!isRead && (
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1">{item.desc}</p>
                </div>
                <span className="text-[10px] text-muted flex-shrink-0">
                  {timeAgo(item.time, locale)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}