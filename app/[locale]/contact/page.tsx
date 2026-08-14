"use client";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const quickContactIcons = [
  {
    href: "tel:+982112345678",
    color: "accent",
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
  },
  {
    href: "mailto:info@novindigital.ir",
    color: "warm",
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
  },
  {
    href: null,
    color: "accent",
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
  },
  {
    href: null,
    color: "warm",
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const socialIcons = [
  {
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const faqItems = t.raw("faq") as { question: string; answer: string }[];
  const budgetOptions = t.raw("budget") as {
    label: string;
    sublabel: string;
  }[];
  const socials = t.raw("socials") as string[];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedBudget("");
      formRef.current?.reset();
    }, 2500);
  };

  return (
    <main className="bg-bg" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[55vh] flex items-center pt-20 overflow-hidden">
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
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -5,
          }}
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[100px] opacity-20"
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
            delay: -12,
          }}
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full"
          style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted">{t("badge")}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              {t("title")} <span className="gradient-text">{t("highlight")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
              {t("description")}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Quick Contact Cards */}
      <section className="relative py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: t("quickPhoneTitle"), value: t("quickPhoneValue") },
              { title: t("quickEmailTitle"), value: t("quickEmailValue") },
              { title: t("quickAddressTitle"), value: t("quickAddressValue") },
              { title: t("quickHoursTitle"), value: t("quickHoursValue") },
            ].map((item, index) => {
              const icon = quickContactIcons[index];
              const CardWrapper = icon.href ? "a" : "div";
              const cardProps = icon.href ? { href: icon.href } : {};
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <CardWrapper
                    {...cardProps}
                    className={`contact-card bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-${icon.color}/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,229,204,0.08)] ${icon.href ? "cursor-pointer" : ""} block`}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-${icon.color}/10 flex items-center justify-center flex-shrink-0 text-${icon.color}`}>
                      {icon.icon}
                    </div>
                    <div>
                      <div className="text-xs text-muted mb-0.5">
                        {item.title}
                      </div>
                      <div className="font-bold text-sm text-foreground">
                        {item.value}
                      </div>
                    </div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
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
          className="absolute top-1/4 -right-48 w-96 h-96 rounded-full blur-[100px] opacity-15"
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
            delay: -9,
          }}
          className="absolute bottom-1/4 -left-36 w-72 h-72 rounded-full blur-[100px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Info & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <span className="inline-block text-accent font-medium mb-4">
                {t("formBadge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                {t("formTitle")}
              </h2>
              <p className="text-muted text-lg mb-10">
                {t("formDescription")}
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
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
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-foreground">
                      {t("infoAddressTitle")}
                    </div>
                    <div className="text-muted">{t("infoAddressValue")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm/10 flex items-center justify-center flex-shrink-0 text-warm">
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
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-foreground">
                      {t("infoPhonesTitle")}
                    </div>
                    <div className="text-muted">{t("infoPhoneOffice")}</div>
                    <div className="text-muted">{t("infoPhoneSupport")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
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
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-foreground">
                      {t("infoEmailTitle")}
                    </div>
                    <div className="text-muted">{t("infoEmailInfo")}</div>
                    <div className="text-muted">{t("infoEmailSupport")}</div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted mb-4">{t("socialsLabel")}</p>
                <div className="flex gap-3">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-accent hover:text-accent transition-all duration-300 text-sm text-muted">
                      {social.icon}
                      {socials[index]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-bold mb-6 text-foreground">
                  {t("formTitle2")}
                </h3>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      {t("nameLabel")} <span className="text-warm">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all"
                      placeholder={t("namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      {t("phoneLabel")} <span className="text-warm">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all"
                      placeholder={t("phonePlaceholder")}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("emailLabel")} <span className="text-warm">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all"
                    placeholder={t("emailPlaceholder")}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("companyLabel")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all"
                    placeholder={t("companyPlaceholder")}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("serviceLabel")} <span className="text-warm">*</span>
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all">
                    {(t.raw("serviceOptions") as { value: string; label: string }[]).map(
                      (opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("budgetLabel")}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {budgetOptions.map((opt, i) => (
                      <label
                        key={i}
                        className="cursor-pointer"
                        onClick={() => setSelectedBudget(String(i))}>
                        <input
                          type="radio"
                          name="budget"
                          className="sr-only"
                          checked={selectedBudget === String(i)}
                          onChange={() => setSelectedBudget(String(i))}
                        />
                        <div
                          className={`text-center border rounded-xl py-2.5 px-3 text-sm transition-all ${
                            selectedBudget === String(i)
                              ? "border-accent text-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          }`}>
                          <div className="font-medium">{opt.label}</div>
                          <div className="text-muted text-xs">
                            {opt.sublabel}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] transition-all resize-none"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isSuccess
                      ? "bg-green-500 text-white"
                      : "bg-accent text-bg hover:bg-accentDark"
                  }`}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t("sending")}
                    </>
                  ) : isSuccess ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("success")}
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      {t("submit")}
                    </>
                  )}
                </button>

                <p className="text-center text-muted text-xs mt-4">
                  {t("privacyText")}{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    {t("privacyLink")}
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10">
            <span className="inline-block text-accent font-medium mb-3">
              {t("mapBadge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {t("mapTitle")}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border overflow-hidden h-72 flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, #161922 0%, #0f1117 100%)",
            }}>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(0deg, rgba(37,42,54,0.3) 0px, rgba(37,42,54,0.3) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(37,42,54,0.3) 0px, rgba(37,42,54,0.3) 1px, transparent 1px, transparent 60px)`,
              }}
            />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent"
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
              </div>
              <p className="font-bold text-lg mb-1 text-foreground">
                {t("mapName")}
              </p>
              <p className="text-muted text-sm">{t("mapAddress")}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-4 text-accent text-sm hover:underline">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {t("mapLink")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(37, 42, 54, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 42, 54, 0.8) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <span className="inline-block text-accent font-medium mb-4">
              {t("faqBadge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-foreground">
              {t("faqTitle")}
            </h2>
            <p className="text-muted">{t("faqDescription")}</p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-right">
                  <span className="font-medium text-foreground">
                    {item.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-muted flex-shrink-0 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden">
                      <p className="text-muted px-5 pb-5 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}