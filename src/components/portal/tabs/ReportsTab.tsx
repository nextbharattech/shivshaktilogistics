"use client";

import React from "react";
import { FileSpreadsheet, Download, Filter, Search, Calendar } from "lucide-react";
import { Client, ReportFilters } from "../types";

interface ReportsTabProps {
  reportFilters: ReportFilters;
  setReportFilters: React.Dispatch<React.SetStateAction<ReportFilters>>;
  clients: Client[];
  reportResults: any[];
  onRunReport: (e: React.FormEvent) => void;
  onExportDownload: (format: "excel" | "csv") => void;
  loading: boolean;
}

export function ReportsTab({
  reportFilters,
  setReportFilters,
  clients,
  reportResults,
  onRunReport,
  onExportDownload,
  loading,
}: ReportsTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Reports & Logistics Export Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate custom consignment statements and download formatted spreadsheets (.xlsx & .csv)
          </p>
        </div>

        {/* Quick Export Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onExportDownload("excel")}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => onExportDownload("csv")}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Form Card */}
      <form
        onSubmit={onRunReport}
        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4 text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">From Date</label>
            <input
              type="date"
              value={reportFilters.fromDate}
              onChange={(e) => setReportFilters({ ...reportFilters, fromDate: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">To Date</label>
            <input
              type="date"
              value={reportFilters.toDate}
              onChange={(e) => setReportFilters({ ...reportFilters, toDate: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Client (Consignor)</label>
            <select
              value={reportFilters.clientId}
              onChange={(e) => setReportFilters({ ...reportFilters, clientId: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
            >
              <option value="">All Clients</option>
              {clients.map((cl) => (
                <option key={cl.id} value={cl.id}>
                  {cl.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Milestone Status</label>
            <select
              value={reportFilters.status}
              onChange={(e) => setReportFilters({ ...reportFilters, status: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
            >
              <option value="">All Statuses</option>
              <option value="PICKUP">Pickup</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="ARRIVED">Arrived at Hub</option>
              <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
              <option value="DELIVERED">Delivered</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Transport Mode</label>
            <select
              value={reportFilters.mode}
              onChange={(e) => setReportFilters({ ...reportFilters, mode: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
            >
              <option value="">All Modes</option>
              <option value="ROAD">ROAD</option>
              <option value="TRAIN">TRAIN</option>
              <option value="AIR">AIR</option>
              <option value="SURFACE">SURFACE</option>
              <option value="SEA">SEA</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500">
            Click &quot;Preview Report&quot; to review dockets or use direct download buttons above.
          </span>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            <span>Preview Report Records</span>
          </button>
        </div>
      </form>

      {/* Report Results Preview */}
      {reportResults.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Filtered Report Preview ({reportResults.length} records)
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-200/90 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">AWB Docket #</th>
                  <th className="py-2.5 px-3">Booking Date</th>
                  <th className="py-2.5 px-3">Consignor</th>
                  <th className="py-2.5 px-3">Consignee</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3">Charged Wt</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {r.shivshaktiAirBillNumber}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-2.5 px-3 max-w-[140px] truncate">{r.consignorName}</td>
                    <td className="py-2.5 px-3 max-w-[140px] truncate">{r.consigneeName}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {r.mode}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono whitespace-nowrap">{r.billWeight} kg</td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap font-bold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          r.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "PENDING_APPROVAL"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
