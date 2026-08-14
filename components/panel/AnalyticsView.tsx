"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePanel } from "@/components/panel/PanelProvider";
import StatusBadge from "@/components/panel/StatusBadge";
import { formatPrice, type TaskStatus } from "@/lib/panel-data";

const STATUS_COLORS: Record<TaskStatus, string> = {
  pending: "#ff6b4a",
  queue: "#818cf8",
  progress: "#00e5cc",
  review: "#c084fc",
  completed: "#4ade80",
};

export default function AnalyticsView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state } = usePanel();

  if (!state.company) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-foreground">
          {t("lockedTitle")}
        </h2>
        <p className="text-sm text-muted mt-1.5 max-w-sm mx-auto leading-relaxed">
          {t("lockedDesc")}
        </p>
        <Link
          href="/panel"
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl font-semibold text-sm btn-primary">
          {t("lockedCta")}
        </Link>
      </div>
    );
  }

  const activeTasks = state.tasks.filter((task) => task.active);
  const disabledTasks = state.tasks.filter((task) => !task.active);
  const monthlySpend = activeTasks
    .filter((task) => task.kind === "monthly")
    .reduce((sum, task) => sum + task.monthlyPrice, 0);

  const statusOrder: TaskStatus[] = [
    "pending",
    "queue",
    "progress",
    "review",
    "completed",
  ];
  const statusCounts = statusOrder.map((status) => ({
    status,
    count: activeTasks.filter((task) => task.status === status).length,
  }));
  const total = activeTasks.length || 1;

  const donutSegments = statusCounts
    .filter((item) => item.count > 0)
    .map((item) => {
      const start = statusOrder.indexOf(item.status);
      const offset = statusOrder
        .slice(0, start)
        .reduce((sum, s) => sum + statusCounts.find((x) => x.status === s)!.count / total, 0);
      return {
        status: item.status,
        angle: (item.count / total) * 360,
        offset,
      };
    });

  const donutBackground = donutSegments
    .map((seg) => {
      const from = seg.offset * 360;
      const to = (seg.offset + seg.angle / 360) * 360;
      return `${STATUS_COLORS[seg.status]} ${from}deg ${to}deg`;
    })
    .join(", ");

  const progressList = [...activeTasks]
    .filter((task) => task.status !== "pending")
    .sort((a, b) => b.progress - a.progress);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">
          {t("analyticsTitle")}
        </h1>
        <p className="text-xs text-muted mt-1">{t("analyticsSubtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Donut */}
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
          <div className="text-sm font-semibold text-foreground mb-4">
            {t("analyticsStatusDist")}
          </div>
          <div className="flex items-center gap-5">
            <div
              className="relative w-32 h-32 rounded-full flex-shrink-0"
              style={{
                background: `conic-gradient(${donutBackground})`,
              }}>
              <div className="absolute inset-3 rounded-full bg-surface flex flex-col items-center justify-center border border-border/40">
                <span className="text-2xl font-black text-foreground">
                  {activeTasks.length}
                </span>
                <span className="text-[10px] text-muted">
                  {t("statActive")}
                </span>
              </div>
            </div>
            <div className="space-y-2 min-w-0">
              {statusCounts.map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: STATUS_COLORS[item.status] }}
                  />
                  <span className="text-[11px] text-muted truncate">
                    {t(`status.${item.status}`)}
                  </span>
                  <span className="text-[11px] font-bold text-foreground ms-auto">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spend */}
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
          <div className="text-sm font-semibold text-foreground mb-4">
            {t("analyticsSpend")}
          </div>
          <div className="text-3xl font-black text-foreground">
            {formatPrice(monthlySpend, locale)}
          </div>
          <div className="text-xs text-muted mt-1">
            {t("billingRate")} · {activeTasks.length} {t("billingSubscriptions")}
          </div>
          <div className="mt-4 aspect-video rounded-xl border border-border/40 bg-card/40 p-4">
            <div className="flex items-end gap-1.5 h-full">
              {activeTasks.map((task) => {
                const height = Math.max(
                  12,
                  (task.monthlyPrice / Math.max(monthlySpend, 1)) * 100,
                );
                return (
                  <motion.div
                    key={task.id}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex-1 min-w-0 rounded-t-md bg-gradient-to-t from-accent/40 to-accent"
                    title={`${t(`catalog.${task.serviceId}.title`)} — ${formatPrice(task.monthlyPrice, locale)}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
          <div className="text-sm font-semibold text-foreground mb-4">
            {t("analyticsProgress")}
          </div>
          <div className="space-y-4">
            {progressList.length === 0 ? (
              <p className="text-xs text-muted">{t("analyticsNoData")}</p>
            ) : (
              progressList.slice(0, 5).map((task) => (
                <div key={task.id}>
                  <div className="flex items-center justify-between text-[11px] mb-1.5 gap-2">
                    <span className="text-muted truncate">
                      {t(`catalog.${task.serviceId}.title`)}
                    </span>
                    <span className="font-bold text-foreground flex-shrink-0">
                      {task.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-card border border-border/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accentDark"
                    />
                  </div>
                </div>
              ))
            )}
            {disabledTasks.length > 0 && (
              <div className="pt-3 border-t border-border/40">
                <div className="text-[11px] text-muted">
                  {disabledTasks.length} {t("tabDisabled")} ·{" "}
                  {t("billingNote")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full progress list */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <div className="text-sm font-semibold text-foreground mb-4">
          {t("analyticsProgress")}
        </div>
        <div className="space-y-3">
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 rounded-xl border border-border/30 p-3.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">
                    {t(`catalog.${task.serviceId}.title`)}
                  </span>
                  <StatusBadge status={task.status} />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-card border border-border/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accentDark"
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground w-10 text-end">
                    {task.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}