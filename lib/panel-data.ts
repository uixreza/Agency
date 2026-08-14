export type TaskStatus =
  | "pending"
  | "queue"
  | "progress"
  | "review"
  | "completed";

export type TaskServiceId =
  | "web"
  | "app"
  | "aiVideo"
  | "aiImage"
  | "social"
  | "ads"
  | "seo"
  | "email";

export type ServiceKind = "monthly" | "oneTime";

export type BalanceCurrency = "toman" | "lir" | "usd";

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  teamSize: string;
  website: string;
  ownerName: string;
  ownerEmail?: string;
  createdAt: string;
}

export interface PanelTask {
  id: string;
  serviceId: TaskServiceId;
  companyId: string;
  status: TaskStatus;
  progress: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  deactivatedAt?: string;
  monthlyPrice: number;
  kind: ServiceKind;
}

export type MessageSender = "user" | "team" | "system";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: MessageSender;
  text: string;
  time: string;
}

export interface PanelState {
  company: CompanyProfile | null;
  tasks: PanelTask[];
  messages: ChatMessage[];
  balance: number;
  currency: BalanceCurrency;
}

export const PANEL_STORAGE_KEY = "freelance-panel-v3";

export const clearPanelState = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PANEL_STORAGE_KEY);
  } catch {
    // storage unavailable — nothing to clear
  }
};

export const TASK_SERVICES: {
  id: TaskServiceId;
  price: number;
  duration: string;
  kind: ServiceKind;
}[] = [
  { id: "web", price: 299, duration: "web", kind: "oneTime" },
  { id: "app", price: 349, duration: "app", kind: "oneTime" },
  { id: "aiVideo", price: 199, duration: "aiVideo", kind: "monthly" },
  { id: "aiImage", price: 149, duration: "aiImage", kind: "monthly" },
  { id: "social", price: 249, duration: "social", kind: "monthly" },
  { id: "ads", price: 199, duration: "ads", kind: "monthly" },
  { id: "seo", price: 229, duration: "seo", kind: "monthly" },
  { id: "email", price: 129, duration: "email", kind: "monthly" },
];

export const GENERAL_CONVERSATION_ID = "general";

export const getServicePrice = (serviceId: TaskServiceId) =>
  TASK_SERVICES.find((s) => s.id === serviceId)?.price ?? 0;

export const getServiceKind = (serviceId: TaskServiceId): ServiceKind =>
  TASK_SERVICES.find((s) => s.id === serviceId)?.kind ?? "monthly";

export function makeTask(
  serviceId: TaskServiceId,
  companyId: string,
  note: string,
  now = new Date(),
): PanelTask {
  return {
    id: uid(),
    serviceId,
    companyId,
    status: "pending",
    progress: 0,
    note,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    active: true,
    monthlyPrice: getServicePrice(serviceId),
    kind: getServiceKind(serviceId),
  };
}

export const ownerNameFor = (locale: string) =>
  locale === "fa" ? "سارا میلر" : "Sarah Miller";

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const SYSTEM_MESSAGES: Record<string, string> = {
  approved:
    "Your request was approved by our team and added to the queue. Work begins soon.",
  disabled:
    "This task was deactivated. Billing for it has stopped — you can reactivate anytime.",
  reactivated:
    "Task reactivated. Welcome back — billing resumes from the next cycle.",
  joined: "You joined this conversation.",
};

export function createSeedState(_locale: string): PanelState {
  return { company: null, tasks: [], messages: [], balance: 0, currency: "usd" };
}

export function loadPanelState(locale: string): PanelState {
  if (typeof window === "undefined") return createSeedState(locale);
  try {
    const raw = window.localStorage.getItem(PANEL_STORAGE_KEY);
    if (!raw) return createSeedState(locale);
    const parsed = JSON.parse(raw) as PanelState;
    if (!parsed.company || !Array.isArray(parsed.tasks)) {
      return createSeedState(locale);
    }
    if (typeof parsed.company.ownerName !== "string" || !parsed.company.ownerName) {
      parsed.company.ownerName = ownerNameFor(locale);
    }
    for (const task of parsed.tasks) {
      if (task.kind !== "oneTime" && task.kind !== "monthly") {
        task.kind = getServiceKind(task.serviceId);
      }
    }
    if (typeof parsed.balance !== "number" || Number.isNaN(parsed.balance)) {
      parsed.balance = 0;
    }
    if (
      parsed.currency !== "toman" &&
      parsed.currency !== "lir" &&
      parsed.currency !== "usd"
    ) {
      parsed.currency = "usd";
    }
    return parsed;
  } catch {
    return createSeedState(locale);
  }
}

export function savePanelState(state: PanelState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (private mode / quota) — keep in memory
  }
}

export function formatPrice(price: number, locale: string) {
  const digits = locale === "fa" ? price.toLocaleString("fa-IR") : price.toLocaleString("en-US");
  return `$${digits}`;
}

export function formatBalance(
  balance: number,
  currency: BalanceCurrency,
  locale: string,
) {
  const l = locale === "fa" ? "fa-IR" : locale === "tr" ? "tr-TR" : "en-US";
  if (currency === "toman") {
    return `${balance.toLocaleString(l)} تومان`;
  }
  return new Intl.NumberFormat(l, {
    style: "currency",
    currency: currency === "usd" ? "USD" : "TRY",
  }).format(balance);
}

export function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(
    locale === "fa" ? "fa-IR" : locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export function timeAgo(iso: string, locale: string, now = Date.now()) {
  const seconds = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  const units =
    locale === "fa"
      ? { m: "دقیقه", h: "ساعت", d: "روز", w: "هفته", mo: "ماه" }
      : locale === "tr"
        ? { m: "min", h: "saat", d: "gün", w: "hafta", mo: "ay" }
        : { m: "min", h: "hour", d: "day", w: "week", mo: "month" };

  if (seconds < 60) return locale === "fa" ? "همین حالا" : locale === "tr" ? "şimdi" : "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return locale === "fa" ? `${minutes} دقیقه پیش` : locale === "tr" ? `${minutes} ${units.m} önce` : `${minutes} ${units.m}${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return locale === "fa" ? `${hours} ساعت پیش` : locale === "tr" ? `${hours} ${units.h} önce` : `${hours} ${units.h}${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return locale === "fa" ? `${days} روز پیش` : locale === "tr" ? `${days} ${units.d} önce` : `${days} ${units.d}${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return locale === "fa" ? `${weeks} هفته پیش` : locale === "tr" ? `${weeks} ${units.w} önce` : `${weeks} ${units.w}${weeks === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return locale === "fa" ? `${months} ماه پیش` : locale === "tr" ? `${months} ${units.mo} önce` : `${months} ${units.mo}${months === 1 ? "" : "s"} ago`;
}

export function nextBillingDate(now = new Date()) {
  const next = new Date(now);
  next.setDate(1);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(lastDay);
  return next;
}