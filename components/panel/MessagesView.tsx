"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePanel } from "@/components/panel/PanelProvider";
import {
  GENERAL_CONVERSATION_ID,
  timeAgo,
  type ChatMessage,
} from "@/lib/panel-data";

interface Conversation {
  id: string;
  title: string;
  emoji: string;
  disabled?: boolean;
}

export default function MessagesView() {
  const t = useTranslations("panel");
  const locale = useLocale();
  const { state, sendMessage } = usePanel();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [teamTyping, setTeamTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const conversations: Conversation[] = useMemo(() => {
    const list: Conversation[] = [
      { id: GENERAL_CONVERSATION_ID, title: t("chatGeneral"), emoji: "💬" },
    ];
    state.tasks.forEach((task) => {
      list.push({
        id: task.id,
        title: t(`catalog.${task.serviceId}.title`),
        emoji: taskEmoji(task.serviceId),
        disabled: !task.active,
      });
    });
    return list;
  }, [state.tasks, t]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const threadMessages = useMemo(() => {
    if (!activeId) return [];
    return state.messages
      .filter((m) => m.conversationId === activeId)
      .sort(
        (a, b) =>
          new Date(a.time).getTime() - new Date(b.time).getTime(),
      );
  }, [state.messages, activeId]);

  useEffect(() => {
    if (activeId && !conversations.some((c) => c.id === activeId)) {
      const timer = setTimeout(() => setActiveId(null), 0);
      return () => clearTimeout(timer);
    }
  }, [conversations, activeId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [threadMessages.length, activeId, teamTyping]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  const messageCount = (conversationId: string) =>
    state.messages.filter((m) => m.conversationId === conversationId).length;

  const lastMessage = (conversationId: string): ChatMessage | undefined => {
    const list = state.messages.filter(
      (m) => m.conversationId === conversationId,
    );
    return list[list.length - 1];
  };

  const handleSend = () => {
    if (!text.trim() || !activeId) return;
    sendMessage(activeId, text);
    setText("");
    setTeamTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTeamTyping(false), 3000);
  };

  const thread = (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      {activeConversation && (
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-border/40 shrink-0">
          <button
            type="button"
            onClick={() => setActiveId(null)}
            className="lg:hidden w-8 h-8 rounded-lg bg-card/60 border border-border/50 flex items-center justify-center text-muted">
            <svg
              className="w-4 h-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-xl bg-card/70 border border-border/50 flex items-center justify-center text-lg">
            {activeConversation.emoji}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {activeConversation.title}
            </div>
            {activeConversation.disabled && (
              <div className="text-[11px] text-muted">{t("tabDisabled")}</div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4 space-y-3">
        {threadMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "system" ? (
              <div className="max-w-full mx-auto text-center">
                <span className="inline-block text-[11px] text-muted bg-card/60 border border-border/40 rounded-full px-3 py-1.5">
                  {msg.text}
                </span>
              </div>
            ) : (
              <div
                className={`max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-accent/10 border border-accent/20 text-foreground rounded-br-md"
                    : "bg-[#1a1d28] border border-[#252a36] text-gray-300 rounded-bl-md"
                }`}>
                <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                <div className="text-[10px] opacity-50 mt-1 text-start">
                  {timeAgo(msg.time, locale)}
                </div>
              </div>
            )}
          </div>
        ))}

        {teamTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1a1d28] border border-[#252a36] px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {activeConversation && !activeConversation.disabled && (
        <div className="px-4 sm:px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t border-border/40 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("chatType")}
              className="flex-1 bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim()}
              className="w-11 h-11 rounded-xl btn-primary flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-bg rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const conversationList = (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-4 sm:px-5 py-4 border-b border-border/40 shrink-0">
        <h1 className="text-xl font-bold text-foreground">{t("chatTitle")}</h1>
        <p className="text-xs text-muted mt-1">{t("chatSubtitle")}</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1.5">
        {conversations.map((conv) => {
          const count = messageCount(conv.id);
          const last = lastMessage(conv.id);
          return (
            <button
              key={conv.id}
              type="button"
              onClick={() => setActiveId(conv.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-start transition-all duration-300 border ${
                activeId === conv.id
                  ? "bg-accent/10 border-accent/25"
                  : "border-transparent hover:bg-white/5"
              }`}>
              <div className="w-10 h-10 rounded-xl bg-card/70 border border-border/50 flex items-center justify-center text-lg flex-shrink-0">
                {conv.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-medium truncate ${
                      count === 0 ? "text-muted" : "text-foreground"
                    }`}>
                    {conv.title}
                  </span>
                  {last && (
                    <span className="text-[10px] text-muted flex-shrink-0">
                      {timeAgo(last.time, locale)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted truncate mt-0.5">
                  {count === 0
                    ? t("chatEmpty")
                    : `${last?.sender === "user" ? "• " : ""}${last?.text ?? ""}`}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const emptyThread = (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-0">
      <div className="w-16 h-16 rounded-2xl bg-card/60 border border-border/50 flex items-center justify-center text-3xl mb-4">
        💬
      </div>
      <h3 className="text-base font-semibold text-foreground">
        {t("chatSelectTitle")}
      </h3>
      <p className="text-sm text-muted mt-1.5 max-w-xs">{t("chatSelectDesc")}</p>
    </div>
  );

  return (
    <div className="h-[calc(100dvh-180px)] min-h-[480px] lg:h-[calc(100dvh-140px)] rounded-2xl bg-surface/80 backdrop-blur-xl border border-border/40 overflow-hidden flex flex-col">
      <div className="flex-1 min-h-0 grid grid-rows-[minmax(0,1fr)] lg:grid-cols-[300px_1fr] overflow-hidden">
        {/* List — hidden on mobile when a thread is open */}
        <div className={`${activeId ? "hidden" : "flex"} lg:flex flex-col min-w-0 min-h-0 overflow-hidden border-e border-border/40`}>
          {conversationList}
        </div>
        {/* Thread — hidden on mobile when no thread is open */}
        <div className={`${activeId ? "flex" : "hidden"} lg:flex flex-col relative min-w-0 min-h-0 overflow-hidden bg-bg/40`}>
          {activeId ? thread : emptyThread}
        </div>
      </div>
    </div>
  );
}

const taskEmoji = (serviceId: string) => {
  const map: Record<string, string> = {
    web: "🌐",
    app: "📱",
    aiVideo: "🎬",
    aiImage: "🎨",
    social: "📣",
    ads: "📈",
    seo: "🔍",
    email: "✉️",
  };
  return map[serviceId] ?? "📄";
};