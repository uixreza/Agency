import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import BillingView from "@/components/panel/BillingView";

export default async function PanelBillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);

  return <BillingView />;
}
