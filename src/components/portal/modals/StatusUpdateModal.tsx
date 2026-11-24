"use client";

import React, { useState } from "react";
import { X, Clock, MapPin, FileText, CheckCircle2 } from "lucide-react";
import { Consignment } from "../types";

interface StatusUpdateModalProps {
  consignment: Consignment;
  onClose: () => void;
  onSubmit: (data: {
    status: string;
    location: string;
    remarks: string;
  }) => void;
  loading: boolean;
}

export function StatusUpdateModal({
  consignment,
  onClose,
  onSubmit,
  loading,
}: StatusUpdateModalProps) {
  const [form, setForm] = useState({
    status: consignment.status || "IN_TRANSIT",
    location: consignment.destination || "",
    remarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              Update Status
            </h3>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              AWB:{" "}
              <span className="font-bold text-orange-600">
                {consignment.shivshaktiAirBillNumber}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              New Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-orange-500"
            >
              <option value="PICKUP">PICKUP</option>
              <option value="IN_TRANSIT">IN_TRANSIT</option>
              <option value="ARRIVED">ARRIVED</option>
              <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Current Checkpoint Location
            </label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              // placeholder="e.g. Bhiwandi Hub / Pune Sorting Yard"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Transit Remarks / Event Note
            </label>
            <textarea
              rows={2}
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              // placeholder="e.g. Loaded onto train rake #1240 / Out for delivery"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 disabled:opacity-50 transition-all inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{loading ? "Logging..." : "Update Status"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
