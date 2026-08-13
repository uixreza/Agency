"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HOLD_MS = 2100;
const FADE_MS = 500;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 45%, transparent) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: [0.55, 1.08, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.85, times: [0, 0.7, 1], ease: "easeOut" }}
            className="relative flex flex-col items-center">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(0,229,204,0.25)",
                  "0 0 120px rgba(0,229,204,0.45)",
                  "0 0 60px rgba(0,229,204,0.25)",
                ],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center">
              <svg
                className="w-14 h-14 text-white"
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="mt-6 text-sm font-bold text-foreground">
              NOVIN DIGITAL
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}