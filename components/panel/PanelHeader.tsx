"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTheme } from "@/components/ThemeProvider";
import { usePanel } from "@/components/panel/PanelProvider";
import CurrencySelect from "@/components/panel/CurrencySelect";
import { formatBalance } from "@/lib/panel-data";

const languages = [
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

const sunIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const moonIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default function PanelHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const t = useTranslations("panel");
  const themeT = useTranslations("theme");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const currentLang =
    languages.find((lang) => lang.code === locale) || languages[0];
  const { state } = usePanel();
  const company = state.company;
  const userName = company?.ownerName || t("userName");
  const avatarLetter = userName.charAt(0).toUpperCase();

  const switchLanguage = (lang: (typeof languages)[0]) => {
    setIsLangOpen(false);
    const segments = pathname.split("/").filter(Boolean);
    if ((routing.locales as readonly string[]).includes(segments[0] || "")) {
      segments.shift();
    }
    const cleanPath = `/${segments.join("/")}`;
    const target =
      lang.code === routing.defaultLocale
        ? cleanPath
        : cleanPath === "/"
          ? `/${lang.code}`
          : `/${lang.code}${cleanPath}`;
    router.replace(target);
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-border/40">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={t("dashboard")}
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-card/50 border border-border/50 text-muted">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden sm:block">
          <div className="text-sm font-semibold text-foreground">
            {t("greeting", { name: userName })}
          </div>
          <div className="text-xs text-muted">
            {company ? company.name : t("subtitle")}
          </div>
        </div>

        <div className="flex items-center gap-2 ms-auto sm:ms-0">
          {/* Balance */}
          <div
            title={t("balance")}
            className="hidden sm:flex items-center gap-2 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 px-3 hover:border-border transition-all duration-300">
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2M19 12a1 1 0 01-1 1h-2a1 1 0 010-2h2a1 1 0 011 1z"
              />
            </svg>
            <span className="text-sm font-bold text-foreground whitespace-nowrap">
              {formatBalance(state.balance, state.currency, locale)}
            </span>
            <span className="w-px h-5 bg-border/60" />
            <CurrencySelect />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={
              resolvedTheme === "dark" ? themeT("light") : themeT("dark")
            }
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300">
            <motion.span
              key={resolvedTheme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-accent flex items-center justify-center">
              {resolvedTheme === "dark" ? moonIcon : sunIcon}
            </motion.span>
          </button>

          {/* Notifications */}
          <Link
            href="/panel/notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300">
            <span className="text-muted">
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
            </span>
            <span className="absolute top-2.5 end-2.5 w-2 h-2 rounded-full bg-warm" />
          </Link>

          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 h-10 rounded-xl text-sm bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300">
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden sm:inline text-muted">
                {currentLang.code.toUpperCase()}
              </span>
              <motion.svg
                animate={{ rotate: isLangOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-muted"
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
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 end-0 w-40 rounded-xl overflow-hidden bg-card/95 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => switchLanguage(lang)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/5 ${
                        currentLang.code === lang.code
                          ? "text-accent bg-accent/5"
                          : "text-muted"
                      }`}>
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {currentLang.code === lang.code && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 ms-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 ps-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/20">
              <span className="text-black font-bold text-sm">
                {avatarLetter}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-foreground leading-tight">
                {userName}
              </div>
              <div className="text-[10px] text-muted">
                {company ? company.name : "Novin Digital"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}