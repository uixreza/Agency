"use client";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

const teamMembers = [
  {
    name: "امیر محمدی",
    role: "مدیرعامل و بنیان‌گذار",
    department: "leadership",
    deptLabel: "مدیریت",
    color: "accent",
    avatar: "AM",
    avatarBg: "from-accent to-accentDark",
    bio: "۱۲ سال تجربه در دیجیتال مارکتینگ و راه‌اندازی استارتاپ‌های موفق",
    skills: ["استراتژی", "رهبری", "Growth"],
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "سارا حسینی",
    role: "مدیر سئو و محتوا",
    department: "seo",
    deptLabel: "سئو",
    color: "warm",
    avatar: "SH",
    avatarBg: "from-warm to-red-500",
    bio: "۸ سال تجربه در رتبه‌بندی سایت‌های ایرانی و بین‌المللی",
    skills: ["On-Page SEO", "تولید محتوا", "Link Building"],
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "رضا کریمی",
    role: "مدیر تبلیغات دیجیتال",
    department: "ads",
    deptLabel: "تبلیغات",
    color: "accent",
    avatar: "RK",
    avatarBg: "from-purple-500 to-indigo-600",
    bio: "کارشناس گوگل ادز با ۶ گواهینامه معتبر بین‌المللی",
    skills: ["Google Ads", "Meta Ads", "PPC"],
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "نازنین احمدی",
    role: "مدیر شبکه‌های اجتماعی",
    department: "social",
    deptLabel: "سوشال",
    color: "warm",
    avatar: "NA",
    avatarBg: "from-pink-500 to-warm",
    bio: "متخصص رشد ارگانیک با تجربه مدیریت بیش از ۵۰ پیج",
    skills: ["اینستاگرام", "تیک‌تاک", "Reels"],
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "مهدی رحیمی",
    role: "سرپرست توسعه وب",
    department: "dev",
    deptLabel: "توسعه",
    color: "accent",
    avatar: "MR",
    avatarBg: "from-emerald-500 to-teal-600",
    bio: "Full-stack با ۷ سال تجربه در ساخت وب‌سایت‌های پرفروش",
    skills: ["React", "Laravel", "WordPress"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "لیلا صادقی",
    role: "سرپرست طراحی UI/UX",
    department: "design",
    deptLabel: "طراحی",
    color: "warm",
    avatar: "LS",
    avatarBg: "from-fuchsia-500 to-purple-600",
    bio: "طراح محصول با تجربه‌ی برندهای بزرگ ایرانی و بین‌المللی",
    skills: ["Figma", "UI/UX", "Branding"],
    socials: { linkedin: "#", behance: "#" },
  },
  {
    name: "حسین مرادی",
    role: "متخصص سئو تکنیکال",
    department: "seo",
    deptLabel: "سئو",
    color: "accent",
    avatar: "HM",
    avatarBg: "from-yellow-500 to-orange-500",
    bio: "۵ سال تجربه در بهینه‌سازی تکنیکال و افزایش سرعت سایت",
    skills: ["Core Web Vitals", "Schema", "GSC"],
    socials: { linkedin: "#" },
  },
  {
    name: "فریده ناصری",
    role: "کارشناس تولید محتوا",
    department: "social",
    deptLabel: "سوشال",
    color: "warm",
    avatar: "FN",
    avatarBg: "from-rose-500 to-pink-500",
    bio: "نویسنده و تولیدکننده محتوای ویدیویی با سابقه همکاری با ۳۰+ برند",
    skills: ["ویدیو مارکتینگ", "کپی‌رایتینگ", "Canva"],
    socials: { linkedin: "#", instagram: "#" },
  },
];

const departments = [
  { id: "all", label: "همه" },
  { id: "leadership", label: "مدیریت" },
  { id: "seo", label: "سئو و محتوا" },
  { id: "ads", label: "تبلیغات" },
  { id: "social", label: "شبکه اجتماعی" },
  { id: "dev", label: "توسعه وب" },
  { id: "design", label: "طراحی" },
];

const stats = [
  { value: "۲۵+", label: "متخصص فعال" },
  { value: "۶", label: "تیم تخصصی" },
  { value: "۱۲+", label: "سال تجربه مشترک" },
  { value: "۱۸", label: "گواهینامه بین‌المللی" },
];

const cultureItems = [
  {
    title: "یادگیری مستمر",
    description:
      "بودجه آموزشی سالانه برای هر عضو تیم. دسترسی به دوره‌های آنلاین، کنفرانس‌ها و کتاب‌های تخصصی.",
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "دورکاری انعطاف‌پذیر",
    description:
      "امکان دورکاری ۳ روز در هفته. نتیجه مهم است، نه محل کار. سیستم مدیریت پروژه شفاف برای همه.",
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    color: "warm",
  },
  {
    title: "پاداش بر اساس عملکرد",
    description:
      "پاداش‌های ماهانه و فصلی بر اساس نتایج پروژه. وقتی مشتری موفق می‌شود، ما هم موفق می‌شویم.",
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
    title: "تیم‌سازی و تفریح",
    description:
      "رویدادهای تیمی ماهانه، سفرهای سازمانی سالانه و جلسات غیررسمی قهوه و گفتگو.",
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
    title: "مسیر رشد مشخص",
    description:
      "برنامه ارتقا شغلی شفاف. جلسات یک‌به‌یک ماهانه با مدیر برای بررسی پیشرفت و تنظیم اهداف.",
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
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    color: "accent",
  },
  {
    title: "سلامت و رفاه",
    description:
      "بیمه تکمیلی، عضویت در باشگاه ورزشی، و برنامه‌های ماندگاری سلامت روان برای تمام اعضا.",
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

const openPositions = [
  {
    title: "متخصص سئو",
    description:
      "سابقه حداقل ۲ سال در سئو سایت‌های فارسی. آشنایی با Google Search Console و ابزارهای تحلیل.",
    type: "تمام وقت",
    location: "تهران / دورکاری",
    status: "open",
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    title: "تولیدکننده محتوای ویدیویی",
    description:
      "مسلط به ادیت ویدیو، موشن گرافیک و تولید محتوا برای اینستاگرام و یوتیوب.",
    type: "پاره وقت",
    location: "دورکاری",
    status: "open",
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
          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "توسعه‌دهنده Front-End",
    description:
      "آشنا با React و Tailwind. تجربه ساخت وب‌سایت‌های RTL فارسی یک مزیت است.",
    type: "تمام وقت",
    location: "هیبرید",
    status: "soon",
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
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

export default function TeamPage() {
  const [activeDept, setActiveDept] = useState("all");
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const filteredMembers =
    activeDept === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeDept);

  const socialIcon = (type: string) => {
    if (type === "linkedin") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    }
    if (type === "instagram") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    }
    if (type === "github") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    }
    return null;
  };

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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-muted">۲۵+ متخصص حرفه‌ای</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              با <span className="gradient-text">تیم ما</span> آشنا شوید
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
              متخصصانی پرانرژی که هر روز تلاش می‌کنند تا کسب‌وکار شما در دنیای
              دیجیتال بدرخشد. افراد واقعی، نتایج واقعی.
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

      {/* Team Grid with Filter */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-40 w-80 h-80 rounded-full blur-[100px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <span className="inline-block text-accent font-medium mb-4">
              اعضای تیم
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              افرادی که پشت موفقیت شما هستند
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg mb-10">
              هر نفر متخصص حوزه خود است — با هم یک تیم کامل می‌سازیم
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    activeDept === dept.id
                      ? "bg-accent text-bg border-accent"
                      : "border-border text-muted hover:border-accent hover:text-foreground"
                  }`}>
                  {dept.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Team Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -10 }}
                  className={`group bg-card border border-border rounded-2xl overflow-hidden hover:border-${member.color}/30 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)]`}>
                  <div
                    className={`relative h-48 bg-gradient-to-br ${member.avatarBg.replace("from-", "from-").replace("to-", "to-")}/20 flex items-center justify-center`}>
                    <div
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white text-3xl font-black`}>
                      {member.avatar}
                    </div>
                    <div className="absolute inset-0 bg-bg/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {Object.entries(member.socials).map(([type, href]) => (
                        <a
                          key={type}
                          href={href}
                          className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-muted"
                          aria-label={type}>
                          {socialIcon(type)}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">
                          {member.name}
                        </h3>
                        <p className={`text-${member.color} text-sm`}>
                          {member.role}
                        </p>
                      </div>
                      <span
                        className={`text-xs bg-${member.color}/10 text-${member.color} px-2.5 py-1 rounded-full border border-${member.color}/20`}>
                        {member.deptLabel}
                      </span>
                    </div>
                    <p className="text-muted text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs border border-border rounded-lg px-2.5 py-1 text-muted hover:bg-accent/10 hover:border-accent/40 transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <span className="inline-block text-accent font-medium mb-4">
              فرهنگ کاری
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              چرا عاشق کارمان هستیم؟
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              محیطی که در آن رشد می‌کنیم، یاد می‌گیریم و با هم به موفقیت می‌رسیم
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-card border border-border rounded-2xl p-6 hover:border-${item.color}/30 transition-all duration-300`}>
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

      {/* Open Positions */}
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
            delay: -6,
          }}
          className="absolute top-1/4 -right-36 w-72 h-72 rounded-full blur-[100px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <span className="inline-block text-accent font-medium mb-4">
              فرصت‌های شغلی
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              به تیم ما بپیوندید
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              به دنبال متخصصان پرانرژی هستیم که با ما در ساختن آینده دیجیتال
              ایران همراه شوند
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,229,204,0.03) 0%, rgba(255,107,74,0.03) 100%)",
                }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    {position.icon}
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      position.status === "open"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}>
                    {position.status === "open" ? "باز" : "به‌زودی"}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {position.title}
                </h3>
                <p className="text-muted text-sm mb-4">
                  {position.description}
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs text-muted bg-surface border border-border px-2.5 py-1 rounded-lg">
                    {position.type}
                  </span>
                  <span className="text-xs text-muted bg-surface border border-border px-2.5 py-1 rounded-lg">
                    {position.location}
                  </span>
                </div>
                <Link
                  href={position.status === "open" ? "/contact" : "#"}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    position.status === "open"
                      ? "text-accent hover:underline"
                      : "text-muted cursor-default"
                  }`}>
                  {position.status === "open"
                    ? "ارسال رزومه"
                    : "ثبت علاقه‌مندی"}
                  <svg
                    className="w-4 h-4"
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
            ))}
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
              با این تیم رشد کنید
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              آماده‌اید تا با بهترین متخصصان دیجیتال مارکتینگ ایران همکاری کنید؟
              مشاوره اولیه رایگان است.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                مشاوره رایگان
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                درباره ما بیشتر بدانید
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
