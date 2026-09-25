"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Radio,
  FileCode,
  LineChart,
  Navigation2,
  FileText,
  Bell,
  Lock,
  ArrowRight,
  Database,
  Layers,
  ShieldCheck,
} from "lucide-react";

export const TechnologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"telematics" | "routing" | "api" | "documentation">("telematics");

  const techFeatures = [
    {
      id: "telematics",
      title: "Real-Time Telematics & IoT Sensors",
      tagline: "Live temperature, speed, and electronic tamper detection.",
      icon: Radio,
      details: [
        "Continuous GPS pinging with dual-satellite backup",
        "Cold-chain temperature logging from -25°C to +25°C",
        "Geofenced electronic seal alerts for high-security cargo",
      ],
    },
    {
      id: "routing",
      title: "Algorithmic Route Optimization",
      tagline: "Dynamic corridor selection minimizing toll dwell and fuel.",
      icon: Navigation2,
      details: [
        "Dynamic recalculation based on real-time traffic bottlenecks",
        "Driver relay swap scheduling ensuring safety compliance",
        "Green corridor identification reducing carbon footprint",
      ],
    },
    {
      id: "api",
      title: "Enterprise ERP & API Integrations",
      tagline: "Direct connection with SAP, Oracle, Shopify, and custom TMS.",
      icon: Database,
      details: [
        "RESTful & Webhook-driven shipment milestone streaming",
        "Automated booking creation and digital label generation",
        "EDI 204, 214, and 990 standard logistics document exchange",
      ],
    },
    {
      id: "documentation",
      title: "Paperless Digital Documentation",
      tagline: "Automated e-Way Bills, e-PODs, and customs single window.",
      icon: FileText,
      details: [
        "Instant e-Way Bill renewal during long-haul interstate transit",
        "Geo-tagged photographic Proof of Delivery (e-POD)",
        "Direct ICEGATE integration for zero-delay customs clearance",
      ],
    },
  ];

  return (
    <section id="technology" className="py-24 bg-white relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Cpu className="w-3.5 h-3.5 text-sky-700" />
            <span>Intelligent Logistics Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Logistics Infrastructure Powered by{" "}
            <span className="text-sky-700">
              Precision Telemetry.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We bridge physical freight with intelligent software — providing live telematics, automated document generation, and single-pane visibility across all carrier modes.
          </p>
        </div>

        {/* Dashboard Preview in light mode */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          {/* Top Tech Pillar Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {techFeatures.map((feat) => {
              const isSelected = activeTab === feat.id;
              const Icon = feat.icon;

              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(feat.id as any)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-sky-600 shadow-md ring-1 ring-sky-600"
                      : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isSelected ? "text-slate-900" : "text-slate-800"
                      }`}
                    >
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {feat.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Console Simulation in clean light card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-slate-600 font-semibold">
                  ControlTower.telematics.liveStream [v4.2.1]
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>ALL SENSORS SYNCED (99.98% UPTIME)</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-slate-500 flex items-center justify-between font-bold">
                  <span>GPS LATENCY</span>
                  <span className="text-sky-700">0.84 SEC</span>
                </div>
                <div className="text-xl font-bold text-slate-900 font-sans">
                  Dual-Sat Inmarsat + 4G/5G
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full w-[94%]" />
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  Continuous location transmission across remote mountain & coastal passes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-slate-500 flex items-center justify-between font-bold">
                  <span>COLD-CHAIN PROBE</span>
                  <span className="text-emerald-700">+4.1°C OPTIMAL</span>
                </div>
                <div className="text-xl font-bold text-slate-900 font-sans">
                  Pharmaceutical SLA
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[98%]" />
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  Microprocessor probe with automated high/low variance threshold sirens.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-slate-500 flex items-center justify-between font-bold">
                  <span>DIGITAL TAMPER SENSOR</span>
                  <span className="text-orange-700">ACTIVE & ARMED</span>
                </div>
                <div className="text-xl font-bold text-slate-900 font-sans">
                  Geo-Fence Locked
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full w-[100%]" />
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  Electronic container seal unlocked exclusively via recipient OTP at destination dock.
                </p>
              </div>
            </div>

            {/* Code / API Payload Snippet in crisp light format */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto shadow-sm">
              <div className="text-slate-400 pb-2">// Sample Live Event Webhook (JSON)</div>
              <pre className="text-sky-300">
{`{
  "event": "shipment.telemetry.milestone",
  "consignment_id": "SSL-8924-IN",
  "vehicle_plate": "DL-01-AX-9942",
  "coordinates": { "lat": 21.1702, "lng": 72.8311 },
  "speed_kmh": 64.2,
  "cargo_temp_c": 28.1,
  "e_seal_integrity": "SECURED_GEO_LOCKED",
  "status": "IN_TRANSIT"
}`}
              </pre>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-600 font-medium">
              Interested in integrating freight status webhooks into your enterprise ERP?
            </div>
            <Link
              href="/technology"
              className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>Explore Platform Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
