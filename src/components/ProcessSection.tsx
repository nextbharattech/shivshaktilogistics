"use client";

import React from "react";
import {
  FileText,
  Compass,
  Truck,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Request",
      subtitle: "Instant Enquiry & Cargo Profiling",
      desc: "Submit your cargo specs, weight, pickup location, and delivery deadline via our digital rate calculator or dedicated desk.",
      icon: FileText,
      tag: "Sub-2h Rate Quote",
    },
    {
      num: "02",
      title: "Plan",
      subtitle: "Corridor & Asset Allocation",
      desc: "Our logistics engineers match your cargo with optimal transport modes (FTL, Air Cargo, Ocean FCL) and generate digital e-Way Bills.",
      icon: Compass,
      tag: "Multi-Modal Modeling",
    },
    {
      num: "03",
      title: "Move",
      subtitle: "Dispatch & High-Speed Linehaul",
      desc: "GPS-locked containerized trucks or chartered aircraft deploy on scheduled corridors with dual-driver relay rotations.",
      icon: Truck,
      tag: "Green Express Lanes",
    },
    {
      num: "04",
      title: "Monitor",
      subtitle: "24/7 Operations & Control Tower",
      desc: "Centralized control tower monitors transit progress, temperature logging, geofenced alerts, and milestone updates.",
      icon: Eye,
      tag: "Active Control Tower",
    },
    {
      num: "05",
      title: "Deliver",
      subtitle: "Verified Handover & Digital e-POD",
      desc: "Doorstep or dock delivery verified via recipient OTP authentication and high-resolution photo POD uploaded instantly to your dashboard.",
      icon: CheckCircle2,
      tag: "Digital POD Confirmed",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Compass className="w-3.5 h-3.5 text-sky-700" />
            <span>Disciplined Execution Framework</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How Your Freight Moves.{" "}
            <span className="text-orange-600">
              Five Seamless Steps.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600">
            A standardized, automated, and audited logistics workflow ensuring precision from commercial quotation to recipient factory dock signature.
          </p>
        </div>

        {/* 5-Step Process in clean white cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-sky-700 group-hover:text-orange-600 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-sky-50 group-hover:text-sky-700 border border-slate-200 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-mono text-orange-600 font-bold mt-0.5">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
