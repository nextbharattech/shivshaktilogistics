"use client";

import React, { useState } from "react";
import {
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  Hash,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Edit3,
  Receipt,
  Navigation,
} from "lucide-react";
import { Client } from "../types";

interface ViewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onEdit?: (client: Client) => void;
}

export function ViewClientModal({
  isOpen,
  onClose,
  client,
  onEdit,
}: ViewClientModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !client) return null;

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isActive = client.isActive !== false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200/90 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Card Banner */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 pb-6 border-b border-slate-700/60">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            {/* Logo/Icon Avatar */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-950/40 shrink-0 font-black text-xl">
              {client.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-extrabold text-lg sm:text-xl text-white tracking-tight truncate">
                  {client.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-700/60 text-slate-300 border border-slate-600"
                  }`}
                >
                  {isActive ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Inactive
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-slate-400">Consignor ID:</span>
                <span className="font-mono text-orange-400 font-bold">
                  #CL-{client.id}
                </span>
                {client.billingName && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-300 truncate max-w-[220px]">
                      {client.billingName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Phone Number */}
            <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100/90 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Phone Number
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    {client.phoneNumber || "-"}
                  </div>
                </div>
              </div>
              {client.phoneNumber && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(client.phoneNumber, "phone")}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-none hover:shadow-xs"
                  title="Copy Phone Number"
                >
                  {copiedKey === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Email Address */}
            <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-sky-100/90 text-sky-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Email Address
                  </div>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5 truncate max-w-[150px] sm:max-w-[170px]">
                    {client.emailAddress || "-"}
                  </div>
                </div>
              </div>
              {client.emailAddress && (
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(client.emailAddress || "", "email")
                  }
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-none hover:shadow-xs"
                  title="Copy Email"
                >
                  {copiedKey === "email" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Section: Locations / Addresses */}
          <div className="space-y-3 pt-1">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Location & Logistics Addresses
            </h4>

            {/* Full Pickup Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 relative group">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase font-bold text-orange-600 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Full Address</span>
                </div>
                {client.fullAddress && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(client.fullAddress, "pickup")
                    }
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    title="Copy Pickup Address"
                  >
                    {copiedKey === "pickup" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed whitespace-pre-wrap">
                {client.fullAddress || "No pickup address registered"}
              </p>
            </div>

            {/* Billing Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 relative group">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase font-bold text-slate-700 flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-amber-600" />
                  <span>Billing Address</span>
                </div>
                {client.billingAddress && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(client.billingAddress || "", "billing")
                    }
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    title="Copy Billing Address"
                  >
                    {copiedKey === "billing" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed whitespace-pre-wrap">
                {client.billingAddress ||
                  "Same as pickup address / Not provided"}
              </p>
            </div>
          </div>

          {/* Section: Regulatory & Tax Info */}
          <div className="space-y-3 pt-1">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Regional & Statutory Info
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  City
                </div>
                <div className="font-bold text-slate-800 text-xs mt-1 truncate">
                  {client.city || "-"}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  State
                </div>
                <div className="font-bold text-slate-800 text-xs mt-1 truncate">
                  {client.state || "-"}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pincode
                </div>
                <div className="font-mono font-bold text-slate-800 text-xs mt-1">
                  {client.pincode || "-"}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3 text-orange-500" /> GSTIN
                </div>
                <div className="font-mono font-bold text-slate-900 text-xs mt-1 truncate">
                  {client.gstNumber || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-medium">
            Press ESC or click close to exit
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(client);
                }}
                className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-950/20 inline-flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Client</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300/90 text-slate-700 hover:text-slate-900 hover:bg-white font-bold text-xs transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
