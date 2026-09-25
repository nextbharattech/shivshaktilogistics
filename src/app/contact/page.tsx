import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "@/data/company";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us & Regional Freight Terminals",
  description:
    "Get in touch with Shiv Shakti Logistics national dispatch desk or contact regional gateway offices in Delhi NCR, Mumbai, Gujarat, Bengaluru, Chennai, and Kolkata.",
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.legalName,
    telephone: COMPANY.contact.phone,
    email: COMPANY.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.headquarters.address,
      addressLocality: COMPANY.headquarters.city,
      addressRegion: COMPANY.headquarters.state,
      postalCode: COMPANY.headquarters.postalCode,
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 00:00-24:00",
  };

  return (
    <div className="pt-28 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Building className="w-3.5 h-3.5 text-sky-700" />
            <span>24/7 National Operations Control</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connect With Our <br />
            <span className="text-orange-600">
              Freight Operations Desk.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether booking urgent factory dispatches, bidding for corporate freight tenders, or connecting with regional gateway managers — our control tower is on call 24 hours a day.
          </p>
        </div>

        {/* Contact Information & Interactive Direct Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                Primary Direct Channels
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Headquarters:</div>
                    <div className="text-slate-900 font-semibold mt-0.5">
                      {COMPANY.headquarters.address}, {COMPANY.headquarters.city}, {COMPANY.headquarters.state} - {COMPANY.headquarters.postalCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Dispatch Phone:</div>
                    <a
                      href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-slate-900 font-semibold hover:text-sky-700 transition-colors block mt-0.5"
                    >
                      {COMPANY.contact.phone}
                    </a>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">
                      Toll-Free: {COMPANY.contact.tollFree}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Email Enquiries:</div>
                    <a
                      href={`mailto:${COMPANY.contact.email}`}
                      className="text-slate-900 font-semibold hover:text-sky-700 transition-colors block mt-0.5"
                    >
                      {COMPANY.contact.email}
                    </a>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Operations: {COMPANY.contact.supportEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">WhatsApp Priority Desk:</div>
                    <a
                      href={`https://wa.me/${COMPANY.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors block mt-0.5"
                    >
                      {COMPANY.contact.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Operations Hours:</div>
                    <div className="text-slate-900 font-semibold mt-0.5">
                      {COMPANY.operatingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100 mb-6">
              Send an Operations Message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Regional Hub Terminals Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-orange-500 pl-3">
            Regional Branch Gateways
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY.branches.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>{b.city}</span>
                  </h3>
                  {b.isPrimary && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 font-bold">
                      Corporate HQ
                    </span>
                  )}
                </div>

                <div className="text-xs text-sky-700 font-semibold font-mono">
                  {b.type}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.address}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs font-mono text-slate-500">
                  <div>Phone: <span className="text-slate-900 font-semibold">{b.phone}</span></div>
                  <div>Email: <span className="text-sky-700 font-semibold">{b.email}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
