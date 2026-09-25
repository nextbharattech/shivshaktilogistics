import React from "react";
import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { Calculator, ShieldCheck, Clock, PhoneCall } from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Commercial Freight Rate Calculator & Quote Request",
  description:
    "Request structured freight pricing for pan-India road linehauls, international air cargo, and ocean container shipping. Rapid response within 2-4 business hours.",
};

export default function QuotePage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2 text-orange-800 font-semibold">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>Commercial Pricing Desk Active — Committed Turnaround Within 2-4 Hours</span>
          </div>
          <a
            href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="text-slate-700 hover:text-orange-600 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-700" />
            <span>Direct Commercial Line: {COMPANY.contact.phone}</span>
          </a>
        </div>
      </div>

      <QuoteCalculator isStandalonePage={true} />
    </div>
  );
}
