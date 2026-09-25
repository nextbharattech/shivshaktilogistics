"use client";

import React, { useState } from "react";
import {
  Globe,
  Anchor,
  Plane,
  Truck,
  Building2,
  Navigation,
  Compass,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { NETWORK_NODES, NETWORK_ROUTES, NetworkNode, NetworkRoute } from "@/data/network";
import { COMPANY } from "@/data/company";

export const GlobalNetwork: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "road" | "air" | "ocean">("all");
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(NETWORK_NODES[0]);

  const filteredRoutes =
    activeFilter === "all"
      ? NETWORK_ROUTES
      : NETWORK_ROUTES.filter((r) => r.mode === activeFilter);

  return (
    <section id="network" className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
              <Globe className="w-3.5 h-3.5 text-sky-700" />
              <span>Pan-India & Global Corridors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connected Infrastructure.{" "}
              <span className="text-orange-600">
                Every Port & Highway.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Direct linehauls linking major domestic production centers to key international maritime gateways and air freight hubs.
            </p>
          </div>

          {/* Mode Switchers */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                activeFilter === "all"
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Lanes ({NETWORK_ROUTES.length})
            </button>
            <button
              onClick={() => setActiveFilter("road")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all duration-150 ${
                activeFilter === "road"
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Surface Linehauls</span>
            </button>
            <button
              onClick={() => setActiveFilter("ocean")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all duration-150 ${
                activeFilter === "ocean"
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Anchor className="w-3.5 h-3.5" />
              <span>Ocean Lanes</span>
            </button>
            <button
              onClick={() => setActiveFilter("air")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all duration-150 ${
                activeFilter === "air"
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Air Corridors</span>
            </button>
          </div>
        </div>

        {/* Network Canvas & Hub Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Canvas Visualizer (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-sky-800 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-sky-700" />
                  <span>Interactive Route Canvas</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500">Click any waypoint node to inspect facility</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Mercator Grid / High-Speed Corridors
              </div>
            </div>

            {/* Stylized Light Map SVG Canvas */}
            <div className="relative aspect-[16/9] w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
              <div className="absolute inset-0 bg-tech-grid opacity-70" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Road Gradient */}
                  <linearGradient id="road-lane-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>

                  {/* Ocean Gradient */}
                  <linearGradient id="ocean-lane-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>

                  {/* Air Gradient */}
                  <linearGradient id="air-lane-light" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>

                {/* Connecting Routes */}
                {filteredRoutes.map((route) => {
                  const orig = NETWORK_NODES.find((n) => n.id === route.originId);
                  const dest = NETWORK_NODES.find((n) => n.id === route.destinationId);
                  if (!orig || !dest) return null;

                  const midX = (orig.coordinates.x + dest.coordinates.x) / 2;
                  const midY = (orig.coordinates.y + dest.coordinates.y) / 2 - 6;

                  const strokeColor =
                    route.mode === "air"
                      ? "url(#air-lane-light)"
                      : route.mode === "ocean"
                      ? "url(#ocean-lane-light)"
                      : "url(#road-lane-light)";

                  const strokeWidth = route.mode === "road" ? 1.0 : 0.8;
                  const dashPattern = route.mode === "air" ? "1 1" : "2 1";

                  return (
                    <g key={route.id} className="transition-all hover:opacity-100">
                      <path
                        d={`M ${orig.coordinates.x} ${orig.coordinates.y} Q ${midX} ${midY} ${dest.coordinates.x} ${dest.coordinates.y}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashPattern}
                        className="animate-route-dash"
                      />
                    </g>
                  );
                })}

                {/* Waypoint Nodes */}
                {NETWORK_NODES.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isIndia = node.country === "India";

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer group"
                    >
                      {isSelected && (
                        <circle
                          cx={node.coordinates.x}
                          cy={node.coordinates.y}
                          r="4"
                          fill="none"
                          stroke={isIndia ? "#0284C7" : "#EA580C"}
                          strokeWidth="0.8"
                          className="animate-ping"
                        />
                      )}

                      <circle
                        cx={node.coordinates.x}
                        cy={node.coordinates.y}
                        r={isSelected ? "2.6" : "1.8"}
                        fill={isIndia ? "#0284C7" : "#EA580C"}
                        stroke="#ffffff"
                        strokeWidth="0.6"
                        className="transition-all duration-200 group-hover:scale-125"
                      />

                      <text
                        x={node.coordinates.x + 2}
                        y={node.coordinates.y + 0.5}
                        fontSize="2.4"
                        fontWeight={isSelected ? "bold" : "600"}
                        fill={isSelected ? "#0F172A" : "#475569"}
                        className="font-sans select-none pointer-events-none"
                      >
                        {node.name.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend in light mode */}
              <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-white/95 border border-slate-200 shadow-sm text-[10px] font-mono flex items-center gap-3">
                <span className="flex items-center gap-1 text-sky-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-sky-600" /> Domestic Hub
                </span>
                <span className="flex items-center gap-1 text-orange-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-600" /> Global Gateway
                </span>
                <span className="flex items-center gap-1 text-blue-700 font-bold">
                  <span className="w-3 h-0.5 bg-blue-600" /> Ocean / Sea Lane
                </span>
              </div>
            </div>
          </div>

          {/* Node Inspector Card in clean white (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {selectedNode ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 uppercase font-bold tracking-wider">
                    {selectedNode.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{selectedNode.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedNode.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    Territory: <strong className="text-slate-800">{selectedNode.country}</strong>
                  </div>
                </div>

                {/* Capabilities list */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Terminal & Hub Capabilities:
                  </div>
                  <div className="space-y-1.5">
                    {selectedNode.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-700 flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associated Linehauls */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-mono text-slate-500 font-semibold mb-2">
                    Direct Linehauls from this Terminal:
                  </div>
                  <div className="space-y-1.5">
                    {NETWORK_ROUTES.filter(
                      (r) => r.originId === selectedNode.id || r.destinationId === selectedNode.id
                    )
                      .slice(0, 3)
                      .map((r) => (
                        <div
                          key={r.id}
                          className="text-[11px] text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
                        >
                          <span className="truncate pr-2 font-medium">{r.name}</span>
                          <span className="text-sky-700 font-mono font-bold flex-shrink-0">
                            {r.transitTime}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Network Infrastructure Summary */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Enterprise Linehaul Allocation
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated container fleets, reefer linehauls, and commercial air cargo capacity deployed across 48+ primary hubs.
              </p>
              <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">{COMPANY.metrics.fleetPartners}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Fleet Partners</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-sky-700">{COMPANY.metrics.activeRoutes}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Route Corridors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
