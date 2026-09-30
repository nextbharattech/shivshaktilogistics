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
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden text-slate-900">
      {/* Background Video */}
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

        {/* Overlays */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-radial-gradient opacity-30" />
        <div className="absolute inset-0 bg-radial-orange opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 lg:pb-14">
        {/* TOP — Badge (Clear of fixed navbar) */}
        <div className="w-full flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-[11px] sm:text-xs font-semibold text-slate-800 text-center max-w-[92vw] sm:max-w-none">
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
            </span>

            <span className="tracking-wide">
              Global Multi-Modal Logistics & Supply Chain Infrastructure
            </span>
          </div>
        </div>

        {/* BOTTOM — Hero Content */}
        <div className="w-full mt-auto pt-8">
          <div className="max-w-4xl mx-auto w-full text-center space-y-3 sm:space-y-4">
            {/* Description */}
            <p className="text-sm sm:text-lg lg:text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm px-2">
              End-to-end multi-modal logistics solutions built for speed,
              complete visibility, and rock-solid reliability — from first mile
              to final delivery.
            </p>

            {/* Buttons */}
            <div className="pt-1 flex flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-md mx-auto">
              <Link
                href="/quote"
                className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg shadow-orange-500/25 hover:from-orange-700 hover:to-amber-700 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 group whitespace-nowrap"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/services"
                className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide text-slate-800 bg-white/95 hover:bg-white backdrop-blur-md border border-slate-300 shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-700" />
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-white/75 pointer-events-none">
        <span>Explore Journey</span>
        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-orange-400" />
      </div>
    </section>
  );
};
