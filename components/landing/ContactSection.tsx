"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  smoothTransition,
  fadeInRight,
} from "@/lib/animations";
import { serviceCategories } from "@/lib/data";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>
            <motion.span
              variants={fadeInUp}
              transition={smoothTransition}
              className="inline-block text-accent font-medium mb-4">
              تماس با ما
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              transition={smoothTransition}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              بیایید با هم صحبت کنیم
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={smoothTransition}
              className="text-muted text-lg mb-8">
              فرم را پر کنید یا از طریق اطلاعات زیر با ما در تماس باشید. تیم ما
              در اسرع وقت پاسخگوی شما خواهد بود.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  title: "آدرس دفتر",
                  content: "تهران، خیابان ولیعصر، برج آسمان، طبقه ۱۲",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "ایمیل",
                  content: "info@novindigital.ir",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  ),
                  title: "تلفن",
                  content: "۰۲۱-۱۲۳۴۵۶۷۸",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={smoothTransition}
                  className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl border-2 border-accent/40 group-hover:border-accent flex items-center justify-center flex-shrink-0 text-accent transition-all duration-300 group-hover:shadow-[0_0_15px_var(--color-accent)]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-foreground">
                      {item.title}
                    </div>
                    <div className="text-muted">{item.content}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
            transition={{ ...smoothTransition, delay: 0.2 }}>
            <motion.form
              onSubmit={handleSubmit}
              className="relative p-6 lg:p-8 rounded-3xl bg-card border border-border">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-muted"
                    placeholder="علی محمدی"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-foreground">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-muted"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-foreground">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-muted"
                  placeholder="example@email.com"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-2 text-foreground">
                  خدمت مورد نیاز
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 focus:border-accent focus:outline-none transition-colors text-foreground">
                  {serviceCategories.map((cat: any) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground">
                  پیام شما
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-surface border border-border rounded-2xl px-5 py-3.5 focus:border-accent focus:outline-none transition-colors text-foreground placeholder-muted resize-none"
                  placeholder="توضیحات پروژه خود را بنویسید..."
                />
              </div>

              {/* Improved Button Design */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all relative overflow-hidden ${
                  isSuccess
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-accent to-accentDark text-black shadow-lg shadow-accent/30"
                }`}>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: isSubmitting ? 0 : 1 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting
                    ? "در حال ارسال..."
                    : isSuccess
                      ? "✓ ارسال شد"
                      : "ارسال درخواست"}
                </span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
