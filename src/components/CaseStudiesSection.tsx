"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";

export const CaseStudiesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-sky-700" />
              <span>Proven Operational Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Enterprise Case Studies.{" "}
              <span className="text-sky-700">
                Tangible Results.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Examining real supply chain challenges solved through dedicated linehauls, cold-chain engineering, and multi-hub fulfillment.
            </p>
          </div>

          <Link
            href="/quote"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1.5 self-start lg:self-end"
          >
            <span>Discuss Your Logistics Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Case Studies Grid in clean white cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white border border-slate-200 text-sky-800 font-bold uppercase tracking-wider shadow-xs">
                    {cs.industry}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Verified Deployment
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {cs.title}
                </h3>

                {/* Challenge & Solution snippets */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-orange-600 font-bold font-mono">Challenge: </span>
                    <span className="text-slate-600 line-clamp-2">{cs.challenge}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-sky-700 font-bold font-mono">Solution: </span>
                    <span className="text-slate-600 line-clamp-2">{cs.solution}</span>
                  </div>
                </div>

                {/* Metrics Highlight */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Delivered Impact:
                  </div>
                  {cs.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">
                        <strong className="text-slate-900 font-mono">{r.metric}</strong> — {r.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom services used tags */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                {cs.servicesUsed.map((svc, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-medium"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
