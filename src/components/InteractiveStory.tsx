"use client";

import React, { useState } from "react";
import {
  Warehouse,
  Truck,
  Compass,
  Plane,
  Anchor,
  Ship,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface StoryStep {
  id: string;
  stepNumber: string;
  badge:
    | "PICKUP"
    | "IN TRANSIT"
    | "CUSTOMS"
    | "WAREHOUSE"
    | "OUT FOR DELIVERY"
    | "DELIVERED";
  badgeColor: string;
  stageTitle: string;
  locationNode: string;
  description: string;
  protocol: string;
  icon: React.ElementType;
  image: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    badge: "PICKUP",
    badgeColor: "text-amber-800 bg-amber-50 border-amber-200",
    stageTitle: "Smart Factory Pickup & Verification",
    locationNode: "Delhi NCR Origin Warehouse",
    description:
      "Cargo is inspected, barcoded, weighed, and matched against digital purchase orders before loading onto dedicated linehaul assets.",
    protocol:
      "Barcoding 100% | Digital Weighbridge Match | Electronic Seal Armed",
    icon: Warehouse,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "step-2",
    stepNumber: "02",
    badge: "IN TRANSIT",
    badgeColor: "text-sky-800 bg-sky-50 border-sky-200",
    stageTitle: "National Highway Green Corridor",
    locationNode: "Delhi → Mumbai Golden Quadrilateral",
    description:
      "Containerized linehauls utilize automated RFID fast tags and dual-driver relay protocols to ensure unbroken 24/7 wheel rotation.",
    protocol: "Dual-Driver Relay | Geofence Locked | Telematics Speed 62 km/h",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "step-3",
    stepNumber: "03",
    badge: "CUSTOMS",
    badgeColor: "text-orange-800 bg-orange-50 border-orange-200",
    stageTitle: "Airport & Maritime Gateway Bonded Clearance",
    locationNode: "Mumbai JNPT Port & IGI Air Cargo Terminal",
    description:
      "Licensed Customs House Agents (CHA) execute pre-arrival filings, X-ray scanning, and shipping bill generation with zero dwell time.",
    protocol: "ICEGATE Single Window | AEO Green Channel | Pre-Arrival Cleared",
    icon: Anchor,
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "step-4",
    stepNumber: "04",
    badge: "IN TRANSIT",
    badgeColor: "text-blue-800 bg-blue-50 border-blue-200",
    stageTitle: "Air Cargo & Maritime International Lane",
    locationNode: "Dubai Jebel Ali → Singapore → London Gateway",
    description:
      "Ocean container vessels and scheduled air freighters bridge international trade corridors with satellite-linked telemetry tracking.",
    protocol:
      "AIS Satellite Tracking | Scheduled Freighters | Active Reefer Temp 4.0°C",
    icon: Ship,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "step-5",
    stepNumber: "05",
    badge: "WAREHOUSE",
    badgeColor: "text-purple-800 bg-purple-50 border-purple-200",
    stageTitle: "Regional Cross-Dock & Automated Sorting",
    locationNode: "Regional Distribution Center (DC)",
    description:
      "Arrival at destination hub. High-speed cross-dock sorting breaks down consignments into localized route clusters within 90 minutes.",
    protocol:
      "Automated Conveyor Sort | SKU Verification | Dispatch Manifest Printed",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "step-6",
    stepNumber: "06",
    badge: "OUT FOR DELIVERY",
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
    stageTitle: "Urban Last-Mile & Doorstep Handover",
    locationNode: "Destination Plant / Store Dock / Facility",
    description:
      "Electric cargo vans and specialized delivery trucks complete delivery with recipient OTP authentication, photographic proof, and instant e-POD.",
    protocol:
      "Dynamic Route Density | OTP Geo-Lock Verified | Signed e-POD Archived",
    icon: CheckCircle2,
    image:
      "https://images.unsplash.com/photo-1549194388-f61be84a6e9e?q=80&w=1200&auto=format&fit=crop",
  },
];

export const InteractiveStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STORY_STEPS[activeStepIndex];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-3">
            <Compass className="w-3.5 h-3.5 text-sky-700" />
            <span>Interactive Logistics Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            From First Mile to Final Mile.{" "}
            <span className="text-orange-600">Every Stage Managed.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Witness how your cargo travels seamlessly through our integrated
            multimodal supply chain network — coordinated with disciplined
            execution and precision timing.
          </p>

          {/* Interactive Global Trade Corridor Route String */}
          {/* <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-orange-600 font-bold">Active Global Corridor:</span>
            <span className="text-slate-900 font-bold">Delhi</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-900 font-bold">Mumbai</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-900 font-bold">Dubai</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-900 font-bold">Singapore</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-900 font-bold">London</span>
          </div> */}
        </div>

        {/* Step Navigation Tabs in clean white */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-10">
          {STORY_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl text-left transition-all duration-150 border flex flex-col justify-between ${
                  isCurrent
                    ? "bg-white border-sky-600 shadow-md ring-1 ring-sky-600"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isCurrent ? "text-sky-700" : "text-slate-400"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? "text-orange-600" : "text-slate-400"
                    }`}
                  />
                </div>
                <div
                  className={`text-xs font-bold line-clamp-1 ${
                    isCurrent ? "text-slate-900" : "text-slate-700"
                  }`}
                >
                  {step.stageTitle.split(" ")[0]}{" "}
                  {step.stageTitle.split(" ")[1]}
                </div>
                <span
                  className={`mt-1.5 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded border self-start font-semibold ${step.badgeColor}`}
                >
                  {step.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Card Showcase in clean white */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          {/* Left Visual */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200">
            <img
              src={activeStep.image}
              alt={activeStep.stageTitle}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider border shadow-md bg-white ${activeStep.badgeColor}`}
              >
                STAGE: {activeStep.badge}
              </span>
            </div>

            {/* Bottom Location Indicator */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
              <div className="text-xs text-slate-500 font-mono">
                Location Waypoint:
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                <activeStep.icon className="w-4 h-4 text-sky-700" />
                <span>{activeStep.locationNode}</span>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold font-mono text-sky-700">
                {activeStep.stepNumber}
              </span>
              <div className="h-4 w-[1px] bg-slate-300" />
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${activeStep.badgeColor}`}
              >
                {activeStep.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {activeStep.stageTitle}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {activeStep.description}
            </p>

            {/* Protocol Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-mono text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-sky-700" />
                <span>Operational Discipline</span>
              </div>
              <p className="text-xs font-mono text-slate-700">
                {activeStep.protocol}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    prev > 0 ? prev - 1 : STORY_STEPS.length - 1,
                  )
                }
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Previous Step
              </button>
              <button
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    prev < STORY_STEPS.length - 1 ? prev + 1 : 0,
                  )
                }
                className="px-5 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
