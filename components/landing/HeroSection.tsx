"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toLocalDigits } from "@/lib/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SectionBadge from "@/components/landing/SectionBadge";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "fa";
  const isMobile = useMediaQuery("(max-width: 639px)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const badgeY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.3]);
  const headingY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const headingLetterSpacing = useTransform(scrollYProgress, [0, 0.5], [0, 3]);
  const descY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const descScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const buttonsY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const buttonsScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  const trustY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const trustScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.25]);
  const visualY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const card1X = useTransform(scrollYProgress, [0, 0.5], [0, isRTL ? 60 : -60]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const card2X = useTransform(scrollYProgress, [0, 0.5], [0, isRTL ? -60 : 60]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const centerCardY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const centerCardScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const circle1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const circle2Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.4]);
  const circle3Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0],
  );
  const scrollIndicatorScale = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 1.5],
  );

  const trustBrands = t.raw("brands") as string[];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bg">
      {/* Background dot pattern */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `radial-gradient(color-mix(in srgb, var(--color-foreground) 14%, transparent) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Animated background blobs */}
      <motion.div
        animate={
          isMobile
            ? undefined
            : {
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.1, 0.9, 1],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full blur-[60px] sm:blur-[120px] opacity-20 transition-all duration-1000 ease-out">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,204,0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        animate={
          isMobile
            ? undefined
            : {
                x: [0, -20, 30, 0],
                y: [0, 30, -30, 0],
                scale: [1, 0.9, 1.1, 1],
              }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -7,
        }}
        className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full blur-[60px] sm:blur-[120px] opacity-15 transition-all duration-1000 ease-out">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        animate={
          isMobile
            ? undefined
            : { x: [0, 15, -15, 0], y: [0, -20, 10, 0] }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -3,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[50px] sm:blur-[100px] opacity-10 transition-all duration-1000 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,204,0.2) 0%, rgba(0,184,163,0.1) 50%, transparent 70%)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='7' cy='11' r='0.8'/%3E%3Ccircle cx='21' cy='5' r='0.6'/%3E%3Ccircle cx='38' cy='14' r='0.7'/%3E%3Ccircle cx='56' cy='8' r='0.5'/%3E%3Ccircle cx='13' cy='31' r='0.5'/%3E%3Ccircle cx='29' cy='24' r='0.8'/%3E%3Ccircle cx='48' cy='34' r='0.6'/%3E%3Ccircle cx='61' cy='25' r='0.5'/%3E%3Ccircle cx='5' cy='52' r='0.7'/%3E%3Ccircle cx='23' cy='58' r='0.5'/%3E%3Ccircle cx='42' cy='49' r='0.8'/%3E%3Ccircle cx='58' cy='57' r='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10"
        style={{
          y: contentY,
          scale: contentScale,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content - order changes based on RTL/LTR */}
          <motion.div
            initial="hidden"
            animate="visible"
            className={`text-center ${isRTL ? "lg:text-right lg:order-1" : "lg:text-left lg:order-2"}`}
            style={{ transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            {/* Badge */}
            <motion.div
              style={{
                y: badgeY,
                scale: badgeScale,
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="inline-flex items-center mb-8">
              <SectionBadge
                icon={
                  <span className="block w-2 h-2 rounded-full bg-[#00e5cc] animate-dot-pulse" />
                }>
                {t("badge")}
              </SectionBadge>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              style={{
                y: headingY,
                scale: headingScale,
                letterSpacing: isMobile ? 0 : headingLetterSpacing,
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.3] mb-6 text-foreground transition-all duration-700 ease-out">
              {t("title")}{" "}
              <span
                className="relative inline-block mt-2 transition-all duration-700 ease-out gradient-text"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0, 229, 204, 0.3))",
                }}>
                {t("highlight")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              style={{
                y: descY,
                scale: descScale,
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="text-lg sm:text-xl text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-600 ease-out">
              {t("description")}
            </motion.p>

            {/* Buttons - order reversed for LTR */}
            <motion.div
              style={{
                y: buttonsY,
                scale: buttonsScale,
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`flex flex-row gap-2 sm:gap-4 w-full sm:w-auto ${isRTL ? "justify-center lg:justify-start" : "justify-center lg:justify-start"}`}>
              {isRTL ? (
                <>
                  {/* Primary CTA (RTL: right side first) */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="flex-1 sm:flex-none min-w-0">
                    <Link
                      href="#contact"
                      className="relative w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg overflow-hidden group transition-all duration-500 ease-out"
                      style={{
                        background:
                          "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
                        boxShadow:
                          "0 0 30px rgba(0, 229, 204, 0.4), 0 4px 15px rgba(0, 229, 204, 0.25)",
                      }}>
                      <span className="relative z-10 text-black">
                        {t("cta")}
                      </span>
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%)",
                        }}
                      />
                    </Link>
                  </motion.div>
                  {/* Secondary CTA */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="flex-1 sm:flex-none min-w-0">
                    <Link
                      href="#portfolio"
                      className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg group transition-all duration-500 ease-out bg-card border border-border"
                      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}>
                      <span className="text-muted group-hover:text-foreground transition-colors">
                        {t("secondary")}
                      </span>
                      <motion.svg
                        className="w-5 h-5 text-muted group-hover:text-accent transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: -5 }}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Secondary CTA (LTR: left side first) */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="flex-1 sm:flex-none min-w-0">
                    <Link
                      href="#portfolio"
                      className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg group transition-all duration-500 ease-out bg-card border border-border"
                      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}>
                      <motion.svg
                        className="w-5 h-5 text-muted group-hover:text-accent transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: -5 }}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                      <span className="text-muted group-hover:text-foreground transition-colors">
                        {t("secondary")}
                      </span>
                    </Link>
                  </motion.div>
                  {/* Primary CTA */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="flex-1 sm:flex-none min-w-0">
                    <Link
                      href="#contact"
                      className="relative w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg overflow-hidden group transition-all duration-500 ease-out"
                      style={{
                        background:
                          "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
                        boxShadow:
                          "0 0 30px rgba(0, 229, 204, 0.4), 0 4px 15px rgba(0, 229, 204, 0.25)",
                      }}>
                      <span className="relative z-10 text-black">
                        {t("cta")}
                      </span>
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%)",
                        }}
                      />
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              style={{
                y: trustY,
                scale: trustScale,
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="mt-16 pt-8">
              <div className="pt-8 transition-all duration-500 ease-out border-t border-border">
                <p className="text-sm text-muted mb-5">{t("trust")}</p>
                <div
                  className={`flex items-center gap-10 ${isRTL ? "justify-center lg:justify-start" : "justify-center lg:justify-start"}`}>
                  {trustBrands.map((brand, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold text-muted hover:text-foreground transition-all duration-500 ease-out cursor-default">
                      {brand}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual element - order changes based on RTL/LTR */}
          <motion.div
            style={{
              scale: visualScale,
              y: visualY,
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`relative hidden lg:flex items-center justify-center ${isRTL ? "lg:order-2" : "lg:order-1"}`}>
            <div className="relative w-full aspect-square max-w-[500px]">
              {/* Concentric circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    scale: circle1Scale,
                    rotate: useTransform(scrollYProgress, [0, 0.5], [0, 180]),
                    transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="w-[280px] h-[280px]">
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
                    style={{
                      border: "1.5px solid rgba(0, 229, 204, 0.15)",
                      boxShadow:
                        "0 0 30px rgba(0, 229, 204, 0.05), inset 0 0 30px rgba(0, 229, 204, 0.02)",
                    }}
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 100,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    scale: circle2Scale,
                    rotate: useTransform(scrollYProgress, [0, 0.5], [0, -180]),
                    transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute w-[340px] h-[340px]">
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
                    style={{
                      border: "1px solid rgba(0, 229, 204, 0.1)",
                      boxShadow: "0 0 20px rgba(0, 229, 204, 0.03)",
                    }}
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    scale: circle3Scale,
                    transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute w-[400px] h-[400px]">
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
                    style={{ border: "0.5px solid rgba(37, 42, 54, 0.15)" }}
                  />
                </motion.div>
              </div>

              {/* Center floating card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    y: centerCardY,
                    scale: centerCardScale,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="relative">
                  <div className="relative p-10 rounded-3xl transition-all duration-700 ease-out bg-card border border-border shadow-[0_0_60px_rgba(0,229,204,0.1)]">
                    <div className="text-center">
                      <div
                        className="text-6xl font-black mb-2 transition-all duration-700 ease-out gradient-text"
                        style={{
                          filter:
                            "drop-shadow(0 0 15px rgba(0, 229, 204, 0.3))",
                        }}>
                        +{toLocalDigits(340, locale)}%
                      </div>
                      <p className="text-muted text-sm transition-colors duration-500 ease-out">
                        {t("centerCard")}
                      </p>
                    </div>
                    <div
                      className="absolute inset-0 rounded-3xl opacity-50 transition-all duration-700 ease-out"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(0,229,204,0.1) 0%, transparent 70%)",
                        filter: "blur(30px)",
                        zIndex: -1,
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating stat card 1 */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-4, 3, -4] }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -1,
                }}
                style={{
                  y: card1Y,
                  x: card1X,
                  scale: card1Scale,
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute top-12 ${isRTL ? "right-4" : "left-4"}`}>
                <div className="p-5 rounded-2xl transition-all duration-500 ease-out bg-card border border-border shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ease-out bg-accent/10 shadow-[0_0_15px_rgba(0,229,204,0.1)]">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-muted">
                        {t("card1Title")}
                      </div>
                      <div className="font-bold text-foreground text-sm">
                        {t("card1Value")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [4, -3, 4] }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -4,
                }}
                style={{
                  y: card2Y,
                  x: card2X,
                  scale: card2Scale,
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute bottom-16 ${isRTL ? "left-4" : "right-4"}`}>
                <div className="p-5 rounded-2xl transition-all duration-500 ease-out bg-card border border-border shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ease-out bg-warm/10 shadow-[0_0_15px_rgba(255,107,74,0.1)]">
                      <svg
                        className="w-5 h-5 text-warm"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-muted">
                        {t("card2Title")}
                      </div>
                      <div className="font-bold text-foreground text-sm">
                        {t("card2Value")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          opacity: scrollIndicatorOpacity,
          scale: scrollIndicatorScale,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-muted tracking-wider">
          {t("scroll")}
        </span>
        <div className="w-6 h-10 rounded-full flex justify-center transition-all duration-500 ease-out border-2 border-border/40">
          <motion.div
            animate={{ y: [2, 16, 2] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-3 rounded-full mt-2 transition-all duration-500 ease-out bg-gradient-to-b from-accent to-accentDark shadow-[0_0_10px_rgba(0,229,204,0.5)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
