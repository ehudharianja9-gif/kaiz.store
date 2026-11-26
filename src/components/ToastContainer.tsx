import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ToastMessage } from '../types/library';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifikasi"
      className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5 sm:bottom-6 sm:right-6"
    >
      {toasts.map((toast) => {
        const iconMap = {
          success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />,
          info: <Info className="h-5 w-5 shrink-0 text-stone-700" aria-hidden="true" />,
          warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />,
          error: <XCircle className="h-5 w-5 shrink-0 text-rose-700" aria-hidden="true" />,
        };

        return (
          <div
            key={toast.id}
            role="status"
            className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-lg transition-all duration-200"
          >
            <div className="pt-0.5">{iconMap[toast.variant]}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Tutup notifikasi"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
