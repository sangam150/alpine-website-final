"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastIcon,
} from "./toast";

interface ToastMessage {
  id: string;
  title?: string;
  description: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            className="min-w-[300px] animate-in slide-in-from-top-2"
          >
            <div className="flex items-start space-x-3">
              <ToastIcon
                variant={
                  toast.variant === "destructive"
                    ? "error"
                    : toast.variant === "default"
                      ? "info"
                      : toast.variant
                }
              />
              <div className="flex-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                <ToastDescription>{toast.description}</ToastDescription>
              </div>
            </div>
            <ToastClose onClick={() => removeToast(toast.id)} />
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
