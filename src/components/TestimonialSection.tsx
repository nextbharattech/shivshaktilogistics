"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : TESTIMONIALS.length - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr < TESTIMONIALS.length - 1 ? curr + 1 : 0));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
            <span>Verified Commercial Partners</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by Businesses{" "}
            <span className="text-orange-600">
              Moving Forward.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Hear from operations directors, procurement managers, and supply chain leaders who rely on Shiv Shakti Logistics daily.
          </p>
        </div>

        {/* Carousel Card in pure white */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-md relative">
          <Quote className="w-12 h-12 text-slate-200 absolute top-8 left-8 -z-0 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <p className="text-lg sm:text-2xl text-slate-800 font-medium leading-relaxed italic">
              "{current.quote}"
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{current.clientName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    Verified Partner
                  </span>
                </h4>
                <div className="text-xs text-orange-600 font-semibold mt-0.5">
                  {current.designation} — {current.company}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Industry: {current.industry}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-slate-500 px-2 font-medium">
                  {activeIndex + 1} / {TESTIMONIALS.length}
                </div>
                <button
                  onClick={next}
                  className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
