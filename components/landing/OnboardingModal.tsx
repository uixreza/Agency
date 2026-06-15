"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";

const languages = [
  { code: "fa", label: "فارسی", flag: "🇮🇷", direction: "rtl" },
  { code: "en", label: "English", flag: "🇬🇧", direction: "ltr" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", direction: "ltr" },
];

const themeOptions = [
  {
    id: "dark",
    label: "تیره",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
    preview: "bg-[#0f1117]",
    accent: "bg-accent",
  },
  {
    id: "light",
    label: "روشن",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    preview: "bg-[#f9fafb]",
    accent: "bg-[#00b8a3]",
  },
];

const cookieOptions = [
  {
    value: "yes",
    label: "بله، موافقم",
    description: "با ذخیره کوکی برای تجربه بهتر موافقم",
    color: "border-accent bg-accent/10 text-accent",
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
  {
    value: "no",
    label: "خیر، رد می‌کنم",
    description: "فقط کوکی‌های ضروری ذخیره می‌شوند",
    color: "border-warm bg-warm/10 text-warm",
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
];

export default function OnboardingModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(languages[1]);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const hasCompleted = Cookies.get("onboarding_complete");
    if (!hasCompleted && mounted) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleComplete = () => {
    Cookies.set("preferred_language", selectedLang.code, { expires: 365 });
    Cookies.set("preferred_theme", theme || "dark", { expires: 365 });
    Cookies.set("cookie_consent", cookieConsent || "no", { expires: 365 });
    Cookies.set("onboarding_complete", "true", { expires: 365 });
    setIsVisible(false);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const stepTitles = {
    1: "زبان مورد نظر خود را انتخاب کنید",
    2: "تم مورد علاقه خود را انتخاب کنید",
    3: "تنظیمات کوکی",
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(8, 9, 13, 0.85)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
            }}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: -5,
              }}
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-15"
              style={{
                background:
                  "radial-gradient(circle, var(--color-warm) 0%, transparent 70%)",
              }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg z-10">
            <div
              className="relative rounded-3xl overflow-hidden bg-card/80 backdrop-blur-[40px] border border-border/60"
              style={{
                boxShadow:
                  "0 25px 60px rgba(0, 0, 0, 0.25), 0 0 40px var(--color-accent)",
              }}>
              <div
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, var(--color-accent) 0%, transparent 50%)",
                }}
              />

              <div className="relative px-8 pt-8 pb-4">
                <div className="flex items-center mb-8">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: step === 1 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        step > 1
                          ? "bg-accent/20 text-accent border-2 border-accent shadow-lg shadow-accent/20"
                          : step === 1
                            ? "bg-accent/20 text-accent border-2 border-accent shadow-lg shadow-accent/20"
                            : "bg-border/50 text-muted border border-border"
                      }`}>
                      {step > 1 ? (
                        <svg
                          className="w-5 h-5 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        "1"
                      )}
                    </motion.div>
                    <span
                      className={`text-xs mt-2 transition-colors duration-500 ${
                        step >= 1 ? "text-foreground/70" : "text-muted"
                      }`}>
                      زبان
                    </span>
                  </div>

                  <div className="flex-1 mx-3 h-0.5 relative">
                    <div className="absolute inset-0 bg-border rounded-full" />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-accent), var(--color-accentDark))",
                        boxShadow: "0 0 10px var(--color-accent)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: step > 1 ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: step === 2 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        step > 2
                          ? "bg-accent/20 text-accent border-2 border-accent shadow-lg shadow-accent/20"
                          : step === 2
                            ? "bg-accent/20 text-accent border-2 border-accent shadow-lg shadow-accent/20"
                            : "bg-border/50 text-muted border border-border"
                      }`}>
                      {step > 2 ? (
                        <svg
                          className="w-5 h-5 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        "2"
                      )}
                    </motion.div>
                    <span
                      className={`text-xs mt-2 transition-colors duration-500 ${
                        step >= 2 ? "text-foreground/70" : "text-muted"
                      }`}>
                      تم
                    </span>
                  </div>

                  <div className="flex-1 mx-3 h-0.5 relative">
                    <div className="absolute inset-0 bg-border rounded-full" />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-accent), var(--color-accentDark))",
                        boxShadow: "0 0 10px var(--color-accent)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: step > 2 ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: step === 3 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        step === 3
                          ? "bg-accent/20 text-accent border-2 border-accent shadow-lg shadow-accent/20"
                          : "bg-border/50 text-muted border border-border"
                      }`}>
                      3
                    </motion.div>
                    <span
                      className={`text-xs mt-2 transition-colors duration-500 ${
                        step >= 3 ? "text-foreground/70" : "text-muted"
                      }`}>
                      کوکی
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                  {stepTitles[step as keyof typeof stepTitles]}
                </h2>
                <p className="text-muted text-sm text-center mb-8">
                  {step === 1 &&
                    "برای تجربه بهتر، زبان مورد نظر خود را انتخاب کنید"}
                  {step === 2 && "حالت نمایشی مورد علاقه خود را انتخاب کنید"}
                  {step === 3 && "تنظیمات حریم خصوصی و ذخیره کوکی را مشخص کنید"}
                </p>
              </div>

              <div className="px-8 pb-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}>
                      <div className="relative mb-8">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setIsLangOpen(!isLangOpen)}
                          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">
                              {selectedLang.flag}
                            </span>
                            <div className="text-right">
                              <div className="text-foreground font-medium">
                                {selectedLang.label}
                              </div>
                              <div className="text-xs text-muted">
                                {selectedLang.code.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <motion.svg
                            animate={{ rotate: isLangOpen ? 180 : 0 }}
                            className="w-5 h-5 text-muted"
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
                          {isLangOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden border border-border/60 shadow-2xl z-20 bg-card/98 backdrop-blur-[30px]">
                              {languages.map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() => {
                                    setSelectedLang(lang);
                                    setIsLangOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-white/5 ${
                                    selectedLang.code === lang.code
                                      ? "bg-accent/10 border-l-2 border-accent"
                                      : "border-l-2 border-transparent"
                                  }`}>
                                  <span className="text-3xl">{lang.flag}</span>
                                  <div className="text-right">
                                    <div
                                      className={`font-medium ${
                                        selectedLang.code === lang.code
                                          ? "text-accent"
                                          : "text-foreground"
                                      }`}>
                                      {lang.label}
                                    </div>
                                    <div className="text-xs text-muted">
                                      {lang.code.toUpperCase()}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4 mb-8">
                      {themeOptions.map((themeOption) => (
                        <motion.button
                          key={themeOption.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTheme(themeOption.id)}
                          className={`relative p-6 rounded-2xl transition-all duration-300 ${
                            theme === themeOption.id
                              ? "border-2 border-accent bg-accent/5 shadow-lg shadow-accent/10"
                              : "border-2 border-border/60 bg-card/50 hover:border-border"
                          }`}>
                          <div
                            className={`w-full h-24 rounded-xl mb-4 ${themeOption.preview} border border-border/30 flex items-center justify-center relative overflow-hidden`}>
                            <div
                              className={`absolute top-3 right-3 w-3 h-3 rounded-full ${themeOption.accent}`}
                            />
                            <div className="flex gap-2 absolute bottom-3 right-3">
                              <div className="w-12 h-1.5 rounded-full bg-border/50" />
                              <div className="w-8 h-1.5 rounded-full bg-border/30" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div
                                className={`font-bold text-lg mb-1 ${
                                  theme === themeOption.id
                                    ? "text-accent"
                                    : "text-foreground"
                                }`}>
                                {themeOption.label}
                              </div>
                            </div>
                            <div
                              className={`transition-all duration-300 ${
                                theme === themeOption.id
                                  ? "text-accent"
                                  : "text-muted"
                              }`}>
                              {themeOption.icon}
                            </div>
                          </div>

                          {theme === themeOption.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 left-3 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mb-8">
                      {cookieOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setCookieConsent(option.value)}
                          className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 group ${
                            cookieConsent === option.value
                              ? `${option.color} border-2`
                              : "border-2 border-border/60 bg-card/50 hover:border-border text-muted"
                          }`}>
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              cookieConsent === option.value
                                ? option.value === "yes"
                                  ? "bg-accent/20"
                                  : "bg-warm/20"
                                : "bg-border/30 group-hover:bg-border/50"
                            }`}>
                            {option.icon}
                          </div>
                          <div className="text-right flex-1">
                            <div className="font-bold text-base mb-1">
                              {option.label}
                            </div>
                            <div className="text-xs opacity-70">
                              {option.description}
                            </div>
                          </div>
                          <motion.div
                            animate={{
                              scale: cookieConsent === option.value ? 1 : 0.8,
                              opacity: cookieConsent === option.value ? 1 : 0,
                            }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              option.value === "yes"
                                ? "border-accent"
                                : "border-warm"
                            }`}>
                            <motion.div
                              animate={{
                                scale: cookieConsent === option.value ? 1 : 0,
                              }}
                              className={`w-3 h-3 rounded-full ${
                                option.value === "yes" ? "bg-accent" : "bg-warm"
                              }`}
                            />
                          </motion.div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  {step > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 rounded-xl border border-border/60 text-muted hover:text-foreground hover:border-border transition-all duration-300">
                      بازگشت
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={step === 3 && !cookieConsent}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background:
                        step === 3 && !cookieConsent
                          ? "var(--color-border)"
                          : "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accentDark) 100%)",
                      boxShadow:
                        step === 3 && !cookieConsent
                          ? "none"
                          : "0 0 30px var(--color-accent)",
                    }}>
                    <span
                      className={
                        step === 3 && !cookieConsent
                          ? "text-muted"
                          : "text-black"
                      }>
                      {step === 3 ? "شروع کنید" : "بعدی"}
                    </span>
                  </motion.button>
                </div>

                {step < 3 && (
                  <button
                    onClick={handleComplete}
                    className="w-full mt-3 text-sm text-muted hover:text-foreground transition-colors duration-300">
                    رد کردن و ادامه
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
