import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import TasksView from "@/components/panel/TasksView";

export default async function PanelProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);

  return <TasksView />;
}