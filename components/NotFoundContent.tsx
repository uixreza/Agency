"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function NotFoundContent({
  heading,
  description,
  button,
  dir,
}: {
  heading: string;
  description: string;
  button: ReactNode;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div
      dir={dir}
      className="min-h-screen bg-bg relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(color-mix(in srgb, var(--color-foreground) 14%, transparent) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,204,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[7rem] sm:text-[9rem] lg:text-[12rem] font-black leading-none gradient-text select-none">
          404
        </motion.div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mt-4 mb-4">
          {heading}
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-md mx-auto mb-8">
          {description}
        </p>
        {button}
      </motion.div>
    </div>
  );
}