"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Car,
  Factory,
  Store,
  ShieldAlert,
  Boxes,
  Laptop,
  Wrench,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { INDUSTRIES, IndustryItem } from "@/data/industries";

export const IndustriesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(INDUSTRIES[0].id);

  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Car,
    Factory,
    Store,
    ShieldAlert,
    Boxes,
    Laptop,
    Wrench,
  };

  const activeIndustry = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];
  const ActiveIcon = iconMap[activeIndustry.iconName] || Briefcase;

  return (
    <section id="industries" className="py-24 bg-slate-50 relative overflow-hidden text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-orange-600" />
            <span>Vertical Industry Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineered For Your Sector's{" "}
            <span className="text-orange-600">
              Specific Demands.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Automotive assembly lines require Just-In-Time precision; pharmaceuticals demand unbroken +2°C to +8°C cold chains. We architect custom logistics SOPs for every industry.
          </p>
        </div>

        {/* Industry Horizontal Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.iconName] || Briefcase;
            const isSelected = activeTab === ind.id;

            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border flex-shrink-0 ${
                  isSelected
                    ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-500/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ind.title.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card in pure white */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual with Badge */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200 group">
              <img
                src={activeIndustry.heroImage}
                alt={activeIndustry.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white/95 text-orange-700 shadow-md border border-slate-200 flex items-center gap-2 text-xs font-bold">
                <ActiveIcon className="w-4 h-4" />
                <span>{activeIndustry.title}</span>
              </div>
            </div>

            {/* Narrative & Challenge/Solution Comparison */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {activeIndustry.title}
                </h3>
                <p className="text-sm font-semibold text-orange-600 mt-1">
                  {activeIndustry.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {activeIndustry.description}
                </p>
              </div>

              {/* Challenge vs Solution Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5">
                  <div className="text-[11px] font-mono text-red-800 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeIndustry.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                  <div className="text-[11px] font-mono text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Our Solution</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeIndustry.solution}
                  </p>
                </div>
              </div>

              {/* Verified Metrics for this Industry */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-center font-mono">
                {activeIndustry.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Link to Dedicated Industry Page */}
              <div className="pt-2">
                <Link
                  href={`/industries/${activeIndustry.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Explore {activeIndustry.title} Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
