"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "۵۲۳+", label: "پروژه موفق" },
  { value: "۹۸٪", label: "رضایت مشتری" },
  { value: "۸ سال", label: "تجربه فعالیت" },
  { value: "۲۵+", label: "متخصص حرفه‌ای" },
];

const timeline = [
  {
    year: "۱۳۹۵",
    title: "تأسیس نوین دیجیتال",
    description: "شروع فعالیت با تیم سه نفره و اولین مشتریان",
    color: "accent",
  },
  {
    year: "۱۳۹۷",
    title: "گسترش تیم و خدمات",
    description: "رسیدن به ۱۰ متخصص و اضافه شدن خدمات طراحی وب",
    color: "accent",
  },
  {
    year: "۱۳۹۹",
    title: "دفتر اختصاصی",
    description: "افتتاح دفتر اختصاصی در تهران و همکاری با برندهای بزرگ",
    color: "accent",
  },
  {
    year: "۱۴۰۳",
    title: "۵۰۰+ پروژه موفق",
    description: "رسیدن به ۲۵ متخصص و بیش از ۵۰۰ پروژه تکمیل‌شده",
    color: "warm",
  },
];

const values = [
  {
    title: "صداقت و شفافیت",
    description:
      "با مشتریان خود کاملاً صادق هستیم. گزارش‌های دقیق و واقعی ارائه می‌دهیم، حتی وقتی نتایج انتظارات را برآورده نکرده‌اند.",
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "نتیجه‌محوری",
    description:
      "هدف ما فقط انجام کار نیست، بلکه دستیابی به نتایج ملموس و قابل اندازه‌گیری برای کسب‌وکار شماست.",
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "warm",
  },
  {
    title: "نوآوری مستمر",
    description:
      "دنیای دیجیتال هر روز تغییر می‌کند. ما همیشه در حال یادگیری و به‌روزرسانی استراتژی‌های خود هستیم.",
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
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "مشارکت و همکاری",
    description:
      "با مشتریان خود شریک هستیم نه فقط ارائه‌دهنده خدمت. موفقیت شما، موفقیت ماست.",
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    color: "warm",
  },
  {
    title: "داده‌محوری",
    description:
      "هر تصمیمی که می‌گیریم بر پایه داده و تحلیل است، نه حدس و گمان. اعداد دروغ نمی‌گویند.",
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
    color: "accent",
  },
  {
    title: "اشتیاق و تعهد",
    description:
      "کار ما فقط یک شغل نیست. عاشق دیجیتال مارکتینگ هستیم و این اشتیاق در نتایج ما مشخص است.",
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: "warm",
  },
];

const teamMembers = [
  {
    name: "امیر محمدی",
    role: "مدیرعامل و بنیان‌گذار",
    avatar: "AM",
    avatarBg: "from-accent to-accentDark",
    bio: "۱۲ سال تجربه در دیجیتال مارکتینگ و راه‌اندازی کسب‌وکارهای آنلاین",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "سارا حسینی",
    role: "مدیر سئو و محتوا",
    avatar: "SH",
    avatarBg: "from-warm to-red-500",
    bio: "متخصص سئو با بیش از ۸ سال تجربه در رتبه‌بندی سایت‌های ایرانی",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "رضا کریمی",
    role: "مدیر تبلیغات دیجیتال",
    avatar: "RK",
    avatarBg: "from-purple-500 to-indigo-600",
    bio: "کارشناس گوگل ادز با گواهینامه‌های معتبر بین‌المللی و ۶ سال تجربه",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "نازنین احمدی",
    role: "مدیر شبکه‌های اجتماعی",
    avatar: "NA",
    avatarBg: "from-pink-500 to-warm",
    bio: "متخصص تولید محتوا و رشد ارگانیک با تجربه مدیریت بیش از ۵۰ پیج",
    socials: { linkedin: "#", instagram: "#" },
  },
];

const awards = [
  {
    title: "Google Partner",
    subtitle: "شریک رسمی گوگل",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "بهترین آژانس ۱۴۰۲",
    subtitle: "جایزه دیجیتال مارکتینگ",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    color: "warm",
  },
  {
    title: "ISO 9001",
    subtitle: "گواهینامه مدیریت کیفیت",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "عضو انجمن ملی",
    subtitle: "کسب‌وکارهای دیجیتال",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: "warm",
  },
];

export default function AboutPage() {
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
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
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
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-muted">
                از سال ۱۳۹۵ در خدمت شما
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              داستان <span className="gradient-text">نوین دیجیتال</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-2xl">
              ما یک تیم از متخصصان پرشور هستیم که با هدف کمک به رشد کسب‌وکارهای
              ایرانی در دنیای دیجیتال گرد هم آمده‌ایم.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center">
                <div className="text-4xl font-black gradient-text mb-1">
                  {stat.value}
                </div>
                <p className="text-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story + Timeline */}
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <span className="inline-block text-accent font-medium mb-4">
                داستان ما
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                از یک ایده تا یک آژانس پیشرو
              </h2>
              <p className="text-muted text-lg mb-5">
                نوین دیجیتال در سال ۱۳۹۵ با یک تیم کوچک سه نفره و یک رویا آغاز
                به کار کرد؛ رویایی برای ایجاد تحول در فضای دیجیتال مارکتینگ
                ایران.
              </p>
              <p className="text-muted mb-5">
                امروز، با بیش از ۲۵ متخصص در حوزه‌های سئو، تبلیغات دیجیتال،
                شبکه‌های اجتماعی و طراحی وب، افتخار داریم به صدها کسب‌وکار
                ایرانی کمک کرده‌ایم تا در دنیای آنلاین درخشان‌تر باشند.
              </p>
              <p className="text-muted">
                باور ما این است که موفقیت مشتریان ما، موفقیت ماست. به همین دلیل
                هر پروژه را با تمام توان و دانش خود پیش می‌بریم.
              </p>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pr-3 border-r-2 border-border space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute top-1.5 -right-[21px] w-4 h-4 rounded-full border-3 border-bg shadow-lg z-10"
                    style={{
                      background:
                        item.color === "accent" ? "#00e5cc" : "#ff6b4a",
                      boxShadow:
                        item.color === "accent"
                          ? "0 0 12px rgba(0,229,204,0.5)"
                          : "0 0 12px rgba(255,107,74,0.5)",
                    }}
                  />
                  <div
                    className={`bg-card border ${item.color === "warm" ? "border-warm/30" : "border-border"} rounded-xl p-5`}>
                    <div className={`text-${item.color} font-bold mb-1`}>
                      {item.year}
                    </div>
                    <h3 className="font-bold mb-1 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <span className="inline-block text-accent font-medium mb-4">
              ارزش‌های ما
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              آنچه به آن اعتقاد داریم
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              اصولی که راهنمای هر تصمیم و هر پروژه ما هستند
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-card border border-border rounded-2xl p-6 hover:border-${item.color}/40 transition-all duration-300`}>
                <div
                  className={`w-14 h-14 rounded-xl bg-${item.color}/10 flex items-center justify-center mb-5 text-${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
          className="absolute bottom-0 -left-48 w-96 h-96 rounded-full blur-[100px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,204,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <span className="inline-block text-accent font-medium mb-4">
              تیم ما
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              افرادی که پشت موفقیت شما هستند
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              تیم ما متشکل از متخصصانی با تجربه و اشتیاق در حوزه‌های مختلف
              دیجیتال مارکتینگ است
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/30 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white text-2xl font-black mx-auto mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-lg mb-1 text-foreground">
                  {member.name}
                </h3>
                <p className="text-accent text-sm mb-3">{member.role}</p>
                <p className="text-muted text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-2">
                  {Object.entries(member.socials).map(([type, href]) => (
                    <a
                      key={type}
                      href={href}
                      className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all duration-300"
                      aria-label={type}>
                      {type === "linkedin" ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="relative py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <span className="inline-block text-accent font-medium mb-4">
              افتخارات
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-foreground">
              جوایز و گواهینامه‌ها
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/30 transition-all duration-300">
                <div
                  className={`w-16 h-16 rounded-2xl bg-${award.color}/10 flex items-center justify-center mx-auto mb-4 text-${award.color}`}>
                  {award.icon}
                </div>
                <div className="font-bold mb-1 text-foreground">
                  {award.title}
                </div>
                <div className="text-muted text-sm">{award.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              بیایید با هم کار کنیم
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              اگر می‌خواهید کسب‌وکارتان را در دنیای دیجیتال رشد دهید، تیم ما
              آماده همراهی شماست.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                تماس با ما
              </Link>
              <Link
                href="/#services"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                مشاهده خدمات
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
