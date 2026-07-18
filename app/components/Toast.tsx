'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import './Toast.css';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
    id: number;
    message: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    /** Show a toast. Auto-dismisses after ~5s; the user can also close it manually. */
    showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
const AUTO_DISMISS_MS = 5000;

/** Mount once near the root of the app (see app/layout.tsx). */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const idRef = useRef(0);
    const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    }, []);

    const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
        const id = ++idRef.current;
        setToasts((prev) => [...prev, { id, message, variant }]);
        const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
        timers.current.set(id, timer);
    }, [dismiss]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-viewport" role="region" aria-label="Notifications">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast--${t.variant}`} role="status" aria-live="polite">
                        <span className="toast__icon" aria-hidden="true">
                            {t.variant === 'success' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                            {t.variant === 'error' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            )}
                            {t.variant === 'info' && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            )}
                        </span>

                        <p className="toast__message">{t.message}</p>

                        <button
                            type="button"
                            className="toast__close"
                            aria-label="Dismiss notification"
                            onClick={() => dismiss(t.id)}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a <ToastProvider>');
    }
    return ctx;
}
