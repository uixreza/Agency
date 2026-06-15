"use client";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

const works = [
  {
    title: "هویت بصری رستوران باران",
    category: "graphic",
    label: "طراحی گرافیک",
    result: "کیت کامل برند",
    color: "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
    tags: ["لوگو", "منو", "شبکه اجتماعی"],
  },
  {
    title: "اپلیکیشن سفارش آنلاین مدیس",
    category: "mobile",
    label: "اپلیکیشن موبایل",
    result: "+۴۲٪ نرخ سفارش",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["UI/UX", "Android", "iOS"],
  },
  {
    title: "فروشگاه اینترنتی آرتان",
    category: "web",
    label: "توسعه وب",
    result: "+۲۸۰٪ فروش",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["E-commerce", "Dashboard", "SEO"],
  },
  {
    title: "کمپین لانچ فین تک",
    category: "marketing",
    label: "دیجیتال مارکتینگ",
    result: "ROAS ۴.۵x",
    color: "linear-gradient(135deg, #ff6b4a 0%, #ff4757 100%)",
    tags: ["Ads", "Landing", "Analytics"],
  },
  {
    title: "بازطراحی برند کلینیک آوین",
    category: "branding",
    label: "برندینگ",
    result: "+۳۵٪ مراجعه جدید",
    color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    tags: ["Brand book", "Tone", "Identity"],
  },
  {
    title: "داشبورد مدیریت حمل و نقل",
    category: "web",
    label: "توسعه وب",
    result: "۵۰٪ کاهش زمان عملیات",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    tags: ["SaaS", "Admin", "Reports"],
  },
  {
    title: "اپلیکیشن رزرو نوبت سلامت",
    category: "mobile",
    label: "اپلیکیشن موبایل",
    result: "+۱۵۰٪ نوبت دهی",
    color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    tags: ["Booking", "Profile", "Payment"],
  },
  {
    title: "پکیج محتوایی کافه نوین",
    category: "graphic",
    label: "طراحی گرافیک",
    result: "+۵۰K دنبال کننده",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    tags: ["Post", "Story", "Motion"],
  },
  {
    title: "سئو سایت خبری اقتصاد روز",
    category: "marketing",
    label: "دیجیتال مارکتینگ",
    result: "+۵۰۰٪ ترافیک",
    color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    tags: ["SEO", "Content", "Growth"],
  },
  {
    title: "وب سایت شرکتی مهندسی نیکان",
    category: "web",
    label: "توسعه وب",
    result: "+۷۰٪ لید ورودی",
    color: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
    tags: ["Corporate", "RTL", "Forms"],
  },
  {
    title: "سیستم طراحی محصول آموزشی",
    category: "branding",
    label: "برندینگ",
    result: "یکپارچه سازی محصول",
    color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    tags: ["Design system", "UI kit", "Guide"],
  },
  {
    title: "کمپین تبلیغاتی پوشاک نارین",
    category: "marketing",
    label: "دیجیتال مارکتینگ",
    result: "+۱۹۰٪ فروش فصلی",
    color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    tags: ["PPC", "Social", "Retarget"],
  },
];

const filters = [
  { id: "all", label: "همه" },
  { id: "graphic", label: "طراحی گرافیک" },
  { id: "mobile", label: "اپلیکیشن موبایل" },
  { id: "web", label: "توسعه وب" },
  { id: "marketing", label: "دیجیتال مارکتینگ" },
  { id: "branding", label: "برندینگ" },
];

const processSteps = [
  {
    number: "۱",
    title: "تحلیل نیاز",
    description:
      "هدف، مخاطب، رقبا و شاخص های موفقیت قبل از طراحی مشخص می شوند.",
    color: "accent",
  },
  {
    number: "۲",
    title: "طراحی مسیر",
    description: "ساختار تجربه کاربر، هویت بصری و نقشه اجرای فنی آماده می شود.",
    color: "warm",
  },
  {
    number: "۳",
    title: "تولید و توسعه",
    description:
      "طراحی ها به محصول، کمپین یا دارایی های آماده انتشار تبدیل می شوند.",
    color: "accent",
  },
  {
    number: "۴",
    title: "بهبود مستمر",
    description:
      "عملکرد بررسی می شود و نسخه های بعدی بر اساس داده و بازخورد ساخته می شوند.",
    color: "warm",
  },
];

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const filteredWorks =
    activeFilter === "all"
      ? works
      : works.filter((w) => w.category === activeFilter);

  return (
    <main className="bg-bg" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[66vh] flex items-center pt-20 overflow-hidden">
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
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-muted">
                  نمای کامل پروژه های اجرا شده
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
                نمونه کارهای <span className="gradient-text">نوین دیجیتال</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted max-w-2xl">
                از طراحی گرافیک و هویت بصری تا توسعه اپلیکیشن موبایل، طراحی وب
                سایت، سئو و کمپین های دیجیتال؛ این صفحه نمایی از پروژه هایی است
                که برای رشد برندها ساخته ایم.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-4xl font-black gradient-text mb-2">
                    ۵۰۰+
                  </div>
                  <div className="text-sm text-muted">پروژه موفق</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-accent mx-auto mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                      />
                    </svg>
                    <div className="font-bold text-foreground">
                      طراحی اختصاصی
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-warm/10 border border-warm/30 rounded-2xl p-6">
                  <div className="text-4xl font-black text-warm mb-2">۱۲</div>
                  <div className="text-sm text-muted">حوزه تخصصی</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-4xl font-black gradient-text mb-2">
                    ۹۸٪
                  </div>
                  <div className="text-sm text-muted">رضایت مشتری</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Works Grid */}
      <section className="relative py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <span className="inline-block text-accent font-medium mb-4">
              آرشیو پروژه ها
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              پروژه ها بر اساس تخصص
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              فیلتر کنید و نمونه هایی از خروجی تیم های طراحی، توسعه، بازاریابی و
              محصول را ببینید.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-accent border-accent text-bg"
                    : "border-border text-muted hover:border-accent/50 hover:text-foreground"
                }`}>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Works Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredWorks.map((work, index) => (
                <motion.article
                  key={`${work.category}-${work.title}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{ background: work.color }}>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,9,13,0.72), transparent 58%), linear-gradient(135deg, rgba(255,255,255,0.14), transparent 42%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <span className="inline-flex bg-bg/75 border border-white/10 backdrop-blur px-3 py-1 rounded-full text-xs text-accent mb-3">
                        {work.label}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="text-muted text-sm">نتیجه پروژه</span>
                      <strong className="text-accent">{work.result}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs text-muted bg-surface border border-border px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <span className="inline-block text-accent font-medium mb-4">
                روش همکاری
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                از ایده تا اجرای قابل اندازه گیری
              </h2>
              <p className="text-muted text-lg">
                هر پروژه با شناخت هدف تجاری شروع می شود و با طراحی، توسعه، تست و
                گزارش عملکرد ادامه پیدا می کند.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${step.color}/10 text-${step.color} flex items-center justify-center font-black mb-5`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm">{step.description}</p>
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
              پروژه بعدی شما را شروع کنیم؟
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              برای طراحی گرافیک، اپلیکیشن موبایل، وب سایت یا کمپین دیجیتال،
              brief اولیه را برای ما ارسال کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                شروع همکاری
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
