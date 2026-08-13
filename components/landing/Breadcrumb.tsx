"use client";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

type Crumb = { label: string; href: string; current?: boolean };

interface BreadcrumbProps {
  centered?: boolean;
  withHomeIcon?: boolean;
  namespace?: string;
  rootKey?: string;
  rootHref?: string;
  stripPrefix?: string;
  segments?: Record<string, string>;
}

const PANEL_SEGMENT_KEYS: Record<string, string> = {
  analytics: "analytics",
  projects: "projects",
  messages: "messages",
  notifications: "notifications",
  settings: "settings",
};

export default function Breadcrumb({
  centered = false,
  withHomeIcon = false,
  namespace = "panel",
  rootKey = "dashboard",
  rootHref = "/panel",
  stripPrefix = "panel",
  segments = PANEL_SEGMENT_KEYS,
}: BreadcrumbProps) {
  const t = useTranslations(
    namespace as Parameters<typeof useTranslations>[0],
  ) as unknown as (key: string) => string;
  const pathname = usePathname();

  let segs = pathname.split("/").filter(Boolean);
  if ((routing.locales as readonly string[]).includes(segs[0] || "")) {
    segs = segs.slice(1);
  }
  if (stripPrefix && segs[0] === stripPrefix) {
    segs = segs.slice(1);
  }

  const crumbs: Crumb[] = [{ label: t(rootKey), href: rootHref }];
  let trail = rootHref;
  segs.forEach((seg, i) => {
    const labelKey = segments[seg];
    if (!labelKey) return;
    trail += `/${seg}`;
    crumbs.push({
      label: t(labelKey),
      href: trail,
      current: i === segs.length - 1,
    });
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-xs sm:text-sm text-muted mb-6 ${centered ? "justify-center" : ""}`}>
      {withHomeIcon && (
        <>
          <Link
            href="/"
            aria-label="Home"
            className="text-muted hover:text-foreground transition-colors duration-300">
            <svg
              className="w-4 h-4"
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
          </Link>
          <svg
            className="w-3.5 h-3.5 rtl:rotate-180 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </>
      )}
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg
              className="w-3.5 h-3.5 rtl:rotate-180 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {crumb.current ? (
            <span aria-current="page" className="text-foreground font-medium">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-foreground transition-colors duration-300">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}