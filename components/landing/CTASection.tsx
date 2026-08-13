"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, smoothTransition } from "@/lib/animations";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CTASection() {
  const t = useTranslations("cta");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();
  const disableBlobs = isMobile || prefersReducedMotion;
  return (
    <section className="relative py-20 lg:py-32 bg-bg overflow-hidden">
      {/* Radial gradient background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0, 229, 204, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255, 107, 74, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(0, 229, 204, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 100%, rgba(0, 184, 163, 0.04) 0%, transparent 40%)
          `,
        }}
      />

      {/* Decorative blobs */}
      <motion.div
        animate={
          disableBlobs
            ? undefined
            : {
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.1, 0.9, 1],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="w-80 h-80 bg-accent/10 top-0 right-1/4 absolute rounded-full blur-[100px] opacity-30"
      />
      <motion.div
        animate={
          disableBlobs
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
        className="w-64 h-64 bg-warm/10 bottom-0 left-1/4 absolute rounded-full blur-[100px] opacity-30"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}>
          <motion.h2
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            {t("description")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={smoothTransition}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
                  boxShadow: "0 0 30px rgba(0, 229, 204, 0.4)",
                }}>
                <span className="relative z-10 text-black">
                  {t("button")}
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                  }}
                />
              </Link>
            </motion.div>

            {/* Secondary CTA - Phone */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="tel:+982112345678"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-[#374151] hover:border-accent bg-[#161922] transition-all duration-300 text-white">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{t("phone")}</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
