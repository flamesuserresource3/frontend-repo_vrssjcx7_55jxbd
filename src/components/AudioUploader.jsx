import React, { useState } from 'react';
import { Upload, FileAudio2, Send, XCircle } from 'lucide-react';

const MAX_MB = 25;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function AudioUploader({ onSubmit, disabled }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onPick = (e) => {
    setError('');
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'audio/mpeg' && !f.name.toLowerCase().endsWith('.mp3')) {
      setError('Please upload an MP3 file (.mp3).');
      setFile(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(`File is too large. Max ${MAX_MB}MB allowed.`);
      setFile(null);
      return;
    }
    setFile(f);
  };

  const clear = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold">Upload an MP3</h3>
          <p className="text-slate-300 text-sm">Max size {MAX_MB}MB. We’ll send it securely to the workflow.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="flex items-center justify-center gap-2 w-full px-4 py-8 rounded-2xl border border-dashed border-white/15 bg-black/20 hover:bg-black/10 text-slate-300 cursor-pointer transition">
          <Upload className="w-5 h-5" />
          <span>Click to choose an MP3</span>
          <input type="file" accept="audio/mpeg,.mp3" className="hidden" onChange={onPick} />
        </label>

        {file && (
          <div className="flex items-center justify-between gap-3 bg-black/30 border border-white/10 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileAudio2 className="w-4 h-4 text-slate-300" />
              <div className="truncate text-slate-200 text-sm">{file.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clear} className="text-slate-300 hover:text-white transition" title="Remove">
                <XCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => onSubmit(file)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition"
                disabled={disabled}
              >
                <Send className="w-4 h-4" /> Send to Workflow
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-rose-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}
