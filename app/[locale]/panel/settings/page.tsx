import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SettingsView from "@/components/panel/SettingsView";

export default async function PanelSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);

  return <SettingsView />;
}