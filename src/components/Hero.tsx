"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Layers,
  ChevronDown,
} from "lucide-react";
import { COMPANY } from "@/data/company";

export const Hero: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden text-slate-900">
      {/* Continuous Hero Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Overlays: Ensures optimal contrast & text legibility while keeping video clearly visible */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-slate-50/90" />
        <div className="absolute inset-0 bg-tech-grid opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-radial-gradient opacity-40" />
        <div className="absolute inset-0 bg-radial-orange opacity-30" /> */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-radial-gradient opacity-30" />
        <div className="absolute inset-0 bg-radial-orange opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
            </span>
            <span className="tracking-wide">
              Global Multi-Modal Logistics & Supply Chain Infrastructure
            </span>
          </div>

          {/* Primary Editorial Headline in rich dark navy */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Your Cargo. <br className="hidden sm:inline" />
            <span className="text-orange-600">Our Network.</span>{" "}
            <span className="relative inline-block text-slate-900">
              Delivered.
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-orange-500 rounded-full" />
            </span>
          </h1>

          {/* Supporting Subheadline */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            End-to-end multi-modal logistics solutions built for speed, complete
            visibility, and rock-solid reliability — from first mile to final
            delivery.
          </p>

          {/* Primary & Secondary CTAs (without tracking) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold tracking-wide text-slate-700 bg-white/90 hover:bg-white backdrop-blur-md border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-sky-700" />
              <span>Explore Services</span>
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-sky-700 flex-shrink-0" />
            <span>
              Reliable logistics. Transparent operations. Smarter delivery.
            </span>
          </div>

          {/* Factual Operational Metrics Bar in clean white cards */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-center transition-transform hover:-translate-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                {COMPANY.metrics.domesticHubs}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Primary Gateways
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-center transition-transform hover:-translate-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-orange-600">
                {COMPANY.metrics.activeRoutes}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Linehaul Corridors
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-center transition-transform hover:-translate-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-700">
                {COMPANY.metrics.pinCodesCovered}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                PIN Codes Served
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-center transition-transform hover:-translate-y-0.5">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
                {COMPANY.metrics.onTimeRate}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                SLA Dispatch Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] text-slate-400 pointer-events-none">
        <span>Explore Journey</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-sky-600" />
      </div>
    </section>
  );
};
