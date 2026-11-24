"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Printer,
  Trash2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Clock,
  Truck,
  X,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Consignment } from "../types";

interface ConsignmentsTabProps {
  consignments: Consignment[];
  isAdmin: boolean;
  onCutDocket: () => void;
  onViewDocket: (consignment: Consignment) => void;
  onSelectSlip: (consignment: Consignment) => void;
  onSelectStatus: (consignment: Consignment) => void;
  onConfirmDocket: (id: number) => void;
  onDeleteConsignment: (id: number) => void;
  onRefresh: () => void;
  loading: boolean;
}

export function ConsignmentsTab({
  consignments,
  isAdmin,
  onCutDocket,
  onViewDocket,
  onSelectSlip,
  onSelectStatus,
  onConfirmDocket,
  onDeleteConsignment,
  onRefresh,
  loading,
}: ConsignmentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modeFilter, setModeFilter] = useState("ALL");

  const filteredConsignments = useMemo(() => {
    return consignments.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.shivshaktiAirBillNumber?.toLowerCase().includes(q) ||
        c.vendorAirwayBillNumber?.toLowerCase().includes(q) ||
        c.consignorName?.toLowerCase().includes(q) ||
        c.consigneeName?.toLowerCase().includes(q) ||
        c.origin?.toLowerCase().includes(q) ||
        c.destination?.toLowerCase().includes(q);

      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchMode = modeFilter === "ALL" || c.mode === modeFilter;

      return matchSearch && matchStatus && matchMode;
    });
  }, [consignments, searchQuery, statusFilter, modeFilter]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6">
      {/* Header & Main Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Consignment Dockets
          </h1>
          {/* <p className="text-xs text-slate-500 mt-0.5">
            Manage active freight notes, update milestone statuses, and generate
            barcode slips
          </p> */}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
            title="Refresh Consignments"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin text-orange-600" : ""}`}
            />
          </button>

          <button
            onClick={onCutDocket}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Cut New Docket</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-100">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AWB #, Shipper, Consignee, Origin, Destination..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-orange-500"
        >
          <option value="ALL">All Statuses ({consignments.length})</option>
          <option value="PICKUP">Pickup (Origin)</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="ARRIVED">Arrived at Hub</option>
          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="PENDING_APPROVAL">Pending Approval</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Mode Filter */}
        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-orange-500"
        >
          <option value="ALL">All Transport Modes</option>
          <option value="ROAD">ROAD (FTL/LTL)</option>
          <option value="TRAIN">TRAIN (Rail DFC)</option>
          <option value="AIR">AIR (Air Cargo)</option>
          <option value="SURFACE">SURFACE (Multimodal)</option>
          <option value="SEA">SEA (Container)</option>
        </select>
      </div>

      {/* Record Counter & Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <strong>{filteredConsignments.length}</strong> of{" "}
          {consignments.length} consignments
        </div>
      </div>

      {/* Consignments Data Table */}
      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3.5">AWB Docket #</th>
              <th className="py-3 px-3">Carrier / Vendor AWB</th>
              <th className="py-3 px-3">Shipper (Consignor)</th>
              <th className="py-3 px-3">Consignee</th>
              <th className="py-3 px-3">Origin → Destination</th>
              <th className="py-3 px-3">Mode</th>
              <th className="py-3 px-3">Units</th>
              <th className="py-3 px-3">Charged Wt</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredConsignments.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Truck className="w-8 h-8 text-slate-300" />
                    <span>No matching consignments found.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredConsignments.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3 px-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {c.shivshaktiAirBillNumber}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {c.vendorAirwayBillNumber || "-"}
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-medium max-w-[140px] truncate">
                    {c.consignorName}
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-medium max-w-[140px] truncate">
                    {c.consigneeName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {c.origin} → {c.destination}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                      {c.mode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    {c.totalQuantity || 1}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {c.billWeight} kg
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : c.status === "PENDING_APPROVAL"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : c.status === "IN_TRANSIT"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-sky-100 text-sky-800 border border-sky-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Full Docket */}
                      <button
                        onClick={() => onViewDocket(c)}
                        className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="View Full Docket"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Update Status Milestone */}
                      <button
                        onClick={() => onSelectStatus(c)}
                        className="px-2 py-1 text-[11px] font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors"
                        title="Update Milestone Status"
                      >
                        Status
                      </button>

                      {/* Print Slip */}
                      <button
                        onClick={() => onSelectSlip(c)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Print AWB Docket Slip"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {/* Public Live Tracking Link */}
                      <Link
                        href={`/track?awb=${encodeURIComponent(c.shivshaktiAirBillNumber)}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Track Online"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {/* Admin Approve pending */}
                      {isAdmin && !c.isApprovedByAdmin && (
                        <button
                          onClick={() => onConfirmDocket(c.id)}
                          className="px-2 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors"
                          title="Approve Employee Booking"
                        >
                          Approve
                        </button>
                      )}

                      {/* Admin Delete */}
                      {/* {isAdmin && (
                        <button
                          onClick={() => onDeleteConsignment(c.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Consignment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
