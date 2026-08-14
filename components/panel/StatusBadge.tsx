import { useTranslations } from "next-intl";
import type { TaskStatus } from "@/lib/panel-data";

const STATUS_STYLES: Record<TaskStatus, string> = {
  pending: "bg-warm/10 border-warm/25 text-warm",
  queue: "bg-indigo-400/10 border-indigo-400/25 text-indigo-400",
  progress: "bg-accent/10 border-accent/25 text-accent",
  review: "bg-purple-400/10 border-purple-400/25 text-purple-400",
  completed: "bg-green-400/10 border-green-400/25 text-green-400",
};

const STATUS_DOT: Record<TaskStatus, string> = {
  pending: "bg-warm",
  queue: "bg-indigo-400",
  progress: "bg-accent",
  review: "bg-purple-400",
  completed: "bg-green-400",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: TaskStatus;
  className?: string;
}) {
  const t = useTranslations("panel");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shrink-0 ${STATUS_STYLES[status]} ${className}`}>
      {status !== "completed" && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${STATUS_DOT[status]}`}
        />
      )}
      {t(`status.${status}`)}
    </span>
  );
}