"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer, smoothTransition } from "@/lib/animations";

const services = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "سئو و بهینه‌سازی",
    description:
      "با تکنیک‌های پیشرفته سئو، سایت شما را به صفحه اول گوگل می‌آوریم و ترافیک ارگانیک را چند برابر کنید.",
    items: ["سئو تکنیکال", "تحقیقات کلمات کلیدی", "لینک‌سازی"],
    checkColor: "text-accent",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "تبلیغات کلیکی",
    description:
      "مدیریت حرفه‌ای کمپین‌های گوگل ادز و شبکه‌های تبلیغاتی با بالاترین نرخ تبدیل و کمترین هزینه.",
    items: ["گوگل ادز", "ریمارکتینگ", "بهینه‌سازی نرخ تبدیل"],
    checkColor: "text-warm",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "شبکه‌های اجتماعی",
    description:
      "تولید محتوای خلاقانه و مدیریت حرفه‌ای حضور برند شما در تمام پلتفرم‌های اجتماعی.",
    items: ["اینستاگرام مارکتینگ", "لینکدین بیزینس", "تولید محتوا"],
    checkColor: "text-accent",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "طراحی وب‌سایت",
    description:
      "طراحی و توسعه وب‌سایت‌های مدرن، سریع و بهینه‌شده برای تبدیل بازدیدکننده به مشتری.",
    items: ["طراحی UI/UX", "فروشگاه آنلاین", "لندینگ پیج"],
    checkColor: "text-warm",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "ایمیل مارکتینگ",
    description:
      "طراحی و اجرای کمپین‌های ایمیل هدفمند برای افزایش وفاداری مشتریان و فروش مجدد.",
    items: ["اتوماسیون ایمیل", "خبرنامه", "سگمنت مشتریان"],
    checkColor: "text-accent",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "تحلیل و گزارش",
    description:
      "تحلیل دقیق داده‌ها و ارائه گزارش‌های منظم برای شناسایی فرصت‌های رشد.",
    items: ["گوگل آنالیتیکس", "داشبورد اختصاصی", "گزارش ماهانه"],
    checkColor: "text-warm",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-32 bg-bg">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            transition={smoothTransition}
            className="inline-block text-accent font-medium mb-4">
            خدمات ما
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            راه‌حل‌های جامع دیجیتال
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={smoothTransition}
            className="text-muted max-w-2xl mx-auto text-lg">
            از استراتژی تا اجرا، تمام نیازهای دیجیتال کسب‌وکار شما را پوشش
            می‌دهیم
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={smoothTransition}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group">
              <div className="relative h-full p-8 rounded-3xl transition-all duration-300 group-hover:scale-[1.02] bg-card border border-border shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
                {/* Icon with enhanced color */}
                <div
                  className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 ring-1 ring-offset-4 ring-offset-card ring-current/10 transition-all group-hover:scale-110`}
                  style={{
                    boxShadow: `0 0 25px ${service.iconBg.includes("accent") ? "rgba(0,229,204,0.25)" : "rgba(255,107,74,0.25)"}`,
                  }}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 text-sm text-muted">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${service.checkColor === "text-accent" ? "bg-accent/10" : "bg-warm/10"}`}>
                        <svg
                          className={`w-3.5 h-3.5 ${service.checkColor}`}
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/our-services"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group transition-all duration-300 bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <span className="relative z-10 text-foreground">
                مشاهده بیشتر
              </span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,229,204,0.2) 0%, transparent 60%)",
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
