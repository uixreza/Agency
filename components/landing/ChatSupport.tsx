"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const teamMeta = [
  { online: true, color: "#00e5cc" },
  { online: true, color: "#667eea" },
  { online: false, color: "#ff6b4a" },
];

const avatarInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  time: string;
}

export default function ChatSupport() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const rawT = t as unknown as { raw: (key: string) => any };
  const team = rawT.raw("team") as { name: string; role: string }[];
  const supportTeam = team.map((member, i) => ({
    name: member.name,
    role: member.role,
    avatar: avatarInitials(member.name),
    ...(teamMeta[i] ?? { online: false, color: "#00e5cc" }),
  }));
  const quickMessages = rawT.raw("quickReplies") as string[];
  const responses = rawT.raw("responses") as string[];
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("welcome"),
      sender: "support",
      time: t("now"),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (text = message) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "user",
      time: t("now"),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate support typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const supportMessage: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        time: t("now"),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 2000);
  };

  const onlineCount = supportTeam.filter((member) => member.online).length;

  return (
    <div className="fixed bottom-0 left-0 z-30">
      <div className="relative m-4 sm:m-6 lg:m-8">
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 bottom-full mb-4 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden"
              style={{
                background: "rgba(22, 25, 34, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(37, 42, 54, 0.4)",
                boxShadow:
                  "0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 229, 204, 0.05)",
              }}>
              {/* Header */}
              <div
                className="px-5 py-4 border-b flex items-center justify-between"
                style={{ borderColor: "rgba(37, 42, 54, 0.4)" }}>
                <div>
                  <h3 className="text-foreground font-bold text-sm">
                    {t("title")}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t("onlineCount", { count: onlineCount })}
                  </p>
                </div>

                {/* Online indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {supportTeam
                      .filter((m) => m.online)
                      .slice(0, 3)
                      .map((member, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-transform hover:scale-110"
                          style={{
                            background: `${member.color}20`,
                            borderColor: "rgba(22, 25, 34, 0.95)",
                            color: member.color,
                            zIndex: 3 - i,
                          }}
                          title={member.name}>
                          {member.avatar}
                        </div>
                      ))}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,229,204,0.6)]" />
                </div>
              </div>

              {/* Messages */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-accent/10 border border-accent/20 text-foreground rounded-br-md"
                          : "bg-[#1a1d28] border border-[#252a36] text-gray-300 rounded-bl-md"
                      }`}>
                      {msg.text}
                      <div className="text-[10px] opacity-50 mt-1 text-left">
                        {msg.time}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start">
                      <div className="bg-[#1a1d28] border border-[#252a36] px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                              className="w-2 h-2 rounded-full bg-accent/60"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Messages */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickMessages.map((msg, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(msg)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs bg-accent/5 border border-accent/10 text-accent hover:bg-accent/10 hover:border-accent/20 transition-all duration-300">
                      {msg}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div
                className="px-4 py-3 border-t flex items-center gap-2"
                style={{ borderColor: "rgba(37, 42, 54, 0.4)" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("placeholder")}
                  className="flex-1 bg-[#1a1d28] border border-[#252a36] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-gray-500 focus:outline-none focus:border-accent/30 transition-all duration-300"
                  dir={locale === "fa" ? "rtl" : "ltr"}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,229,204,0.3)]">
                  <svg
                    className="w-4 h-4 text-bg"
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
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group"
          style={{
            background: "rgba(22, 25, 34, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(37, 42, 54, 0.4)",
            boxShadow: isOpen
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 229, 204, 0.1)",
          }}>
          {/* Pulse ring when closed */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-accent/10"
            />
          )}

          <motion.div
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}>
            {isOpen ? (
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <div className="relative">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                {/* Online dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-[#161922] shadow-[0_0_6px_rgba(0,229,204,0.6)]" />
              </div>
            )}
          </motion.div>
        </motion.button>

        {/* Online count badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-bg shadow-lg">
            {onlineCount}
          </motion.div>
        )}
      </div>
    </div>
  );
}
