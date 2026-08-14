"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePanel } from "@/components/panel/PanelProvider";
import CompanyForm from "@/components/panel/CompanyForm";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-sm text-foreground placeholder:text-muted/60";

const labelClass = "block text-xs font-medium text-muted mb-1.5";

export default function SettingsView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state, updateCompany, createCompany, resetPanel } = usePanel();
  const [name, setName] = useState(state.company?.ownerName ?? "");
  const [email, setEmail] = useState(state.company?.ownerEmail ?? "");
  const [confirmReset, setConfirmReset] = useState(false);

  const company = state.company;

  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateCompany({ ownerName: name.trim(), ownerEmail: email.trim() || undefined });
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    setConfirmReset(false);
    resetPanel();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">{t("settingsTitle")}</h1>
        <p className="text-xs text-muted mt-1">{t("settingsSubtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Company profile */}
        <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-accent"
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
            </span>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {t("settingsProfile")}
              </h2>
              <p className="text-[11px] text-muted">
                {company?.name ?? t("companySetupDesc")}
              </p>
            </div>
          </div>
          {company ? (
            <CompanyForm initial={company} onSubmit={updateCompany} />
          ) : (
            <CompanyForm onSubmit={createCompany} submitLabel={t("createCompany")} />
          )}
        </div>

        {/* Account */}
        <form
          key={company?.id ?? "no-company"}
          onSubmit={handleAccountSave}
          className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-purple-400/10 border border-purple-400/25 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <h2 className="text-sm font-semibold text-foreground">
              {t("settingsAccount")}
            </h2>
          </div>

          <div>
            <label className={labelClass}>{t("settingsName")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("companyNamePh")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("settingsEmail")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("settingsEmailPh")}
              className={inputClass}
              dir="ltr"
            />
          </div>

          <div className="rounded-xl border border-border/40 bg-card/40 p-4 text-[11px] text-muted leading-relaxed">
            {locale === "fa"
              ? "این بخش نمایشی است — اتصال به سیستم احراز هویت واقعی به‌زودی اضافه می‌شود."
              : locale === "tr"
                ? "Bu bölüm demo amaçlıdır — gerçek kimlik doğrulama bağlantısı yakında eklenecek."
                : "This section is a demo — real authentication will be connected soon."}
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 rounded-xl font-semibold text-sm btn-primary">
            {t("settingsSave")}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-warm/20 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-8 h-8 rounded-lg bg-warm/10 border border-warm/25 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </span>
              <h2 className="text-sm font-semibold text-foreground">
                {t("resetDataTitle")}
              </h2>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {t("resetDataDesc")}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border transition-all duration-300 flex-shrink-0 ${
              confirmReset
                ? "bg-warm text-bg border-warm"
                : "border-warm/40 text-warm hover:bg-warm/10"
            }`}>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {confirmReset ? t("resetConfirm") : t("resetData")}
          </button>
        </div>
      </div>
    </div>
  );
}