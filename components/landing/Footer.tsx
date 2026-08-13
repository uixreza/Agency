"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const footerLinkHrefs = {
  services: [
    "/our-services/seo",
    "/our-services/ads",
    "/our-services/social-media",
    "/our-services/web-design",
    "/our-services/email-marketing",
  ],
  company: ["/about", "/our-works", "/blog", "/careers"],
  support: ["/contact", "/faq", "/terms", "/privacy"],
};

const socialIcons = [
  (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.441-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.168.331.016.108.036.351.02.531z" />
    </svg>
  ),
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("footer");
  const rawT = t as unknown as { raw: (key: string) => any };
  const links = rawT.raw("links") as {
    services: { label: string }[];
    company: { label: string }[];
    support: { label: string }[];
  };
  const footerLinks = {
    services: links.services.map((link, i) => ({
      label: link.label,
      href: footerLinkHrefs.services[i] ?? "#",
    })),
    company: links.company.map((link, i) => ({
      label: link.label,
      href: footerLinkHrefs.company[i] ?? "#",
    })),
    support: links.support.map((link, i) => ({
      label: link.label,
      href: footerLinkHrefs.support[i] ?? "#",
    })),
  };
  const socials = rawT.raw("socials") as { label: string }[];
  const socialLinks = socials.map((social, i) => ({
    label: social.label,
    href: "#",
    icon: socialIcons[i] ?? socialIcons[0],
  }));
  const brands = rawT.raw("brands") as string[];
  if (pathname.includes("/panel")) return null;
  return (
    <footer className="relative bg-surface border-t border-border/30 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={
            isMobile || prefersReducedMotion
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.1, 0.9, 1],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[50px] sm:blur-[100px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={
            isMobile || prefersReducedMotion
              ? undefined
              : {
                  x: [0, -20, 30, 0],
                  y: [0, 30, -30, 0],
                  scale: [1, 0.9, 1.1, 1],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -7,
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[50px] sm:blur-[100px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-warm) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <motion.div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-all duration-300">
                    <svg
                      className="w-7 h-7 text-bg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-foreground font-bold text-xl">
                    {t("brand")}
                  </div>
                  <div className="text-[10px] text-muted tracking-[0.2em]">
                    DIGITAL AGENCY
                  </div>
                </div>
              </Link>

              <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                {t("description")}
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ),
                    text: t("addressValue"),
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
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
                    text: t("emailValue"),
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                    text: t("phoneValue"),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 text-muted text-sm group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent">{item.icon}</span>
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links - Outline style with theme color */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl border-2 border-accent/40 bg-transparent flex items-center justify-center text-accent hover:border-accent hover:shadow-[0_0_15px_var(--color-accent)] transition-all duration-300"
                    aria-label={social.label}>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div>
              <h3 className="text-foreground font-bold mb-6 text-sm tracking-wider uppercase">
                {t("services")}
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-accent transition-all duration-300 text-sm flex items-center gap-2 group py-1">
                      <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div>
              <h3 className="text-foreground font-bold mb-6 text-sm tracking-wider uppercase">
                {t("company")}
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-accent transition-all duration-300 text-sm flex items-center gap-2 group py-1">
                      <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div>
              <h3 className="text-foreground font-bold mb-6 text-sm tracking-wider uppercase">
                {t("support")}
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-accent transition-all duration-300 text-sm flex items-center gap-2 group py-1">
                      <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="py-6 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm text-center sm:text-right">
              © {new Date().getFullYear()}
              <span className="text-accent mx-1">{t("brand")}</span>. {t("copyright")}
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-6">
              <div className="text-xs text-muted tracking-wider">
                {t("trusted")}
              </div>
              <div className="flex items-center gap-4">
                {brands.map((brand) => (
                  <motion.span
                    key={brand}
                    whileHover={{ scale: 1.05, color: "#00e5cc" }}
                    className="text-sm font-bold text-muted transition-all duration-300 cursor-default">
                    {brand}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
