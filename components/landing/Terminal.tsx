"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SectionBadge from "@/components/landing/SectionBadge";

const commands = [
  {
    text: "npx create-next-app@latest my-app",
    type: "input",
    delay: 2000,
  },
  {
    text: "✔ Project initialized successfully",
    type: "success",
    delay: 1500,
  },
  {
    text: "npm install tailwindcss framer-motion",
    type: "input",
    delay: 2000,
  },
  {
    text: "✔ Dependencies installed",
    type: "success",
    delay: 1000,
  },
  {
    text: "npm install @radix-ui/react-icons",
    type: "input",
    delay: 1800,
  },
  {
    text: "✔ UI components ready",
    type: "success",
    delay: 1200,
  },
  {
    text: 'git init && git add . && git commit -m "initial commit"',
    type: "input",
    delay: 2500,
  },
  {
    text: "✔ Code committed to repository",
    type: "success",
    delay: 1500,
  },
  {
    text: "npm run build",
    type: "input",
    delay: 2000,
  },
  {
    text: "✔ Build optimized for production",
    type: "success",
    delay: 1000,
  },
  {
    text: "npm run deploy",
    type: "input",
    delay: 1500,
  },
  {
    text: "🚀 Deployed to production",
    type: "highlight",
    delay: 2000,
  },
  {
    text: "✨ Your site is live!",
    type: "highlight",
    delay: 3000,
  },
];

const stepIcons = [
  (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  ),
  (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    </svg>
  ),
  (
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
  (
    <svg
      className="w-6 h-6"
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
  (
    <svg
      className="w-6 h-6"
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
];

const blobs = [
  {
    className: "absolute -top-20 right-0 w-[600px] h-[600px] rounded-full blur-[150px]",
    background:
      "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
    scale: [1, 1.2, 1],
    opacity: [0.08, 0.12, 0.08],
    duration: 10,
    delay: 0,
  },
  {
    className: "absolute -bottom-20 left-0 w-[500px] h-[500px] rounded-full blur-[150px]",
    background:
      "radial-gradient(circle, rgba(102,126,234,0.25) 0%, transparent 70%)",
    scale: [1, 1.15, 1],
    opacity: [0.06, 0.1, 0.06],
    duration: 12,
    delay: -3,
  },
  {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]",
    background:
      "radial-gradient(circle, var(--color-warm) 0%, transparent 70%)",
    scale: [1, 1.1, 1],
    opacity: [0.04, 0.07, 0.04],
    duration: 15,
    delay: -6,
  },
  {
    className: "absolute -bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[120px]",
    background:
      "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
    scale: [1, 1.2, 1],
    opacity: [0.05, 0.08, 0.05],
    duration: 18,
    delay: -9,
  },
];

export default function ProcessSection() {
  const t = useTranslations("process");
  const rawT = t as unknown as { raw: (key: string) => any };
  const processSteps = Array.from({ length: 5 }, (_, i) => ({
    ...(rawT.raw(`step${i + 1}`) as { title: string; description: string }),
    icon: stepIcons[i],
  }));
  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef(true);
  const commandCountRef = useRef(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const [displayedCommands, setDisplayedCommands] = useState<
    Array<{ text: string; type: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    commandCountRef.current = displayedCommands.length;
  }, [displayedCommands]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        inViewRef.current = visible;
        setIsInView(visible);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedCommands(
        commands.map(({ text, type }) => ({ text, type })),
      );
      return;
    }

    let cancelled = false;
    let timer: NodeJS.Timeout;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        if (cancelled) return resolve();
        timer = setTimeout(resolve, ms);
      });

    const waitUntilVisible = async () => {
      while (!inViewRef.current && !cancelled) {
        await wait(250);
      }
    };

    const runCommands = async () => {
      for (let i = 0; i < commands.length; i++) {
        if (cancelled) return;
        await waitUntilVisible();
        if (cancelled) return;
        const command = commands[i];

        if (commandCountRef.current > 8) {
          setDisplayedCommands((prev) => prev.slice(-6));
        }

        if (command.type === "input") {
          setIsTyping(true);
          setTypedText("");

          for (let j = 0; j <= command.text.length; j++) {
            await wait(35);
            if (cancelled) return;
            setTypedText(command.text.slice(0, j));
          }

          setIsTyping(false);
          setDisplayedCommands((prev) => [
            ...prev,
            { text: command.text, type: command.type },
          ]);
          setTypedText("");
        } else {
          setDisplayedCommands((prev) => [
            ...prev,
            { text: command.text, type: command.type },
          ]);
        }

        await wait(command.delay);
        if (cancelled) return;
      }

      await wait(3000);
      if (cancelled) return;
      setDisplayedCommands([]);
      runCommands();
    };

    runCommands();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-bg overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(37, 42, 54, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 42, 54, 0.8) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Radial Gradient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={
              isMobile || prefersReducedMotion || !isInView
                ? undefined
                : { scale: blob.scale, opacity: blob.opacity }
            }
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay,
            }}
            className={blob.className}
            style={{ background: blob.background, opacity: 0.08 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6">
            <SectionBadge
              icon={
                <svg
                  className="w-3.5 h-3.5"
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
              }>
              {t("badge")}
            </SectionBadge>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            {t("title")} <span className="gradient-text">{t("highlight")}</span>{" "}
            {t("suffix")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Right side - Process Description */}
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative group cursor-default">
                  <div className="relative rounded-2xl p-6 transition-all duration-500 overflow-hidden bg-card border border-border">
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accentDark rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex gap-5">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="flex-shrink-0 w-12 h-12 rounded-xl border-2 border-accent/40 group-hover:border-accent flex items-center justify-center text-accent transition-all duration-300 group-hover:shadow-[0_0_15px_var(--color-accent)]">
                        {step.icon}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div
                        className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rtl:rotate-180"
                        style={{ animationDelay: `${index * 0.2}s` }}>
                        <svg
                          className="w-5 h-5 text-accent animate-arrow-nudge"
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
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Left side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-28">
            <div
              className="relative rounded-2xl overflow-hidden bg-surface border border-border"
              style={{
                boxShadow:
                  "0 25px 60px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 229, 204, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
              }}>
              {/* Terminal Header */}
              <div
                className="relative flex items-center gap-2 px-5 py-3 border-b bg-surface"
                style={{
                  borderColor: "rgba(37, 42, 54, 0.4)",
                }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-lg shadow-[#ff5f57]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-lg shadow-[#febc2e]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-lg shadow-[#28c840]/30" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted font-mono tracking-wider">
                    terminal — bash
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div
                className="relative p-5 font-mono text-sm h-[500px] overflow-y-auto"
                style={{ direction: "ltr" }}>
                <div className="relative space-y-1">
                  <div className="flex items-center gap-2 text-muted">
                    <span className="text-accent">❯</span>
                    <span>~/projects</span>
                  </div>

                  <AnimatePresence>
                    {displayedCommands.map((cmd, index) => (
                      <motion.div
                        key={`${cmd.text}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          cmd.type === "input"
                            ? "text-foreground/70"
                            : cmd.type === "success"
                              ? "text-green-400"
                              : "text-accent font-semibold"
                        }`}>
                        {cmd.type === "input" ? (
                          <div className="flex items-center gap-2">
                            <span className="text-accent">$</span>
                            <span>{cmd.text}</span>
                          </div>
                        ) : (
                          <span>{cmd.text}</span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <div className="flex items-center gap-2 text-foreground/70">
                      <span className="text-accent">$</span>
                      <span>{typedText}</span>
                      <span className="w-2 h-4 bg-accent inline-block animate-cursor-blink" />
                    </div>
                  )}

                  {!isTyping && (
                    <div className="flex items-center gap-2 text-muted">
                      <span className="text-accent">$</span>
                      <span className="w-2 h-4 bg-muted inline-block animate-cursor-blink" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}