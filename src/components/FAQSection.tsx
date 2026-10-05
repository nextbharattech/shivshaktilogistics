"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/faq";
import { FAQSchema } from "./StructuredData";

/* Show only the first 4 FAQs, no search / no filters */
const VISIBLE_FAQS = FAQS.slice(0, 4);

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(VISIBLE_FAQS[0].id);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? "" : id));

  return (
    <section
      id="faq"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/contianer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <FAQSchema />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-px bg-orange-400" />
            Got Questions?
            <span className="inline-block w-5 h-px bg-orange-400" />
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently{" "}
            <span className="text-orange-400">Asked</span> Questions
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
            Quick answers about our freight, customs, and logistics services.
          </p>
        </div>

        {/* Accordion — single open at a time */}
        <div className="flex flex-col gap-3">
          {VISIBLE_FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-orange-400/60 bg-white/10 backdrop-blur-sm"
                    : "border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  {/* Number badge */}
                  <span
                    className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? "bg-orange-500 text-white"
                        : "bg-white/10 text-slate-400 group-hover:bg-white/20"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <span
                    className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-white" : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-orange-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-white/10">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

