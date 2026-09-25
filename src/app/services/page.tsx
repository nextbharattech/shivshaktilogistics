import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Truck, Plane, Ship, Warehouse, Zap, MapPin, Globe, Cpu, Layers } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ServiceSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Multi-Modal Freight & Logistics Services",
  description:
    "Explore Shiv Shakti Logistics 8 core disciplines: Road Freight FTL, Express Air Cargo, Ocean Container Shipping, Grade-A Warehousing, Last-Mile, and 4PL Supply Chain Management.",
};

export default function ServicesPage() {
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

  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <ServiceSchema />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-700" />
            <span>Comprehensive Freight Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Integrated Multi-Modal{" "}
            <span className="text-sky-700">
              Logistics Services.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From high-density highway linehauls to temperature-controlled air cargo charters and ocean container shipping, Shiv Shakti Logistics synchronizes every leg under single-contract accountability.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Truck;

            return (
              <div
                key={service.id}
                className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:border-sky-400 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 text-slate-900 font-mono text-xs font-bold shadow-sm">
                      {service.number}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          {service.title}
                        </h2>
                        <span className="text-xs font-mono text-orange-600 font-semibold">
                          {service.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Operational Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      {service.keyHighlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>Detailed Specs & SLAs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/quote?service=${service.slug}`}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors shadow-xs"
                      >
                        Request Rate for this Mode
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
