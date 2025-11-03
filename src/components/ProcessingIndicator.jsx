import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ProcessingIndicator({ visible, filename }) {
  if (!visible) return null;
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
      <Loader2 className="h-5 w-5 animate-spin" />
      <div className="text-sm">
        <div>Processing audio{filename ? `: ${filename}` : ''}…</div>
        <div className="text-xs text-white/60">This can take a little bit. Please keep this tab open.</div>
      </div>
    </div>
  );
}
