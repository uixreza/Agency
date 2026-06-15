"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const services = [
  {
    number: "۰۱",
    title: "طراحی گرافیک و هویت بصری",
    description:
      "طراحی لوگو، کیت برند، محتوای شبکه‌های اجتماعی، کاتالوگ، بنر و دارایی‌های بصری هماهنگ با شخصیت برند.",
    tags: ["Logo", "Brand Book", "Social Kit"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343"
        />
      </svg>
    ),
    color: "accent",
    hoverColor: "hover:border-accent/40",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    number: "۰۲",
    title: "توسعه اپلیکیشن موبایل",
    description:
      "طراحی تجربه کاربری، توسعه Android و iOS، اتصال به API، پرداخت، پنل مدیریت و انتشار نسخه نهایی.",
    tags: ["Android", "iOS", "UI/UX"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "warm",
    hoverColor: "hover:border-warm/40",
    bgColor: "bg-warm/10",
    textColor: "text-warm",
  },
  {
    number: "۰۳",
    title: "طراحی و توسعه وب‌سایت",
    description:
      "وب‌سایت شرکتی، فروشگاه آنلاین، لندینگ پیج، داشبورد و وب‌اپلیکیشن سریع، امن و بهینه برای تبدیل.",
    tags: ["Corporate", "E-commerce", "Dashboard"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "accent",
    hoverColor: "hover:border-accent/40",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    number: "۰۴",
    title: "سئو و بهینه‌سازی سایت",
    description:
      "تحقیق کلمات کلیدی، سئو تکنیکال، تولید محتوا، لینک‌سازی و بهبود ساختار سایت برای رشد ترافیک ارگانیک.",
    tags: ["Technical SEO", "Content", "Growth"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    color: "warm",
    hoverColor: "hover:border-warm/40",
    bgColor: "bg-warm/10",
    textColor: "text-warm",
  },
  {
    number: "۰۵",
    title: "تبلیغات دیجیتال",
    description:
      "راه‌اندازی و مدیریت کمپین‌های تبلیغاتی، ریمارکتینگ، بهینه‌سازی بودجه و گزارش بازگشت سرمایه.",
    tags: ["Google Ads", "Retargeting", "ROAS"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
    color: "accent",
    hoverColor: "hover:border-accent/40",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    number: "۰۶",
    title: "مدیریت شبکه‌های اجتماعی",
    description:
      "استراتژی محتوا، تقویم انتشار، طراحی پست و استوری، کپشن‌نویسی، گزارش تعامل و رشد جامعه مخاطبان.",
    tags: ["Content Plan", "Instagram", "LinkedIn"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 8h6M7 12h4M5 4h10a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 4v-4H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        />
      </svg>
    ),
    color: "warm",
    hoverColor: "hover:border-warm/40",
    bgColor: "bg-warm/10",
    textColor: "text-warm",
  },
  {
    number: "۰۷",
    title: "ایمیل و اتوماسیون بازاریابی",
    description:
      "طراحی مسیرهای ایمیلی، سگمنت‌بندی مشتریان، خبرنامه، پیام‌های بازگشتی و کمپین‌های فروش مجدد.",
    tags: ["Automation", "Newsletter", "CRM"],
    icon: (
      <svg
        className="w-7 h-7"
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
    color: "accent",
    hoverColor: "hover:border-accent/40",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    number: "۰۸",
    title: "تحلیل داده و گزارش عملکرد",
    description:
      "پیاده‌سازی ابزارهای تحلیلی، داشبورد اختصاصی، تعریف KPI و ارائه گزارش‌های کاربردی برای تصمیم‌گیری دقیق.",
    tags: ["Analytics", "Dashboard", "KPI"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    color: "warm",
    hoverColor: "hover:border-warm/40",
    bgColor: "bg-warm/10",
    textColor: "text-warm",
  },
  {
    number: "۰۹",
    title: "مشاوره محصول و استراتژی دیجیتال",
    description:
      "تحلیل بازار، طراحی نقشه راه، اولویت‌بندی امکانات، تعریف قیف فروش و برنامه اجرایی برای رشد مرحله‌به‌مرحله.",
    tags: ["Roadmap", "Strategy", "Conversion"],
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-.42-.16l-.894-2.236a2 2 0 00-1.857-1.258h-1.696a2 2 0 00-1.857 1.258l-.894 2.236a6 6 0 00-.42.16l-2.387.477a2 2 0 00-1.022.547l-1.2 1.2a2 2 0 000 2.828l1.2 1.2a2 2 0 001.414.586H18a2 2 0 001.414-.586l1.2-1.2a2 2 0 000-2.828l-1.186-1.2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8V3m0 5a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
    ),
    color: "accent",
    hoverColor: "hover:border-accent/40",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
];

const deliverables = [
  {
    number: "۱",
    title: "تحلیل و برنامه‌ریزی",
    description:
      "نیاز، مخاطب، رقبا، امکانات، بودجه و شاخص‌های موفقیت قبل از شروع کار روشن می‌شوند.",
    color: "accent",
  },
  {
    number: "۲",
    title: "طراحی و نمونه اولیه",
    description:
      "وایرفریم، مسیر کاربر، هویت بصری و نمونه قابل بررسی پیش از اجرای نهایی آماده می‌شود.",
    color: "warm",
  },
  {
    number: "۳",
    title: "توسعه و انتشار",
    description:
      "خروجی نهایی با تست، بهینه‌سازی، مستندات و پشتیبانی اولیه تحویل داده می‌شود.",
    color: "accent",
  },
  {
    number: "۴",
    title: "گزارش و بهبود مستمر",
    description:
      "داده‌ها بررسی می‌شوند و نسخه‌های بعدی بر اساس عملکرد واقعی و بازخورد کاربران ساخته می‌شوند.",
    color: "warm",
  },
];

export default function ServicesPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="bg-bg" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[66vh] flex items-center pt-20 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(37, 42, 54, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 42, 54, 0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Background blobs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,204,0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -8,
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full"
          style={{ y: heroY, opacity: heroOpacity }}>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-muted">
                  راهکارهای کامل برای رشد دیجیتال
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
                خدمات تخصصی
                <span className="gradient-text"> نوین دیجیتال</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted max-w-2xl">
                از طراحی گرافیک و هویت بصری تا توسعه وب‌سایت، اپلیکیشن موبایل،
                سئو، تبلیغات و تحلیل داده؛ تیم ما مسیر کامل تبدیل ایده به محصول
                و رشد پایدار را کنار شما اجرا می‌کند.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/contact"
                  className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors text-center shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                  دریافت مشاوره
                </Link>
                <Link
                  href="#services-list"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                  مشاهده خدمات
                </Link>
              </motion.div>
            </div>

            {/* Stats Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#161922] border border-border rounded-2xl p-6 lg:p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,229,204,0.08), transparent 44%), linear-gradient(225deg, rgba(255,107,74,0.08), transparent 48%), rgba(22,25,34,0.95)",
              }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg border border-border rounded-2xl p-5">
                  <div className="text-4xl font-black gradient-text mb-2">
                    ۱۲+
                  </div>
                  <div className="text-sm text-muted">حوزه تخصصی</div>
                </div>
                <div className="bg-bg border border-border rounded-2xl p-5">
                  <div className="text-4xl font-black text-warm mb-2">۵۰۰+</div>
                  <div className="text-sm text-muted">پروژه اجرا شده</div>
                </div>
                <div className="col-span-2 bg-bg border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-muted">مسیر همکاری</span>
                    <span className="text-accent font-bold">
                      از تحلیل تا رشد
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted">
                    <span className="rounded-lg bg-card border border-border py-2">
                      کشف
                    </span>
                    <span className="rounded-lg bg-card border border-border py-2">
                      طراحی
                    </span>
                    <span className="rounded-lg bg-card border border-border py-2">
                      اجرا
                    </span>
                    <span className="rounded-lg bg-card border border-border py-2">
                      بهبود
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services List */}
      <section
        id="services-list"
        className="relative py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <span className="inline-block text-accent font-medium mb-4">
              فهرست خدمات
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              همه نیازهای دیجیتال در یک تیم
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              هر خدمت می‌تواند مستقل اجرا شود یا به‌عنوان بخشی از یک مسیر کامل
              رشد برای کسب‌وکار شما کنار هم قرار گیرد.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-card border border-border rounded-2xl p-6 lg:p-8 ${service.hoverColor} transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center`}>
                    <span className={service.textColor}>{service.icon}</span>
                  </div>
                  <span
                    className="text-5xl font-black"
                    style={{
                      WebkitTextStroke: `1px rgba(0, 229, 204, 0.35)`,
                      color: "transparent",
                    }}>
                    {service.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-surface border border-border rounded-lg px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(37, 42, 54, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 42, 54, 0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <span className="inline-block text-accent font-medium mb-4">
                خروجی همکاری
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                فقط اجرا نمی‌کنیم؛ مسیر رشد را قابل پیگیری می‌سازیم
              </h2>
              <p className="text-muted text-lg">
                برای هر پروژه، خروجی‌ها، زمان‌بندی، شاخص‌های موفقیت و گزارش‌های
                قابل اندازه‌گیری مشخص می‌شود تا بدانید هر قدم چه اثری روی
                کسب‌وکار شما دارد.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {deliverables.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black mb-5 ${
                      item.color === "accent"
                        ? "bg-accent/10 text-accent"
                        : "bg-warm/10 text-warm"
                    }`}>
                    {item.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 bg-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(37, 42, 54, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 42, 54, 0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,204,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              برای انتخاب خدمت مناسب آماده‌اید؟
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              اگر دقیق نمی‌دانید از کدام خدمت شروع کنید، brief اولیه را برای ما
              بفرستید تا مسیر مناسب پروژه مشخص شود.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                شروع همکاری
              </Link>
              <Link
                href="/our-works"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                مشاهده نمونه کارها
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
