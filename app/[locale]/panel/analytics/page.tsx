import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AnalyticsView from "@/components/panel/AnalyticsView";

export default async function PanelAnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);

  return <AnalyticsView />;
}