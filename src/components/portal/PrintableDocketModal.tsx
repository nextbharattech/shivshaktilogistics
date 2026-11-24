"use client";

import React, { useRef } from "react";
import { X, Printer, Download, CheckCircle, Shield } from "lucide-react";
import { COMPANY } from "@/data/company";

interface PrintableDocketModalProps {
  consignment: any;
  onClose: () => void;
}

export const PrintableDocketModal: React.FC<PrintableDocketModalProps> = ({
  consignment,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!consignment) return null;

  const handlePrint = () => {
    window.print();
  };

  const bookingDate = consignment.pickupDateTime || consignment.createdAt || new Date().toISOString();
  const dateFormatted = new Date(bookingDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeFormatted = new Date(bookingDate).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-auto">
        {/* Header toolbar (Hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-sm sm:text-base">
              Shivshakti Airway Bill / Consignment Docket Note
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Docket Note</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={printRef} className="p-6 sm:p-8 bg-white text-slate-900 text-xs font-sans print:p-4">
          <style jsx global>{`
            @media print {
              body * {
                visibility: hidden;
              }
              .print\\:block {
                display: block !important;
              }
              div[ref="printRef"],
              .print-area,
              .print-area * {
                visibility: visible;
              }
              .print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
            }
          `}</style>

          <div className="print-area space-y-4 border-2 border-slate-900 p-4 rounded-xl">
            {/* Header: Company & Barcode */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-3 border-b-2 border-slate-900">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                  SHIV SHAKTI LOGISTICS
                </div>
                <div className="text-[11px] text-slate-600 font-semibold">
                  Multi-Modal Freight Carriers & Supply Chain Logistics
                </div>
                <div className="text-[10px] text-slate-500 max-w-md">
                  {COMPANY.headquarters.address}, {COMPANY.headquarters.city}, {COMPANY.headquarters.state} • Phone: {COMPANY.contact.phone} • Email: {COMPANY.contact.email}
                </div>
                <div className="text-[10px] text-slate-700 font-mono">
                  GSTIN: {COMPANY.gst} • PAN: FBDPK4698K
                </div>
              </div>

              {/* AWB Box */}
              <div className="text-right border-2 border-slate-900 p-2.5 rounded-lg bg-slate-50 self-stretch sm:self-auto min-w-[200px]">
                <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Airway Bill Number
                </div>
                <div className="text-lg font-black font-mono tracking-wider text-slate-950 mt-0.5">
                  {consignment.shivshaktiAirBillNumber}
                </div>
                {/* Simulated barcode */}
                <div className="h-7 w-full bg-slate-900 flex items-center justify-around px-1 mt-1 rounded">
                  <div className="w-1 h-5 bg-white"></div>
                  <div className="w-0.5 h-5 bg-white"></div>
                  <div className="w-1.5 h-5 bg-white"></div>
                  <div className="w-0.5 h-5 bg-white"></div>
                  <div className="w-2 h-5 bg-white"></div>
                  <div className="w-0.5 h-5 bg-white"></div>
                  <div className="w-1 h-5 bg-white"></div>
                  <div className="w-2 h-5 bg-white"></div>
                  <div className="w-0.5 h-5 bg-white"></div>
                  <div className="w-1 h-5 bg-white"></div>
                  <div className="w-1.5 h-5 bg-white"></div>
                  <div className="w-0.5 h-5 bg-white"></div>
                  <div className="w-2 h-5 bg-white"></div>
                </div>
                {consignment.vendorAirwayBillNumber && (
                  <div className="text-[10px] text-slate-600 mt-1">
                    Vendor Ref: <span className="font-mono font-bold">{consignment.vendorAirwayBillNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Meta Row: Booking Date, Mode, Type, Status */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-100 p-2.5 rounded-lg border border-slate-300">
              <div>
                <span className="text-slate-500 font-medium">Booking Date:</span>{" "}
                <strong className="text-slate-900">{dateFormatted} {timeFormatted}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Mode:</span>{" "}
                <strong className="text-slate-900 uppercase">BY {consignment.mode}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Type:</span>{" "}
                <strong className="text-slate-900">{consignment.shipmentType}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Status:</span>{" "}
                <strong className="text-emerald-700 uppercase font-mono">{consignment.status}</strong>
              </div>
            </div>

            {/* Consignor vs Consignee Two-Box Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Consignor (Shipper) */}
              <div className="border border-slate-300 rounded-lg p-3 space-y-1 bg-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 border-b pb-1">
                  CONSIGNOR (SHIPPER / FROM)
                </div>
                <div className="text-sm font-bold text-slate-950">{consignment.consignorName || "Shipper"}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {consignment.consignorAddress || "Address on file"}
                </div>
                <div className="text-[11px] text-slate-700 flex flex-wrap gap-x-3 pt-1">
                  <span>Phone: <strong>{consignment.consignorPhone || "-"}</strong></span>
                  <span>PIN: <strong>{consignment.consignorPincode || "-"}</strong></span>
                </div>
                {consignment.consignorGst && (
                  <div className="text-[10px] font-mono text-slate-600">
                    GSTIN: <strong>{consignment.consignorGst}</strong>
                  </div>
                )}
                <div className="text-[10px] text-slate-500 pt-0.5">
                  Origin Hub: <strong>{consignment.origin || "Origin Central"}</strong>
                </div>
              </div>

              {/* Consignee (Receiver) */}
              <div className="border border-slate-300 rounded-lg p-3 space-y-1 bg-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 border-b pb-1">
                  CONSIGNEE (DELIVER TO)
                </div>
                <div className="text-sm font-bold text-slate-950">{consignment.consigneeName}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {consignment.consigneeAddress}
                </div>
                <div className="text-[11px] text-slate-700 flex flex-wrap gap-x-3 pt-1">
                  <span>Mobile: <strong>{consignment.consigneeMobile || "-"}</strong></span>
                  <span>District: <strong>{consignment.consigneeDistrict || "-"}</strong></span>
                </div>
                <div className="text-[11px] text-slate-700 flex flex-wrap gap-x-3">
                  <span>State: <strong>{consignment.consigneeState || "-"}</strong></span>
                  <span>PIN: <strong>{consignment.consigneePincode || "-"}</strong></span>
                </div>
                <div className="text-[10px] text-slate-500 pt-0.5">
                  Destination Hub: <strong>{consignment.destination || "Destination Central"}</strong>
                </div>
              </div>
            </div>

            {/* Statutory Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] border border-slate-200 p-2 rounded-lg bg-slate-50">
              <div>
                <span className="text-slate-500">E-Way Bill No:</span>{" "}
                <strong className="font-mono text-slate-900">{consignment.eWayBillNumber || "N/A"}</strong>
              </div>
              <div>
                <span className="text-slate-500">Invoice No:</span>{" "}
                <strong className="font-mono text-slate-900">{consignment.invoiceNumber || "N/A"}</strong>
              </div>
              <div>
                <span className="text-slate-500">Invoice Req:</span>{" "}
                <strong className="text-slate-900">{consignment.invoiceRequired ? "YES" : "NO"}</strong>
              </div>
            </div>

            {/* Package Items Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-2 px-3 font-semibold">#</th>
                    <th className="py-2 px-3 font-semibold">Box / Package Type</th>
                    <th className="py-2 px-3 font-semibold">Dimensions (L×W×H cm)</th>
                    <th className="py-2 px-3 font-semibold text-right">Qty</th>
                    <th className="py-2 px-3 font-semibold text-right">Actual Wt (kg)</th>
                    <th className="py-2 px-3 font-semibold text-right">Vol Wt (kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {consignment.items && consignment.items.length > 0 ? (
                    consignment.items.map((item: any, idx: number) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 text-slate-500">{idx + 1}</td>
                        <td className="py-1.5 px-3 font-medium text-slate-900">{item.boxType || "Standard Box"}</td>
                        <td className="py-1.5 px-3 text-slate-600 font-mono">
                          {item.length && item.width && item.height ? `${item.length} × ${item.width} × ${item.height}` : "-"}
                        </td>
                        <td className="py-1.5 px-3 text-right font-bold text-slate-900">{item.quantity || 1}</td>
                        <td className="py-1.5 px-3 text-right font-mono text-slate-800">{item.weight || "-"}</td>
                        <td className="py-1.5 px-3 text-right font-mono text-slate-800">{item.volumetricWeight || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-2 px-3 text-center text-slate-500">
                        Total {consignment.totalQuantity || 1} Package(s)
                      </td>
                    </tr>
                  )}
                  {/* Totals Row */}
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-400">
                    <td colSpan={3} className="py-2 px-3 text-right uppercase">Total Billing Weight Summary:</td>
                    <td className="py-2 px-3 text-right font-mono">{consignment.totalQuantity || 1}</td>
                    <td className="py-2 px-3 text-right font-mono">{consignment.actualWeight} kg</td>
                    <td className="py-2 px-3 text-right font-mono">{consignment.volumetricWeight} kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Charged Weight Box */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs">
              <div className="text-orange-950">
                <span className="font-semibold">Volumetric Formula:</span>{" "}
                <span className="font-mono text-[11px]">(L × W × H / 5000) × Quantity</span>
              </div>
              <div className="text-sm font-black text-orange-900 font-mono">
                CHARGED BILLING WEIGHT: {consignment.billWeight} KG
              </div>
            </div>

            {consignment.remarks && (
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                <strong>Special Remarks / Instructions:</strong> {consignment.remarks}
              </div>
            )}

            {/* Terms & Carriage Disclaimers */}
            <div className="text-[9px] text-slate-500 leading-tight border-t pt-2 space-y-1">
              <p>
                <strong>TERMS & CONDITIONS:</strong> 1. Goods booked at Owner&apos;s Risk. 2. Company is not liable for indirect or consequential losses or leakage. 3. All disputes subject to Mumbai Jurisdiction. 4. Claims must be lodged in writing within 7 days of delivery.
              </p>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-3 gap-4 pt-8 text-[10px] text-slate-700">
              <div className="text-center border-t border-slate-400 pt-1">
                Consignor (Shipper) Signature
              </div>
              <div className="text-center border-t border-slate-400 pt-1">
                Booking Clerk / Auth Officer
              </div>
              <div className="text-center border-t border-slate-400 pt-1">
                Consignee Receiver Stamp & Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
