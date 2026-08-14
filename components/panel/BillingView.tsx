"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePanel } from "@/components/panel/PanelProvider";
import {
  formatPrice,
  formatDate,
  nextBillingDate,
} from "@/lib/panel-data";

const taskEmoji = (serviceId: string) => {
  const map: Record<string, string> = {
    web: "🌐",
    app: "📱",
    aiVideo: "🎬",
    aiImage: "🎨",
    social: "📣",
    ads: "📈",
    seo: "🔍",
    email: "✉️",
  };
  return map[serviceId] ?? "📄";
};

type PaymentMethod = "iran" | "intl";

export default function BillingView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state } = usePanel();
  const [method, setMethod] = useState<PaymentMethod>("iran");

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
              d="M3 10h18M7 15h2m4 0h4m-13 5h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
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
  const monthlyTasks = activeTasks.filter((task) => task.kind === "monthly");
  const oneTimeTasks = activeTasks.filter((task) => task.kind === "oneTime");
  const monthlyTotal = monthlyTasks.reduce(
    (sum, task) => sum + task.monthlyPrice,
    0,
  );
  const oneTimeTotal = oneTimeTasks.reduce(
    (sum, task) => sum + task.monthlyPrice,
    0,
  );
  const billingDate = nextBillingDate();

  const statCards = [
    {
      key: "subscription",
      label: t("billingSubscription"),
      value: formatPrice(monthlyTotal, locale),
      sub: t("billingPerMonth"),
    },
    {
      key: "oneTime",
      label: t("serviceTypeOneTime"),
      value: formatPrice(oneTimeTotal, locale),
      sub: t("taskPerOnce"),
    },
    {
      key: "nextCharge",
      label: t("billingNextCharge"),
      value: formatDate(billingDate, locale),
      sub: t("billingEndOfMonth"),
    },
    {
      key: "services",
      label: t("billingActiveServices"),
      value: String(activeTasks.length),
      sub:
        disabledTasks.length > 0
          ? t("billingDisabledCount", { count: disabledTasks.length })
          : "",
    },
  ];

  const checkIcon = (
    <svg
      className="w-3 h-3"
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
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">
          {t("billingTitle")}
        </h1>
        <p className="text-sm text-muted mt-1">{t("billingSubtitle")}</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5">
            <div className="text-xs text-muted">{card.label}</div>
            <div className="text-lg sm:text-xl font-bold text-foreground mt-1.5 leading-tight break-words">
              {card.value}
            </div>
            {card.sub && (
              <div className="text-[11px] text-muted mt-1">{card.sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-foreground">
          {t("billingPaymentTitle")}
        </h2>
        <p className="text-xs text-muted mt-1">{t("billingPaymentDesc")}</p>

        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          {/* Iran — bank card */}
          <button
            type="button"
            onClick={() => setMethod("iran")}
            aria-pressed={method === "iran"}
            className={`relative flex flex-col gap-4 rounded-2xl border p-5 text-start transition-all duration-300 ${
              method === "iran"
                ? "border-accent/50 bg-accent/5"
                : "border-border/50 bg-card/40 hover:border-border"
            }`}>
            <span
              className={`absolute top-4 end-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                method === "iran"
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-transparent"
              }`}>
              {checkIcon}
            </span>
            <div className="pe-8">
              <div className="text-sm font-semibold text-foreground">
                {t("billingMethodIran")}
              </div>
              <div className="text-xs text-muted mt-0.5 leading-relaxed">
                {t("billingMethodIranDesc")}
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-accent to-accentDark p-4 shadow-lg shadow-accent/20">
              <div className="flex items-center justify-between">
                <svg
                  className="w-7 h-7 text-white/80"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <rect x="1" y="6" width="22" height="12" rx="2.5" />
                  <rect x="4" y="9" width="4" height="4" rx="1" />
                </svg>
                <span className="text-[10px] font-bold tracking-widest text-white/70">
                  IR
                </span>
              </div>
              <div className="text-white font-mono text-sm tracking-[0.2em] mt-4">
                6219&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;4242
              </div>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/60">
                    {t("billingCardHolder")}
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {state.company.ownerName}
                  </div>
                </div>
                <div className="text-xs font-mono text-white/80">09/29</div>
              </div>
            </div>
          </button>

          {/* International — online transfer */}
          <button
            type="button"
            onClick={() => setMethod("intl")}
            aria-pressed={method === "intl"}
            className={`relative flex flex-col gap-4 rounded-2xl border p-5 text-start transition-all duration-300 ${
              method === "intl"
                ? "border-accent/50 bg-accent/5"
                : "border-border/50 bg-card/40 hover:border-border"
            }`}>
            <span
              className={`absolute top-4 end-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                method === "intl"
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-transparent"
              }`}>
              {checkIcon}
            </span>
            <div className="flex items-start gap-3 pe-8">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21h18M4 21V10m5 11V10m6 11V10m5 11V10M2 10h20l-4-5-4 5-4-5-4 5-4-5-4 5z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  {t("billingMethodIntl")}
                </div>
                <div className="text-xs text-muted mt-0.5 leading-relaxed">
                  {t("billingMethodIntlDesc")}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-card/60 border border-border/50 px-2.5 py-1.5 font-mono text-[11px] text-muted">
                IBAN&nbsp;GB29••••••4242
              </span>
              <span className="rounded-lg bg-card/60 border border-border/50 px-2.5 py-1.5 font-mono text-[11px] text-muted">
                BIC&nbsp;NOVINFX22
              </span>
            </div>
          </button>
        </div>

        <p className="text-[11px] text-muted mt-4">{t("billingPayNote")}</p>
      </div>

      {/* Upcoming charges */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-sm font-bold text-foreground">
            {t("billingUpcoming")}
          </h2>
          <span className="text-xs text-muted">
            {t("billingDueOn", { date: formatDate(billingDate, locale) })}
          </span>
        </div>

        {activeTasks.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border/60 p-8 text-center">
            <div className="text-2xl">💳</div>
            <p className="text-sm text-muted mt-2">
              {t("setupDesc")}
            </p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-border/40">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className="w-9 h-9 rounded-xl bg-card/60 border border-border/50 flex items-center justify-center text-lg flex-shrink-0">
                  {taskEmoji(task.serviceId)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">
                    {t(`catalog.${task.serviceId}.title`)}
                  </div>
                  <div className="text-[11px] text-muted">
                    {task.kind === "oneTime"
                      ? t("billingOneTimeItem")
                      : t("billingMonthlyItem")}{" "}
                    · {formatPrice(task.monthlyPrice, locale)}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {formatPrice(task.monthlyPrice, locale)}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-warm/10 border border-warm/25 text-warm">
                    {t("billingDueBadge")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-border/40">
          <span className="text-sm font-medium text-muted">
            {t("billingTotalMonthly")}
          </span>
          <span className="text-lg font-bold text-accent">
            {formatPrice(monthlyTotal, locale)}
          </span>
        </div>
        {oneTimeTotal > 0 && (
          <div className="flex items-center justify-between gap-3 mt-2">
            <span className="text-sm font-medium text-muted">
              {t("billingOneTimeTotal")}
            </span>
            <span className="text-base font-bold text-foreground">
              {formatPrice(oneTimeTotal, locale)}
            </span>
          </div>
        )}
      </div>

      {disabledTasks.length > 0 && (
        <p className="text-xs text-muted">
          {t("billingStoppedNote", { count: disabledTasks.length })}
        </p>
      )}
    </div>
  );
}
