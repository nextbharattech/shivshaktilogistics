"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calculator, MessageSquare, Layers } from "lucide-react";
import { COMPANY } from "@/data/company";

export const MobileQuickBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-4 gap-2">
        <Link
          href="/quote"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 active:scale-95 transition-transform"
        >
          <Calculator className="w-4 h-4 mb-0.5 text-orange-600" />
          <span className="text-[10px] font-bold tracking-tight">Quote</span>
        </Link>

        <Link
          href="/services"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 active:scale-95 transition-transform"
        >
          <Layers className="w-4 h-4 mb-0.5 text-sky-600" />
          <span className="text-[10px] font-bold tracking-tight">Services</span>
        </Link>

        <a
          href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5 text-emerald-600" />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        <a
          href={`https://wa.me/${COMPANY.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Shiv%20Shakti%20Logistics%2C%20I%20would%20like%20to%20enquire%20about%20freight%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-600" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
