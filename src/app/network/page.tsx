import React from "react";
import type { Metadata } from "next";
import { GlobalNetwork } from "@/components/GlobalNetwork";
import { Globe, MapPin, Truck, Anchor, Plane } from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Pan-India & Global Logistics Network",
  description:
    "Explore Shiv Shakti Logistics network spanning 48+ domestic gateways, 650+ high-density linehaul routes, container ports, and international air corridors.",
};

export default function NetworkPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Globe className="w-3.5 h-3.5 text-sky-700" />
            <span>Infrastructure Footprint</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Trade Corridors &{" "}
            <span className="text-orange-600">
              Logistics Network.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Connecting industrial manufacturing centers, key inland container depots (ICDs), major sea ports like JNPT and Mundra, and major airport air cargo complexes.
          </p>
        </div>
      </div>

      <GlobalNetwork />

      {/* Strategic Hub Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-sky-600 pl-3">
          Primary Regional Gateway Terminals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY.branches.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-700" />
                  <span>{b.city}</span>
                </h3>
                {b.isPrimary && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 font-bold">
                    HQ
                  </span>
                )}
              </div>
              <div className="text-xs text-orange-600 font-semibold font-mono">
                {b.type}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {b.address}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                Direct Dispatch: <span className="text-slate-900 font-semibold">{b.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
