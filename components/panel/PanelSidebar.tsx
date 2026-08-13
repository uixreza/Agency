"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { useState, type ReactNode } from "react";
import LogoutPrompt from "@/components/panel/LogoutPrompt";

const navItems: { id: string; href: string; icon: ReactNode }[] = [
  {
    id: "dashboard",
    href: "/panel",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"
        />
      </svg>
    ),
  },
  {
    id: "analytics",
    href: "/panel/analytics",
    icon: (
      <svg
        className="w-5 h-5"
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
  },
  {
    id: "projects",
    href: "/panel/projects",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "messages",
    href: "/panel/messages",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    id: "notifications",
    href: "/panel/notifications",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
  },
  {
    id: "settings",
    href: "/panel/settings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const logoutItem = {
  icon: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  ),
};

const getCleanPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if ((routing.locales as readonly string[]).includes(segments[0] || "")) {
    segments.shift();
  }
  return `/${segments.join("/")}`;
};

export default function PanelSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("panel");
  const navT = useTranslations("nav");
  const pathname = usePathname();
  const clean = getCleanPath(pathname);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/panel" ? clean === "/panel" : clean.startsWith(href);

  const handleLogoutClick = () => {
    onClose();
    setLogoutOpen(true);
  };

  const body = (
    <div className="flex flex-col h-full p-4">
      <Link
        href="/panel"
        onClick={onClose}
        className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/20">
          <svg
            className="w-6 h-6 text-white"
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
        <div>
          <div className="font-bold text-foreground">{navT("brand")}</div>
          <div className="text-[10px] tracking-wider text-muted">
            {t("dashboard")}
          </div>
        </div>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                active
                  ? "bg-accent/10 border border-accent/25 text-accent"
                  : "border border-transparent text-muted hover:text-foreground hover:bg-white/5"
              }`}>
              <span className={active ? "text-accent" : ""}>{item.icon}</span>
              <span>{t(item.id as "dashboard")}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-border/40">
        <button
          type="button"
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted hover:text-warm hover:bg-warm/5 transition-all duration-300">
          {logoutItem.icon}
          <span>{t("logout")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <LogoutPrompt
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed bottom-0 start-0 end-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface/95 backdrop-blur-2xl border-t border-border/40 lg:hidden">
            <div className="sticky top-0 bg-surface/95 backdrop-blur-2xl pt-3 pb-1 rounded-t-3xl">
              <div className="w-12 h-1.5 rounded-full bg-border/70 mx-auto" />
            </div>
            {body}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden lg:block fixed inset-y-0 start-0 w-64 z-40 bg-surface/95 backdrop-blur-2xl border-e border-border/40">
        {body}
      </aside>
    </>
  );
}