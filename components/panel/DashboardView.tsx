"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePanel } from "@/components/panel/PanelProvider";
import CompanyWizard from "@/components/panel/CompanyWizard";
import StatusBadge from "@/components/panel/StatusBadge";
import {
  formatPrice,
  nextBillingDate,
  timeAgo,
} from "@/lib/panel-data";

const icons = {
  active: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  progress: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  pending: (
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
  monthly: (
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
};

function WizardHeader({ onClose }: { onClose: () => void }) {
  const t = useTranslations("panel");
  return (
    <div className="flex items-start justify-between gap-3 px-5 sm:px-8 pt-6 pb-0">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/25 flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-foreground">
            {t("companySetupTitle")}
          </h1>
          <p className="text-xs text-muted mt-0.5">{t("companySetupDesc")}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={t("close")}
        className="w-8 h-8 rounded-lg bg-card/60 border border-border/50 flex items-center justify-center text-muted hover:text-foreground transition-colors flex-shrink-0">
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
  );
}

export default function DashboardView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state, createCompany } = usePanel();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!state.company) {
    return (
      <div className="py-10 flex justify-center">
        {wizardOpen && (
          <div
            onClick={() => setWizardOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
          />
        )}
        <AnimatePresence mode="wait">
          {!wizardOpen ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-xl rounded-xl border border-accent/30 bg-surface p-4 flex items-center gap-4 shadow-lg shadow-accent/10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accentDark flex items-center justify-center flex-shrink-0 shadow-md shadow-accent/25">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {t("onboardingTitle")}
                </p>
                <p className="text-xs text-muted truncate">
                  {t("onboardingHint")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWizardOpen(true)}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-[13px] font-semibold text-black bg-accent hover:opacity-85 transition-opacity flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
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
                {t("onboardingCta")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 80, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:relative sm:inset-x-auto sm:bottom-auto sm:z-auto sm:max-h-none sm:overflow-visible sm:rounded-3xl w-full max-w-xl bg-surface/95 sm:bg-surface/80 backdrop-blur-2xl border-t sm:border border-accent/25 shadow-2xl shadow-accent/10">
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 rounded-full bg-border/70" />
              </div>
              <WizardHeader onClose={() => setWizardOpen(false)} />
              <div className="px-5 sm:px-8 pt-4 pb-6 sm:pb-8">
                <CompanyWizard onSubmit={createCompany} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const company = state.company;
  const industries = t.raw("companyIndustries") as string[];
  const sizes = t.raw("teamSizes") as string[];
  const activeTasks = state.tasks.filter((task) => task.active);
  const inProgress = activeTasks.filter(
    (task) => task.status === "progress" || task.status === "review",
  ).length;
  const pendingCount = activeTasks.filter(
    (task) => task.status === "pending",
  ).length;
  const monthlyTotal = activeTasks
    .filter((task) => task.kind === "monthly")
    .reduce((sum, task) => sum + task.monthlyPrice, 0);
  const billingDate = nextBillingDate().toLocaleDateString(
    locale === "fa" ? "fa-IR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const recent = [...state.tasks]
    .filter((task) => task.note)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 4);

  const stats = [
    {
      key: t("statActive"),
      value: String(activeTasks.length),
      icon: icons.active,
      tone: "text-accent bg-accent/10 border-accent/25",
    },
    {
      key: t("statInProgress"),
      value: String(inProgress),
      icon: icons.progress,
      tone: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
    },
    {
      key: t("statPending"),
      value: String(pendingCount),
      icon: icons.pending,
      tone: "text-warm bg-warm/10 border-warm/25",
    },
    {
      key: t("statMonthly"),
      value: formatPrice(monthlyTotal, locale),
      icon: icons.monthly,
      tone: "text-purple-400 bg-purple-400/10 border-purple-400/25",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Getting started — no services yet */}
      {activeTasks.length === 0 && (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-foreground">
                {t("setupTitle")}
              </h2>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                {t("setupDesc")}
              </p>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-accent text-bg flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {t("setupCompany")}
                </span>
                <span className="text-border/60">—</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full border border-border/60 text-muted flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5"
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
                  </span>
                  {t("setupService")}
                </span>
              </div>
            </div>
            <Link
              href="/panel/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm btn-primary flex-shrink-0">
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
              {t("quickRequest")}
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="relative overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs text-muted truncate">{stat.key}</div>
                <div className="mt-2 text-2xl font-bold text-foreground truncate">
                  {stat.value}
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${stat.tone}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
          <div className="text-sm font-semibold text-foreground mb-4">
            {t("quickTitle")}
          </div>
          <div className="space-y-3">
            <Link
              href="/panel/projects"
              className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/10 px-4 py-3.5 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/15">
              <svg
                className="w-5 h-5"
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
              {t("quickRequest")}
            </Link>
            <Link
              href="/panel/messages"
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3.5 text-sm font-medium text-muted transition-all duration-300 hover:text-foreground hover:border-border">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {t("quickChat")}
            </Link>
          </div>
        </div>

        <Link
          href="/panel/billing"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accentDark p-5 text-black transition-shadow duration-300">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full border-[32px] border-black/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-20 w-56 h-56 rounded-full bg-white/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 w-10 h-7 rounded-md border border-black/10 bg-black/15"
          >
            <div className="mx-1 mt-1 h-px bg-black/30" />
            <div className="flex gap-1 px-1 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-black/20" />
              <div className="w-2 h-2 rounded-full bg-black/20" />
            </div>
          </div>

          <div className="relative flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h2m4 0h4M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-sm font-bold">{t("billingTitle")}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
              </span>
              {t("billingStatus", { date: billingDate })}
            </span>
          </div>

          <div className="relative flex items-end gap-2">
            <span className="text-4xl leading-none font-black tracking-tight">
              {formatPrice(monthlyTotal, locale)}
            </span>
            <span className="mb-1.5 text-xs font-semibold text-black/70">
              {t("billingPerMonth")}
            </span>
          </div>

          <div className="relative mt-3 text-xs font-semibold text-black/80">
            {activeTasks.length} {t("billingSubscriptions")}
          </div>

          <div className="relative mt-3 flex items-center justify-between gap-3 border-t border-black/10 pt-3">
            <span className="text-[11px] font-medium leading-relaxed text-black/60">
              {t("billingNote")}
            </span>
            <svg
              className="w-4 h-4 text-black/50 flex-shrink-0 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* Recent updates */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            {t("recentTitle")}
          </h2>
          <Link
            href="/panel/projects"
            className="text-xs text-accent hover:text-accentDark transition-colors">
            {t("viewAllTasks")}
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-muted">{t("recentEmpty")}</p>
        ) : (
          <div className="space-y-3">
            {recent.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-xl border border-border/30 p-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">
                      {t(`catalog.${task.serviceId}.title`)}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">
                    {task.note}
                  </p>
                </div>
                <span className="text-[10px] text-muted flex-shrink-0">
                  {timeAgo(task.updatedAt, locale)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Company card */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center text-white font-black text-lg shadow-lg shadow-accent/20">
            {company.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground">
              {company.name}
            </div>
            <div className="text-xs text-muted">
              {industries[Number(company.industry)] ?? ""} ·{" "}
              {sizes[Number(company.teamSize)] ?? ""}
            </div>
          </div>
          <Link
            href="/panel/settings"
            className="ms-auto text-xs text-accent hover:text-accentDark transition-colors flex-shrink-0">
            {t("settings")}
          </Link>
        </div>
      </div>
    </div>
  );
}