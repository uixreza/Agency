"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toLocalDigits } from "@/lib/data";

const serviceIconMeta = [
  {
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

const deliverableColors = ["accent", "warm", "accent", "warm"];

export default function ServicesPage() {
  const t = useTranslations("servicesPage");
  const locale = useLocale();
  const rawT = t as unknown as { raw: (key: string) => any };
  const services = (
    rawT.raw("services") as {
      title: string;
      description: string;
      tags: string[];
    }[]
  ).map((service, i) => ({
    ...service,
    ...(serviceIconMeta[i % serviceIconMeta.length] ?? serviceIconMeta[0]),
    number:
      i + 1 < 10
        ? locale === "fa"
          ? "۰" + toLocalDigits(i + 1, locale)
          : "0" + toLocalDigits(i + 1, locale)
        : toLocalDigits(i + 1, locale),
  }));
  const pathSteps = rawT.raw("pathSteps") as string[];
  const deliverables = (
    rawT.raw("deliverables") as { title: string; description: string }[]
  ).map((item, i) => ({
    ...item,
    color: deliverableColors[i % deliverableColors.length],
    number: toLocalDigits(i + 1, locale),
  }));
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
                  {t("badge")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
                {t("title")}
                <span className="gradient-text"> {t("highlight")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted max-w-2xl">
                {t("description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/contact"
                  className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors text-center shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="#services-list"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                  {t("ctaSecondary")}
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
                    {toLocalDigits(12, locale)}+
                  </div>
                  <div className="text-sm text-muted">{t("statFieldsLabel")}</div>
                </div>
                <div className="bg-bg border border-border rounded-2xl p-5">
                  <div className="text-4xl font-black text-warm mb-2">
                    {toLocalDigits(500, locale)}+
                  </div>
                  <div className="text-sm text-muted">
                    {t("statProjectsLabel")}
                  </div>
                </div>
                <div className="col-span-2 bg-bg border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-muted">{t("pathLabel")}</span>
                    <span className="text-accent font-bold">
                      {t("pathValue")}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted">
                    {pathSteps.map((step, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-card border border-border py-2">
                        {step}
                      </span>
                    ))}
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
              {t("listBadge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              {t("listTitle")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              {t("listDescription")}
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
                {t("deliverablesBadge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
                {t("deliverablesTitle")}
              </h2>
              <p className="text-muted text-lg">
                {t("deliverablesDescription")}
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
              {t("ctaTitle")}
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              {t("ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
                {t("ctaPrimary")}
              </Link>
              <Link
                href="/our-works"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-accent transition-colors text-foreground">
                {t("ctaSecondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
