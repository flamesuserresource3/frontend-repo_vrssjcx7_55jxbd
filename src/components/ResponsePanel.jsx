import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ResponsePanel({ response, error }) {
  if (!response && !error) return null;

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-white">
      {error ? (
        <div className="mb-3 flex items-center gap-2 text-rose-300">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm font-medium">An error occurred</span>
        </div>
      ) : (
        <div className="mb-3 flex items-center gap-2 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">Workflow response</span>
        </div>
      )}

      <pre className="max-h-96 overflow-auto rounded-lg bg-black/60 p-4 text-xs leading-relaxed text-emerald-100">
{typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
      </pre>

      {error && (
        <pre className="mt-3 max-h-60 overflow-auto rounded-lg bg-rose-600/10 p-3 text-xs text-rose-200">
{error}
        </pre>
      )}
    </div>
  );
}
