import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.20),_transparent_50%),_radial-gradient(circle_at_60%_40%,_rgba(59,130,246,0.15),_transparent_40%),_radial-gradient(circle_at_40%_60%,_rgba(251,146,60,0.10),_transparent_40%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          AI Voice Agent • Realtime Processing
        </span>
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
          Send your voice, get structured insights back
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Record your voice or upload an MP3. We forward the audio to your workflow
          and show the JSON response once it finishes processing.
        </p>
      </div>
    </section>
  );
}
