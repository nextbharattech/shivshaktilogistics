import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, ShoppingBag, Car, Factory, Store, ShieldAlert, Boxes, Laptop, Wrench } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industry Logistics Solutions",
  description:
    "Tailored supply chain workflows for Automotive, E-Commerce, Pharmaceuticals, Manufacturing, FMCG, Electronics, and Heavy Industrial sectors.",
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Car,
    Factory,
    Store,
    ShieldAlert,
    Boxes,
    Laptop,
    Wrench,
  };

  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-orange-600" />
            <span>Vertical Supply Chain Precision</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Specialized Logistics for{" "}
            <span className="text-orange-600">
              Every Industry.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Different commodities demand distinct handling SOPs. Discover how Shiv Shakti Logistics tailors linehauls, cold rooms, and customs pre-clearance to your sector.
          </p>
        </div>

        {/* Grid of Industries in clean light mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.iconName] || Briefcase;

            return (
              <div
                key={ind.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-5 hover:border-orange-400 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={ind.heroImage}
                      alt={ind.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/95 text-orange-700 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {ind.title}
                    </h2>
                    <p className="text-xs text-orange-600 font-semibold mt-0.5 line-clamp-1">
                      {ind.tagline}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-orange-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-between border border-slate-300 hover:border-orange-600 shadow-xs"
                  >
                    <span>View Sector Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
