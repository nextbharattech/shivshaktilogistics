import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  Radio,
  Navigation2,
  FileCode,
  ShieldCheck,
  Server,
  Layers,
  Zap,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";
import { TechnologySection } from "@/components/TechnologySection";

export const metadata: Metadata = {
  title: "Supply Chain Technology & Telematics Platform",
  description:
    "Explore Shiv Shakti Logistics digital stack: IoT sensor telemetry, algorithmic corridor routing, electronic e-PODs, and enterprise ERP API integrations.",
};

export default function TechnologyPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Cpu className="w-3.5 h-3.5 text-sky-700" />
            <span>Digital Freight Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Logistics Powered by{" "}
            <span className="text-sky-700">
              Real-Time Intelligence.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminating blind spots across modern supply chains. Our platform unifies vehicle telemetry, cold-chain temperature sensors, customs databases, and ERP webhooks into a high-precision digital control tower.
          </p>
        </div>
      </div>

      <TechnologySection />

      {/* Enterprise API Architecture Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Connectivity Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Enterprise EDI & RESTful Integration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Connect our operational logistics engine directly to your SAP S/4HANA, Oracle Transportation Management (OTM), Microsoft Dynamics, or custom e-commerce backend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-sky-700 font-mono text-sm font-bold">
                EDI 204 / 214 / 990
              </div>
              <h3 className="text-sm font-bold text-slate-900">Standard Logistics EDI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated electronic tender dispatch, shipment status milestone pings, and booking confirmation without manual email exchanges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-orange-600 font-mono text-sm font-bold">
                RESTful & Webhooks
              </div>
              <h3 className="text-sm font-bold text-slate-900">Event-Driven Streaming</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated milestone updates triggered when containers pass geofenced toll gates, customs bond releases, or driver e-POD signatures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-emerald-700 font-mono text-sm font-bold">
                ICEGATE & Port Direct
              </div>
              <h3 className="text-sm font-bold text-slate-900">Regulatory Single Window</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct integration with Indian Customs and major port gate systems for instant Bill of Lading matching and terminal gate-in verification.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-600">
              Need technical documentation or sandbox API credentials?
            </span>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors"
            >
              <span>Contact Integration Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
