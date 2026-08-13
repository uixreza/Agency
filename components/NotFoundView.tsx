"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NotFoundContent from "@/components/NotFoundContent";

export default function NotFoundView() {
  const t = useTranslations("notFound");

  return (
    <NotFoundContent
      heading={t("heading")}
      description={t("description")}
      button={
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent text-bg px-8 py-4 rounded-xl font-bold text-lg hover:bg-accentDark transition-colors shadow-[0_0_30px_rgba(0,229,204,0.3)]">
          {t("backHome")}
        </Link>
      }
    />
  );
}