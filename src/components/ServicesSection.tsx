"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Plane,
  Ship,
  Warehouse,
  Zap,
  MapPin,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { SERVICES, ServiceItem } from "@/data/services";

export const ServicesSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const iconMap: Record<string, React.ElementType> = {
    Truck,
    Plane,
    Ship,
    Warehouse,
    Zap,
    MapPin,
    Globe,
    Cpu,
  };

  const filteredServices =
    selectedFilter === "all"
      ? SERVICES
      : SERVICES.filter((s) => {
          if (selectedFilter === "surface") return s.id.includes("road") || s.id.includes("express") || s.id.includes("last-mile");
          if (selectedFilter === "global") return s.id.includes("air") || s.id.includes("ocean") || s.id.includes("freight-forwarding");
          if (selectedFilter === "enterprise") return s.id.includes("warehousing") || s.id.includes("supply-chain");
          return true;
        });

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800 mb-3">
              <Layers className="w-3.5 h-3.5 text-orange-600" />
              <span>Multi-Modal Service Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineered For Speed.{" "}
              <span className="text-sky-700">
                Scaled For Reliability.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Eight comprehensive logistics disciplines harmonized under a single SLA and unified operational accountability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                selectedFilter === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Services (8)
            </button>
            <button
              onClick={() => setSelectedFilter("surface")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                selectedFilter === "surface"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Surface & Express
            </button>
            <button
              onClick={() => setSelectedFilter("global")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                selectedFilter === "global"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Global Air & Ocean
            </button>
            <button
              onClick={() => setSelectedFilter("enterprise")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                selectedFilter === "enterprise"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Warehousing & 4PL
            </button>
          </div>
        </div>

        {/* Services Cards Grid in pure white with subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || Truck;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Header with subtle zoom on hover */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top Number & Category Tag */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-sm">
                      {service.number}
                    </span>
                    <div className="p-2 rounded-xl bg-white/95 text-sky-700 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors duration-200">
                      {service.shortTitle}
                    </h3>
                    <p className="text-xs text-orange-600 font-semibold mt-1 line-clamp-1">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Key highlight bullet points */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {service.keyHighlights.slice(0, 2).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-700 flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-sky-700 hover:text-white text-slate-800 text-xs font-bold transition-all duration-200 flex items-center justify-between group/btn border border-slate-200 hover:border-sky-700"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Consultation in crisp light */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Require a Custom Multi-Modal Solution or Dedicated Contract Fleet?
            </h4>
            <p className="text-xs text-slate-600">
              Our enterprise logistics engineers design tailored route corridors and dedicated fleet allocations.
            </p>
          </div>
          <Link
            href="/quote"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-500/20 whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            Speak With Solution Engineer
          </Link>
        </div>
      </div>
    </section>
  );
};
