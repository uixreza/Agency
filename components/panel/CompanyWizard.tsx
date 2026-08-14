"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  formatPrice,
  TASK_SERVICES,
  type CompanyProfile,
  type TaskServiceId,
} from "@/lib/panel-data";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-sm text-foreground placeholder:text-muted/60";

const labelClass = "block text-xs font-medium text-muted mb-1.5";

type Step = "business" | "team" | "owner" | "services";

const STEPS: Step[] = ["business", "team", "owner", "services"];

export default function CompanyWizard({
  onSubmit,
}: {
  onSubmit: (
    profile: Omit<CompanyProfile, "id" | "createdAt">,
    serviceIds: TaskServiceId[],
  ) => void;
}) {
  const t = useTranslations("panel");
  const locale = useLocale();
  const industries = t.raw("companyIndustries") as string[];
  const sizes = t.raw("teamSizes") as string[];
  const catalog = t.raw("catalog") as Record<
    string,
    { title: string; desc: string }
  >;

  const [stepIndex, setStepIndex] = useState(0);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState(-1);
  const [website, setWebsite] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [services, setServices] = useState<TaskServiceId[]>([]);

  const step: Step = STEPS[stepIndex];
  const stepKey: Record<Step, string> = {
    business: "wizardStepBusiness",
    team: "wizardStepTeam",
    owner: "wizardStepOwner",
    services: "wizardStepServices",
  };
  const stepDesc: Record<Step, string> = {
    business: "wizardBusinessDesc",
    team: "wizardTeamDesc",
    owner: "wizardOwnerDesc",
    services: "wizardServicesDesc",
  };

  const canContinue =
    step === "business"
      ? name.trim().length > 0 && industry.length > 0
      : step === "team"
        ? teamSize >= 0
        : step === "owner"
          ? ownerName.trim().length > 0
          : true;

  const toggleService = (id: TaskServiceId) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const handleFinish = () => {
    if (!canContinue) return;
    onSubmit(
      {
        name: name.trim(),
        industry: String(industries.indexOf(industry)),
        teamSize: String(teamSize),
        website: website.trim(),
        ownerName: ownerName.trim(),
        ownerEmail: ownerEmail.trim() || undefined,
      },
      services,
    );
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-7">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-all duration-300 ${
                i === stepIndex
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : i < stepIndex
                    ? "bg-accent/5 border-accent/15 text-accent/70"
                    : "bg-card/50 border-border/50 text-muted/70"
              }`}>
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                  i < stepIndex
                    ? "bg-accent text-bg"
                    : i === stepIndex
                      ? "bg-accent/20 text-accent"
                      : "bg-card text-muted/70"
                }`}>
                {i < stepIndex ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline whitespace-nowrap">
                {t(stepKey[s])}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-4">
          {step === "business" && (
            <>
              <div>
                <label className={labelClass}>{t("companyName")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("companyNamePh")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t("industry")}</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={`${inputClass} appearance-none ${
                    industry ? "" : "text-muted/60"
                  }`}>
                  <option value="" disabled>
                    {t("industryPh")}
                  </option>
                  {industries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === "team" && (
            <>
              <div>
                <label className={labelClass}>{t("teamSize")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((size, i) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(i)}
                      className={`px-4 py-3.5 rounded-xl text-xs font-medium border text-start transition-all duration-300 ${
                        teamSize === i
                          ? "bg-accent/10 border-accent/30 text-accent"
                          : "bg-card/50 border-border/50 text-muted hover:text-foreground hover:border-border"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>{t("website")}</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={t("websitePh")}
                  className={inputClass}
                  dir="ltr"
                />
              </div>
            </>
          )}

          {step === "owner" && (
            <>
              <div>
                <label className={labelClass}>{t("ownerName")}</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder={t("ownerNamePh")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t("ownerEmail")}</label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder={t("ownerEmailPh")}
                  className={inputClass}
                  dir="ltr"
                />
              </div>
            </>
          )}

          {step === "services" && (
            <div className="max-h-[40vh] overflow-y-auto pe-1 space-y-5">
              {(
                [
                  ["monthly", t("serviceTypeMonthly")],
                  ["oneTime", t("serviceTypeOneTime")],
                ] as const
              ).map(([kind, label]) => (
                <div key={kind}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/70 mb-2">
                    {label}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {TASK_SERVICES.filter((s) => s.kind === kind).map((service) => {
                      const id = service.id;
                      const item = catalog[id];
                      const selected = services.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleService(id)}
                          className={`rounded-xl border p-3.5 text-start transition-all duration-300 ${
                            selected
                              ? "bg-accent/10 border-accent/40"
                              : "bg-card/50 border-border/50 hover:border-border"
                          }`}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {item?.title ?? id}
                            </span>
                            <span className="flex-shrink-0">
                              <span
                                className={`inline-flex w-5 h-5 rounded-md border items-center justify-center transition-all duration-300 ${
                                  selected
                                    ? "bg-accent border-accent text-bg"
                                    : "border-border/70 text-transparent"
                                }`}>
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
                              </span>
                            </span>
                          </div>
                          <p className="text-[11px] text-muted mt-1 leading-relaxed line-clamp-2">
                            {item?.desc}
                          </p>
                          <div className="text-xs font-semibold text-accent mt-2">
                            {formatPrice(service.price, locale)}
                            <span className="text-[10px] font-normal text-muted">
                              {" "}
                              {service.kind === "oneTime"
                                ? t("taskPerOnce")
                                : t("taskPerMonth")}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="text-xs text-muted mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="px-4 py-2.5 rounded-xl text-sm font-medium border border-border/50 text-muted hover:text-foreground hover:border-border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
          {t("wizardBack")}
        </button>
        <div className="text-[11px] text-muted/70">
          {t(stepDesc[step])}
        </div>
        {stepIndex < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm btn-primary">
            {t("wizardNext")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={!canContinue}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm btn-primary">
            {t("wizardFinish")}
          </button>
        )}
      </div>
    </div>
  );
}