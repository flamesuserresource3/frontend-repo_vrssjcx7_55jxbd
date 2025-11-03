import React, { useEffect, useRef, useState } from 'react';
import { Mic, StopCircle, Timer, Waveform } from 'lucide-react';

export default function AudioRecorder({ onSend, disabled }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = useRef([]);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      stopTimer();
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    setElapsed(0);
    stopTimer();
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const mr = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mr.onstop = async () => {
        stopTimer();
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const sizeMB = blob.size / (1024 * 1024);
        if (sizeMB > 25) {
          setError('Recording exceeds 25MB limit. Please record a shorter clip.');
          return;
        }
        const filename = `recording-${Date.now()}.${mimeType.includes('webm') ? 'webm' : 'wav'}`;
        onSend?.(blob, filename, mimeType);
      };

      mr.start(250);
      setMediaRecorder(mr);
      setRecording(true);
      startTimer();
    } catch (err) {
      setError('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <Waveform className="h-5 w-5" />
          <span className="text-sm font-medium">Record Audio</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Timer className="h-4 w-4" /> {elapsed}s
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-black/30 p-4">
        <div className="text-sm text-white/70">
          {recording ? 'Recording... speak clearly near your microphone.' : 'Press record to capture your voice.'}
        </div>
        <div className="flex items-center gap-2">
          {recording ? (
            <button
              onClick={stopRecording}
              disabled={disabled}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 disabled:opacity-50"
            >
              <StopCircle className="h-5 w-5" /> Stop
            </button>
          ) : (
            <button
              onClick={startRecording}
              disabled={disabled}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              <Mic className="h-5 w-5" /> Record
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <p className="mt-2 text-xs text-white/50">Note: Recorded audio is sent as raw binary (e.g., webm/opus) in the request body.</p>
    </div>
  );
}
