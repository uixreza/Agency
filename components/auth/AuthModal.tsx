"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type AuthMode = "login" | "signup";
type SignupStep = "form" | "otp";

const GoogleIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const inputClass =
  "w-full ps-10 pe-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-sm text-foreground placeholder:text-muted/60";

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: ReactNode;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-muted">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 start-3 flex items-center text-muted">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
        />
      </div>
    </div>
  );
}

const MailIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const UserIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ArrowBackIcon = (
  <svg
    className="w-4 h-4"
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
);

const CloseIcon = (
  <svg
    className="w-5 h-5"
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
);

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const t = useTranslations("auth");
  const [mode, setMode] = useState<AuthMode>("login");
  const [signupStep, setSignupStep] = useState<SignupStep>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setMode("login");
      setSignupStep("form");
      setOtp(["", "", "", "", "", ""]);
    }
  }, [open]);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setSignupStep("form");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = [...otp];
    text.split("").forEach((d, i) => (next[i] = d));
    setOtp(next);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const modeToggle = (
    <div className="flex bg-card/60 border border-border/50 rounded-xl p-1 gap-1">
      {(["login", "signup"] as AuthMode[]).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => switchMode(m)}
          className={`relative flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 ${
            mode === m ? "text-foreground" : "text-muted hover:text-foreground"
          }`}>
          {mode === m && (
            <motion.span
              layoutId="auth-mode-pill"
              className="absolute inset-0 rounded-lg bg-accent/15 border border-accent/25"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">
            {m === "login" ? t("switchLogin") : t("switchSignup")}
          </span>
        </button>
      ))}
    </div>
  );

  const googleButton = (label: string) => (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-300 text-sm font-medium text-foreground">
      {GoogleIcon}
      {label}
    </button>
  );

  const divider = (
    <div className="flex items-center gap-3 text-xs text-muted">
      <span className="h-px flex-1 bg-border/60" />
      {t("or")}
      <span className="h-px flex-1 bg-border/60" />
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute inset-0 flex items-end justify-center sm:items-center sm:p-4 pointer-events-none">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="pointer-events-auto relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-surface/95 backdrop-blur-2xl border-t border-border/40 sm:border sm:border-border/40 shadow-2xl shadow-black/30">
              <div className="sm:hidden w-12 h-1.5 rounded-full bg-border/70 mx-auto mt-3" />

              <div className="p-6 pt-5 sm:pt-6">
                <div className="mb-6">{modeToggle}</div>

                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4">
                      <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-foreground">
                          {t("login")}
                        </h2>
                        <p className="text-sm text-muted">
                          {t("loginSubtitle")}
                        </p>
                      </div>

                      <Field
                        label={t("email")}
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder={t("emailPlaceholder")}
                        icon={MailIcon}
                        autoComplete="email"
                      />
                      <Field
                        label={t("password")}
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder={t("passwordPlaceholder")}
                        icon={LockIcon}
                        autoComplete="new-password"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-xs text-accent hover:text-accentDark transition-colors">
                          {t("forgotPassword")}
                        </button>
                      </div>
                      <button
                        type="button"
                        className="w-full py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-accent to-accentDark hover:opacity-90 shadow-lg shadow-accent/25 transition-all duration-300">
                        {t("loginSubmit")}
                      </button>

                      {divider}
                      {googleButton(t("googleLogin"))}
                    </motion.div>
                  ) : signupStep === "form" ? (
                    <motion.div
                      key="signup-form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4">
                      <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-foreground">
                          {t("signup")}
                        </h2>
                        <p className="text-sm text-muted">
                          {t("signupSubtitle")}
                        </p>
                      </div>

                      <Field
                        label={t("fullName")}
                        type="text"
                        value={name}
                        onChange={setName}
                        placeholder={t("fullNamePlaceholder")}
                        icon={UserIcon}
                        autoComplete="name"
                      />
                      <Field
                        label={t("email")}
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder={t("emailPlaceholder")}
                        icon={MailIcon}
                        autoComplete="email"
                      />
                      <Field
                        label={t("password")}
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder={t("passwordPlaceholder")}
                        icon={LockIcon}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setSignupStep("otp")}
                        className="w-full py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-accent to-accentDark hover:opacity-90 shadow-lg shadow-accent/25 transition-all duration-300">
                        {t("signupSubmit")}
                      </button>

                      {divider}
                      {googleButton(t("googleSignup"))}

                      <p className="text-xs text-muted text-center">
                        {t("alreadyAccount")}{" "}
                        <button
                          type="button"
                          onClick={() => switchMode("login")}
                          className="text-accent hover:text-accentDark font-medium transition-colors">
                          {t("switchLogin")}
                        </button>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup-otp"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5">
                      <button
                        type="button"
                        onClick={() => setSignupStep("form")}
                        className="flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors">
                        {ArrowBackIcon}
                        {t("changeEmail")}
                      </button>

                      <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-foreground">
                          {t("otpTitle")}
                        </h2>
                        <p className="text-sm text-muted">
                          {t("otpDescription", { email })}
                        </p>
                      </div>

                      <div className="flex justify-center gap-2" dir="ltr">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpRefs.current[index] = el;
                            }}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            onPaste={handleOtpPaste}
                            inputMode="numeric"
                            maxLength={1}
                            className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-card/50 border border-border/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-foreground"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        className="w-full py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-accent to-accentDark hover:opacity-90 shadow-lg shadow-accent/25 transition-all duration-300">
                        {t("verifyCode")}
                      </button>

                      <p className="text-xs text-muted text-center">
                        {t("resend") + " "}
                        <button
                          type="button"
                          className="text-accent hover:text-accentDark font-medium transition-colors">
                          00:30
                        </button>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}