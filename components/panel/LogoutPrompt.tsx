"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const logoutIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function LogoutPrompt({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("panel");
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const confirmLogout = () => {
    onClose();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          {isMobile ? (
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "110%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed bottom-0 start-0 end-0 z-[80] rounded-t-3xl bg-surface/95 backdrop-blur-2xl border-t border-border/40">
              <div className="pt-3 pb-1 rounded-t-3xl">
                <div className="w-12 h-1.5 rounded-full bg-border/70 mx-auto" />
              </div>
              <LogoutContent
                title={t("logoutTitle")}
                description={t("logoutDescription")}
                cancelLabel={t("logoutCancel")}
                confirmLabel={t("logoutConfirm")}
                onCancel={onClose}
                onConfirm={confirmLogout}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none">
              <div className="pointer-events-auto w-full max-w-md rounded-2xl bg-surface border border-border p-6 shadow-2xl">
                <LogoutContent
                  title={t("logoutTitle")}
                  description={t("logoutDescription")}
                  cancelLabel={t("logoutCancel")}
                  confirmLabel={t("logoutConfirm")}
                  onCancel={onClose}
                  onConfirm={confirmLogout}
                />
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function LogoutContent({
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="p-6 pt-2">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-warm/10 text-warm flex items-center justify-center">
          {logoutIcon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-300">
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 px-4 py-3 rounded-xl bg-warm/15 text-warm border border-warm/40 text-sm font-medium hover:bg-warm hover:text-white transition-colors duration-300">
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}