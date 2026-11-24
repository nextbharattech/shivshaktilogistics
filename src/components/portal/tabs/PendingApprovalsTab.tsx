"use client";

import React from "react";
import { Clock, CheckCircle2, Printer, ShieldCheck, RefreshCw } from "lucide-react";
import { Consignment } from "../types";

interface PendingApprovalsTabProps {
  pendingApprovals: Consignment[];
  onConfirmDocket: (id: number) => void;
  onSelectSlip: (consignment: Consignment) => void;
  loading: boolean;
  onRefresh?: () => void;
}

export function PendingApprovalsTab({
  pendingApprovals,
  onConfirmDocket,
  onSelectSlip,
  loading,
  onRefresh,
}: PendingApprovalsTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Pending Approvals Queue
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review and confirm consignment bookings submitted by booking officers before linehaul dispatch
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Pending Approvals"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-600" : ""}`} />
            </button>
          )}
          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            {pendingApprovals.length} Dockets Awaiting Confirmation
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3.5">AWB Docket #</th>
              <th className="py-3 px-3">Booking Date</th>
              <th className="py-3 px-3">Shipper (Consignor)</th>
              <th className="py-3 px-3">Consignee</th>
              <th className="py-3 px-3">Route & Mode</th>
              <th className="py-3 px-3">Charged Wt</th>
              <th className="py-3 px-3">Packages</th>
              <th className="py-3 px-3.5 text-right">Admin Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                    <span className="font-medium text-xs">Checking approval queue...</span>
                  </div>
                </td>
              </tr>
            ) : pendingApprovals.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <span className="font-medium text-slate-700">All bookings confirmed!</span>
                    <span className="text-xs text-slate-400">There are no employee dockets pending administrative approval.</span>
                  </div>
                </td>
              </tr>
            ) : (
              pendingApprovals.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">
                    {p.shivshaktiAirBillNumber}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px]">
                    {new Date(p.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-900 max-w-[140px] truncate">
                    {p.consignorName}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-900 max-w-[140px] truncate">
                    {p.consigneeName}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <div>{p.origin} → {p.destination}</div>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {p.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-orange-600">
                    {p.billWeight} kg
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700">
                    {p.totalQuantity || 1}
                  </td>
                  <td className="py-3.5 px-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectSlip(p)}
                        className="px-2.5 py-1 text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Printer className="w-3 h-3 text-slate-500" />
                        <span>Slip</span>
                      </button>
                      <button
                        onClick={() => onConfirmDocket(p.id)}
                        disabled={loading}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Docket</span>
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
  );
}
