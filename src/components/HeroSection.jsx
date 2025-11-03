import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] grid place-items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-slate-300/80 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
          AI Voice Agent
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Speak or Upload. We’ll do the rest.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Record your voice or drop in an MP3 (up to 25MB). We’ll send it securely to the workflow and show the results once they’re ready.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
    </section>
  );
}
