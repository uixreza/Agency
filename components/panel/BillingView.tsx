"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  usePanel,
  GENERAL_CONVERSATION_ID,
} from "@/components/panel/PanelProvider";
import {
  formatPrice,
  formatBalance,
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

type PaymentMethod = "iran" | "intl" | "usdt";

const USDT_WALLET = "TRCsu6HqMycpiYztLnyqSyrCJcNQsRviUS";

const COUNTRIES = [
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "FR", flag: "🇫🇷", name: "France" },
  { code: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "PT", flag: "🇵🇹", name: "Portugal" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "BE", flag: "🇧🇪", name: "Belgium" },
  { code: "AT", flag: "🇦🇹", name: "Austria" },
  { code: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "FI", flag: "🇫🇮", name: "Finland" },
  { code: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "CZ", flag: "🇨🇿", name: "Czechia" },
  { code: "TR", flag: "🇹🇷", name: "Türkiye" },
  { code: "AE", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "QA", flag: "🇶🇦", name: "Qatar" },
  { code: "KW", flag: "🇰🇼", name: "Kuwait" },
  { code: "BH", flag: "🇧🇭", name: "Bahrain" },
  { code: "OM", flag: "🇴🇲", name: "Oman" },
  { code: "JO", flag: "🇯🇴", name: "Jordan" },
  { code: "IQ", flag: "🇮🇶", name: "Iraq" },
  { code: "IR", flag: "🇮🇷", name: "Iran" },
  { code: "IN", flag: "🇮🇳", name: "India" },
  { code: "PK", flag: "🇵🇰", name: "Pakistan" },
  { code: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "CN", flag: "🇨🇳", name: "China" },
  { code: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "ZA", flag: "🇿🇦", name: "South Africa" },
];

interface IntlForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  postal: string;
}

const EMPTY_INTL_FORM: IntlForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  postal: "",
};

export default function BillingView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state, sendMessage } = usePanel();
  const [method, setMethod] = useState<PaymentMethod>("iran");
  const [copied, setCopied] = useState(false);
  const [txid, setTxid] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [iranTx, setIranTx] = useState("");
  const [iranSubmitted, setIranSubmitted] = useState(false);
  const [intlForm, setIntlForm] = useState<IntlForm>(EMPTY_INTL_FORM);
  const [countryOpen, setCountryOpen] = useState(false);
  const [intlSubmitted, setIntlSubmitted] = useState(false);

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

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(USDT_WALLET);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = USDT_WALLET;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitTransfer = () => {
    if (!txid.trim()) return;
    sendMessage(
      GENERAL_CONVERSATION_ID,
      `${t("billingUsdtSuccess")} — ${t("billingUsdtTxLabel")}: ${txid.trim()}`,
    );
    setSubmitted(true);
  };

  const submitIranTransfer = () => {
    if (!iranTx.trim()) return;
    sendMessage(
      GENERAL_CONVERSATION_ID,
      `${t("billingIranSuccess")} — ${t("billingIranTxLabel")}: ${iranTx.trim()}`,
    );
    setIranSubmitted(true);
  };

  const setIntlField = (field: keyof IntlForm, value: string) =>
    setIntlForm((prev) => ({ ...prev, [field]: value }));

  const isIntlValid =
    intlForm.firstName.trim() !== "" &&
    intlForm.lastName.trim() !== "" &&
    /^\S+@\S+\.\S+$/.test(intlForm.email.trim()) &&
    intlForm.phone.trim() !== "" &&
    intlForm.country !== "" &&
    intlForm.address.trim() !== "" &&
    intlForm.postal.trim() !== "";

  const selectedCountry = COUNTRIES.find(
    (c) => c.code === intlForm.country,
  );

  const submitIntlPay = () => {
    if (!isIntlValid) return;
    sendMessage(
      GENERAL_CONVERSATION_ID,
      `${t("billingIntlSuccess")} — ${intlForm.firstName.trim()} ${intlForm.lastName.trim()}, ${intlForm.email.trim()}, ${intlForm.phone.trim()}, ${selectedCountry?.name ?? intlForm.country}, ${intlForm.address.trim()}, ${intlForm.postal.trim()}`,
    );
    setIntlSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">
          {t("billingTitle")}
        </h1>
        <p className="text-sm text-muted mt-1">{t("billingSubtitle")}</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-5 text-white shadow-lg shadow-[#6366f1]/25">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -end-24 w-64 h-64 rounded-full border-[32px] border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -start-20 w-56 h-56 rounded-full bg-white/25 blur-3xl"
          />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12v5a2 2 0 01-2 2H7a3 3 0 01-3-3V8a3 3 0 013-3h12a2 2 0 012 2v5z"
                  />
                  <path d="M16 12h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </span>
              <div>
                <div className="text-xs font-semibold text-white/75">
                  {t("billingCurrentBalance")}
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                  {formatBalance(state.balance, state.currency, locale)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/85">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {t("billingBalanceStatus")}
            </div>
          </div>
          <div className="relative mt-3 text-[11px] font-medium leading-relaxed text-white/65 max-w-md">
            {t("billingBalanceNote")}
          </div>
        </div>
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
          {/* International — YekPay gateway */}
          <div
            role="radio"
            aria-checked={method === "intl"}
            tabIndex={0}
            onClick={() => setMethod("intl")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMethod("intl");
              }
            }}
            className={`relative flex flex-col gap-4 min-w-0 rounded-2xl border p-5 transition-all duration-300 sm:col-span-2 ${
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
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground">
                  {t("billingMethodIntl")}
                </div>
                <div className="text-xs text-muted mt-0.5 leading-relaxed">
                  {t("billingMethodIntlDesc")}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card/60 border border-border/50 px-2.5 py-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-semibold tracking-wider text-foreground">
                  YekPay
                </span>
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

            {intlSubmitted ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/10 px-3.5 py-3">
                <svg
                  className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
                <p className="text-xs text-foreground leading-relaxed">
                  {t("billingIntlSubmitted")}
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {method === "intl" && (
                  <motion.div
                    key="intl-form"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden">
                    <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-3">
                      <div className="text-xs font-semibold text-foreground">
                        {t("billingIntlFormTitle")}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-first"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlFirstName")}
                          </label>
                          <input
                            id="intl-first"
                            type="text"
                            value={intlForm.firstName}
                            onChange={(e) => setIntlField("firstName", e.target.value)}
                            placeholder={t("billingIntlFirstName")}
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-last"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlLastName")}
                          </label>
                          <input
                            id="intl-last"
                            type="text"
                            value={intlForm.lastName}
                            onChange={(e) => setIntlField("lastName", e.target.value)}
                            placeholder={t("billingIntlLastName")}
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-email"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlEmail")}
                          </label>
                          <input
                            id="intl-email"
                            type="email"
                            dir="ltr"
                            value={intlForm.email}
                            onChange={(e) => setIntlField("email", e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-phone"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlPhone")}
                          </label>
                          <input
                            id="intl-phone"
                            type="tel"
                            dir="ltr"
                            value={intlForm.phone}
                            onChange={(e) => setIntlField("phone", e.target.value)}
                            placeholder="+1 555 000 0000"
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-country"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlCountry")}
                          </label>
                          <div className="relative">
                            <motion.button
                              type="button"
                              onClick={() => setCountryOpen(!countryOpen)}
                              className="w-full flex items-center justify-between gap-2 bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-start shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-accent/40">
                              {selectedCountry ? (
                                <span className="flex items-center gap-2 min-w-0">
                                  <span className="text-lg leading-none">
                                    {selectedCountry.flag}
                                  </span>
                                  <span className="text-foreground truncate">
                                    {selectedCountry.name}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-muted/60">
                                  {t("billingIntlCountryPlaceholder")}
                                </span>
                              )}
                              <motion.svg
                                animate={{ rotate: countryOpen ? 180 : 0 }}
                                className="w-4 h-4 text-muted flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </motion.svg>
                            </motion.button>
                            <AnimatePresence>
                              {countryOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full mt-2 start-0 end-0 z-30 max-h-56 overflow-y-auto rounded-xl border border-border/60 shadow-2xl bg-card/95 backdrop-blur-[30px] py-1">
                                  {COUNTRIES.map((country) => (
                                    <button
                                      key={country.code}
                                      type="button"
                                      onClick={() => {
                                        setIntlField("country", country.code);
                                        setCountryOpen(false);
                                      }}
                                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-start transition-colors duration-150 hover:bg-white/5 ${
                                        intlForm.country === country.code
                                          ? "bg-accent/10"
                                          : ""
                                      }`}>
                                      <span className="text-base leading-none">
                                        {country.flag}
                                      </span>
                                      <span
                                        className={`flex-1 min-w-0 text-sm truncate ${
                                          intlForm.country === country.code
                                            ? "text-accent"
                                            : "text-foreground"
                                        }`}>
                                        {country.name}
                                      </span>
                                      {intlForm.country === country.code && (
                                        <svg
                                          className="w-3.5 h-3.5 text-accent flex-shrink-0"
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
                                      )}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="intl-postal"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlPostal")}
                          </label>
                          <input
                            id="intl-postal"
                            type="text"
                            dir="ltr"
                            value={intlForm.postal}
                            onChange={(e) => setIntlField("postal", e.target.value)}
                            placeholder="12345"
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label
                            htmlFor="intl-address"
                            className="text-[11px] font-semibold text-foreground/75">
                            {t("billingIntlAddress")}
                          </label>
                          <input
                            id="intl-address"
                            type="text"
                            value={intlForm.address}
                            onChange={(e) => setIntlField("address", e.target.value)}
                            placeholder={t("billingIntlAddressPlaceholder")}
                            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] hover:border-accent/40 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={submitIntlPay}
                          disabled={!isIntlValid}
                          className="px-5 py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex-1 sm:flex-none sm:min-w-52">
                          {t("billingIntlPayCta")}
                        </button>
                        <p className="flex items-center gap-1.5 text-[11px] text-muted leading-relaxed">
                          <svg
                            className="w-3.5 h-3.5 flex-shrink-0"
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
                          {t("billingIntlRedirectNote")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {!intlSubmitted && method !== "intl" && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMethod("intl");
                    setCountryOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-primary">
                  {t("billingIntlProceed")}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <span className="flex items-center gap-1.5 text-[11px] text-muted">
                  <svg
                    className="w-3.5 h-3.5"
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
                  {t("billingIntlSecureNote")}
                </span>
              </div>
            )}
          </div>

          {/* USDT — crypto */}
          <div
            role="radio"
            aria-checked={method === "usdt"}
            tabIndex={0}
            onClick={() => {
              setCountryOpen(false);
              setMethod("usdt");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCountryOpen(false);
                setMethod("usdt");
              }
            }}
            className={`relative flex flex-col gap-4 min-w-0 rounded-2xl border p-5 transition-all duration-300 ${
              method === "usdt"
                ? "border-accent/50 bg-accent/5"
                : "border-border/50 bg-card/40 hover:border-border"
            }`}>
            <span
              className={`absolute top-4 end-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                method === "usdt"
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-transparent"
              }`}>
              {checkIcon}
            </span>
            <div className="pe-8">
              <div className="text-sm font-semibold text-foreground">
                {t("billingMethodUsdt")}
              </div>
              <div className="text-xs text-muted mt-0.5 leading-relaxed">
                {t("billingMethodUsdtDesc")}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#26a17b]/25 bg-card/60 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(38,161,123,0.15)_1px,transparent_1px)] bg-[size:14px_14px] opacity-60" />
              <div className="absolute -top-14 -end-14 w-32 h-32 rounded-full bg-[#26a17b]/15 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-black/15 flex-shrink-0">
                  <img
                    src="/assets/img/USDT.png"
                    alt="USDT"
                    className="w-6 h-6"
                    draggable={false}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">
                    {t("billingMethodUsdt")}
                  </div>
                  <div className="text-[11px] text-muted">Tron · TRC20</div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#26a17b]/10 border border-[#26a17b]/25 text-[#26a17b] text-[10px] font-semibold flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26a17b]" />
                  TRC20
                </span>
              </div>

              <div className="relative mt-3 min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-muted mb-1.5">
                  {t("billingUsdtAddress")}
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-bg/70 border border-border/50 px-3.5 py-3 min-w-0">
                  <span className="text-[#26a17b] font-mono text-sm select-none">
                    $
                  </span>
                  <code
                    dir="ltr"
                    className="flex-1 min-w-0 font-mono text-xs sm:text-sm text-foreground tracking-wide break-all">
                    {USDT_WALLET}
                  </code>
                  <span className="w-[2px] h-4 bg-[#26a17b]/80 animate-pulse flex-shrink-0" />
                  <button
                    type="button"
                    onClick={copyWallet}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#26a17b]/15 border border-[#26a17b]/30 text-[#26a17b] hover:bg-[#26a17b]/25 transition-all duration-300 flex-shrink-0">
                    {copied ? t("billingUsdtCopied") : t("billingUsdtCopy")}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-warm/25 bg-warm/10 px-3.5 py-3">
              <svg
                className="w-4 h-4 text-warm flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <p className="text-[11px] text-warm leading-relaxed">
                {t("billingUsdtWarning")}
              </p>
            </div>

            {submitted ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/10 px-3.5 py-3">
                <svg
                  className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
                <p className="text-xs text-foreground leading-relaxed">
                  {t("billingUsdtSubmitted")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="usdt-txid"
                  className="text-xs font-medium text-foreground">
                  {t("billingUsdtTxLabel")}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="usdt-txid"
                    type="text"
                    dir="ltr"
                    value={txid}
                    onChange={(e) => setTxid(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && txid.trim()) {
                        submitTransfer();
                      }
                    }}
                    placeholder={t("billingUsdtTxPlaceholder")}
                    className="flex-1 bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={submitTransfer}
                    disabled={!txid.trim()}
                    className="px-5 py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
                    {t("billingUsdtSubmit")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Iran — bank card */}
          <div
            role="radio"
            aria-checked={method === "iran"}
            tabIndex={0}
            onClick={() => {
              setCountryOpen(false);
              setMethod("iran");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCountryOpen(false);
                setMethod("iran");
              }
            }}
            className={`relative flex flex-col gap-4 min-w-0 rounded-2xl border p-5 transition-all duration-300 ${
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
            <div className="relative overflow-hidden rounded-xl bg-[#0d1117] p-4 shadow-lg shadow-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.02] to-accent/25" />
              <div className="absolute -top-12 -end-12 w-36 h-36 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-14 -start-12 w-32 h-32 rounded-full bg-white/[0.05] blur-2xl" />
              <div className="absolute -bottom-16 -end-14 w-40 h-40 rounded-full border border-white/10" />
              <div className="absolute -bottom-10 -end-8 w-28 h-28 rounded-full border border-white/10" />

              <div className="relative flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-md shadow-black/20">
                  <img
                    src="/assets/img/Saman.png"
                    alt="Saman"
                    className="w-5 h-5"
                    draggable={false}
                  />
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  IR
                </span>
              </div>

              <div className="relative flex items-center justify-between mt-5">
                <svg
                  className="w-9 h-9"
                  viewBox="0 0 32 32"
                  fill="none">
                  <rect
                    x="1.2"
                    y="1.2"
                    width="29.6"
                    height="29.6"
                    rx="6"
                    stroke="#C9A227"
                    strokeOpacity="0.85"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1.2 11.2h29.6M1.2 20.8h29.6M11.2 1.2v29.6M20.8 1.2v29.6"
                    stroke="#C9A227"
                    strokeOpacity="0.6"
                    strokeWidth="1"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="12"
                    height="12"
                    rx="2"
                    stroke="#C9A227"
                    strokeOpacity="0.45"
                    strokeWidth="1"
                  />
                </svg>
                <svg
                  className="w-7 h-7 text-white/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor">
                  <path
                    d="M6.5 7.5a8.5 8.5 0 0112 0M8.5 10.5a5 5 0 017 0M10.5 13.5a1.5 1.5 0 013 0"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>

              <div className="relative text-white font-mono text-sm tracking-[0.2em] mt-4">
                6219&nbsp;&nbsp;8619&nbsp;&nbsp;1026&nbsp;&nbsp;1931
              </div>
              <div className="relative flex items-end justify-between mt-3">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/60">
                    {t("billingCardHolder")}
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    Reza Kamali
                  </div>
                </div>
                <div className="text-[10px] text-white/60">09/29</div>
              </div>
            </div>

            {iranSubmitted ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/10 px-3.5 py-3">
                <svg
                  className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
                <p className="text-xs text-foreground leading-relaxed">
                  {t("billingIranSubmitted")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="iran-txid"
                  className="text-xs font-medium text-foreground">
                  {t("billingIranTxLabel")}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="iran-txid"
                    type="text"
                    dir="ltr"
                    value={iranTx}
                    onChange={(e) => setIranTx(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && iranTx.trim()) {
                        submitIranTransfer();
                      }
                    }}
                    placeholder={t("billingIranTxPlaceholder")}
                    className="flex-1 bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={submitIranTransfer}
                    disabled={!iranTx.trim()}
                    className="px-5 py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
                    {t("billingIranSubmit")}
                  </button>
                </div>
              </div>
            )}
          </div>
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
