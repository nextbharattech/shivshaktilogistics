import React from "react";
import type { Metadata } from "next";
import { GlobalNetwork } from "@/components/GlobalNetwork";
import { Globe, MapPin, Truck, Anchor, Plane, Train, ShieldCheck, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Pan-India & Global Logistics Network",
  description:
    "Explore Shiv Shakti Logistics network spanning 48+ domestic gateways, 650+ high-density linehaul routes, Indian Railways Dedicated Freight Corridors (DFC), container ports, and international air corridors.",
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
            <span className="text-orange-600">Logistics Network.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Connecting industrial manufacturing centers, Indian Railways Dedicated Freight Corridors (WDFC & EDFC), key inland container
            depots (ICDs), major sea ports like JNPT and Mundra, and major airport air cargo complexes.
          </p>
        </div>
      </div>

      <GlobalNetwork />

      {/* Dedicated Indian Railways & Rail Freight Corridors Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
                <Train className="w-3.5 h-3.5 text-emerald-700" />
                <span>Bharatiya Rail & DFC Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Indian Railways & Multi-Modal Rail Terminals
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Operating heavy-haul rakes, leased parcel vans, and container train operations (CTO) linking Northern industrial belts directly to western & eastern seaports.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                68+ Railway Divisions Connected
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Train className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Dedicated Freight Corridors (DFC)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fast-track double-stack container rakes running on Western DFC (Dadri ⇄ Mundra / JNPT) and heavy-haul Eastern DFC (Ludhiana ⇄ Dankuni) reducing long-haul transit times by up to 50%.
              </p>
              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Sub-24h Dadri to Gujarat ports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Double-stack high-cube clearance</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Inland Container Depots (ICD) Siding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct rail sidings into major inland dry ports including ICD Dadri, Rewari, Tughlakabad, Khatuwas, and Whitefield for customs clearance without highway delays.
              </p>
              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>Customs bonded port transfers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>Direct CFS & port rail coordination</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Parcel Cargo Express (PCET)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Time-tabled parcel trains with leased VPUs running on Golden Quadrilateral tracks for high-volume commercial shipments, e-commerce cartons, and industrial auto components.
              </p>
              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span>24/7 CRIS / FOIS live wagon status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span>Weather-proof locked steel rakes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <p className="text-xs text-black-600 leading-relaxed font-bold">
                {b.address}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-black-500 font-bold">
                Phone:{" "}
                <span className="text-slate-900 font-semibold">{b.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
