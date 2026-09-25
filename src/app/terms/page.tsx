import React from "react";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Service & Carriage Conditions",
  description:
    "Standard terms of carriage, freight liability, and bill of lading conditions for Shiv Shakti Logistics.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800">
            <FileText className="w-3.5 h-3.5 text-sky-700" />
            <span>Standard Conditions of Carriage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-500">
            Governing All Surface, Ocean, and Air Consignments | {COMPANY.legalName}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Scope of Agreement</h2>
            <p>
              All bookings, consignments, warehousing arrangements, and freight forwarding executed by Shiv Shakti Logistics are governed by these Terms of Carriage, the respective Air Waybill (AWB), Multimodal Transport Document (MTD), or Consignment Note (Lorry Receipt / LR).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Consignor Declarations & Packing Standards</h2>
            <p>
              The shipper warrants that cargo presented for transportation is properly described, labeled, packaged to withstand ordinary transit rigors, and accompanied by valid statutory e-Way Bills, invoices, and necessary tax documentation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Carriage Liability & Marine Insurance</h2>
            <p>
              Our carrier liability is limited as specified under the Carriage by Road Act 2007, Carriage by Air Act, and Multimodal Transportation of Goods Act. Shippers are strongly advised to secure comprehensive Institute Cargo Clauses (All-Risk) marine insurance covering the full commercial value of consignments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Payment Terms & Demurrage</h2>
            <p>
              Freight charges, terminal handling charges (THC), detention, and applicable customs duties must be discharged within agreed credit terms. Failure to clear destination delivery within free-time periods incurs statutory warehouse demurrage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Governing Law & Jurisdiction</h2>
            <p>
              These conditions and any dispute arising hereunder shall be construed in accordance with the laws of India and subject to the exclusive jurisdiction of the competent courts in New Delhi / Gurugram.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
