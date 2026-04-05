"use client";

import { useEffect, useState, createContext, useContext, useCallback, useRef } from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const colors = {
    success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", text: "#10b981", icon: "✅" },
    error:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  text: "#ef4444", icon: "❌" },
    info:    { bg: "rgba(108,99,255,0.12)", border: "rgba(108,99,255,0.35)", text: "#6c63ff", icon: "ℹ️" },
  }[item.type];

  return (
    <div
      className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-xl transition-all duration-300"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        backdropFilter: "blur(12px)",
        transform: visible ? "translateX(0)" : "translateX(120%)",
        opacity: visible ? 1 : 0,
        minWidth: 260,
        maxWidth: 380,
      }}
    >
      <span>{colors.icon}</span>
      <span className="flex-1">{item.message}</span>
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100 transition-opacity text-base leading-none ml-1">×</button>
    </div>
  );
}
