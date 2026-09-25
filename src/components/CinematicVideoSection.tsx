"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Radio, Globe } from "lucide-react";

export const CinematicVideoSection: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 text-white">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
          alt="Shiv Shakti Maritime and Global Logistics"
          className="w-full h-full object-cover opacity-25 filter brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-sky-400 font-semibold">
          <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Multi-Modal National & Global Movement</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          From First Mile <br />
          <span className="text-orange-400">
            to Final Mile.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether crossing national express corridors, clearing deep-sea container ports, or dispatching urgent temperature-sensitive cargo aboard scheduled freighters — we move your business with uncompromising precision.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quote"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl shadow-orange-500/25 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Request Freight Rate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/network"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>View Network Corridors</span>
          </Link>
        </div>

        {/* Ambient Telemetry Badge */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fully Insured Marine & Surface Transit</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>Zero Cargo Pilferage Protocol</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>Dual Satellite Fleet Link</span>
        </div>
      </div>
    </section>
  );
};
