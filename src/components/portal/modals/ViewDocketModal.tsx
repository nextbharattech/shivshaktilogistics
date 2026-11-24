"use client";

import React, { useState } from "react";
import {
  X,
  Package,
  Copy,
  Check,
  MapPin,
  Building2,
  Truck,
  Scale,
  Printer,
} from "lucide-react";
import { Consignment } from "../types";

interface ViewDocketModalProps {
  isOpen: boolean;
  onClose: () => void;
  consignment: Consignment | null;
  onPrintSlip?: (consignment: Consignment) => void;
}

export function ViewDocketModal({
  isOpen,
  onClose,
  consignment,
  onPrintSlip,
}: ViewDocketModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !consignment) return null;

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(consignment.shivshaktiAirBillNumber || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 my-auto overflow-hidden animate-in fade-in duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-extrabold text-base tracking-tight">
                  {consignment.shivshaktiAirBillNumber}
                </h3>
                <button
                  type="button"
                  onClick={handleCopyAwb}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Copy AWB Number"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="text-[11px] text-slate-400">
                Booked on{" "}
                {consignment.createdAt
                  ? new Date(consignment.createdAt).toLocaleString("en-IN")
                  : "-"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-400/30 uppercase">
              {consignment.status}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Consignor & Consignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold uppercase tracking-wider text-[11px] text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-orange-600" />
                <span>Consignor (Shipper)</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {consignment.consignorName || "-"}
              </div>
              <div className="text-slate-600 space-y-1">
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <span className="font-mono text-slate-800">
                    {consignment.consignorPhone || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">GSTIN: </span>
                  <span className="font-mono text-slate-800">
                    {consignment.consignorGst || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Pincode: </span>
                  <span className="font-mono text-slate-800">
                    {consignment.consignorPincode || "-"}
                  </span>
                </div>
                <div className="pt-1 text-slate-700 whitespace-normal break-words">
                  {consignment.consignorAddress || "-"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold uppercase tracking-wider text-[11px] text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consignee (Recipient)</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {consignment.consigneeName || "-"}
              </div>
              <div className="text-slate-600 space-y-1">
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <span className="font-mono text-slate-800">
                    {consignment.consigneeMobile || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">District / State: </span>
                  <span className="text-slate-800">
                    {[consignment.consigneeDistrict, consignment.consigneeState]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Pincode: </span>
                  <span className="font-mono text-slate-800">
                    {consignment.consigneePincode || "-"}
                  </span>
                </div>
                <div className="pt-1 text-slate-700 whitespace-normal break-words">
                  {consignment.consigneeAddress || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Shipment & Linehaul Info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-600 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-sky-600" />
              <span>Shipment & Linehaul Details</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Origin
                </div>
                <div className="font-semibold text-slate-900">
                  {consignment.origin || "-"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Destination
                </div>
                <div className="font-semibold text-slate-900">
                  {consignment.destination || "-"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Mode / Type
                </div>
                <div className="font-semibold text-slate-900">
                  {consignment.mode} • {consignment.shipmentType || "STANDARD"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Vendor / Carrier
                </div>
                <div className="font-semibold text-slate-900">
                  {consignment.vendor?.vendorName || "Direct"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Vendor AWB #
                </div>
                <div className="font-mono text-slate-800">
                  {consignment.vendorAirwayBillNumber || "-"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  E-Way Bill #
                </div>
                <div className="font-mono text-slate-800">
                  {consignment.eWayBillNumber || "-"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Invoice #
                </div>
                <div className="font-mono text-slate-800">
                  {consignment.invoiceNumber || "-"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Remarks
                </div>
                <div className="text-slate-800 whitespace-normal break-words">
                  {consignment.remarks || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Weights & Packages */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-bold uppercase tracking-wider text-[11px] text-slate-600 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                <span>Weights & Packages</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span>
                  Actual:{" "}
                  <strong className="font-mono text-slate-900">
                    {consignment.actualWeight ?? 0} kg
                  </strong>
                </span>
                <span>
                  Volumetric:{" "}
                  <strong className="font-mono text-slate-900">
                    {consignment.volumetricWeight ?? 0} kg
                  </strong>
                </span>
                <span>
                  Charged:{" "}
                  <strong className="font-mono text-orange-600">
                    {consignment.billWeight ?? 0} kg
                  </strong>
                </span>
                <span>
                  Qty:{" "}
                  <strong className="font-mono text-slate-900">
                    {consignment.totalQuantity ?? 1}
                  </strong>
                </span>
              </div>
            </div>

            {Array.isArray(consignment.items) && consignment.items.length > 0 && (
              <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase">
                    <tr>
                      <th className="py-2 px-3">Box Type</th>
                      <th className="py-2 px-3">Dimensions (L × W × H)</th>
                      <th className="py-2 px-3">Unit Wt</th>
                      <th className="py-2 px-3">Qty</th>
                      <th className="py-2 px-3">Vol Wt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {consignment.items.map((item, idx) => (
                      <tr key={item.id ?? idx}>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {item.boxType}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700">
                          {item.length} × {item.width} × {item.height}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700">
                          {item.weight} kg
                        </td>
                        <td className="py-2 px-3 font-mono font-bold text-slate-900">
                          {item.quantity}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700">
                          {item.volumetricWeight ?? 0} kg
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          {onPrintSlip && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onPrintSlip(consignment);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
