import React from "react";
import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Governance & Telematics Protection",
  description:
    "Privacy and data protection policy for Shiv Shakti Logistics & Supply Chain Solutions Pvt. Ltd.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800">
            <Shield className="w-3.5 h-3.5 text-sky-700" />
            <span>Data Protection Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-500">
            Effective Date: September 2026 | {COMPANY.legalName}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Overview</h2>
            <p>
              Shiv Shakti Logistics (&quot;we&quot;, &quot;our&quot;, or &quot;the Company&quot;) is committed to protecting the privacy, confidentiality, and security of enterprise clients, shippers, consignees, and website visitors. This Privacy Policy details how we collect, store, transmit, and safeguard operational telemetry, consignment information, and commercial data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Consignment Telematics & Fleet Data</h2>
            <p>
              In providing multimodal freight forwarding, surface transport, and air/ocean cargo services, we collect real-time operational data including fleet transit progress, temperature sensor logs, electronic seal verification, and digital Proof of Delivery (e-POD). This data is strictly utilized for consignment execution, transit visibility, and contractual SLA verification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Commercial Information We Collect</h2>
            <p>
              When requesting freight rate quotations or booking cargo, we collect business contact details (name, corporate email, phone, company name), cargo parameters, and invoice billing records. We do not sell or monetize client shipping patterns or transactional data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Regulatory Disclosure</h2>
            <p>
              Consignment manifests, e-Way bills, and customs declarations are shared exclusively with statutory authorities (such as Indian Customs ICEGATE, GST Network, Port Authorities, and DGCA) in full compliance with the Motor Vehicles Act, Customs Act, and applicable international maritime conventions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Contact Our Data Governance Officer</h2>
            <p>
              For inquiries regarding data retention, electronic POD retrieval, or API security protocols, please contact our legal desk at:{" "}
              <a href={`mailto:${COMPANY.contact.email}`} className="text-sky-700 underline font-semibold">
                {COMPANY.contact.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
