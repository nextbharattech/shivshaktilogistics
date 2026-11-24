"use client";

import React, { useState, useEffect } from "react";
import { X, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { Client } from "../types";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onSubmit: (id: number, formData: any) => Promise<void>;
  loading: boolean;
}

export function EditClientModal({
  isOpen,
  onClose,
  client,
  onSubmit,
  loading,
}: EditClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    pincode: "",
    fullAddress: "",
    billingName: "",
    gstNumber: "",
    billingAddress: "",
    state: "",
    city: "",
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        name: client.name || "",
        phoneNumber: client.phoneNumber || "",
        emailAddress: client.emailAddress || "",
        pincode: client.pincode || "",
        fullAddress: client.fullAddress || "",
        billingName: client.billingName || "",
        gstNumber: client.gstNumber || "",
        billingAddress: client.billingAddress || "",
        state: client.state || "",
        city: client.city || "",
        isActive: client.isActive !== false,
      });
      setError(null);
    }
  }, [client, isOpen]);

  if (!isOpen || !client) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 12);
    setFormData({ ...formData, phoneNumber: digitsOnly });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = formData.emailAddress.trim();
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setError("Please enter a valid email address (e.g. name@company.com) or leave it empty.");
      return;
    }

    const payload = {
      ...formData,
      emailAddress: emailTrimmed || null,
      billingAddress: formData.billingAddress.trim() || formData.fullAddress.trim(),
      gstNumber: formData.gstNumber.trim() || null,
      city: formData.city.trim() || null,
      state: formData.state.trim() || null,
    };

    try {
      await onSubmit(client.id, payload);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update client. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-slate-200 my-auto animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              Edit Client (Consignor)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-800 font-bold ml-1"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Company / Consignor Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phone Number (Max 12 Digits) *
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{1,12}"
                maxLength={12}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({ ...formData, emailAddress: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Full Pickup Address *
            </label>
            <input
              type="text"
              required
              value={formData.fullAddress}
              onChange={(e) =>
                setFormData({ ...formData, fullAddress: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Billing Address
            </label>
            <input
              type="text"
              value={formData.billingAddress}
              onChange={(e) =>
                setFormData({ ...formData, billingAddress: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                required
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">GSTIN</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gstNumber: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Billing Name
              </label>
              <input
                type="text"
                value={formData.billingName}
                onChange={(e) =>
                  setFormData({ ...formData, billingName: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Active Status Toggle */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">Account Active Status</div>
              <div className="text-[11px] text-slate-500">
                Inactive clients cannot cut new dockets
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isActive}
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.isActive ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  formData.isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
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
              <span>{loading ? "Updating..." : "Update Client"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
