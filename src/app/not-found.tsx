import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-white text-slate-900">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-100 border border-slate-200 text-orange-600 shadow-sm">
          <Compass className="w-10 h-10 animate-spin" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-800 uppercase tracking-widest font-bold">
            HTTP 404 — Waypoint Not Located
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Lost in the Freight Network?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            The page or cargo route you requested could not be traced. Return to our main portal or browse our services catalog.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            Return to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-orange-600" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
