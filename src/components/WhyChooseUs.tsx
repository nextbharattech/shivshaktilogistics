"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Eye,
  Headphones,
  Sliders,
  Cpu,
  TrendingUp,
  ArrowRight,
  Radio,
  Lock,
} from "lucide-react";
import { COMPANY } from "@/data/company";

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Reliable Delivery & Linehaul Punctuality",
      description:
        "Dual-driver relay systems, audited preventive maintenance, and guaranteed dispatch slots ensure 99.4% on-time execution.",
      icon: Shield,
      accent: "text-sky-700 bg-sky-50 border-sky-200",
    },
    {
      title: "Real-Time End-to-End Visibility",
      description:
        "GPS telemetry, temperature probes, and electronic seal status monitored 24/7 by our centralized control tower.",
      icon: Eye,
      accent: "text-orange-700 bg-orange-50 border-orange-200",
    },
    {
      title: "Dedicated Enterprise Support",
      description:
        "Direct single point of contact (SPOC) with logistics engineers who understand your factory and delivery dock requirements.",
      icon: Headphones,
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Flexible & Elastic Logistics Solutions",
      description:
        "Seamlessly scale capacity between full truckload, scheduled consolidations, and expedited air cargo during seasonal peaks.",
      icon: Sliders,
      accent: "text-purple-700 bg-purple-50 border-purple-200",
    },
    {
      title: "Technology-Driven Operations",
      description:
        "API-first architecture with instant ERP synchronization, automated e-Way Bill generation, and tamper-proof digital e-PODs.",
      icon: Cpu,
      accent: "text-blue-700 bg-blue-50 border-blue-200",
    },
    {
      title: "Scalable Infrastructure & Multi-Modal Reach",
      description:
        "Extensive terminal footprint across 48+ domestic gateways, 120+ cities, and 19,000+ PIN codes with integrated maritime ports.",
      icon: TrendingUp,
      accent: "text-amber-700 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
                alt="Shiv Shakti Logistics Operations"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

              {/* Floating Card Overlay 1 */}
              <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-xs space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-sky-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-sky-700" />
                    <span>Control Tower Active</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">24/7 Desk</span>
                </div>
                <div className="text-sm font-bold text-slate-900 pt-1">
                  650+ Active High-Speed Corridors
                </div>
                <p className="text-[11px] text-slate-600">
                  Continuous highway, airside, and maritime telemetry sync.
                </p>
              </div>

              {/* Floating Card Overlay 2 */}
              <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-bold">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Security Protocol</span>
                </div>
                <div className="text-sm font-bold text-slate-900 pt-1">
                  GPS Geofenced Digital Locks
                </div>
                <p className="text-[11px] text-slate-600">
                  Unlocking allowed only at designated verified recipient docks.
                </p>
              </div>
            </div>

            {/* Metrics underneath in light mode */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-bold font-mono text-sky-700">
                  {COMPANY.metrics.onTimeRate}
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">On-Time Linehaul SLA</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-bold font-mono text-orange-600">
                  Zero Loss
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Security Compliance SOP</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Benefits List */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
                <Shield className="w-3.5 h-3.5 text-sky-700" />
                <span>Enterprise Value Proposition</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Built Around Your <br />
                <span className="text-orange-600">
                  Supply Chain.
                </span>
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Logistics should be an accelerator for your enterprise, not a bottleneck. We replace manual friction, fragmented carriers, and visibility gaps with a high-velocity, disciplined logistics ecosystem.
              </p>
            </div>

            {/* Benefits Checklist in light mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`p-1.5 rounded-lg border ${b.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {b.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md shadow-slate-900/10"
              >
                <span>Learn About Our Fleet Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
