"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import {
  clearPanelState,
  createSeedState,
  loadPanelState,
  makeTask,
  savePanelState,
  uid,
  GENERAL_CONVERSATION_ID,
  SYSTEM_MESSAGES,
  type BalanceCurrency,
  type ChatMessage,
  type CompanyProfile,
  type PanelState,
  type PanelTask,
  type TaskServiceId,
  type TaskStatus,
} from "@/lib/panel-data";

interface PanelContextValue {
  state: PanelState;
  createCompany: (
    profile: Omit<CompanyProfile, "id" | "createdAt">,
    serviceIds?: TaskServiceId[],
  ) => void;
  updateCompany: (patch: Partial<CompanyProfile>) => void;
  requestTask: (serviceId: TaskServiceId) => void;
  cancelRequest: (taskId: string) => void;
  deactivateTask: (taskId: string) => void;
  reactivateTask: (taskId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  setCurrency: (currency: BalanceCurrency) => void;
  resetPanel: () => void;
}

const PanelContext = createContext<PanelContextValue | null>(null);

const SOUNDS = {
  notif: "/assets/sound/notif.wav",
  popup: "/assets/sound/popup.mp3",
} as const;
type SoundFile = keyof typeof SOUNDS;
const lastPlayedAt: Record<SoundFile, number> = { notif: 0, popup: 0 };

function playSound(file: SoundFile) {
  const now = Date.now();
  if (now - lastPlayedAt[file] < 250) return;
  lastPlayedAt[file] = now;
  try {
    const audio = new Audio(SOUNDS[file]);
    audio.volume = 0.5;
    void audio.play().catch(() => {});
  } catch {
    // audio unavailable — skip
  }
}

export function usePanel() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanel must be used within PanelProvider");
  return ctx;
}

export function PanelProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations("panel");
  const [state, setState] = useState<PanelState>(() => createSeedState(locale));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(loadPanelState(locale));
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [locale]);

  useEffect(() => {
    if (!hydrated) return;
    savePanelState(state);
  }, [state, hydrated]);

  const pushToast = useCallback(
    (message: string, tone: "success" | "info" = "success") => {
      playSound("popup");
      toast(message, {
        icon: tone === "success" ? "✅" : "💬",
      });
    },
    [],
  );

  // Simulate team approval for pending tasks
  useEffect(() => {
    const pendingTask = state.tasks.find(
      (task) => task.active && task.status === "pending",
    );
    if (!pendingTask) return;
    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === pendingTask.id
            ? {
                ...task,
                status: "queue" as TaskStatus,
                progress: Math.max(task.progress, 5),
                note: t("taskNoteApproved"),
                updatedAt: new Date().toISOString(),
              }
            : task,
        ),
        messages: [
          ...prev.messages,
          {
            id: uid(),
            conversationId: pendingTask.id,
            sender: "system",
            text: SYSTEM_MESSAGES.approved,
            time: new Date().toISOString(),
          },
        ],
      }));
      pushToast(t("taskApprovedToast"), "success");
    }, 12000);
    return () => clearTimeout(timer);
  }, [state.tasks, t, pushToast]);

  const createCompany = useCallback<PanelContextValue["createCompany"]>(
    (profile, serviceIds) => {
      const company: CompanyProfile = {
        ...profile,
        id: uid(),
        createdAt: new Date().toISOString(),
      };
      const tasks: PanelTask[] = (serviceIds ?? []).map((serviceId) =>
        makeTask(serviceId, company.id, t("taskNotePending")),
      );
      setState((prev) => ({
        ...prev,
        company,
        tasks: [...prev.tasks, ...tasks],
        messages: [
          ...prev.messages,
          ...tasks.map((task) => ({
            id: uid(),
            conversationId: task.id,
            sender: "system" as const,
            text: t("taskRequestedMsg"),
            time: task.createdAt,
          })),
        ],
      }));
      pushToast(t("companyCreated"));
      if (tasks.length > 0) {
        pushToast(t("servicesAddedToast", { count: String(tasks.length) }), "info");
      }
    },
    [t, pushToast],
  );

  const updateCompany = useCallback<PanelContextValue["updateCompany"]>(
    (patch) => {
      setState((prev) =>
        prev.company
          ? { ...prev, company: { ...prev.company, ...patch } }
          : prev,
      );
      pushToast(t("companySaved"));
    },
    [t, pushToast],
  );

  const requestTask = useCallback<PanelContextValue["requestTask"]>(
    (serviceId) => {
      const company = state.company;
      if (!company) return;
      const alreadyRequested = state.tasks.some(
        (task) =>
          task.active &&
          task.serviceId === serviceId &&
          task.status === "pending",
      );
      if (alreadyRequested) {
        pushToast(t("taskAlreadyRequested"), "info");
        return;
      }
      const task: PanelTask = makeTask(serviceId, company.id, t("taskNotePending"));
      setState((prev) => ({
        ...prev,
        tasks: [...prev.tasks, task],
        messages: [
          ...prev.messages,
          {
            id: uid(),
            conversationId: task.id,
            sender: "system",
            text: t("taskRequestedMsg"),
            time: new Date().toISOString(),
          },
        ],
      }));
      pushToast(t("taskRequested"));
    },
    [state, t, pushToast],
  );

  const cancelRequest = useCallback<PanelContextValue["cancelRequest"]>(
    (taskId) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.filter(
          (task) => !(task.id === taskId && task.status === "pending"),
        ),
      }));
      pushToast(t("requestCancelled"), "info");
    },
    [t, pushToast],
  );

  const deactivateTask = useCallback<PanelContextValue["deactivateTask"]>(
    (taskId) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                active: false,
                deactivatedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : task,
        ),
        messages: [
          ...prev.messages,
          {
            id: uid(),
            conversationId: taskId,
            sender: "system",
            text: SYSTEM_MESSAGES.disabled,
            time: new Date().toISOString(),
          },
        ],
      }));
      pushToast(t("taskDeactivated"), "info");
    },
    [t, pushToast],
  );

  const reactivateTask = useCallback<PanelContextValue["reactivateTask"]>(
    (taskId) => {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                active: true,
                status: "queue" as TaskStatus,
                progress: Math.max(task.progress, 5),
                deactivatedAt: undefined,
                updatedAt: new Date().toISOString(),
              }
            : task,
        ),
        messages: [
          ...prev.messages,
          {
            id: uid(),
            conversationId: taskId,
            sender: "system",
            text: SYSTEM_MESSAGES.reactivated,
            time: new Date().toISOString(),
          },
        ],
      }));
      pushToast(t("taskReactivated"));
    },
    [t, pushToast],
  );

  const sendMessage = useCallback<PanelContextValue["sendMessage"]>(
    (conversationId, text) => {
      if (!text.trim()) return;
      const userMessage: ChatMessage = {
        id: uid(),
        conversationId,
        sender: "user",
        text: text.trim(),
        time: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
      }));

      // Simulated team reply
      const replyDelay = 1500 + Math.random() * 1500;
      const task = state.tasks.find((task) => task.id === conversationId);
      const serviceTitle = task
        ? t(`catalog.${task.serviceId}.title`)
        : t("chatGeneral");
      const replies = t.raw("chatReplies") as string[];
      const replyText = replies[
        Math.floor(Math.random() * replies.length)
      ].replace("{task}", serviceTitle);

      setTimeout(() => {
        playSound("notif");
        setState((prev) => {
          const stillExists = prev.messages.some((m) => m.id === userMessage.id);
          if (!stillExists) return prev;
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: uid(),
                conversationId,
                sender: "team",
                text: replyText,
                time: new Date().toISOString(),
              },
            ],
          };
        });
      }, replyDelay);
    },
    [state.tasks, t],
  );

  const resetPanel = useCallback(() => {
    clearPanelState();
    setState(createSeedState(locale));
    pushToast(t("dataResetToast"), "info");
  }, [locale, t, pushToast]);

  const setCurrency = useCallback<PanelContextValue["setCurrency"]>(
    (currency) => setState((prev) => ({ ...prev, currency })),
    [],
  );

  const value = useMemo<PanelContextValue>(
    () => ({
      state,
      createCompany,
      updateCompany,
      requestTask,
      cancelRequest,
      deactivateTask,
      reactivateTask,
      sendMessage,
      setCurrency,
      resetPanel,
    }),
    [
      state,
      createCompany,
      updateCompany,
      requestTask,
      cancelRequest,
      deactivateTask,
      reactivateTask,
      sendMessage,
      setCurrency,
      resetPanel,
    ],
  );

  return (
    <PanelContext.Provider value={value}>
      {children}
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(20, 23, 31, 0.95)",
            color: "#f4f4f5",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 18px",
            maxWidth: "420px",
          },
        }}
      />
    </PanelContext.Provider>
  );
}

export { GENERAL_CONVERSATION_ID };
