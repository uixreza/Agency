"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePanel } from "@/components/panel/PanelProvider";
import StatusBadge from "@/components/panel/StatusBadge";
import {
  TASK_SERVICES,
  formatPrice,
  timeAgo,
  type PanelTask,
  type TaskServiceId,
} from "@/lib/panel-data";

type Tab = "active" | "pending" | "disabled";

const serviceIcons: Record<TaskServiceId, string> = {
  web: "🌐",
  app: "📱",
  aiVideo: "🎬",
  aiImage: "🎨",
  social: "📣",
  ads: "📈",
  seo: "🔍",
  email: "✉️",
};

export default function TasksView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state, requestTask, cancelRequest, deactivateTask, reactivateTask } =
    usePanel();
  const [tab, setTab] = useState<Tab>("active");
  const [serviceTab, setServiceTab] = useState<"build" | "management">("build");
  const [requestOpen, setRequestOpen] = useState(false);
  const [confirmTask, setConfirmTask] = useState<{
    task: PanelTask;
    mode: "deactivate" | "cancel";
  } | null>(null);

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

  const renderableTasks = (filter: Tab) =>
    state.tasks.filter((task) => {
      if (filter === "active")
        return task.active && task.status !== "pending";
      if (filter === "pending") return task.active && task.status === "pending";
      return !task.active;
    });

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "active", label: t("tabActive"), count: renderableTasks("active").length },
    { id: "pending", label: t("tabPending"), count: renderableTasks("pending").length },
    { id: "disabled", label: t("tabDisabled"), count: renderableTasks("disabled").length },
  ];

  const requestedIds = new Set(
    state.tasks.filter((task) => task.active).map((task) => task.serviceId),
  );

  const confirmLabels: Record<"deactivate" | "cancel", { title: string; desc: string }> = {
    deactivate: {
      title: t("confirmDeactivateTitle", {
        service: confirmTask
          ? t(`catalog.${confirmTask.task.serviceId}.title`)
          : "",
      }),
      desc: t("confirmDeactivateDesc"),
    },
    cancel: {
      title: t("confirmCancelTitle"),
      desc: t("confirmCancelDesc"),
    },
  };

  const runConfirm = () => {
    if (!confirmTask) return;
    if (confirmTask.mode === "deactivate")
      deactivateTask(confirmTask.task.id);
    else cancelRequest(confirmTask.task.id);
    setConfirmTask(null);
  };

  const renderTaskCard = (task: PanelTask, pending = false) => (
    <div
      key={task.id}
      className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-11 h-11 rounded-xl bg-card/60 border border-border/50 items-center justify-center text-lg flex-shrink-0">
          {serviceIcons[task.serviceId]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">
              {t(`catalog.${task.serviceId}.title`)}
            </h3>
            <StatusBadge status={task.status} className="ms-auto" />
          </div>
          <p className="text-xs text-muted mt-1.5 leading-relaxed">
            {task.note}
          </p>

          {task.status !== "pending" && task.active && (
            task.kind === "oneTime" ? (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-muted mb-1.5">
                  <span>
                    {t("taskProgress")} · {task.progress}%
                  </span>
                  <span>
                    {t("taskLastUpdate")}{" "}
                    {timeAgo(task.updatedAt, locale)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-card border border-border/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accentDark"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent bg-accent/10 border border-accent/25 rounded-full px-2.5 py-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h5M20 20v-5h-5M4.63 15.63A9 9 0 0015.63 19.37M19.37 8.37A9 9 0 008.37 4.63"
                    />
                  </svg>
                  {t("taskRecurring")}
                </span>
              </div>
            )
          )}

          {!task.active && task.deactivatedAt && (
            <div className="text-[11px] text-muted mt-2">
              {t("taskDisabledOn", {
                date: new Date(task.deactivatedAt).toLocaleDateString(
                  locale === "fa" ? "fa-IR" : "en-US",
                ),
              })}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm font-bold text-accent">
              {formatPrice(task.monthlyPrice, locale)}
              <span className="text-[11px] font-medium text-muted">
                {" "}
                {task.kind === "oneTime"
                  ? t("taskPerOnce")
                  : t("taskPerMonth")}
              </span>
            </span>
            <div className="ms-auto flex items-center gap-2">
              {!task.active ? (
                <button
                  type="button"
                  onClick={() => reactivateTask(task.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-accent/10 border border-accent/25 text-accent transition-all duration-300 hover:bg-accent/15">
                  {t("taskReactivate")}
                </button>
              ) : pending ? (
                <>
                  <Link
                    href="/panel/messages"
                    className="px-3.5 py-2 rounded-xl text-xs font-medium border border-border/50 text-muted hover:text-foreground transition-colors">
                    {t("taskChat")}
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmTask({ task, mode: "cancel" })
                    }
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-warm/10 border border-warm/25 text-warm transition-all duration-300 hover:bg-warm/15">
                    {t("cancelRequest")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/panel/messages"
                    className="p-2 rounded-lg text-muted border border-border/50 hover:text-accent hover:border-accent/30 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmTask({ task, mode: "deactivate" })
                    }
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-warm/10 border border-warm/25 text-warm transition-all duration-300 hover:bg-warm/15">
                    {t("taskDeactivate")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{t("tasksTitle")}</h1>
          <p className="text-xs text-muted mt-1">
            {t("tasksSubtitle", { company: state.company?.name ?? "" })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRequestOpen(true)}
          disabled={!state.company}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold btn-primary">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {t("requestNewTask")}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-card/50 border border-border/50 rounded-xl p-1 gap-1 w-full sm:w-auto">
        {tabs.map((tabsItem) => (
          <button
            key={tabsItem.id}
            type="button"
            onClick={() => setTab(tabsItem.id)}
            className={`relative flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 ${
              tab === tabsItem.id
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}>
            {tab === tabsItem.id && (
              <motion.span
                layoutId="tasks-tab-pill"
                className="absolute inset-0 rounded-lg bg-accent/15 border border-accent/25"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tabsItem.label}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-card border border-border/60">
                {tabsItem.count}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Task grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {renderableTasks(tab).map((task, i) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}>
              {renderTaskCard(task, task.status === "pending")}
            </motion.div>
          ))}
        </AnimatePresence>

        {renderableTasks(tab).length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center">
            <div className="text-3xl mb-3">
              {tab === "disabled" ? "🗄️" : tab === "pending" ? "⏳" : "📭"}
            </div>
            <p className="text-sm text-muted">
              {tab === "active"
                ? t("taskNoActive")
                : tab === "pending"
                  ? t("taskNoPending")
                  : t("taskNoDisabled")}
            </p>
          </div>
        )}
      </div>

      {/* Request task modal */}
      <AnimatePresence>
        {requestOpen && (
          <div className="fixed inset-0 z-[85]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setRequestOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute inset-x-0 bottom-0 sm:inset-0 sm:m-auto sm:max-h-[85vh] sm:max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-surface/95 backdrop-blur-2xl border-t sm:border border-border/50 shadow-2xl shadow-black/30">
              <div className="sm:hidden w-12 h-1.5 rounded-full bg-border/70 mx-auto mt-3" />
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {t("requestModalTitle")}
                    </h2>
                    <p className="text-xs text-muted mt-1">
                      {t("requestModalDesc")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestOpen(false)}
                    className="w-8 h-8 rounded-lg bg-card/60 border border-border/50 flex items-center justify-center text-muted hover:text-foreground transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex bg-card/50 border border-border/50 rounded-xl p-1 gap-1 mt-5">
                  {(
                    [
                      ["build", t("serviceTabBuild")],
                      ["management", t("serviceTabManagement")],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setServiceTab(id)}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        serviceTab === id
                          ? "bg-accent text-black shadow"
                          : "text-muted hover:text-foreground"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {TASK_SERVICES.filter((s) =>
                    serviceTab === "build"
                      ? s.kind === "oneTime"
                      : s.kind === "monthly",
                  ).map((service) => {
                    const requested = requestedIds.has(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        disabled={requested}
                        onClick={() => {
                          requestTask(service.id);
                          setRequestOpen(false);
                        }}
                        className={`text-start rounded-2xl border p-4 transition-all duration-300 ${
                          requested
                            ? "opacity-40 cursor-not-allowed border-border/40"
                            : "border-border/50 bg-card/40 hover:border-accent/30 hover:bg-accent/5"
                        }`}>
                        <div className="text-xl mb-2">
                          {serviceIcons[service.id]}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {t(`catalog.${service.id}.title`)}
                        </div>
                        <div className="text-[11px] text-muted mt-1 leading-relaxed">
                          {t(`catalog.${service.id}.desc`)}
                        </div>
                        <div className="text-sm font-bold text-accent mt-2">
                          {formatPrice(service.price, locale)}
                          <span className="text-[11px] font-medium text-muted">
                            {" "}
                            {service.kind === "oneTime"
                              ? t("taskPerOnce")
                              : t("taskPerMonth")}
                          </span>
                        </div>
                        {requested && (
                          <div className="text-[11px] text-muted mt-1.5">
                            ✓ {t("taskAlreadyRequested")}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm dialog */}
      <AnimatePresence>
        {confirmTask && (
          <div className="fixed inset-0 z-[86]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setConfirmTask(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute inset-0 sm:flex sm:items-center sm:justify-center sm:p-4 pointer-events-none">
              <div className="absolute inset-x-0 bottom-0 sm:relative sm:inset-auto pointer-events-auto w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl bg-surface/95 backdrop-blur-2xl border-t sm:border border-border/50 p-6 shadow-2xl shadow-black/30">
                <div className="sm:hidden w-12 h-1.5 rounded-full bg-border/70 mx-auto mb-4" />
                <div className="text-2xl mb-3">
                  {confirmTask.mode === "deactivate" ? "⏸️" : "🗑️"}
                </div>
                <h3 className="text-base font-bold text-foreground mb-1.5">
                  {confirmLabels[confirmTask.mode].title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-6">
                  {confirmLabels[confirmTask.mode].desc}
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmTask(null)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium border border-border/50 text-muted hover:text-foreground transition-colors">
                    {t("close")}
                  </button>
                  <button
                    type="button"
                    onClick={runConfirm}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all duration-300 ${
                      confirmTask.mode === "deactivate"
                        ? "bg-warm hover:opacity-90 shadow-lg shadow-warm/20"
                        : "btn-primary"
                    }`}>
                    {t("confirm")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}