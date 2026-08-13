"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, smoothTransition } from "@/lib/animations";
import { useTranslations } from "next-intl";

const cardStyles = [
  { category: "web", image: "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)" },
  { category: "seo", image: "linear-gradient(135deg, #ff6b4a 0%, #ff4757 100%)" },
  { category: "ads", image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { category: "social", image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { category: "web", image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { category: "seo", image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
];

export default function PortfolioSection() {
  const t = useTranslations("portfolio");
  const filters = t.raw("filters") as { value: string; label: string }[];
  const categories = t.raw("categories") as Record<string, string>;
  const items = t.raw("items") as { title: string; result: string }[];
  const portfolio = items.map((item, index) => ({
    ...item,
    ...(cardStyles[index] ?? cardStyles[0]),
  }));
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPortfolio =
    activeFilter === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            transition={smoothTransition}
            className="inline-block text-accent font-medium mb-4">
            {t("badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-white">
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Portfolio Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? "bg-accent text-black shadow-lg shadow-accent/30"
                  : "bg-[#161922] border border-[#374151] hover:border-accent/50 text-gray-300 hover:text-white"
              }`}>
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                whileHover={{ scale: 1.03 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer">
                <div
                  className="aspect-[4/3] w-full relative"
                  style={{
                    background: item.image,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                  {/* Permanent subtle dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Info Overlay - Now triggered on whole card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }} // Faster transition
                  className="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    className="rounded-2xl p-5 backdrop-blur-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    style={{
                      background: "rgba(22, 25, 34, 0.92)",
                      border: "1px solid rgba(37, 42, 54, 0.7)",
                    }}>
                    <span className="text-accent text-sm font-medium mb-2 block">
                      {categories[item.category]}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.result}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/our-works"
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group transition-all duration-300"
              style={{
                background: "rgba(22, 25, 34, 0.8)",
                border: "1px solid rgba(37, 42, 54, 0.6)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}>
              <motion.svg
                className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 4 }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7"
                />
              </motion.svg>
              <span className="relative z-10 text-white">{t("viewMore")}</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,229,204,0.15) 0%, transparent 60%)",
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
