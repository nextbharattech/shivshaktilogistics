"use client";

import React, { useState } from "react";
import { Truck, Anchor, Plane, ChevronDown, ChevronUp } from "lucide-react";
import { NetworkRoute } from "@/data/network";

const MODE_CONFIG = {
  road: {
    icon: Truck,
    label: "Surface",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
  },
  ocean: {
    icon: Anchor,
    label: "Ocean",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  air: {
    icon: Plane,
    label: "Air",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
  },
};

interface Props {
  routes: NetworkRoute[];
}

export const NetworkRouteTable: React.FC<Props> = ({ routes }) => {
  const [filter, setFilter] = useState<"all" | "road" | "ocean" | "air">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? routes : routes.filter((r) => r.mode === filter);

  const counts = {
    all: routes.length,
    road: routes.filter((r) => r.mode === "road").length,
    ocean: routes.filter((r) => r.mode === "ocean").length,
    air: routes.filter((r) => r.mode === "air").length,
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "road", "ocean", "air"] as const).map((f) => {
          const Icon =
            f === "road" ? Truck : f === "ocean" ? Anchor : f === "air" ? Plane : null;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filter === f
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span className="capitalize">{f === "all" ? "All Routes" : f === "road" ? "Surface" : f === "ocean" ? "Ocean" : "Air"}</span>
              <span
                className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                  filter === f ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-slate-900 text-white text-[11px] font-mono uppercase tracking-wider">
          <div className="col-span-1">Mode</div>
          <div className="col-span-4">Route Name</div>
          <div className="col-span-3">Transit Time</div>
          <div className="col-span-3">Frequency</div>
          <div className="col-span-1" />
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((route) => {
            const cfg = MODE_CONFIG[route.mode];
            const Icon = cfg.icon;
            const isOpen = expanded === route.id;

            return (
              <div key={route.id} className="bg-white">
                <button
                  className="w-full text-left"
                  onClick={() => setExpanded(isOpen ? null : route.id)}
                >
                  <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-slate-50 transition-colors">
                    {/* Mode badge */}
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${cfg.color}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{cfg.label}</span>
                      </span>
                    </div>

                    {/* Name */}
                    <div className="col-span-8 md:col-span-4">
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        {route.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        {route.corridorType}
                      </div>
                    </div>

                    {/* Transit */}
                    <div className="hidden md:block col-span-3">
                      <div className="text-sm font-bold text-slate-900 font-mono">
                        {route.transitTime}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Transit Time</div>
                    </div>

                    {/* Frequency */}
                    <div className="hidden md:block col-span-3">
                      <div className="text-xs text-slate-700 font-medium">{route.frequency}</div>
                    </div>

                    {/* Expand */}
                    <div className="col-span-2 md:col-span-1 flex justify-end">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-4 bg-slate-50 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Transit Time</div>
                        <div className="text-sm font-bold text-slate-900 font-mono">{route.transitTime}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Frequency</div>
                        <div className="text-sm font-semibold text-slate-900">{route.frequency}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Corridor Type</div>
                        <div className="text-sm text-slate-700">{route.corridorType}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-400 font-mono text-right">
        Showing {filtered.length} of {routes.length} scheduled corridors
      </div>
    </div>
  );
};
