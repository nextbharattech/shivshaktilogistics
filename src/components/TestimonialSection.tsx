"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i > 0 ? i - 1 : TESTIMONIALS.length - 1));
  const next = () =>
    setActiveIndex((i) => (i < TESTIMONIALS.length - 1 ? i + 1 : 0));

  const current = TESTIMONIALS[activeIndex];

  /* Avatar initials from client name */
  const initials = current.clientName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
            Client Stories
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by{" "}
            <span className="text-orange-500">Businesses</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          {/* Orange top accent */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 rounded-b-full" />

          {/* Stars */}
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic mb-6">
            &ldquo;{current.quote}&rdquo;
          </p>

          {/* Author row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-black tracking-wide shrink-0">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    {current.clientName}
                  </span>
                  {current.verifiedPartner && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {current.designation} · {current.company}
                </p>
                <p className="text-[10px] text-orange-500 font-semibold mt-0.5">
                  {current.industry}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-500 text-slate-500 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1 px-1">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-4 h-2 bg-orange-500"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-500 text-slate-500 transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
