import React, { useRef, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

export default function FileUploader({ onSend, disabled }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = async (fileList) => {
    setError('');
    const file = fileList?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > 25) {
      setError('File exceeds 25MB limit. Please choose a smaller MP3.');
      return;
    }

    if (file.type !== 'audio/mpeg' && !file.name.toLowerCase().endsWith('.mp3')) {
      setError('Please upload an MP3 file (.mp3).');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    onSend?.(blob, file.name, 'audio/mpeg');
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-2 text-sm font-medium text-white/80">Upload MP3</div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition ${
          dragActive ? 'border-indigo-400 bg-indigo-400/10' : 'border-white/15 bg-black/30'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mb-2 h-6 w-6 text-white/80" />
        <p className="text-sm text-white/80">Drag & drop an MP3 here, or click to select</p>
        <p className="mt-1 text-xs text-white/50">Max size 25MB • Sent as raw binary in request body</p>
        <input
          ref={inputRef}
          type="file"
          accept="audio/mpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </div>

      {error && (
        <div className="mt-2 flex items-start gap-2 rounded-md bg-rose-500/10 p-2 text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
