import React, { useCallback, useState } from 'react';
import Hero from './components/Hero';
import AudioRecorder from './components/AudioRecorder';
import FileUploader from './components/FileUploader';
import ProcessingIndicator from './components/ProcessingIndicator';
import ResponsePanel from './components/ResponsePanel';

const WEBHOOK_URL = 'https://susko.app.n8n.cloud/webhook/825987da-e70c-4528-9623-622a648ddd19';

export default function App() {
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [lastFileName, setLastFileName] = useState('');

  const sendBinaryToWebhook = useCallback(async (blob, filename, mimeType) => {
    setProcessing(true);
    setError('');
    setResponse(null);
    setLastFileName(filename || 'audio');

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': mimeType || 'application/octet-stream',
        },
        body: blob,
      });

      // Some webhooks may return empty body initially. Read as text first.
      const contentType = res.headers.get('content-type') || '';
      const rawText = await res.text();

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${rawText || 'Request failed'}`);
      }

      let parsed;
      if (rawText && (contentType.includes('application/json') || rawText.trim().startsWith('{') || rawText.trim().startsWith('['))) {
        try {
          parsed = JSON.parse(rawText);
        } catch (_e) {
          // Fall back to plain text if JSON parse fails
          parsed = rawText;
        }
      } else {
        parsed = rawText || 'Success (no content returned).';
      }

      setResponse(parsed);
    } catch (e) {
      setError(e?.message || 'Failed to send audio.');
    } finally {
      setProcessing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <Hero />

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          <AudioRecorder onSend={sendBinaryToWebhook} disabled={processing} />
          <FileUploader onSend={sendBinaryToWebhook} disabled={processing} />
        </div>

        <ProcessingIndicator visible={processing} filename={lastFileName} />

        <ResponsePanel response={response} error={error} />

        <footer className="mx-auto mt-16 max-w-4xl text-center text-xs text-white/50">
          Your audio is sent as raw binary in the HTTP request body to the provided webhook.
        </footer>
      </div>
    </div>
  );
}
