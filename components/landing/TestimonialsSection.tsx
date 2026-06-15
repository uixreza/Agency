"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/lib/data";
import { fadeInUp, smoothTransition } from "@/lib/animations";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonialsData.length - 1;
      if (next >= testimonialsData.length) return 0;
      return next;
    });
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const testimonial = testimonialsData[current];

  return (
    <section id="testimonials" className="relative py-20 lg:py-32 bg-bg">
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
            نظرات مشتریان
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            آنچه مشتریان می‌گویند
          </motion.h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative p-8 lg:p-10 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accentDark flex items-center justify-center text-black font-bold text-xl ring-2 ring-offset-4 ring-offset-card ring-accent">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-muted">{testimonial.role}</div>
                  </div>
                </div>

                <p className="text-muted text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex gap-1 mt-8">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-5 h-5 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-2xl border border-border bg-card flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all"
              aria-label="قبلی">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            <div className="flex items-center gap-3">
              {testimonialsData.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-accent w-8 h-3 shadow-[0_0_10px_var(--color-accent)]"
                      : "bg-muted hover:bg-foreground/50 w-3 h-3"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`اسلاید ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-2xl border border-border bg-card flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all"
              aria-label="بعدی">
              <svg
                className="w-5 h-5"
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
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
