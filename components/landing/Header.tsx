"use client";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "خدمات", href: "/services" },
  { label: "نمونه کارها", href: "/projects" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const languages = [
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

const themes = [
  {
    id: "dark",
    label: "تیره",
    icon: (
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
    ),
  },
  {
    id: "light",
    label: "روشن",
    icon: (
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
    ),
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const headerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Get current language from pathname
  const getCurrentLang = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "en") return languages[1];
    if (segments[0] === "tr") return languages[2];
    return languages[0]; // default fa
  };

  const [currentLang, setCurrentLang] = useState(getCurrentLang());

  // Update currentLang when pathname changes
  useEffect(() => {
    setCurrentLang(getCurrentLang());
  }, [pathname]);

  const { scrollY } = useScroll();

  const headerScale = useTransform(scrollY, [0, 200], [1, 1.02]);
  const headerWidth = useTransform(scrollY, [0, 200], ["100%", "95%"]);
  const headerY = useTransform(scrollY, [0, 200], [0, 12]);
  const headerBorderRadius = useTransform(scrollY, [0, 200], [16, 24]);
  const headerShadow = useTransform(
    scrollY,
    [0, 200],
    [
      "0 0 0 rgba(0,0,0,0)",
      "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
    ],
  );
  const headerBgOpacity = useTransform(scrollY, [0, 200], [0.4, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0.1, 0.15]);

  const navScale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const navGap = useTransform(scrollY, [0, 200], [8, 4]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCurrentThemeIcon = () => {
    if (!mounted) return themes[0].icon;
    return themes.find((t) => t.id === theme)?.icon || themes[0].icon;
  };

  const switchLanguage = (lang: (typeof languages)[0]) => {
    setCurrentLang(lang);
    setIsLangOpen(false);

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale =
      segments[0] === "en" || segments[0] === "tr" ? segments[0] : "fa";

    let newPath;
    if (lang.code === "fa") {
      // Remove locale prefix for Farsi
      if (currentLocale === "fa") {
        newPath = pathname;
      } else {
        newPath = pathname.replace(`/${currentLocale}`, "") || "/";
      }
    } else {
      // Add locale prefix for English/Turkish
      if (currentLocale === "fa") {
        newPath = `/${lang.code}${pathname}`;
      } else {
        newPath = pathname.replace(`/${currentLocale}`, `/${lang.code}`);
      }
    }

    router.push(newPath);
  };

  if (!mounted) return null;

  const headerBgStyle = {
    backgroundColor: `rgba(18, 18, 24, ${headerBgOpacity.get()})`,
    borderColor: `rgba(255, 255, 255, ${borderOpacity.get()})`,
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ y: headerY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{
              scale: headerScale,
              width: headerWidth,
              borderRadius: headerBorderRadius,
              boxShadow: headerShadow,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="relative backdrop-blur-2xl transition-all duration-500">
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: `1px solid rgba(255, 255, 255, ${borderOpacity.get()})`,
              }}
            />
            <div className="relative flex items-center justify-between px-4 lg:px-6 py-3">
              <motion.div
                style={{ scale: navScale }}
                className="flex items-center">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow duration-300">
                      <svg
                        className="w-6 h-6 text-white"
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
                    </div>
                    <div className="absolute inset-0 rounded-xl blur-xl bg-accent/20 -z-10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-bold text-lg leading-tight text-foreground">
                      نوین دیجیتال
                    </div>
                    <div className="text-[10px] tracking-wider text-muted">
                      DIGITAL AGENCY
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.nav
                style={{ gap: navGap }}
                className="hidden lg:flex items-center">
                {navItems.map((item) => (
                  <motion.div key={item.label} style={{ scale: navScale }}>
                    <Link
                      href={item.href}
                      className="relative px-4 py-2 text-sm text-foreground transition-colors duration-300">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                style={{ scale: navScale }}
                className="flex items-center gap-2">
                {/* Theme Switcher */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsThemeOpen(!isThemeOpen);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300">
                    <span className="text-accent">{getCurrentThemeIcon()}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isThemeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 w-36 rounded-xl overflow-hidden bg-card/95 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/20">
                        {themes.map((themeOption) => (
                          <button
                            key={themeOption.id}
                            onClick={() => {
                              setTheme(themeOption.id);
                              setIsThemeOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-white/5 ${
                              theme === themeOption.id
                                ? "text-accent bg-accent/5"
                                : "text-muted"
                            }`}>
                            <span>{themeOption.icon}</span>
                            <span>{themeOption.label}</span>
                            {theme === themeOption.id && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-4 h-4 mr-auto"
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

                {/* Language Switcher */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsLangOpen(!isLangOpen);
                      setIsThemeOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300">
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
                  </motion.button>

                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 w-40 rounded-xl overflow-hidden bg-card/95 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/20">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
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
                                className="w-4 h-4 mr-auto"
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

                {/* Login Button - Desktop */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden sm:block">
                  <Link
                    href="/login"
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm overflow-hidden group bg-accent/10 border border-accent/20">
                    <span className="relative z-10 text-accent group-hover:text-white transition-colors duration-300">
                      ورود
                    </span>
                    <svg
                      className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300 relative z-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-gradient-to-r from-accent to-accentDark" />
                  </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center bg-card/50 backdrop-blur-sm border border-border/50"
                  aria-label="منو">
                  <div className="w-5 h-4 relative flex flex-col justify-between">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={
                          isMobileMenuOpen
                            ? i === 0
                              ? { rotate: 45, y: 6 }
                              : i === 1
                                ? { opacity: 0, scale: 0 }
                                : { rotate: -45, y: -6 }
                            : { rotate: 0, y: 0, opacity: 1, scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                        className="w-full h-0.5 rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 lg:hidden bg-surface/95 backdrop-blur-2xl border-l border-border/40">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black"
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
                    </div>
                    <div>
                      <div className="font-bold text-foreground">
                        نوین دیجیتال
                      </div>
                      <div className="text-[10px] text-muted">
                        DIGITAL AGENCY
                      </div>
                    </div>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-border/50">
                    <svg
                      className="w-5 h-5 text-muted"
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
                  </motion.button>
                </div>

                <nav className="flex flex-col gap-2 mb-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-white/5 transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          theme === themeOption.id
                            ? "bg-accent/10 border border-accent/30 text-accent"
                            : "border border-border/30 text-muted hover:border-border"
                        }`}>
                        <span>{themeOption.icon}</span>
                        <span className="text-xs">{themeOption.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          currentLang.code === lang.code
                            ? "bg-accent/10 border border-accent/30 text-accent"
                            : "border border-border/30 text-muted hover:border-border"
                        }`}>
                        <span>{lang.flag}</span>
                        <span className="text-xs">
                          {lang.code.toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-medium text-sm bg-accent/10 border border-accent/20 text-accent">
                      <span>ورود / ثبت نام</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
