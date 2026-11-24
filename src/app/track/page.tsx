"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Package,
  Truck,
  Train,
  Plane,
  Ship,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Printer,
  Share2,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import { api } from "@/lib/api";

const statusSteps = [
  { key: "PICKUP", label: "Booked / Pickup" },
  { key: "IN_TRANSIT", label: "In Transit" },
  { key: "ARRIVED", label: "Arrived at Destination Hub" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

function getStatusStepIndex(status: string): number {
  switch (status) {
    case "PENDING_APPROVAL":
      return 0;
    case "PICKUP":
      return 1;
    case "IN_TRANSIT":
      return 2;
    case "ARRIVED":
      return 3;
    case "OUT_FOR_DELIVERY":
      return 4;
    case "DELIVERED":
      return 5;
    default:
      return 1;
  }
}

function ModeIcon({ mode }: { mode?: string }) {
  const m = (mode || "").toUpperCase();
  if (m === "TRAIN") return <Train className="w-5 h-5 text-emerald-600" />;
  if (m === "AIR") return <Plane className="w-5 h-5 text-sky-600" />;
  if (m === "SEA") return <Ship className="w-5 h-5 text-blue-600" />;
  return <Truck className="w-5 h-5 text-orange-600" />;
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const [awbInput, setAwbInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchTracking = async (awb: string) => {
    if (!awb || !awb.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.tracking.track(awb.trim());
      if (res.success && res.data) {
        setTrackingData(res.data);
      } else {
        setError(res.message || "No shipment found for this AWB number.");
        setTrackingData(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to retrieve tracking details.");
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const awbFromUrl = searchParams.get("awb");
    if (awbFromUrl) {
      setAwbInput(awbFromUrl);
      fetchTracking(awbFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(awbInput);
  };

  const copyAWB = () => {
    if (!trackingData?.airwayBillNumber) return;
    navigator.clipboard.writeText(trackingData.airwayBillNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStepIdx = trackingData
    ? getStatusStepIndex(trackingData.currentStatus)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-xs font-semibold text-orange-700">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
            Real-Time Shivdocket Consignment Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Your Freight & Dockets
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Enter your <strong>Shivshakti Airway Bill Number</strong> or partner
            vendor AWB to see instant milestones, GPS transit checkpoints, and
            delivery ETA.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={awbInput}
                onChange={(e) => setAwbInput(e.target.value)}
                placeholder="Enter Shivshakti AWB (e.g. SSD-20261025-1001) or Vendor AWB"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !awbInput.trim()}
              className="px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <span>Track Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Samples for demo */}
          {/* <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-2">
            <span>Try sample dockets:</span>
            <button
              type="button"
              onClick={() => {
                setAwbInput("SSD-20261025-1001");
                fetchTracking("SSD-20261025-1001");
              }}
              className="font-mono text-orange-600 hover:underline px-2 py-0.5 rounded bg-orange-50 border border-orange-200"
            >
              SSD-20261025-1001 (Train DFC)
            </button>
            <button
              type="button"
              onClick={() => {
                setAwbInput("SSD-20261025-1002");
                fetchTracking("SSD-20261025-1002");
              }}
              className="font-mono text-sky-600 hover:underline px-2 py-0.5 rounded bg-sky-50 border border-sky-200"
            >
              SSD-20261025-1002 (Air Express)
            </button>
          </div> */}
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">Tracking Notice</div>
              <div className="text-xs mt-0.5">{error}</div>
            </div>
          </div>
        )}

        {/* Result Area */}
        {trackingData && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Shivshakti Docket
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      {trackingData.mode} FREIGHT
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {trackingData.shipmentType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {trackingData.airwayBillNumber}
                    </h2>
                    <button
                      onClick={copyAWB}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                      title="Copy Airway Bill"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {trackingData.vendorAirwayBillNumber && (
                    <div className="text-xs text-slate-500">
                      Partner Vendor Ref:{" "}
                      <strong className="font-mono text-slate-700">
                        {trackingData.vendorAirwayBillNumber}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    // onClick={handlePrint}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all inline-flex items-center gap-1.5 border border-slate-200"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Download POD</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="py-8">
                <div className="relative">
                  {/* Background line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 hidden sm:block">
                    <div
                      className="h-1 bg-gradient-to-r from-orange-600 to-emerald-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, ((currentStepIdx - 1) / (statusSteps.length - 1)) * 100))}%`,
                      }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                    {statusSteps.map((step, idx) => {
                      const stepNumber = idx + 1;
                      const isCompleted = stepNumber <= currentStepIdx;
                      const isCurrent = stepNumber === currentStepIdx;

                      return (
                        <div
                          key={step.key}
                          className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isCompleted
                                ? "bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm"
                                : "bg-slate-100 text-slate-400 border border-slate-300"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              idx + 1
                            )}
                          </div>
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                isCurrent
                                  ? "text-orange-600"
                                  : isCompleted
                                    ? "text-slate-900"
                                    : "text-slate-400"
                              }`}
                            >
                              {step.label}
                            </div>
                            {isCurrent && (
                              <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-orange-100 text-orange-700 mt-0.5">
                                CURRENT STATUS
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">Origin</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>{trackingData.origin || "Pickup Hub"}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {trackingData.consignor?.name}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">Destination</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{trackingData.destination || "Delivery Hub"}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {trackingData.consignee?.city ||
                      trackingData.consignee?.state ||
                      "Consignee Location"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">
                    Weight & Packages
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-sky-600" />
                    <span>{trackingData.billWeight} kg Charged</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {trackingData.totalQuantity} Packages (Act:{" "}
                    {trackingData.actualWeight} kg)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">
                    Transport Mode
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <ModeIcon mode={trackingData.mode} />
                    <span>By {trackingData.mode}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Linehaul Express
                  </div>
                </div>
              </div>
            </div>

            {/* Split Grid: Detailed Timeline & Consignment Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Milestones Timeline */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Shipment Journey & Checkpoints
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {(trackingData.timeline || []).length} Milestones Logged
                  </span>
                </div>

                <div className="mt-8 flow-root">
                  <ul className="-mb-8">
                    {(trackingData.timeline || []).map(
                      (event: any, idx: number) => {
                        const isLatest =
                          idx === (trackingData.timeline || []).length - 1;
                        return (
                          <li key={event.id || idx}>
                            <div className="relative pb-8">
                              {idx !==
                                (trackingData.timeline || []).length - 1 && (
                                <span
                                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200"
                                  aria-hidden="true"
                                />
                              )}
                              <div className="relative flex items-start space-x-3">
                                <div>
                                  <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${
                                      isLatest
                                        ? "bg-orange-600 text-white"
                                        : "bg-slate-800 text-slate-200"
                                    }`}
                                  >
                                    <MapPin className="h-4 w-4" />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1 pt-0.5">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="text-sm font-bold text-slate-900">
                                      {event.location}
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">
                                      {event.date} • {event.time}
                                    </div>
                                  </div>
                                  <div className="mt-1 flex items-center gap-2">
                                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700 uppercase">
                                      {event.status}
                                    </span>
                                    <p className="text-xs text-slate-600">
                                      {event.remarks}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              </div>

              {/* Right Column: Consignor, Consignee & Packages */}
              <div className="space-y-6">
                {/* Consignor & Consignee Box */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Parties Involved
                  </h3>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold uppercase text-orange-600">
                      Shipper / Consignor
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {trackingData.consignor?.name || "Sender"}
                    </div>
                    <div className="text-xs text-slate-600">
                      {[
                        trackingData.consignor?.city,
                        trackingData.consignor?.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold uppercase text-emerald-600">
                      Consignee (Recipient)
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {trackingData.consignee?.name || "Recipient"}
                    </div>
                    <div className="text-xs text-slate-600">
                      {[
                        trackingData.consignee?.district,
                        trackingData.consignee?.state,
                        trackingData.consignee?.pincode
                          ? `PIN: ${trackingData.consignee?.pincode}`
                          : "",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                    {trackingData.consignee?.mobile && (
                      <div className="text-xs text-slate-500 pt-0.5">
                        Phone:{" "}
                        <span className="font-mono">
                          {trackingData.consignee.mobile}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Box Breakdown */}
                {trackingData.packages && trackingData.packages.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Package Specifications
                    </h3>
                    <div className="space-y-2.5">
                      {trackingData.packages.map((pkg: any, i: number) => (
                        <div
                          key={pkg.id || i}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{pkg.boxType || `Package #${i + 1}`}</span>
                            <span className="text-slate-500 font-mono">
                              Qty: {pkg.quantity || 1}
                            </span>
                          </div>
                          <div className="text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                            {pkg.length && pkg.width && pkg.height && (
                              <span>
                                Dim: {pkg.length}×{pkg.width}×{pkg.height} cm
                              </span>
                            )}
                            {pkg.weight && (
                              <span>Weight: {pkg.weight} kg/unit</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Verification */}
                {/* <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold">
                      Verified Shivshakti Logistics Docket
                    </div>
                    <div className="text-emerald-700 mt-0.5">
                      Consignment secured with tamper-evident e-seals and 24/7
                      central tracking desk oversight.
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}
