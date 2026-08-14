"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { useState, type ReactNode } from "react";
import LogoutPrompt from "@/components/panel/LogoutPrompt";
import { usePanel } from "@/components/panel/PanelProvider";
import CurrencySelect from "@/components/panel/CurrencySelect";
import { formatBalance } from "@/lib/panel-data";

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
    id: "billing",
    href: "/panel/billing",
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
          d="M3 10h18M7 15h2m4 0h4m-13 5h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
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
  collapsed,
  onToggleCollapse,
}: {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const t = useTranslations("panel");
  const navT = useTranslations("nav");
  const pathname = usePathname();
  const clean = getCleanPath(pathname);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { state } = usePanel();
  const locale = useLocale();
  const locked = !state.company;
  const activeTaskCount = state.tasks.filter((task) => task.active).length;
  const unreadMessages = state.messages.filter(
    (msg) => msg.sender === "team",
  ).length;
  const pendingTasks = state.tasks.filter(
    (task) => task.active && task.status === "pending",
  ).length;
  const updatedTasks = state.tasks.filter(
    (task) => task.active && task.status !== "pending" && task.note,
  ).length;
  const notifCount = pendingTasks + updatedTasks;

  const isActive = (href: string) =>
    href === "/panel" ? clean === "/panel" : clean.startsWith(href);

  const isLocked = (id: string) =>
    locked && (id === "analytics" || id === "billing" || id === "projects");

  const handleLogoutClick = () => {
    onClose();
    setLogoutOpen(true);
  };

  const body = (collapsed: boolean) => (
    <div className="flex flex-col h-full p-4">
      <div
        className={`flex items-center mb-6 ${
          collapsed ? "justify-center" : "justify-between gap-2"
        }`}>
        <Link
          href="/panel"
          onClick={onClose}
          className={`flex items-center gap-3 py-3 min-w-0 ${
            collapsed ? "px-0" : "px-2"
          }`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accentDark flex items-center justify-center shadow-lg shadow-accent/20 flex-shrink-0">
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
          <div className={`min-w-0 ${collapsed ? "hidden" : ""}`}>
            <div className="font-bold text-foreground truncate">
              {navT("brand")}
            </div>
            <div className="text-[10px] tracking-wider text-muted">
              {t("dashboard")}
            </div>
          </div>
        </Link>

        <div
          title={t("balance")}
          className="lg:hidden flex items-center gap-2 rounded-xl bg-card/60 border border-border/50 px-3 py-2 flex-shrink-0">
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2M19 12a1 1 0 01-1 1h-2a1 1 0 010-2h2a1 1 0 011 1z"
            />
          </svg>
          <span className="text-sm font-bold text-foreground whitespace-nowrap">
            {formatBalance(state.balance, state.currency, locale)}
          </span>
          <span className="w-px h-4 bg-border/60" />
          <CurrencySelect />
        </div>
      </div>

      <nav className={`flex-1 flex flex-col gap-1 overflow-y-auto ${collapsed ? "items-center" : ""}`}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const itemLabel =
            item.id === "projects" ? t("taskNav") : t(item.id as "dashboard");
          if (isLocked(item.id)) {
            return (
              <div
                key={item.id}
                aria-disabled="true"
                title={collapsed ? t("lockedDesc") : undefined}
                className={`flex items-center rounded-xl text-sm border border-transparent text-muted/40 bg-card/20 cursor-not-allowed select-none ${
                  collapsed ? "w-10 h-10 justify-center px-0" : "gap-3 px-4 py-3"
                }`}>
                <span>{item.icon}</span>
                {!collapsed && <span className="flex-1">{itemLabel}</span>}
                {!collapsed && (
                  <svg
                    className="w-3.5 h-3.5 text-muted/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              title={collapsed ? itemLabel : undefined}
              className={`flex items-center rounded-xl text-sm transition-all duration-300 ${
                collapsed ? "w-10 h-10 justify-center px-0" : "gap-3 px-4 py-3"
              } ${
                active
                  ? "bg-accent/10 border border-accent/25 text-accent"
                  : "border border-transparent text-muted hover:text-foreground hover:bg-white/5"
              }`}>
              {collapsed ? (
                <span className="relative">
                  <span className={active ? "text-accent" : ""}>{item.icon}</span>
                  {(item.id === "messages" && unreadMessages > 0) ||
                  (item.id === "notifications" && notifCount > 0) ? (
                    <span className="absolute top-0 end-0 w-2.5 h-2.5 rounded-full bg-warm border-2 border-surface animate-pulse" />
                  ) : null}
                </span>
              ) : (
                <span className={active ? "text-accent" : ""}>{item.icon}</span>
              )}
              {!collapsed && <span>{itemLabel}</span>}
              {!collapsed &&
                (item.id === "projects"
                  ? activeTaskCount
                  : item.id === "messages"
                    ? unreadMessages
                    : item.id === "notifications"
                      ? notifCount
                      : 0) > 0 && (
                <span
                  className={`ms-auto flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-[11px] font-bold border transition-all duration-300 ${
                    active
                      ? "bg-accent/15 border-accent/30 text-accent"
                      : "bg-accent/10 border-accent/25 text-accent"
                  }`}>
                  {item.id === "projects"
                    ? activeTaskCount
                    : item.id === "messages"
                      ? unreadMessages
                      : notifCount}
                </span>
              )}
            </Link>
          );
        })}

        {locked && !collapsed && (
          <Link
            href="/panel"
            onClick={onClose}
            className="mt-2 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-[11px] leading-relaxed text-muted hover:border-accent/40 hover:text-foreground transition-all duration-300">
            <span className="text-accent font-semibold">
              {t("lockedCta")}
            </span>{" "}
            — {t("lockedDesc")}
          </Link>
        )}
        {locked && collapsed && (
          <Link
            href="/panel"
            onClick={onClose}
            title={t("lockedDesc")}
            aria-label={t("lockedCta")}
            className="mt-2 w-10 h-10 flex items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent hover:border-accent/40 transition-all duration-300">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </Link>
        )}
      </nav>

      <div className="pt-4 border-t border-border/40">
        <div
          className={`flex ${
            collapsed
              ? "flex-col items-center gap-2"
              : "flex-row items-center gap-2"
          }`}>
          <button
            type="button"
            onClick={handleLogoutClick}
            title={collapsed ? t("logout") : undefined}
            className={`flex items-center gap-3 rounded-xl text-sm text-muted hover:text-warm hover:bg-warm/5 transition-all duration-300 ${
              collapsed
                ? "w-10 h-10 justify-center px-0 flex-shrink-0"
                : "flex-1 px-4 py-3"
            }`}>
            {logoutItem.icon}
            {!collapsed && <span>{t("logout")}</span>}
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={
              collapsed ? t("sidebarExpand") : t("sidebarCollapse")
            }
            title={collapsed ? t("sidebarExpand") : t("sidebarCollapse")}
            className="hidden lg:flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-xl text-sm text-muted hover:text-accent hover:bg-accent/10 border border-border/50 transition-all duration-300">
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {collapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17l5-5-5-5M6 17l5-5-5-5"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5 5-5m7 10l-5-5 5-5"
                />
              )}
            </svg>
          </button>
        </div>
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
            {body(false)}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside
        className={`hidden lg:block fixed inset-y-0 start-0 z-40 bg-surface/95 backdrop-blur-2xl border-e border-border/40 overflow-hidden transition-[width] duration-300 ease-in-out ${
          collapsed ? "lg:w-20" : "lg:w-64"
        }`}>
        {body(collapsed)}
      </aside>
    </>
  );
}