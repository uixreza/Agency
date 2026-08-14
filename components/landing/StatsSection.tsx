"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { staggerContainer, fadeInUp, smoothTransition } from "@/lib/animations";
import { toLocalDigits } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

interface CounterProps {
  target: number;
  suffix?: string;
  locale: string;
}

function AnimatedCounter({ target, suffix = "", locale }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="counter font-tabular-nums">
      {toLocalDigits(count, locale)}
      {suffix}
    </span>
  );
}

const targets = [523, 98, 8, 25];

export default function StatsSection() {
  const t = useTranslations("stats");
  const locale = useLocale();
  const items = t.raw("items") as { label: string; suffix: string }[];
  const stats = items.map((item, index) => ({
    ...item,
    target: targets[index] ?? 0,
  }));
  return (
    <section className="relative py-20 bg-bg backdrop-blur-sm overflow-hidden">
      {/* Grid Pattern - Matching Hero */}
      <div className="absolute inset-0 opacity-[0]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 42, 54, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 42, 54, 0.9) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={smoothTransition}
              className="group relative">
              <div className="relative p-6 sm:p-8 rounded-3xl shadow bg-card text-center h-full transition-all duration-300 group-hover:scale-[1.03]">
                {/* Subtle glow accent */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30 -z-10"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(0,229,204,0.15) 0%, transparent 70%)",
                  }}
                />

                <div className="text-3xl sm:text-5xl lg:text-6xl font-black mb-2 sm:mb-4 tracking-tighter gradient-text">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    locale={locale}
                  />
                </div>

                <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-medium leading-snug">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
