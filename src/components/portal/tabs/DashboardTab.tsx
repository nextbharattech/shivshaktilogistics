"use client";

import React from "react";
import {
  Package,
  Truck,
  Train,
  Plane,
  Ship,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  Plus,
  TrendingUp,
  Scale,
  Building2,
  ArrowRight,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Consignment, DashboardStats } from "../types";

interface DashboardTabProps {
  stats: DashboardStats | null;
  consignments: Consignment[];
  onCutDocket: () => void;
  onViewConsignments: () => void;
  onSelectSlip: (consignment: Consignment) => void;
  onSelectStatus: (consignment: Consignment) => void;
  loading?: boolean;
  onRefresh?: () => void;
}

export function DashboardTab({
  stats,
  consignments,
  onCutDocket,
  onViewConsignments,
  onSelectSlip,
  onSelectStatus,
  loading = false,
  onRefresh,
}: DashboardTabProps) {
  const totalCount = stats?.overview?.totalConsignments ?? consignments.length;
  const inTransitCount =
    stats?.statusBreakdown?.IN_TRANSIT ??
    consignments.filter((c) => c.status === "IN_TRANSIT").length;
  const deliveredCount =
    stats?.statusBreakdown?.DELIVERED ??
    consignments.filter((c) => c.status === "DELIVERED").length;
  const billedWeight =
    stats?.overview?.totalBillWeightKg ??
    consignments
      .reduce((acc, c) => acc + (Number(c.billWeight) || 0), 0)
      .toFixed(1);

  const roadCount =
    stats?.modeBreakdown?.ROAD ??
    consignments.filter((c) => c.mode === "ROAD").length;
  const trainCount =
    stats?.modeBreakdown?.TRAIN ??
    consignments.filter((c) => c.mode === "TRAIN").length;
  const airCount =
    stats?.modeBreakdown?.AIR ??
    consignments.filter((c) => c.mode === "AIR").length;
  const seaCount =
    stats?.modeBreakdown?.SEA ??
    consignments.filter((c) => c.mode === "SEA").length;

  return (
    <div className="space-y-6">
      {/* Operations Quick Action & Welcome Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Live Linehaul Operations Console
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Logistics & Freight Overview
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Real-time multimodal tracking, consignment booking, volumetric
            weight engine, and delivery milestone management.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Dashboard Stats"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin text-orange-400" : ""}`}
              />
            </button>
          )}
          <button
            onClick={onCutDocket}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-950/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cut New Docket</span>
          </button>
          <Link
            href="/track"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span>Public Tracker</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Operational Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Dockets
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Consignments booked
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              In Transit
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 tracking-tight">
            {inTransitCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Active linehaul movement
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Delivered
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">
            {deliveredCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Proof of delivery completed
          </div>
        </div>

        {/* <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Billed Weight
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-orange-600 tracking-tight">
            {billedWeight} <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Volumetric / Actual charged</div>
        </div> */}
      </div>

      {/* Multimodal Transport & Milestone Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mode Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>Docket Transport Modes</span>
            </h2>
            <span className="text-xs text-slate-400">Shipments by route</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-100 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-orange-900 font-bold">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>Road</span>
              </div>
              <div className="text-2xl font-black text-orange-950 mt-2">
                {roadCount}
              </div>
              <div className="text-[10px] text-orange-700/80 mt-0.5">
                FTL / LTL Trucks
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <Train className="w-4 h-4 text-emerald-600" />
                <span>Rail</span>
              </div>
              <div className="text-2xl font-black text-emerald-950 mt-2">
                {trainCount}
              </div>
              <div className="text-[10px] text-emerald-700/80 mt-0.5">
                Express Freight
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-sky-900 font-bold">
                <Plane className="w-4 h-4 text-sky-600" />
                <span>Air</span>
              </div>
              <div className="text-2xl font-black text-sky-950 mt-2">
                {airCount}
              </div>
              <div className="text-[10px] text-sky-700/80 mt-0.5">
                Priority Air Cargo
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                <Ship className="w-4 h-4 text-blue-600" />
                <span>Ocean</span>
              </div>
              <div className="text-2xl font-black text-blue-950 mt-2">
                {seaCount}
              </div>
              <div className="text-[10px] text-blue-700/80 mt-0.5">
                Coastal Maritime
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Docket Status Pipeline</span>
            </h2>
            <span className="text-xs text-slate-400">Current stages</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">
                Pickup / Booked
              </div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {stats?.statusBreakdown?.PICKUP ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
              <div className="text-[11px] text-amber-700 font-medium">
                In Transit
              </div>
              <div className="text-xl font-black text-amber-900 mt-1">
                {stats?.statusBreakdown?.IN_TRANSIT ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200">
              <div className="text-[11px] text-blue-700 font-medium">
                Destination Hub
              </div>
              <div className="text-xl font-black text-blue-900 mt-1">
                {stats?.statusBreakdown?.ARRIVED ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
              <div className="text-[11px] text-indigo-700 font-medium">
                Out for Delivery
              </div>
              <div className="text-xl font-black text-indigo-900 mt-1">
                {stats?.statusBreakdown?.OUT_FOR_DELIVERY ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <div className="text-[11px] text-emerald-700 font-medium">
                Delivered
              </div>
              <div className="text-xl font-black text-emerald-900 mt-1">
                {stats?.statusBreakdown?.DELIVERED ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200">
              <div className="text-[11px] text-rose-700 font-medium">
                Pending Approval
              </div>
              <div className="text-xl font-black text-rose-900 mt-1">
                {stats?.statusBreakdown?.PENDING_APPROVAL ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shipments Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Recent Consignment Dockets
            </h2>
            <p className="text-xs text-slate-500">
              Latest shipments processed across network
            </p>
          </div>
          <button
            onClick={onViewConsignments}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 group"
          >
            <span>View All Dockets</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">AWB Docket #</th>
                <th className="py-2.5 px-3">Consignor</th>
                <th className="py-2.5 px-3">Consignee</th>
                <th className="py-2.5 px-3">Route</th>
                <th className="py-2.5 px-3">Mode</th>
                <th className="py-2.5 px-3">Bill Wt</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && consignments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <div className="inline-flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-orange-600" />
                      <span className="font-medium text-xs">
                        Loading operations feed...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : consignments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No consignments found. Click &quot;Cut New Docket&quot; to
                    book your first shipment.
                  </td>
                </tr>
              ) : (
                consignments.slice(0, 6).map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {c.shivshaktiAirBillNumber}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium max-w-[140px] truncate">
                      {c.consignorName}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium max-w-[140px] truncate">
                      {c.consigneeName}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {c.origin} → {c.destination}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {c.mode}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-800">
                      {c.billWeight} kg
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.status === "PENDING_APPROVAL"
                              ? "bg-rose-100 text-rose-800"
                              : c.status === "IN_TRANSIT"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStatus(c)}
                          className="px-2 py-1 text-[11px] font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg border border-sky-200"
                        >
                          Status
                        </button>
                        <button
                          onClick={() => onSelectSlip(c)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="Print Docket Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
