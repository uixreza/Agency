"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-bg overflow-hidden font-vazir">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Minimal gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,204,0.25) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,74,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Minimal 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
            Error 404
          </p>
          <h1
            className="text-8xl sm:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none mb-4"
            style={{
              background:
                "linear-gradient(180deg, #00e5cc 0%, #00b8a3 50%, #ff6b4a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(0,229,204,0.15))",
            }}>
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            صفحه پیدا نشد
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            به نظر می‌رسد این صفحه به مقصد دیگری کوچ کرده. بیایید شما را به مسیر
            درست برگردانیم.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
              boxShadow: "0 0 25px rgba(0,229,204,0.25)",
            }}>
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-black font-medium">بازگشت به خانه</span>
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-gray-400 hover:text-white transition-all duration-300">
            <span>گزارش مشکل</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
