import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building,
  Target,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Truck,
} from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us | Infrastructure, Values & Leadership",
  description:
    "Learn about Shiv Shakti Logistics — our vision, multi-modal infrastructure, driver safety protocols, and mission to deliver transparent logistics for enterprises.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Building className="w-3.5 h-3.5 text-sky-700" />
            <span>Company Profile & Identity</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built On Trust. <br />
            <span className="text-orange-600">
              Driven by Speed & Precision.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Shiv Shakti Logistics was founded with a clear directive: eliminate the friction, opacity, and fragmentation that historically characterized freight transportation across industrial corridors.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
              alt="Shiv Shakti Logistics Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              Modern Supply Chain Infrastructure for a Rapidly Growing Economy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We operate an expansive network of dedicated linehaul assets, audited fleet partners, Grade-A automated fulfillment hubs, and licensed customs brokerage offices.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rather than acting merely as truck brokers, our teams operate as embedded logistics engineers. We design round-the-clock relay corridors, integrate milestone notifications directly with enterprise ERPs, and enforce stringent cargo security SOPs.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xl font-bold font-mono text-sky-700">
                  {COMPANY.metrics.domesticHubs}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">Primary Gateways</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xl font-bold font-mono text-orange-600">
                  {COMPANY.metrics.onTimeRate}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">On-Time Linehaul SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Operational Values */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
              Our Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              The Four Pillars of Shiv Shakti
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-800 border border-sky-200 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Absolute Integrity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero pilferage, tamper-proof electronic seals, and transparent billing without hidden handling charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-800 border border-orange-200 w-fit">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Linehaul Punctuality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Driver relay handoffs and proactive corridor routing ensure your production docks never face line stoppages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-800 border border-sky-200 w-fit">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Technological Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time operational telemetry, cold-chain temperature logs, and automated milestones streamed directly into your systems.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 w-fit">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Driver Welfare & Safety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mandatory rest periods, ergonomic cabins, defensive driving certifications, and comprehensive healthcare coverage.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              Partner with a Logistics Team That Takes Your SLA Seriously
            </h3>
            <p className="text-xs text-slate-300">
              Speak directly with an enterprise logistics director today.
            </p>
          </div>
          <Link
            href="/quote"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            Request Rate Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
