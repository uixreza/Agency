"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  fadeInUp,
  fadeInRight,
  fadeInLeft,
  staggerContainer,
  smoothTransition,
} from "@/lib/animations";
import { useTranslations, useLocale } from "next-intl";
import { toLocalDigits } from "@/lib/data";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 bg-bg overflow-hidden">
      {/* Decorative blob - kept */}
      <motion.div
        animate="animate"
        className="w-96 h-96 bg-accent/10 top-1/2 -left-48 absolute rounded-full blur-[100px] opacity-30"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>
            <motion.span
              variants={fadeInUp}
              transition={smoothTransition}
              className="inline-block text-accent font-medium mb-4">
              {t("title")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              transition={smoothTransition}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              {t("heading")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={smoothTransition}
              className="text-muted text-lg mb-6">
              {t("description1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              transition={smoothTransition}
              className="text-muted mb-8">
              {t("description2")}
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mb-8">
              <motion.div
                variants={fadeInUp}
                transition={smoothTransition}
                className="relative p-6 rounded-3xl bg-card border border-border">
                <div className="text-4xl font-black gradient-text mb-2">
                  {toLocalDigits(340, locale)}%
                </div>
                <div className="text-muted">{t("stat1")}</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                transition={smoothTransition}
                className="relative p-6 rounded-3xl bg-card border border-border">
                <div className="text-4xl font-black gradient-text mb-2">
                  {toLocalDigits(2.5, locale)}x
                </div>
                <div className="text-muted">{t("stat2")}</div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={fadeInUp}
              transition={smoothTransition}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group transition-all duration-300 bg-gradient-to-r from-accent to-accentDark shadow-[0_0_30px_var(--color-accent)]">
                <span className="relative z-10 text-black">{t("cta")}</span>
                <motion.svg
                  className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Visual Elements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  variants={fadeInRight}
                  transition={{ ...smoothTransition, delay: 0.1 }}
                  className="relative p-6 rounded-3xl h-48 flex items-center justify-center bg-card border border-border">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-accent mx-auto mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div className="font-bold text-foreground">{t("trust")}</div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInRight}
                  transition={{ ...smoothTransition, delay: 0.2 }}
                  className="relative p-6 rounded-3xl bg-gradient-to-r from-accent to-accentDark border border-accent shadow-[0_0_40px_var(--color-accent)]">
                  <div className="text-4xl font-black text-white mb-1">
                    {toLocalDigits(8, locale)}+
                  </div>
                  <div className="text-white/80">{t("experience")}</div>
                </motion.div>
              </div>

              <div className="space-y-4 pt-8">
                <motion.div
                  variants={fadeInLeft}
                  transition={{ ...smoothTransition, delay: 0.3 }}
                  className="relative p-6 rounded-3xl bg-gradient-to-r from-warm to-[#ff4757] border border-warm shadow-[0_0_40px_var(--color-warm)]">
                  <div className="text-4xl font-black text-white mb-1">
                    {toLocalDigits(500, locale)}+
                  </div>
                  <div className="text-white/80">{t("projects")}</div>
                </motion.div>

                <motion.div
                  variants={fadeInLeft}
                  transition={{ ...smoothTransition, delay: 0.4 }}
                  className="relative p-6 rounded-3xl h-48 flex items-center justify-center bg-card border border-border">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-warm mx-auto mb-3"
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
                    <div className="font-bold text-foreground">{t("agile")}</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
