"use client";
import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function ScrollProgressIndicator() {
  const pathname = usePathname();
  const t = useTranslations("ui");
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();

  // Line height that follows scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Circle position follows the line
  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Check if near bottom and show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Check if near bottom (within 200px)
      setIsNearBottom(scrollHeight - scrollTop - clientHeight < 200);

      // Show scroll to top button after scrolling 500px
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname.includes("/panel")) return null;

  return (
    <div className="fixed right-0 top-0 h-full z-30 pointer-events-none hidden sm:block">
      <div className="relative h-full flex items-center justify-center">
        {/* Main container */}
        <div className="relative h-[70vh] flex flex-col items-center justify-between py-8 mr-3 sm:mr-4 lg:mr-6">
          {/* Top dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />

          {/* Progress line container */}
          <div className="relative flex-1 w-[2px] mx-auto min-h-0">
            {/* Background line */}
            <div className="absolute inset-0 w-full bg-white/5 rounded-full" />

            {/* Active progress line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent to-accentDark rounded-full shadow-[0_0_8px_rgba(0,229,204,0.5)]"
            />

            {/* Glowing circle indicator */}
            <motion.div
              style={{ top: circleY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-accent/20 blur-md" />

                {/* Main circle */}
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(0,229,204,0.8),0_0_24px_rgba(0,229,204,0.4)] border border-accent/30" />

                {/* Pulse animation when near bottom */}
                {isNearBottom && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-accent"
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />
        </div>

        {/* Scroll to top button - positioned relative to the entire container */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={scrollToTop}
              className="absolute bottom-8 sm:bottom-12 lg:bottom-16  -translate-x-1/2 pointer-events-auto group z-30"
              aria-label={t("backToTop")}>
              <div className="relative">
                {/* Button background with glow */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_rgba(0,229,204,0.3)]">
                  <motion.svg
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-accent transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </motion.svg>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
                  <div className="bg-surface/90 absolute  backdrop-blur-sm border border-border/50 rounded-lg px-3 py-1.5 text-xs text-foreground whitespace-nowrap shadow-lg">
                    {t("backToTop")}
                  </div>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
